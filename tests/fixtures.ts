import { test as base, expect } from "@playwright/test";

export const test = base.extend({
  page: async ({ page }, runWithPage) => {
    await page.route("**/api/enquiries", async (route) => {
      await route.fulfill({ json: { ok: true } });
    });
    await runWithPage(page);
  },
});
export { expect };
export type { Page } from "@playwright/test";
