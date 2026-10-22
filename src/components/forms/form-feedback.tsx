"use client";
import { useEffect, useRef } from "react";
import { coach } from "@/content/coach";
import type { SubmissionStatus } from "@/hooks/use-enquiry-submission";

export function FormFeedback({
  status,
  hasErrors,
  message,
  kind,
}: {
  status: SubmissionStatus;
  hasErrors: boolean;
  message?: string;
  kind: "contact" | "coaching";
}) {
  const feedbackRef = useRef<HTMLDivElement>(null);
  const isReady = status === "preview" || status === "success";
  useEffect(() => {
    if (isReady) feedbackRef.current?.focus();
  }, [isReady]);
  return (
    <>
      <div role="alert" className={"form-error-summary"}>
        {hasErrors ? (
          "Check the highlighted fields and try again."
        ) : status === "error" ? (
          <>
            {message} <a href={`mailto:${coach.email}`}>Email Coach Conzo</a>
          </>
        ) : (
          ""
        )}
      </div>
      <div
        ref={feedbackRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className={"form-feedback"}
        hidden={!isReady}
      >
        <strong>
          {status === "preview"
            ? "Preview ready."
            : kind === "coaching"
              ? "Your enquiry has been sent."
              : "Your message has been sent."}
        </strong>
        <p>
          {status === "preview"
            ? "No booking or message was sent. You can edit your details and preview again."
            : kind === "coaching"
              ? "Your session is not booked yet. Coach Conzo can follow up with you by email."
              : "Coach Conzo can follow up with you by email."}
        </p>
      </div>
    </>
  );
}
