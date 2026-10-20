import assert from "node:assert/strict";
import { afterEach, mock, test } from "node:test";
import nodemailer from "nodemailer";
import type Mail from "nodemailer/lib/mailer";
import { createEnquiryHandler } from "../../src/lib/server/enquiry-handler";
import { getFormMode } from "../../src/lib/server/form-mode";
import { sendEnquiry } from "../../src/lib/server/mailer";
import { coach } from "../../src/content/coach";
import type { Enquiry } from "../../src/types/forms";

afterEach(() => mock.restoreAll());

const contact = {
  kind: "contact",
  email: "visitor@example.test",
  message: "Hello Coach.",
};
const coaching = {
  kind: "coaching",
  name: "Jordan",
  email: "visitor@example.test",
  message: "",
  sessionType: "advanced",
};
const origin = "https://tryhrd.example.test";

function request(input: unknown, headers: Record<string, string> = {}) {
  return new Request(origin + "/api/enquiries", {
    method: "POST",
    headers: { origin, "content-type": "application/json", ...headers },
    body: typeof input === "string" ? input : JSON.stringify(input),
  });
}
function handler(send: (enquiry: Enquiry) => Promise<void> = async () => {}) {
  return createEnquiryHandler({
    getMode: () => "live",
    getOrigin: () => origin,
    takeSlot: () => true,
    send,
  });
}

test("preview and missing production origin never invoke delivery", async () => {
  let calls = 0;
  const send = async () => {
    calls++;
  };
  const preview = createEnquiryHandler({ getMode: () => "preview", send });
  assert.equal((await preview(request(contact))).status, 503);
  const unavailable = createEnquiryHandler({
    getMode: () => "live",
    getOrigin: () => {
      throw new Error("Missing origin");
    },
    send,
  });
  assert.equal((await unavailable(request(contact))).status, 503);
  assert.equal(calls, 0);
});

test("contact and coaching requests deliver normalized details with no caching", async () => {
  const sent: Enquiry[] = [];
  const post = handler(async (enquiry) => {
    sent.push(enquiry);
  });
  const response = await post(
    request({
      ...contact,
      email: " visitor@example.test ",
      message: " Hello Coach. ",
      website: "",
    }),
  );
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.deepEqual(await response.json(), { ok: true });
  assert.deepEqual(sent[0], contact);
  assert.equal((await post(request(coaching))).status, 200);
  assert.deepEqual(sent[1], coaching);
});

for (const [name, input] of [
  ["malformed JSON", "{"],
  ["non-object", null],
  ["array", [contact]],
  ["wrong field type", { ...contact, message: 42 }],
  ["unknown kind", { ...contact, kind: "booking-confirmation" }],
  ["empty contact message", { ...contact, message: " " }],
  ["oversized name", { ...coaching, name: "a".repeat(121) }],
  ["oversized message", { ...contact, message: "a".repeat(2001) }],
  ["unknown session", { ...coaching, sessionType: "invented" }],
  ["object session", { ...coaching, sessionType: { toString: 1 } }],
  ["recipient override", { ...contact, to: "other@example.test" }],
  ["sender override", { ...contact, from: "other@example.test" }],
  [
    "multiple email addresses",
    { ...contact, email: "one@example.test,two@example.test" },
  ],
  [
    "header injection",
    { ...contact, email: "one@example.test\r\nBcc: other@example.test" },
  ],
  ["honeypot", { ...contact, website: "spam" }],
] as const) {
  test(`rejects ${name} without attempting delivery`, async () => {
    let calls = 0;
    const response = await handler(async () => {
      calls++;
    })(request(input));
    assert.equal(response.status, 400);
    assert.equal(calls, 0);
  });
}

test("rejects oversized streaming bodies without trusting Content-Length", async () => {
  let calls = 0;
  const response = await handler(async () => {
    calls++;
  })(
    request(
      { ...contact, message: "a".repeat(17000) },
      { "content-length": "1" },
    ),
  );
  assert.equal(response.status, 413);
  assert.equal(calls, 0);
});

test("rejects foreign and missing Origin and unsupported content type", async () => {
  const post = handler(async () => {
    assert.fail("Must not send");
  });
  assert.equal(
    (await post(request(contact, { origin: "https://other.example.test" })))
      .status,
    403,
  );
  assert.equal((await post(request(contact, { origin: "" }))).status, 403);
  assert.equal(
    (await post(request(contact, { "content-type": "text/plain" }))).status,
    415,
  );
});

