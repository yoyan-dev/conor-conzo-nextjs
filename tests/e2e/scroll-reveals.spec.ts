import { test, expect } from "../fixtures";

declare global {
  interface Window {
    scrollRevealLog: { element: number; region: string }[];
  }
}

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    window.scrollRevealLog = [];
    const animate = Element.prototype.animate;
    const identities = new WeakMap<Element, number>();
    let nextIdentity = 0;
    Element.prototype.animate = function (keyframes, options) {
      const animation = animate.call(this, keyframes, options);
      if (
        Array.isArray(keyframes) &&
        keyframes[0]?.transform === "translateY(18px)"
      ) {
        if (!identities.has(this)) identities.set(this, nextIdentity++);
        const region = this.closest("section, footer, nav");
        window.scrollRevealLog.push({
          element: identities.get(this)!,
          region: region?.id || region?.tagName.toLowerCase() || "",
        });
      }
      return animation;
    };
  });
});

for (const width of [390, 1440]) {
  test(`sections reveal once while scrolling at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);

    async function scrollPage() {
      await page.evaluate(async () => {
        const height = document.documentElement.scrollHeight;
        for (let top = 0; top < height; top += innerHeight / 2) {
          window.scrollTo({ top, behavior: "instant" });
          await new Promise(requestAnimationFrame);
          await new Promise(requestAnimationFrame);
        }
      });
    }

    await scrollPage();
    await expect
      .poll(() =>
        page.evaluate(() => [
          ...new Set(window.scrollRevealLog.map((x) => x.region)),
        ]),
      )
      .toEqual(
        expect.arrayContaining([
          "about",
          "orientations",
          "book",
          "reviews",
          "faq",
          "contact",
          "footer",
        ]),
      );
    const first = await page.evaluate(() => window.scrollRevealLog);
    expect(new Set(first.map((entry) => entry.element)).size).toBe(
      first.length,
    );
    await scrollPage();
    expect(await page.evaluate(() => window.scrollRevealLog)).toEqual(first);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
    ).toBe(false);
  });
}

test("reduced motion skips reveals and cancels running ones", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.locator("#contact").scrollIntoViewIfNeeded();
  expect(await page.evaluate(() => window.scrollRevealLog)).toEqual([]);
  await expect(page.locator("#contact h2")).toBeVisible();

  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await page.locator("#about").scrollIntoViewIfNeeded();
  await expect
    .poll(() => page.evaluate(() => window.scrollRevealLog.length))
    .toBeGreaterThan(0);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          document.getAnimations().filter((x) => x.id === "scroll-reveal")
            .length,
      ),
    )
    .toBe(0);
  const count = await page.evaluate(() => window.scrollRevealLog.length);
  await page.locator("#contact").scrollIntoViewIfNeeded();
  expect(await page.evaluate(() => window.scrollRevealLog.length)).toBe(count);
});

test("direct links and keyboard focus show their section immediately", async ({
  page,
}) => {
  await page.goto("/#contact");
  await expect(page.locator("#contact h2")).toBeInViewport();
  await page.evaluate(() => document.fonts.ready);
  expect(
    await page.evaluate(() =>
      window.scrollRevealLog.some((entry) => entry.region === "contact"),
    ),
  ).toBe(false);

  await page.goto("/");
  await page
    .getByRole("form", { name: "Coaching enquiry" })
    .getByRole("textbox", { name: /your name/i })
    .focus();
  expect(
    await page
      .locator("#book")
      .evaluate((section) =>
        section
          .getAnimations({ subtree: true })
          .some((x) => x.id === "scroll-reveal"),
      ),
  ).toBe(false);
  await page
    .getByRole("form", { name: "Coaching enquiry" })
    .getByRole("textbox", { name: /your name/i })
    .fill("Preserved draft");
  await expect(
    page
      .getByRole("form", { name: "Coaching enquiry" })
      .getByRole("textbox", { name: /your name/i }),
  ).toHaveValue("Preserved draft");
});

test("all sections remain readable without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:3001");
  for (const id of [
    "about",
    "orientations",
    "book",
    "reviews",
    "faq",
    "contact",
  ]) {
    const heading = page.locator(`#${id} h2`);
    await heading.scrollIntoViewIfNeeded();
    await expect(heading).toBeVisible();
    expect(
      await heading.evaluate((element) => {
        for (
          let parent: Element | null = element;
          parent;
          parent = parent.parentElement
        ) {
          if (getComputedStyle(parent).opacity === "0") return false;
        }
        return true;
      }),
    ).toBe(true);
  }
  await context.close();
});
