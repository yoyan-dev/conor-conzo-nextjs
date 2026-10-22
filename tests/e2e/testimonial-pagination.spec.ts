import { build } from "esbuild";
import AxeBuilder from "@axe-core/playwright";
import { test, expect, type Page } from "../fixtures";

let bundle: string;

test.beforeAll(async () => {
  // Mount the real component in a browser-only fixture; no extra reviews enter the site.
  const result = await build({
    stdin: {
      contents: `
        import { createRoot } from "react-dom/client";
        import { TestimonialPagination } from "./src/components/sections/testimonials/testimonial-pagination";
        const count = Number(new URLSearchParams(location.search).get("count"));
        const rows = Array.from({ length: count }, (_, index) => (
          <tr key={index}>
            <th scope="row">Review {index + 1}</th>
            <td data-label="Type">—</td>
            <td data-label="Rating">Not rated</td>
            <td data-label="Comment">Test-only pagination row {index + 1}.</td>
          </tr>
        ));
        createRoot(document.getElementById("root")).render(<TestimonialPagination rows={rows} />);
      `,
      resolveDir: process.cwd(),
      loader: "tsx",
      sourcefile: "testimonial-pagination-harness.tsx",
    },
    bundle: true,
    write: false,
    platform: "browser",
    format: "iife",
    minify: true,
    define: { "process.env.NODE_ENV": '"production"' },
    logLevel: "silent",
  });
  bundle = result.outputFiles[0].text;
});

async function mountPagination(page: Page, count: number) {
  await page.goto("/");
  const css = await page
    .locator('link[rel="stylesheet"]')
    .evaluateAll((links) =>
      links.map((link) => (link as HTMLLinkElement).href),
    );
  const bodyClass = (await page.locator("body").getAttribute("class")) ?? "";
  await page.route("**/__test/testimonial-pagination.js", (route) =>
    route.fulfill({ contentType: "application/javascript", body: bundle }),
  );
  await page.route("**/__test/testimonial-pagination?count=*", (route) =>
    route.fulfill({
      contentType: "text/html",
      body: `<!doctype html><html lang="en-GB" data-theme="dark"><head>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Testimonial pagination test</title>
      ${css.map((href) => `<link rel="stylesheet" href="${href}">`).join("")}
      </head><body class="${bodyClass}"><main style="max-width:76rem;margin:0 auto;padding:1.25rem">
      <h1>Testimonial pagination test</h1><div id="root"></div></main>
      <script src="/__test/testimonial-pagination.js"></script></body></html>`,
    }),
  );
  await page.goto(`/__test/testimonial-pagination?count=${count}`);
  await expect(
    page.getByRole("table", { name: "Client testimonials" }),
  ).toBeVisible();
}

for (const count of [0, 1, 5]) {
  test(`pagination footer is hidden with ${count} reviews`, async ({
    page,
  }) => {
    await mountPagination(page, count);
    await expect(
      page.getByRole("navigation", { name: "Testimonial pagination" }),
    ).toHaveCount(0);
    if (count > 0) await expect(page.locator("tbody tr")).toHaveCount(count);
    else
      await expect(
        page.getByText("No client reviews have been published yet."),
      ).toBeVisible();
  });
}

test("six reviews produce a five-review page and a one-review page", async ({
  page,
}) => {
  await mountPagination(page, 6);
  const navigation = page.getByRole("navigation", {
    name: "Testimonial pagination",
  });
  const previous = navigation.getByRole("button", {
    name: "Previous",
    exact: true,
  });
  const next = navigation.getByRole("button", { name: "Next", exact: true });
  const results = page.getByRole("region", {
    name: "Client testimonial results",
  });
  await expect(page.locator("tbody tr")).toHaveCount(5);
  await expect(navigation.getByRole("status")).toHaveText(
    "Showing 1–5 of 6 reviews · Page 1 of 2",
  );
  await expect(previous).toBeDisabled();
  await expect(next).toBeEnabled();
  await expect(
    page.getByRole("rowheader", { name: "Review 6", exact: true }),
  ).toHaveCount(0);
  await next.click();
  await expect(page.locator("tbody tr")).toHaveCount(1);
  await expect(
    page.getByRole("rowheader", { name: "Review 6", exact: true }),
  ).toBeVisible();
  await expect(navigation.getByRole("status")).toHaveText(
    "Showing 6–6 of 6 reviews · Page 2 of 2",
  );
  await expect(next).toBeDisabled();
  await expect(previous).toBeEnabled();
  await expect(results).toBeFocused();
  await previous.focus();
  await previous.press("Enter");
  await expect(page.locator("tbody tr")).toHaveCount(5);
  await expect(
    page.getByRole("rowheader", { name: "Review 1", exact: true }),
  ).toBeVisible();
  await expect(previous).toBeDisabled();
  await expect(results).toBeFocused();
});

for (const width of [390, 1440]) {
  test(`three-page navigation stays accessible at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await mountPagination(page, 11);
    const navigation = page.getByRole("navigation", {
      name: "Testimonial pagination",
    });
    const previous = navigation.getByRole("button", {
      name: "Previous",
      exact: true,
    });
    const next = navigation.getByRole("button", { name: "Next", exact: true });
    await next.focus();
    await next.press("Space");
    await expect(navigation.getByRole("status")).toHaveText(
      "Showing 6–10 of 11 reviews · Page 2 of 3",
    );
    await expect(page.locator("tbody tr")).toHaveCount(5);
    await expect(
      page.getByRole("rowheader", { name: "Review 6", exact: true }),
    ).toBeVisible();
    await expect(previous).toBeEnabled();
    await expect(next).toBeEnabled();
    await next.click();
    await expect(navigation.getByRole("status")).toHaveText(
      "Showing 11–11 of 11 reviews · Page 3 of 3",
    );
    await expect(page.locator("tbody tr")).toHaveCount(1);
    await expect(
      page.getByRole("rowheader", { name: "Review 11", exact: true }),
    ).toBeVisible();
    await expect(next).toBeDisabled();
    await expect(
      page.getByRole("region", { name: "Client testimonial results" }),
    ).toBeFocused();
    const audit = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(audit.violations).toEqual([]);
    await previous.click();
    await expect(page.locator("tbody tr")).toHaveCount(5);
    await previous.click();
    await expect(navigation.getByRole("status")).toHaveText(
      "Showing 1–5 of 11 reviews · Page 1 of 3",
    );
    await expect(previous).toBeDisabled();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
    ).toBe(false);
    expect(errors).toEqual([]);
  });
}

test("published reviews remain server-rendered without JavaScript", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  try {
    const page = await context.newPage();
    await page.goto(baseURL!);
    await expect(page.locator("#reviews tbody tr")).toHaveCount(5);
    await expect(
      page.getByRole("rowheader", { name: "Giorgio Basile", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("navigation", { name: "Testimonial pagination" }),
    ).toHaveCount(0);
  } finally {
    await context.close();
  }
});
