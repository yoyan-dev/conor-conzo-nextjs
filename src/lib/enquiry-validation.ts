import { isSessionType } from "@/content/sessions";
import {
  validateBookingDraft,
  validateContactDraft,
} from "@/lib/form-validation";
import type { Enquiry, EnquiryFieldErrors } from "@/types/forms";

type ParseResult =
  { enquiry: Enquiry } | { message: string; fieldErrors?: EnquiryFieldErrors };

export function parseEnquiry(input: unknown): ParseResult {
  const invalid = { message: "Check your details and try again." };
  if (!input || typeof input !== "object" || Array.isArray(input))
    return invalid;
  const value = input as Record<string, unknown>;
  if (value.kind !== "contact" && value.kind !== "coaching") return invalid;
  const keys =
    value.kind === "contact"
      ? ["kind", "email", "message", "website"]
      : ["kind", "name", "email", "message", "sessionType", "website"];
  if (Object.keys(value).some((key) => !keys.includes(key))) return invalid;
  if (
    value.website !== undefined &&
    (typeof value.website !== "string" || value.website !== "")
  )
    return invalid;
  if (typeof value.email !== "string" || typeof value.message !== "string")
    return invalid;

  if (value.kind === "contact") {
    const draft = { email: value.email, message: value.message };
    const fieldErrors = validateContactDraft(draft);
    if (Object.keys(fieldErrors).length) return { ...invalid, fieldErrors };
    return {
      enquiry: {
        kind: "contact",
        email: draft.email.trim(),
        message: draft.message.trim(),
      },
    };
  }
  if (typeof value.name !== "string") return invalid;
  const draft = {
    name: value.name,
    email: value.email,
    message: value.message,
  };
  const fieldErrors: EnquiryFieldErrors = validateBookingDraft(draft);
  const sessionType =
    typeof value.sessionType === "string" && isSessionType(value.sessionType)
      ? value.sessionType
      : undefined;
  if (!sessionType) fieldErrors.sessionType = "Choose a session type.";
  if (Object.keys(fieldErrors).length || !sessionType)
    return { ...invalid, fieldErrors };
  return {
    enquiry: {
      kind: "coaching",
      name: draft.name.trim(),
      email: draft.email.trim(),
      message: draft.message.trim(),
      sessionType,
    },
  };
}
