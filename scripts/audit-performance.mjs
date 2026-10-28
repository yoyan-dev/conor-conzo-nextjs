import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const url = new URL(process.argv[2] ?? "http://localhost:3000");
if (!["http:", "https:"].includes(url.protocol)) {
  throw new Error("Provide an HTTP or HTTPS page URL.");
}
const mode = process.argv[3] ?? "mobile";
if (!["mobile", "desktop"].includes(mode)) {
  throw new Error("Choose mobile or desktop.");
}
const outputDirectory = resolve(".reports");
await mkdir(outputDirectory, { recursive: true });
const pageName =
  url.pathname.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "") || "home";
const cli = fileURLToPath(
  new URL("../cli/index.js", import.meta.resolve("lighthouse")),
);
const args = [
  cli,
  url.href,
  "--output=html",
  "--output=json",
  `--output-path=${resolve(outputDirectory, `${pageName}-${mode}`)}`,
  "--chrome-flags=--headless --disable-gpu",
  "--quiet",
];
if (mode === "desktop") args.push("--preset=desktop");
// Lighthouse discovers local Chrome; CHROME_PATH may specify a local installation.
const child = spawn(process.execPath, args, { stdio: "inherit" });
child.on("error", (error) => {
  console.error(error.message);
  process.exitCode = 1;
});
child.on("exit", (code) => {
  process.exitCode = code ?? 1;
});
