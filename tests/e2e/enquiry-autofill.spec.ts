import { test, expect } from "../fixtures";
import { parseEnquiry } from "../../src/lib/enquiry-validation";

for (const kind of ["contact", "coaching"] as const) {
  test(
    kind + " accepts autofilled customer details without change events",
    async ({ page }) => {
      const submitted: Record<string, unknown>[] = [];
      await page.route("**/api/enquiries", async (route) => {
        const payload = route.request().postDataJSON();
        submitted.push(payload);
        const parsed = parseEnquiry(payload);
        await route.fulfill({
          status: "enquiry" in parsed ? 200 : 400,
          json: "enquiry" in parsed ? { ok: true } : { ok: false, ...parsed },
        });
      });
      await page.goto("/");
      const form = page.getByRole("form", {
        name: kind === "contact" ? "Contact enquiry" : "Coaching enquiry",
        exact: true,
      });
      await expect(form).toHaveAttribute("autocomplete", "on");
      await expect(form.locator('input[name="email"]')).toHaveAttribute(
        "autocomplete",
        "email",
      );
      if (kind === "coaching") {
        await expect(form.locator('input[name="name"]')).toHaveAttribute(
          "autocomplete",
          "name",
        );
      }
      await form
        .locator('textarea[name="message"]')
        .fill("A coaching question.");
      // Some autofill tools set DOM values without notifying React.
      await form.evaluate((element) => {
        const email = element.querySelector<HTMLInputElement>(
          'input[name="email"]',
        );
        if (!email) throw new Error("Missing email input");
        email.value = "autofilled@example.test";
        const name =
          element.querySelector<HTMLInputElement>('input[name="name"]');
        if (name) name.value = "Autofilled Customer";
      });
      const submit = form.getByRole("button", {
        name: kind === "contact" ? "Send message" : "Send enquiry",
        exact: true,
      });
      await submit.click();
      await expect(form.getByRole("status")).toBeVisible();
      expect(submitted).toHaveLength(1);
      expect(submitted[0]).toMatchObject({
        kind,
        email: "autofilled@example.test",
        message: "A coaching question.",
        website: "",
        ...(kind === "coaching"
          ? { name: "Autofilled Customer", sessionType: "discovery-call" }
          : {}),
      });
      await form
        .locator('input[name="email"]')
        .evaluate((input: HTMLInputElement) => {
          input.value = "invalid";
        });
      await submit.click();
      await expect(
        form.getByText("Enter a valid email address.", { exact: true }),
      ).toBeVisible();
      await expect(form.getByRole("status")).toBeHidden();
      expect(submitted).toHaveLength(1);
    },
  );

  test(
    kind +
      " ignores website autofill while still rejecting a filled spam check",
    async ({ page }) => {
      let deliveries = 0;
      await page.route("**/api/enquiries", async (route) => {
        const parsed = parseEnquiry(route.request().postDataJSON());
        if ("enquiry" in parsed) {
          deliveries++;
          await route.fulfill({ json: { ok: true } });
        } else {
          await route.fulfill({ status: 400, json: { ok: false, ...parsed } });
        }
      });
      await page.goto("/");
      const form = page.getByRole("form", {
        name: kind === "contact" ? "Contact enquiry" : "Coaching enquiry",
        exact: true,
      });
      await form.locator('input[name="email"]').fill("visitor@example.test");
      if (kind === "coaching") {
        await form.locator('input[name="name"]').fill("Jordan");
      }
      await form
        .locator('textarea[name="message"]')
        .fill("A coaching question.");
      // Simulate an extension adding and autofilling a conventional website field.
      await form.evaluate((element) => {
        const input = document.createElement("input");
        input.name = "website";
        input.type = "hidden";
        input.value = "https://autofill.example.test";
        element.append(input);
      });
      const check = form.locator('input[name="enquiry-verification"]');
      await expect(check).toHaveValue("");
      await expect(check).toHaveAttribute("autocomplete", "off");
      const submit = form.getByRole("button", {
        name: kind === "contact" ? "Send message" : "Send enquiry",
        exact: true,
      });
      await submit.click();
      await expect(form.getByRole("status")).toContainText(
        kind === "contact"
          ? "Your message has been sent."
          : "Your enquiry has been sent.",
      );
      expect(deliveries).toBe(1);

      await form
        .locator('textarea[name="message"]')
        .fill("Another coaching question.");
      await check.evaluate((input: HTMLInputElement) => {
        input.value = "spam";
      });
      await submit.click();
      await expect(form.getByRole("alert")).toContainText(
        "Check your details and try again.",
      );
      await expect(form.getByRole("status")).toBeHidden();
      expect(deliveries).toBe(1);
    },
  );
}
