import type { SessionType } from "@/types/coaching";

export type FormMode = "preview" | "live";
export type BookingDraft = { name: string; email: string; message: string };
export type ContactDraft = { email: string; message: string };
export type FormErrors<T> = Partial<Record<keyof T, string>>;
export type EnquiryField = "name" | "email" | "message" | "sessionType";
export type EnquiryFieldErrors = Partial<Record<EnquiryField, string>>;
export type Enquiry =
  | ({ kind: "contact" } & ContactDraft)
  | ({ kind: "coaching"; sessionType: SessionType } & BookingDraft);
export type EnquiryResponse =
  | { ok: true }
  | { ok: false; message: string; fieldErrors?: EnquiryFieldErrors };
