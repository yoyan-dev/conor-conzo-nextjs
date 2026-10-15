import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const { label, width, height } of [
  { label: "reference", width: 1920, height: 944 },
  { label: "desktop", width: 1440, height: 900 },
  { label: "mobile", width: 390, height: 844 },
  { label: "small-mobile", width: 320, height: 720 },
] as const) {
  test(`homepage testimonial section fits ${label} with sourced reviews`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);

    const section = page.locator("#reviews");
    await expect(section).toBeVisible();
    await expect(
      section.getByRole("heading", {
        level: 2,
        name: "The results speak loud.",
      }),
    ).toBeVisible();
    await expect(section.getByText(/5\.0\s+out of 5/)).toBeVisible();
    await expect(
      section.getByRole("table", { name: "Client testimonials" }),
    ).toBeVisible();
    await expect(section.locator("tbody tr")).toHaveCount(4);
    await expect(
      section.getByRole("rowheader", { name: "Vincent" }),
    ).toBeVisible();
    await expect(
      section.getByRole("rowheader", { name: "Dana" }),
    ).toBeVisible();
    await expect(
      section.getByRole("rowheader", { name: "Alex" }),
    ).toBeVisible();
    await expect(section.getByText(/hypermobility/)).toBeVisible();
    await expect(section.getByText("Jake M.")).toHaveCount(0);
    await expect(section.getByText("4.9", { exact: true })).toHaveCount(0);

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    );
    expect(overflow).toBe(false);

    if (width < 768) {
      const name = await section
        .getByRole("rowheader", { name: "Vincent" })
        .boundingBox();
      expect(name?.width).toBeGreaterThan(200);
    }

    if (label === "reference") {
      const container = await section.locator(":scope > div").boundingBox();
      const coaching = await page
        .locator("#about > .page-container")
        .boundingBox();
      expect(container?.width).toBe(coaching?.width);
      expect(container?.x).toBe(coaching?.x);
    }

    const accessibility = await new AxeBuilder({ page })
      .include("#reviews")
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(accessibility.violations).toEqual([]);

    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/#reviews");
    await expect(
      page.getByRole("heading", { level: 2, name: "The results speak loud." }),
    ).toBeInViewport();
    await page.screenshot({
      path: `test-results/qa/testimonials-${label}.png`,
    });
  });
}

test("testimonials navigation targets the homepage section", async ({
  page,
}) => {
  await page.goto("/");
  await page.setViewportSize({ width: 1440, height: 900 });
  await page
    .getByRole("navigation", { name: "Main navigation", exact: true })
    .getByRole("link", { name: "Testimonials" })
    .click();

  await expect(page).toHaveURL(/#reviews$/);
  await expect(page.locator("#reviews")).toBeInViewport();
});
