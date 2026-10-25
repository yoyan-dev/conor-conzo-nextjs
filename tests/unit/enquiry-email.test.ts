import assert from "node:assert/strict";
import { test } from "node:test";
import { renderEnquiryEmail } from "../../src/lib/server/enquiry-email";

test("contact email includes customer details, a reply link, and readable line breaks", () => {
  const html = renderEnquiryEmail({
    kind: "contact",
    email: "visitor+coaching@example.test",
    message: "Hello Coach.\r\nA question about training.\nThanks!",
  });
  assert.match(html, /New contact message/);
  assert.match(html, /visitor\+coaching@example\.test/);
  assert.match(html, /href="mailto:visitor%2Bcoaching@example\.test"/);
  assert.match(
    html,
    /Hello Coach\.<br \/>A question about training\.<br \/>Thanks!/,
  );
  assert.match(html, /Reply to this email to respond directly to the customer/);
  assert.doesNotMatch(
    html,
    /mail\.google\.com|Reply to customer|bgcolor|border-radius/,
  );
  assert.doesNotMatch(html, /Interested in|no session has been booked/);
});

test("coaching email escapes customer content and session labels instead of rendering markup", () => {
  const html = renderEnquiryEmail(
    {
      kind: "coaching",
      name: '<img src=x onerror="alert(1)"> & Jordan',
      email: "visitor@example.test",
      message: '<script>alert("test")</script>\nI\'m ready & curious.',
      sessionType: "advanced",
    },
    "Level Up & Lock In",
  );
  assert.match(
    html,
    /&lt;img src=x onerror=&quot;alert\(1\)&quot;&gt; &amp; Jordan/,
  );
  assert.match(html, /&lt;script&gt;alert\(&quot;test&quot;\)&lt;\/script&gt;/);
  assert.match(html, /I&#39;m ready &amp; curious\./);
  assert.match(html, /Level Up &amp; Lock In/);
  assert.match(html, /This is an enquiry; no session has been booked\./);
  assert.doesNotMatch(html, /<script|<img|120 min/);
});

test("coaching email keeps the optional-message fallback", () => {
  const html = renderEnquiryEmail(
    {
      kind: "coaching",
      name: "Jordan",
      email: "visitor@example.test",
      message: "",
      sessionType: "discovery-call",
    },
    "Free discovery call (30 min)",
  );
  assert.match(html, /\(No additional message\)/);
  assert.match(html, /Free discovery call \(30 min\)/);
});

for (const [email, recipient] of [
  ["customer@example.test", "customer@example.test"],
  ["customer+training@example.test", "customer%2Btraining@example.test"],
  ["customer%tag@example.test", "customer%25tag@example.test"],
  [
    "customer?tag=value&other#note@example.test",
    "customer%3Ftag%3Dvalue%26other%23note@example.test",
  ],
]) {
  test("reply links retain the recipient: " + email, () => {
    for (const kind of ["contact", "coaching"] as const) {
      const details = { email, message: "Hello Coach." };
      const html = renderEnquiryEmail(
        kind === "contact"
          ? { kind, ...details }
          : { kind, ...details, name: "Customer", sessionType: "advanced" },
      );
      const links = [...html.matchAll(/href="(mailto:[^"]+)"/g)];
      assert.equal(links.length, 1);
      for (const [, href] of links) {
        assert.equal(href, "mailto:" + recipient);
        assert.equal(decodeURIComponent(href.slice("mailto:".length)), email);
        assert.equal(new URL(href).search, "");
        assert.equal(new URL(href).hash, "");
      }
    }
  });
}
