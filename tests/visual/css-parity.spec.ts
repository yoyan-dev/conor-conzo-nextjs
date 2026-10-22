import { test, expect, type Page } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";

async function ready(page: Page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    // Load off-screen gallery images before taking full-page captures.
    document.querySelectorAll("img").forEach((image) => {
      image.loading = "eager";
    });
    await Promise.all(
      [...document.images].map((image) => image.decode().catch(() => {})),
    );
  });
  await page.mouse.move(0, 0);
}

async function capture(page: Page, name: string, fullPage = false) {
  await ready(page);
  // Keep computed properties as diagnostics for investigating exact pixel differences.
  const diagnostics = await page.evaluate(() =>
    [...document.querySelectorAll("body, body *")].map((element) => {
      const style = getComputedStyle(element);
      return {
        tag: element.tagName,
        text: element.textContent?.slice(0, 60),
        rect: element.getBoundingClientRect().toJSON(),
        style: Object.fromEntries(
          [...style].map((property) => [
            property,
            style.getPropertyValue(property),
          ]),
        ),
      };
    }),
  );
  mkdirSync("test-results/visual-styles", { recursive: true });
  writeFileSync(
    `test-results/visual-styles/${name}.json`,
    JSON.stringify(diagnostics),
  );
  await expect(page).toHaveScreenshot(`${name}.png`, { fullPage });
}

for (const width of [320, 390, 768, 1024, 1366, 1440]) {
  test(`all pages at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: width >= 1024 ? 900 : 844 });
    await page.goto("/");
    await capture(page, `home-${width}`, true);
    if (width === 390 || width === 1440) {
      for (const id of [
        "about",
        "orientations",
        "book",
        "reviews",
        "faq",
        "gallery",
        "contact",
      ]) {
        await expect(page.locator(`#${id}`)).toHaveScreenshot(
          `section-${id}-${width}.png`,
        );
      }
    }
    await page.goto("/gallery");
    await capture(page, `gallery-${width}`, true);
    await page.goto("/visual-parity-missing-page");
    await capture(page, `not-found-${width}`, true);
  });
}

for (const width of [575, 576, 577, 639, 640, 641, 767, 769, 1023, 1025]) {
  test(`breakpoint at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await capture(page, `breakpoint-home-${width}`, true);
    if (width >= 575 && width <= 577) {
      await page.goto("/gallery");
      await capture(page, `breakpoint-gallery-${width}`, true);
    }
  });
}

for (const width of [390, 1440]) {
  test(`interaction states at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    if (width === 390) {
      await page
        .getByRole("button", { name: "Open navigation", exact: true })
        .click();
      await capture(page, `mobile-menu-${width}`);
      await page
        .getByRole("button", { name: "Close navigation", exact: true })
        .click();
    }
    await page.getByText("Intermediate", { exact: true }).click();
    await page.locator("#orientations").scrollIntoViewIfNeeded();
    await capture(page, `selected-orientation-${width}`);
    await page
      .getByRole("button", {
        name: "Do you do nutrition coaching too?",
        exact: true,
      })
      .click();
    await page.locator("#faq").scrollIntoViewIfNeeded();
    await capture(page, `faq-expanded-${width}`);
    const booking = page.getByRole("form", {
      name: "Booking preview",
      exact: true,
    });
    await booking
      .getByRole("button", { name: "Preview request", exact: true })
      .click();
    await capture(page, `booking-invalid-${width}`);
    await booking
      .getByRole("textbox", { name: /your name/i })
      .fill("Visual Check");
    await booking
      .getByRole("textbox", { name: /email address/i })
      .fill("visual@example.test");
    await booking
      .getByRole("button", { name: "Preview request", exact: true })
      .click();
    await capture(page, `booking-preview-${width}`);
    const contact = page.getByRole("form", {
      name: "Contact preview",
      exact: true,
    });
    await contact
      .getByRole("button", { name: "Preview message", exact: true })
      .click();
    await capture(page, `contact-invalid-${width}`);
    await contact
      .getByRole("textbox", { name: /your email/i })
      .fill("visual@example.test");
    await contact
      .getByRole("textbox", { name: /your message/i })
      .fill("A local visual preview.");
    await contact
      .getByRole("button", { name: "Preview message", exact: true })
      .click();
    await capture(page, `contact-preview-${width}`);
    await page
      .locator("#gallery")
      .getByRole("button", { name: /^View photo/ })
      .first()
      .click();
    await expect(page.getByRole("dialog").locator("img")).toHaveAttribute(
      "data-loaded",
      "true",
    );
    await capture(page, `lightbox-${width}`);
    await page.getByRole("button", { name: "Next photo", exact: true }).click();
    await expect(page.getByRole("dialog").locator("img")).toHaveAttribute(
      "data-loaded",
      "true",
    );
    await capture(page, `lightbox-next-${width}`);
  });
  test(`hover and keyboard focus at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await page.keyboard.press("Tab");
    await capture(page, `skip-focus-${width}`);
    await page.keyboard.press("Tab");
    await capture(page, `wordmark-focus-${width}`);
    await page
      .getByRole("region", { name: "Meet Coach Conzo" })
      .getByRole("link", { name: "Book a free call", exact: true })
      .hover();
    await ready(page);
    // Capture hovered state without moving the pointer away again.
    await page
      .getByRole("region", { name: "Meet Coach Conzo" })
      .getByRole("link", { name: "Book a free call", exact: true })
      .hover();
    await expect(page).toHaveScreenshot(`hero-hover-${width}.png`);
    const radio = page.getByRole("radio", {
      name: "Starter: Personal Training",
      exact: true,
    });
    await radio.focus();
    await page.keyboard.press("Space");
    await capture(page, `orientation-focus-${width}`);
    const faq = page.getByRole("button", {
      name: "Do you do nutrition coaching too?",
      exact: true,
    });
    await faq.hover();
    await expect(page).toHaveScreenshot(`faq-hover-${width}.png`);
    await page
      .locator("#gallery")
      .getByRole("button", { name: /^View photo/ })
      .first()
      .hover();
    await expect(page).toHaveScreenshot(`gallery-hover-${width}.png`);
  });
}
