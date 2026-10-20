import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/live",
  timeout: 30000,
  expect: { timeout: 7000 },
  workers: 2,
  use: {
    baseURL: "http://127.0.0.1:3002",
    browserName: "chromium",
    channel: process.platform === "win32" ? "chrome" : undefined,
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "npm run start -- --hostname 127.0.0.1 --port 3002",
    url: "http://127.0.0.1:3002",
    reuseExistingServer: false,
    timeout: 30000,
    env: {
      FORM_MODE: "live",
      SITE_URL: "https://tryhrd.example.test",
      VERCEL_ENV: "development",
      SMTP_USER: "",
      SMTP_APP_PASSWORD: "",
    },
  },
});
