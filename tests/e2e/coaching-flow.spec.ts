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
