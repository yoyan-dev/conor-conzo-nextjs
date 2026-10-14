"use client";
import { useEffect, useRef } from "react";
export function FormFeedback({
  isReady,
  hasErrors,
}: {
  isReady: boolean;
  hasErrors: boolean;
}) {
  const feedbackRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (isReady) feedbackRef.current?.focus();
  }, [isReady]);
  return (
    <>
      <div role="alert" className="form-error-summary">
        {hasErrors ? "Check the highlighted fields and try again." : ""}
      </div>
      <div
        ref={feedbackRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className="form-feedback"
        hidden={!isReady}
      >
        <strong>Preview ready.</strong>
        <p>
          No booking or message was sent. You can edit your details and preview
          again.
        </p>
      </div>
    </>
  );
}
