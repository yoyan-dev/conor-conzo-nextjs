import { test, expect } from "../fixtures";

test("booking validates locally and submits one enquiry", async ({ page }) => {
  const submissions: string[] = [];
  page.on("request", (request) => {
    if (request.method() !== "GET" && request.method() !== "HEAD")
      submissions.push(`${request.method()} ${request.url()}`);
  });
  await page.goto("/");
  const form = page.getByRole("form", {
    name: "Coaching enquiry",
    exact: true,
  });
  await form.getByRole("button", { name: "Send enquiry", exact: true }).click();
  await expect(
    form.getByText("Enter your name.", { exact: true }),
  ).toBeVisible();
  await expect(form.getByRole("textbox", { name: /your name/i })).toBeFocused();
  await form.getByRole("textbox", { name: /your name/i }).fill("UI Check");
  await form.getByRole("textbox", { name: /email address/i }).fill("invalid");
  await form.getByRole("button", { name: "Send enquiry", exact: true }).click();
  await expect(
    form.getByText("Enter a valid email address.", { exact: true }),
  ).toBeVisible();
  expect(submissions).toEqual([]);
  await form
    .getByRole("textbox", { name: /email address/i })
    .fill("ui-check@example.test");
  await form.getByRole("button", { name: "Send enquiry", exact: true }).click();
  const feedback = form.getByRole("status");
  await expect(feedback).toContainText("Your session is not booked yet.");
  await expect(feedback).toBeFocused();
  await form
    .getByRole("textbox", { name: /your name/i })
    .fill("Edited UI Check");
  await expect(feedback).toBeHidden();
  expect(submissions).toHaveLength(1);
  expect(submissions[0]).toContain("/api/enquiries");
});

test("contact requires a message and submits one enquiry", async ({ page }) => {
  const submissions: string[] = [];
  page.on("request", (request) => {
    if (request.method() !== "GET" && request.method() !== "HEAD")
      submissions.push(request.url());
  });
  await page.goto("/");
  const form = page.getByRole("form", { name: "Contact enquiry", exact: true });
  await form
    .getByRole("textbox", { name: /your email/i })
    .fill("ui-check@example.test");
  await form.getByRole("button", { name: "Send message", exact: true }).click();
  await expect(
    form.getByText("Write a short message.", { exact: true }),
  ).toBeVisible();
  expect(submissions).toEqual([]);
  await form
    .getByRole("textbox", { name: /your message/i })
    .fill("A UI enquiry check.");
  await form.getByRole("button", { name: "Send message", exact: true }).click();
  await expect(form.getByRole("status")).toContainText(
    "Your message has been sent.",
  );
  expect(submissions).toHaveLength(1);
  expect(submissions[0]).toContain("/api/enquiries");
});

test("endpoint rejects invalid enquiries without attempting delivery", async ({
  request,
}) => {
  const response = await request.post("/api/enquiries", {
    headers: { Origin: "https://tryhrd.example.test" },
    data: { kind: "contact", email: "visitor@example.test", message: "" },
  });
  expect(response.status()).toBe(400);
  expect(response.headers()["cache-control"]).toBe("no-store");
  expect(await response.json()).toMatchObject({
    ok: false,
    fieldErrors: { message: "Write a short message." },
  });
});

test("forms cannot expose details through native GET submission without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:3001");
  const form = page.getByRole("form", { name: "Contact enquiry", exact: true });
  await expect(
    form.getByRole("button", { name: "Send message", exact: true }),
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
