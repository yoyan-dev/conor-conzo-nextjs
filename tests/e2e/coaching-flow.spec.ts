import { test, expect } from "@playwright/test";

test("orientation keyboard selection carries into booking without resetting edited fields", async ({
  page,
}) => {
  await page.goto("/");
  const starter = page.getByRole("radio", {
    name: "Starter: Personal Training",
    exact: true,
  });
  await starter.focus();
  await starter.press("Space");
  await expect(page.locator("#booking-session")).toHaveValue("starter");
  await starter.press("ArrowRight");
  await expect(
    page.getByRole("radio", {
      name: "Intermediate: Build Your Program",
      exact: true,
    }),
  ).toBeChecked();
  await expect(page.locator("#booking-session")).toHaveValue("intermediate");
  await page
    .getByRole("link", { name: "Book an orientation", exact: true })
    .click();
  const form = page.getByRole("form", { name: "Booking preview", exact: true });
  await form.getByRole("textbox", { name: /your name/i }).fill("UI Check");
  await page.getByText("Advanced", { exact: true }).click();
  await expect(page.locator("#booking-session")).toHaveValue("advanced");
  await expect(form.getByRole("textbox", { name: /your name/i })).toHaveValue(
    "UI Check",
  );
  await expect(page.locator("#orientations")).not.toContainText("120 minutes");
});

test("service actions preselect the relevant booking interest", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("link", { name: "Ask about online coaching", exact: true })
    .click();
  await expect(page).toHaveURL(/#book$/);
  await expect(page.locator("#booking-session")).toHaveValue("online-coaching");
  await expect(page.locator("#book")).toBeFocused();
});

for (const source of ["header", "hero", "mobile-menu"] as const) {
  test(`${source} free-call action resets an orientation and preserves the draft`, async ({
    page,
  }) => {
    await page.setViewportSize({
      width: source === "mobile-menu" ? 390 : 1440,
      height: 900,
    });
    await page.goto("/");
    await page.getByText("Intermediate", { exact: true }).click();
    await expect(page.locator("#booking-session")).toHaveValue("intermediate");
    const form = page.getByRole("form", {
      name: "Booking preview",
      exact: true,
    });
    await form.getByRole("textbox", { name: /your name/i }).fill("UI Check");
    await form
      .getByRole("textbox", { name: /email address/i })
      .fill("ui-check@example.test");
    await form
      .getByRole("textbox", { name: /anything to share/i })
      .fill("Build confidence in the gym.");
    await form
      .getByRole("button", { name: "Preview request", exact: true })
      .click();
    await expect(form.getByRole("status")).toBeVisible();

    if (source === "mobile-menu") {
      await page
        .getByRole("button", { name: "Open navigation", exact: true })
        .click();
      await page
        .getByRole("navigation", { name: "Mobile navigation", exact: true })
        .getByRole("link", { name: "Book a call", exact: true })
        .click();
    } else {
      const area =
        source === "header"
          ? page.getByRole("banner")
          : page.getByRole("region", { name: "Meet Coach Conzo" });
      await area
        .getByRole("link", { name: "Book a free call", exact: true })
        .click();
    }

    await expect(page.locator("#booking-session")).toHaveValue(
      "discovery-call",
    );
    await expect(form.getByRole("textbox", { name: /your name/i })).toHaveValue(
      "UI Check",
    );
    await expect(
      form.getByRole("textbox", { name: /email address/i }),
    ).toHaveValue("ui-check@example.test");
    await expect(
      form.getByRole("textbox", { name: /anything to share/i }),
    ).toHaveValue("Build confidence in the gym.");
    await expect(form.getByRole("status")).toBeHidden();
    await page.getByText("Intermediate", { exact: true }).click();
    await expect(page.locator("#booking-session")).toHaveValue("intermediate");
    await expect(form.getByRole("status")).toBeHidden();
  });
}

test("collaborations lead to the contact preview", async ({ page }) => {
  await page.goto("/");
  await page
    .getByRole("link", { name: "Discuss a collaboration", exact: true })
    .click();
  await expect(page).toHaveURL(/#contact$/);
  await expect(page.locator("#contact")).toBeFocused();
});
