import "server-only";
import type { FormMode } from "@/types/forms";

export function getFormMode(): FormMode {
  return process.env.FORM_MODE === "live" &&
    process.env.VERCEL_ENV !== "preview"
    ? "live"
    : "preview";
}
