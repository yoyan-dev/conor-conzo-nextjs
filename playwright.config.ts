import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  testIgnore: ["**/unit/**", "**/visual/**"],
  timeout: 30000,
  expect: { timeout: 7000 },
  fullyParallel: true,
  workers: 2,
  retries: process.env.CI ? 1 : 0,
  reporter: [
    ["list"],
    ["json", { outputFile: "test-results/playwright-results.json" }],
  ],
  use: {
    baseURL: "http://127.0.0.1:3001",
    browserName: "chromium",
    channel: process.platform === "win32" ? "chrome" : undefined,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  webServer: {
    command: "npm run start -- --hostname 127.0.0.1 --port 3001",
    url: "http://127.0.0.1:3001",
    reuseExistingServer: false,
    env: {
      SITE_URL: "https://tryhrd.example.test",
      SMTP_USER: "",
      SMTP_APP_PASSWORD: "",
    },
    timeout: 30000,
  },
});
