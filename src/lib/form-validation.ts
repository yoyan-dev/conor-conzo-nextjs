import type { BookingDraft, ContactDraft, FormErrors } from "@/types/forms";
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function emailError(value: string) {
  if (!value.trim()) return "Enter your email address.";
  if (!emailPattern.test(value.trim()) || /[<>()\[\],;:\x22\\]/.test(value))
    return "Enter a valid email address.";
  if (value.length > 254) return "Use an email address under 255 characters.";
}
export function validateBookingDraft(
  draft: BookingDraft,
): FormErrors<BookingDraft> {
  const errors: FormErrors<BookingDraft> = {};
  if (!draft.name.trim()) errors.name = "Enter your name.";
  else if (draft.name.length > 120)
    errors.name = "Keep your name under 121 characters.";
  const email = emailError(draft.email);
  if (email) errors.email = email;
  if (draft.message.length > 2000)
    errors.message = "Keep your message under 2,001 characters.";
  return errors;
}
export function validateContactDraft(
  draft: ContactDraft,
): FormErrors<ContactDraft> {
  const errors: FormErrors<ContactDraft> = {};
  const email = emailError(draft.email);
  if (email) errors.email = email;
  if (!draft.message.trim()) errors.message = "Write a short message.";
  else if (draft.message.length > 2000)
    errors.message = "Keep your message under 2,001 characters.";
  return errors;
}
