import { test, expect } from "@playwright/test";

test("booking validates, announces a local preview, and sends no form request", async ({
  page,
}) => {
  const submissions: string[] = [];
  page.on("request", (request) => {
    if (request.method() !== "GET" && request.method() !== "HEAD")
      submissions.push(`${request.method()} ${request.url()}`);
  });
  await page.goto("/");
  const form = page.getByRole("form", { name: "Booking preview", exact: true });
  await form
    .getByRole("button", { name: "Preview request", exact: true })
    .click();
  await expect(
    form.getByText("Enter your name.", { exact: true }),
  ).toBeVisible();
  await expect(form.getByRole("textbox", { name: /your name/i })).toBeFocused();
  await form.getByRole("textbox", { name: /your name/i }).fill("UI Check");
  await form.getByRole("textbox", { name: /email address/i }).fill("invalid");
  await form
    .getByRole("button", { name: "Preview request", exact: true })
    .click();
  await expect(
    form.getByText("Enter a valid email address.", { exact: true }),
  ).toBeVisible();
  await form
    .getByRole("textbox", { name: /email address/i })
    .fill("ui-check@example.test");
  await form
    .getByRole("button", { name: "Preview request", exact: true })
    .click();
  const feedback = form.getByRole("status");
  await expect(feedback).toContainText("No booking or message was sent.");
  await expect(feedback).toBeFocused();
  await form
    .getByRole("textbox", { name: /your name/i })
    .fill("Edited UI Check");
  await expect(feedback).toBeHidden();
  expect(submissions).toEqual([]);
});

test("contact requires a message and keeps preview content local", async ({
  page,
}) => {
  const submissions: string[] = [];
  page.on("request", (request) => {
    if (request.method() !== "GET" && request.method() !== "HEAD")
      submissions.push(request.url());
  });
  await page.goto("/");
  const form = page.getByRole("form", { name: "Contact preview", exact: true });
  await form
    .getByRole("textbox", { name: /your email/i })
    .fill("ui-check@example.test");
  await form
    .getByRole("button", { name: "Preview message", exact: true })
    .click();
  await expect(
    form.getByText("Write a short message.", { exact: true }),
  ).toBeVisible();
  await form
    .getByRole("textbox", { name: /your message/i })
    .fill("A local UI preview check.");
  await form
    .getByRole("button", { name: "Preview message", exact: true })
    .click();
  await expect(form.getByRole("status")).toContainText(
    "No booking or message was sent.",
  );
  expect(submissions).toEqual([]);
});

test("preview endpoint rejects direct submissions without sending", async ({
  request,
}) => {
  const response = await request.post("/api/enquiries", {
    headers: { Origin: "http://127.0.0.1:3001" },
    data: {
      kind: "contact",
      email: "visitor@example.test",
      message: "Preview only.",
    },
  });
  expect(response.status()).toBe(503);
  expect(response.headers()["cache-control"]).toBe("no-store");
  expect(await response.json()).toMatchObject({
    ok: false,
    message: expect.stringContaining("preview mode"),
  });
});

test("forms cannot expose details through native GET submission without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:3001");
  const form = page.getByRole("form", { name: "Contact preview", exact: true });
  await expect(
    form.getByRole("button", { name: "Preview message", exact: true }),
  ).toBeDisabled();
  await expect(
    form.getByRole("link", { name: "email Coach Conzo" }),
  ).toHaveAttribute("href", "mailto:yoyan.glophics@gmail.com");
  await form
    .getByRole("textbox", { name: /your email/i })
    .fill("visitor@example.test");
  await form.getByRole("textbox", { name: /your email/i }).press("Enter");
  await expect(page).toHaveURL("http://127.0.0.1:3001/");
  await context.close();
});
