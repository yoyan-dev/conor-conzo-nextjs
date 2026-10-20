import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("gallery lightbox supports keyboard navigation, focus containment, and focus return", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/#gallery");
  const triggers = page
    .locator("#gallery")
    .getByRole("button", { name: /^View photo/ });
  const count = await triggers.count();
  const first = triggers.first();
  await first.focus();
  await first.press("Enter");
  const dialog = page.getByRole("dialog", { name: "Gallery image viewer" });
  await expect(dialog).toBeVisible();
  await expect(
    dialog.getByRole("button", { name: "Close image viewer" }),
  ).toBeFocused();
  await expect(
    dialog.getByRole("status").filter({ hasText: "Photo 1 of" }),
  ).toHaveText(`Photo 1 of ${count}`);
  await page.keyboard.press("ArrowLeft");
  await expect(
    dialog.getByRole("status").filter({ hasText: /^Photo \d+ of \d+$/ }),
  ).toHaveText(`Photo ${count} of ${count}`);
  await page.keyboard.press("ArrowRight");
  await expect(
    dialog.getByRole("status").filter({ hasText: /^Photo \d+ of \d+$/ }),
  ).toHaveText(`Photo 1 of ${count}`);
  for (let index = 0; index < 5; index++) {
    await page.keyboard.press("Tab");
    expect(
      await dialog.evaluate((dialog) =>
        dialog.contains(document.activeElement),
      ),
    ).toBe(true);
  }
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(first).toBeFocused();
  await expect(
    page.getByRole("link", { name: "View full gallery", exact: true }),
  ).toHaveCount(0);
});

test("mobile gallery tiles fill their frames and open full photos with accessible controls", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/gallery");
  const triggers = page.getByRole("button", { name: /^View photo/ });
  const count = await triggers.count();
  const last = triggers.last();
  expect(
    await last
      .locator("img")
      .evaluate((image) => getComputedStyle(image).objectFit),
  ).toBe("cover");
  await last.click();
  const dialog = page.getByRole("dialog", { name: "Gallery image viewer" });
  await expect(dialog).toBeVisible();
  await expect(
    dialog.getByRole("status").filter({ hasText: /^Photo \d+ of \d+$/ }),
  ).toHaveText(`Photo ${count} of ${count}`);
  await expect(dialog.locator("img")).toHaveAttribute("data-loaded", "true");
  expect(
    await dialog
      .locator("img")
      .evaluate((image) => getComputedStyle(image).objectFit),
  ).toBe("contain");
  const audit = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(audit.violations).toEqual([]);
  await dialog.getByRole("button", { name: "Next photo", exact: true }).click();
  await expect(
    dialog.getByRole("status").filter({ hasText: /^Photo \d+ of \d+$/ }),
  ).toHaveText(`Photo 1 of ${count}`);
  await dialog
    .getByRole("button", { name: "Previous photo", exact: true })
    .click();
  await expect(
    dialog.getByRole("status").filter({ hasText: /^Photo \d+ of \d+$/ }),
  ).toHaveText(`Photo ${count} of ${count}`);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    ),
  ).toBe(false);
  await page.mouse.click(3, 3);
  await expect(dialog).toHaveCount(0);
  await expect(last).toBeFocused();
});

test("reduced motion disables lightbox animations and closing restores page interaction", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#gallery");
  const first = page
    .locator("#gallery")
    .getByRole("button", { name: /^View photo/ })
    .first();
  await first.click();
  const dialog = page.getByRole("dialog", { name: "Gallery image viewer" });
  await expect(dialog.locator("img")).toHaveAttribute("data-loaded", "true");
  const animatedElements = page.locator(
    '[data-slot="modal-backdrop"], [data-slot="modal-container"], [role="dialog"] img',
  );
  expect(
    await animatedElements.evaluateAll((elements) =>
      elements.every(
        (element) => getComputedStyle(element).animationName === "none",
      ),
    ),
  ).toBe(true);
  await dialog
    .getByRole("button", { name: "Close image viewer", exact: true })
    .click();
  await expect(dialog).toHaveCount(0);
  await expect(first).toBeFocused();
  await page.getByText("Intermediate", { exact: true }).click();
  await expect(page.locator("#booking-session")).toHaveValue("intermediate");
});