test("rate limiting returns Retry-After without sending", async () => {
  const post = createEnquiryHandler({
    getMode: () => "live",
    getOrigin: () => origin,
    takeSlot: () => false,
    send: async () => {
      assert.fail("Must not send");
    },
  });
  const response = await post(request(contact));
  assert.equal(response.status, 429);
  assert.equal(response.headers.get("retry-after"), "60");
});

test("SMTP failures return safe feedback and never expose the underlying error", async () => {
  const log = mock.method(console, "error", () => {});
  const response = await handler(async () => {
    throw new Error("SECRET SMTP ERROR");
  })(request(contact));
  assert.equal(response.status, 503);
  assert.ok(!(await response.text()).includes("SECRET"));
  assert.ok(!JSON.stringify(log.mock.calls).includes("SECRET"));
});

test("the default limiter bounds attempts across both form kinds in this process", async () => {
  const post = createEnquiryHandler({
    getMode: () => "live",
    getOrigin: () => origin,
    send: async () => {},
  });
  for (let index = 0; index < 10; index++) {
    assert.equal(
      (await post(request(index % 2 ? coaching : contact))).status,
      200,
    );
  }
  assert.equal((await post(request(contact))).status, 429);
});

test("mode is opt-in and Vercel previews cannot send even with live configured", () => {
  const originalMode = process.env.FORM_MODE;
  const originalVercel = process.env.VERCEL_ENV;
  try {
    delete process.env.FORM_MODE;
    delete process.env.VERCEL_ENV;
    assert.equal(getFormMode(), "preview");
    process.env.FORM_MODE = "live";
    assert.equal(getFormMode(), "live");
    process.env.VERCEL_ENV = "preview";
    assert.equal(getFormMode(), "preview");
  } finally {
    if (originalMode === undefined) delete process.env.FORM_MODE;
    else process.env.FORM_MODE = originalMode;
    if (originalVercel === undefined) delete process.env.VERCEL_ENV;
    else process.env.VERCEL_ENV = originalVercel;
  }
});

test("mailer uses fixed Gmail settings, coach recipient, and visitor Reply-To", async () => {
  const originalUser = process.env.SMTP_USER;
  const originalPassword = process.env.SMTP_APP_PASSWORD;
  const messages: Mail.Options[] = [];
  let options: unknown;
  let accepted = true;
  let reject = false;
  const factory = mock.method(
    nodemailer,
    "createTransport",
    (configuration: unknown) => {
      options = configuration;
      return {
        async sendMail(message: Mail.Options) {
          messages.push(message);
          if (reject) throw new Error("Rejected");
          return { accepted: accepted ? [coach.email] : [], rejected: [] };
        },
      };
    },
  );
  try {
    delete process.env.SMTP_USER;
    delete process.env.SMTP_APP_PASSWORD;
    await assert.rejects(sendEnquiry(contact as Enquiry), /configuration/);
    assert.equal(factory.mock.callCount(), 0);
    process.env.SMTP_USER = "sender@example.test";
    process.env.SMTP_APP_PASSWORD = "test only app pass";
    await sendEnquiry(coaching as Enquiry);
    await sendEnquiry(contact as Enquiry);
    assert.equal(factory.mock.callCount(), 1);
    assert.deepEqual(messages[0].to, {
      name: coach.name,
      address: coach.email,
    });
    assert.deepEqual(messages[0].replyTo, { address: contact.email });
    assert.deepEqual(messages[0].from, {
      name: "TRYHRD / Coach Conzo",
      address: "sender@example.test",
    });
    assert.match(String(messages[0].subject), /Level Up & Lock In/);
    assert.ok(!String(messages[0].text).includes("120 min"));
    assert.match(String(messages[0].text), /no session has been booked/);
    assert.equal(messages[0].html, undefined);
    assert.equal((options as { host: string }).host, "smtp.gmail.com");
    assert.equal((options as { port: number }).port, 587);
    assert.equal((options as { requireTLS: boolean }).requireTLS, true);
    accepted = false;
    await assert.rejects(sendEnquiry(contact as Enquiry), /not accepted/);
    reject = true;
    await assert.rejects(sendEnquiry(contact as Enquiry), /Rejected/);
  } finally {
    if (originalUser === undefined) delete process.env.SMTP_USER;
    else process.env.SMTP_USER = originalUser;
    if (originalPassword === undefined) delete process.env.SMTP_APP_PASSWORD;
    else process.env.SMTP_APP_PASSWORD = originalPassword;
  }
});
