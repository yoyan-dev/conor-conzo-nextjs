import { test, expect } from "@playwright/test";
import { mkdirSync } from "node:fs";
import path from "node:path";

for (const width of [320, 390, 768, 1024, 1366, 1440]) {
  test(`layout stays usable at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: width >= 1024 ? 768 : 844 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    const geometry = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth > innerWidth,
      portrait: [...document.images].map((image) => ({
        loaded: image.complete && image.naturalWidth > 0,
        width: image.width,
        height: image.height,
      })),
    }));
    expect(geometry.overflow).toBe(false);
    expect(geometry.portrait[0].loaded).toBe(true);
    expect(
      geometry.portrait[0].width / geometry.portrait[0].height,
    ).toBeCloseTo(447 / 558, 2);
    await expect(page.locator("h1")).toBeVisible();
    const cta = page
      .getByRole("region", { name: "Meet Coach Conzo" })
      .getByRole("link", { name: "Book a free call", exact: true });
    await expect(cta).toBeInViewport();
    for (const id of ["about", "orientations", "book", "faq", "contact"]) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
      ).toBe(false);
    }
    if (width === 390 || width === 1440) {
      mkdirSync("docs/qa", { recursive: true });
      await page.goto("/");
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({
        path: path.join(
          "docs/qa",
          width === 390 ? "ui-mobile.png" : "ui-desktop.png",
        ),
      });
      if (width === 1440) {
        await page.screenshot({
          path: "docs/qa/ui-full-page.png",
          fullPage: true,
        });
        for (const id of ["about", "orientations", "book", "faq", "contact"])
          await page
            .locator(`#${id}`)
            .screenshot({ path: `docs/qa/ui-${id}.png` });
      }
    }
  });
}

test("reduced motion and narrow reflow remain usable", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 320, height: 740 });
  await page.goto("/");
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe("auto");
  await page
    .getByRole("button", {
      name: "Do you do nutrition coaching too?",
      exact: true,
    })
    .click();
  await expect(page.getByText(/Yes, habit-based, flexible/)).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    ),
  ).toBe(false);
});
