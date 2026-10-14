export type BookingDraft = { name: string; email: string; message: string };
export type ContactDraft = { email: string; message: string };
export type FormErrors<T> = Partial<Record<keyof T, string>>;
