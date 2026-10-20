import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("coaching sends the selected enquiry once, waits for acceptance, and never confirms a booking", async ({
  page,
}) => {
  let release: () => void = () => {};
  const delivery = new Promise<void>((resolve) => {
    release = resolve;
  });
  const submitted: unknown[] = [];
  await page.route("**/api/enquiries", async (route) => {
    submitted.push(route.request().postDataJSON());
    await delivery;
    await route.fulfill({ json: { ok: true } });
  });
  await page.goto("/");
  const form = page.getByRole("form", {
    name: "Coaching enquiry",
    exact: true,
  });
  await form.getByRole("textbox", { name: /your name/i }).fill("Jordan");
  await form
    .getByRole("textbox", { name: /email address/i })
    .fill("visitor@example.test");
  await form.getByLabel("Session type").selectOption("advanced");
  await form.getByRole("button", { name: "Send enquiry", exact: true }).click();
  await expect(form.getByRole("button", { name: "Sending…" })).toBeDisabled();
  await expect(form.getByRole("status")).toBeHidden();
  expect(submitted).toEqual([
    {
      kind: "coaching",
      name: "Jordan",
      email: "visitor@example.test",
      message: "",
      sessionType: "advanced",
      website: "",
    },
  ]);
  release();
  await expect(form.getByRole("status")).toContainText(
    "Your session is not booked yet.",
  );
  await expect(form.getByRole("status")).toBeFocused();
  await form.getByRole("textbox", { name: /your name/i }).fill("Edited Jordan");
  await expect(form.getByRole("status")).toBeHidden();
  expect(submitted).toHaveLength(1);
});

test("contact failure preserves the draft and a deliberate retry can succeed", async ({
  page,
}) => {
  let calls = 0;
  await page.route("**/api/enquiries", async (route) => {
    calls++;
    if (calls === 1)
      await route.fulfill({
        status: 503,
        json: { ok: false, message: "Email is unavailable right now." },
      });
    else await route.fulfill({ json: { ok: true } });
  });
  await page.setViewportSize({ width: 390, height: 900 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const form = page.getByRole("form", { name: "Contact enquiry", exact: true });
  await form
    .getByRole("textbox", { name: /your email/i })
    .fill("visitor@example.test");
  await form
    .getByRole("textbox", { name: /your message/i })
    .fill("A coaching question.");
  await form.getByRole("button", { name: "Send message", exact: true }).click();
  await expect(form.getByRole("alert")).toContainText("Email is unavailable");
  await expect(
    form.getByRole("textbox", { name: /your message/i }),
  ).toHaveValue("A coaching question.");
  await expect(form.getByRole("status")).toBeHidden();
  await expect(
    form.getByRole("link", { name: "Email Coach Conzo" }),
  ).toHaveAttribute("href", "mailto:yoyan.glophics@gmail.com");
  await form.getByRole("button", { name: "Send message", exact: true }).click();
  await expect(form.getByRole("status")).toContainText(
    "Your message has been sent.",
  );
  expect(calls).toBe(2);
  const audit = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(audit.violations).toEqual([]);
  await form.screenshot({
    path: "test-results/live-contact-mobile.png",
  });
});

test("server field errors focus the invalid field and network failure never shows success", async ({
  page,
}) => {
  let calls = 0;
  await page.route("**/api/enquiries", async (route) => {
    calls++;
    if (calls === 1) {
      await route.fulfill({
        status: 400,
        json: {
          ok: false,
          message: "Check your details.",
          fieldErrors: { email: "Please check this email." },
        },
      });
    } else {
      await route.abort("failed");
    }
  });
  await page.goto("/");
  const form = page.getByRole("form", { name: "Contact enquiry", exact: true });
  await form
    .getByRole("textbox", { name: /your email/i })
    .fill("visitor@example.test");
  await form
    .getByRole("textbox", { name: /your message/i })
    .fill("Hello Coach.");
  await form.getByRole("button", { name: "Send message", exact: true }).click();
  await expect(
    form.getByText("Please check this email.", { exact: true }),
  ).toBeVisible();
  await expect(
    form.getByRole("textbox", { name: /your email/i }),
  ).toBeFocused();
  await form
    .getByRole("textbox", { name: /your email/i })
    .fill("edited@example.test");
  await form.getByRole("button", { name: "Send message", exact: true }).click();
  await expect(form.getByRole("alert")).toContainText(
    "couldn't confirm whether",
  );
  await expect(form.getByRole("status")).toBeHidden();
  expect(calls).toBe(2);
});

test("an orientation change during delivery does not mark the new selection as sent", async ({
  page,
}) => {
  let release: () => void = () => {};
  const delivery = new Promise<void>((resolve) => {
    release = resolve;
  });
  await page.route("**/api/enquiries", async (route) => {
    await delivery;
    await route.fulfill({ json: { ok: true } });
  });
  await page.goto("/");
  const form = page.getByRole("form", {
    name: "Coaching enquiry",
    exact: true,
  });
  await form.getByRole("textbox", { name: /your name/i }).fill("Jordan");
  await form
    .getByRole("textbox", { name: /email address/i })
    .fill("visitor@example.test");
  await form.getByRole("button", { name: "Send enquiry", exact: true }).click();
  await expect(form.getByRole("button", { name: "Sending…" })).toBeDisabled();
  await page.getByText("Intermediate", { exact: true }).click();
  release();
  await expect(
    form.getByRole("button", { name: "Send enquiry", exact: true }),
  ).toBeEnabled();
  await expect(form.getByLabel("Session type")).toHaveValue("intermediate");
  await expect(form.getByRole("status")).toBeHidden();
});

test("live endpoint fails safely without SMTP credentials", async ({
  request,
}) => {
  const response = await request.post("/api/enquiries", {
    headers: { Origin: "https://tryhrd.example.test" },
    data: {
      kind: "contact",
      email: "visitor@example.test",
      message: "No real mail should be sent.",
    },
  });
  expect(response.status()).toBe(503);
  expect(await response.json()).toMatchObject({
    ok: false,
    message: expect.stringContaining("couldn't confirm"),
  });
});
