import { test, expect } from "../fixtures";

test("FAQ exposes state, supports keyboard, and allows multiple answers", async ({
  page,
}) => {
  await page.goto("/");
  const starting = page.getByRole("button", {
    name: "Do I need to be fit before starting?",
    exact: true,
  });
  const online = page.getByRole("button", {
    name: "How do online sessions work?",
    exact: true,
  });
  await starting.focus();
  await starting.press("Enter");
  await expect(starting).toHaveAttribute("aria-expanded", "true");
  await expect(
    page.getByText(/Nope. That's what the training is for./),
  ).toBeVisible();
  await online.click();
  await expect(online).toHaveAttribute("aria-expanded", "true");
  await expect(starting).toHaveAttribute("aria-expanded", "true");
  await starting.press("Space");
  await expect(starting).toHaveAttribute("aria-expanded", "false");
});
