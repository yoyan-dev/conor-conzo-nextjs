import { test, expect } from "../fixtures";
import AxeBuilder from "@axe-core/playwright";

for (const width of [390, 1440]) {
  test(`no automated WCAG violations in initial and interactive states at ${width}px`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.setViewportSize({ width, height: 900 });
    // Audit settled colors; scroll-reveals.spec.ts exercises motion separately.
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    const initial = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(initial.violations).toEqual([]);
    await page
      .getByRole("button", {
        name: "Do I need to be fit before starting?",
        exact: true,
      })
      .click();
    await page
      .getByRole("form", { name: "Coaching enquiry", exact: true })
      .getByRole("button", { name: "Send enquiry", exact: true })
      .click();
    const interactive = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(interactive.violations).toEqual([]);
    expect(errors).toEqual([]);
  });
}
