import { test, expect } from "@playwright/test";

test("desktop navigation targets real sections and sourced reviews", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator("h1")).toHaveCount(1);
  for (const id of [
    "about",
    "orientations",
    "book",
    "reviews",
    "faq",
    "contact",
  ])
    await expect(page.locator(`#${id}`)).toHaveCount(1);
  await expect(page.locator("#reviews tbody tr")).toHaveCount(4);
  await page
    .getByRole("navigation", { name: "Main navigation", exact: true })
    .getByRole("link", { name: "FAQ", exact: true })
    .click();
  await expect(page).toHaveURL(/#faq$/);
  await expect(
    page.getByRole("heading", { name: "Good question.", exact: true }),
  ).toBeInViewport();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    /noindex/,
  );
});

test("mobile menu supports keyboard dismissal, focus return, and section navigation", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const toggle = page.getByRole("button", {
    name: "Open navigation",
    exact: true,
  });
  await toggle.click();
  const menu = page.getByRole("navigation", {
    name: "Mobile navigation",
    exact: true,
  });
  await expect(menu).toBeVisible();
  await expect(menu.getByRole("link", { name: "Coaching" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(menu).toBeHidden();
  await expect(toggle).toBeFocused();
  await toggle.click();
  await menu.getByRole("link", { name: "FAQ" }).click();
  await expect(menu).toBeHidden();
  await expect(page).toHaveURL(/#faq$/);
  await expect(page.locator("#faq")).toBeFocused();
});
