"use client";

import { useRef, useState, useSyncExternalStore } from "react";

import type {
  Enquiry,
  EnquiryFieldErrors,
  EnquiryResponse,
} from "@/types/forms";

const subscribe = () => () => {};
const getHydrated = () => true;
const getServerHydrated = () => false;

export type SubmissionStatus = "idle" | "submitting" | "success" | "error";
type Result = {
  key: string;
  status: SubmissionStatus;
  message?: string;
  fieldErrors?: EnquiryFieldErrors;
};

export function useEnquirySubmission(draftKey: string) {
  const isHydrated = useSyncExternalStore(
    subscribe,
    getHydrated,
    getServerHydrated,
  );
  const [result, setResult] = useState<Result>({ key: "", status: "idle" });
  const pending = useRef(false);
  const generation = useRef(0);
  const isSubmitting = result.status === "submitting";
  const current =
    result.key === draftKey ? result : { status: "idle" as const };

  function reset() {
    generation.current += 1;
    if (!pending.current) setResult({ key: "", status: "idle" });
  }

  async function submit(
    enquiry: Enquiry,
    form: HTMLFormElement,
    key = draftKey,
  ) {
    if (pending.current) return;
    pending.current = true;
    const requestGeneration = generation.current;
    setResult({ key, status: "submitting" });
    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...enquiry,
          // Keep the spam-check input separate from common autofill field names.
          website: new FormData(form).get("enquiry-verification") ?? "",
        }),
      });
      const body: EnquiryResponse = await response.json();
      if (response.ok && body.ok === true) {
        setResult({ key, status: "success" });
      } else {
        const message =
          !body.ok && typeof body.message === "string"
            ? body.message
            : "We couldn't send your enquiry. Please use the email link.";
        const fieldErrors = !body.ok ? body.fieldErrors : undefined;
        setResult({ key, status: "error", message, fieldErrors });
        const first = Object.keys(fieldErrors ?? {})[0];
        const input = first ? form.elements.namedItem(first) : null;
        if (input instanceof HTMLElement) input.focus();
      }
    } catch {
      setResult({
        key,
        status: "error",
        message:
          "We couldn't confirm whether your enquiry was sent. Please check by email before submitting it again.",
      });
    } finally {
      pending.current = false;
      if (requestGeneration !== generation.current)
        setResult({ key: "", status: "idle" });
    }
  }

  return {
    isHydrated,
    isSubmitting,
    status: current.status,
    message: "message" in current ? current.message : undefined,
    fieldErrors: "fieldErrors" in current ? current.fieldErrors : undefined,
    reset,
    submit,
  };
}
