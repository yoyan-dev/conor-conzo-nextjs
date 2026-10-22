import { test, expect } from "../fixtures";

test("hero animation timings and keyframes survive the utility migration", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  const style = await page.locator(".hero-image").evaluate((element) => {
    const style = getComputedStyle(element);
    return {
      name: style.animationName,
      duration: style.animationDuration,
      easing: style.animationTimingFunction,
    };
  });
  expect(style).toEqual({
    name: "portraitEntrance",
    duration: "0.8s",
    easing: "cubic-bezier(0.22, 1, 0.36, 1)",
  });
  expect(
    await page
      .locator(".hero-introduction")
      .evaluate((element) => getComputedStyle(element).animationDelay),
  ).toBe("0.08s");
  expect(
    await page
      .locator(".hero-actions")
      .evaluate((element) => getComputedStyle(element).animationDelay),
  ).toBe("0.48s");
  expect(
    await page
      .locator(".hero-line")
      .evaluateAll((elements) =>
        elements.map((element) => getComputedStyle(element).animationDelay),
      ),
  ).toEqual(["0.16s", "0.24s", "0.32s"]);
  await expect
    .poll(() =>
      page.locator(".hero-glow").evaluate((element) => {
        const breathing = element
          .getAnimations()
          .find(
            (animation) =>
              animation instanceof CSSAnimation &&
              animation.animationName === "glowBreathing",
          );
        const timing = breathing?.effect?.getTiming();
        return timing
          ? {
              duration: timing.duration,
              delay: timing.delay,
              iterations: String(timing.iterations),
            }
          : null;
      }),
    )
    .toEqual({ duration: 10000, delay: 800, iterations: "Infinity" });
  const midpoint = await page.locator(".hero-glow").evaluate((element) => {
    const breathing = element
      .getAnimations()
      .find(
        (animation) =>
          animation instanceof CSSAnimation &&
          animation.animationName === "glowBreathing",
      );
    return breathing?.effect instanceof KeyframeEffect
      ? breathing.effect.getKeyframes().find((frame) => frame.offset === 0.5)
      : undefined;
  });
  expect(midpoint).toMatchObject({ opacity: "0.8", transform: "scale(1.04)" });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect
    .poll(() =>
      page
        .locator(".hero-glow")
        .evaluate((element) => getComputedStyle(element).animationName),
    )
    .toBe("none");
  expect(
    await page
      .locator(".hero-image")
      .evaluate((element) => getComputedStyle(element).animationName),
  ).toBe("none");
  expect(errors).toEqual([]);
});
