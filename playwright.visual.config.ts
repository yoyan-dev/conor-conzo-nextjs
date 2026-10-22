import { defineConfig } from "@playwright/test";
import base from "./playwright.config";

export default defineConfig(base, {
  testDir: "./tests/visual",
  testIgnore: [],
  workers: 2,
  timeout: 180000,
  expect: {
    timeout: 30000,
    toHaveScreenshot: {
      threshold: 0,
      maxDiffPixels: 0,
      animations: "disabled",
      caret: "hide",
    },
  },
  snapshotPathTemplate: "{testDir}/snapshots/{arg}{ext}",
  use: {
    reducedMotion: "reduce",
    launchOptions: { args: ["--disable-gpu", "--disable-skia-runtime-opts"] },
  },
});
