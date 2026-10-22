"use client";
import { useState, type FormEvent } from "react";
import { Button } from "@heroui/react/button";
import { Form } from "@heroui/react/form";
import { TextField } from "@heroui/react/textfield";
import { Input } from "@heroui/react/input";
import { TextArea } from "@heroui/react/textarea";
import { Label } from "@heroui/react/label";
import { FieldError } from "@heroui/react/field-error";
import { useCoachingSelection } from "@/components/coaching/coaching-selection";
import { sessionOptions, isSessionType } from "@/content/sessions";
import { validateBookingDraft } from "@/lib/form-validation";
import { useEnquirySubmission } from "@/hooks/use-enquiry-submission";
import { FormFeedback } from "./form-feedback";
import { EnquiryHoneypot, FormNotice } from "./form-notice";
import type { BookingDraft, FormErrors } from "@/types/forms";
import { styles } from "@/components/forms/form-styles";

export function BookingForm() {
  const { sessionType, revision, onSessionChange } = useCoachingSelection();
  const [draft, setDraft] = useState<BookingDraft>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors<BookingDraft>>({});
  const submission = useEnquirySubmission(
    JSON.stringify({ ...draft, revision }),
  );
  const visibleErrors = { ...errors, ...submission.fieldErrors };
  function handleChange(field: keyof BookingDraft, value: string) {
    const next = { ...draft, [field]: value };
    setDraft(next);
    submission.reset();
    if (visibleErrors[field])
      setErrors((current) => ({
        ...current,
        [field]: validateBookingDraft(next)[field],
      }));
  }
  function handleBlur(field: keyof BookingDraft) {
    setErrors((current) => ({
      ...current,
      [field]: validateBookingDraft(draft)[field],
    }));
  }
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateBookingDraft(draft);
    setErrors(nextErrors);
    submission.reset();
    const first = Object.keys(nextErrors)[0];
    const form = event.currentTarget;
    if (first) {
      const input = form.elements.namedItem(first);
      if (input instanceof HTMLElement) input.focus();
      return;
    }
    await submission.submit({ kind: "coaching", ...draft, sessionType }, form);
  }
  return (
    <div className={styles.booking}>
      <h3 className={styles.heading}>Enquire about a session</h3>
      <Form
        validationBehavior="aria"
        onSubmit={handleSubmit}
        className={styles.form}
        aria-label="Coaching enquiry"
        aria-describedby="booking-form-notice"
        aria-busy={submission.isSubmitting}
      >
        <FormNotice id="booking-form-notice" />
        <EnquiryHoneypot id="booking-website" />
        <TextField
          name="name"
          value={draft.name}
          onChange={(value) => handleChange("name", value)}
          onBlur={() => handleBlur("name")}
          isRequired
          isReadOnly={submission.isSubmitting}
          isInvalid={Boolean(visibleErrors.name)}
          validationBehavior="aria"
        >
          <Label>Your name</Label>
          <Input
            autoComplete="name"
            placeholder="e.g. Jordan Smith"
            maxLength={120}
          />
          <FieldError>{visibleErrors.name}</FieldError>
        </TextField>
        <TextField
          name="email"
          type="email"
          value={draft.email}
          onChange={(value) => handleChange("email", value)}
          onBlur={() => handleBlur("email")}
          isRequired
          isReadOnly={submission.isSubmitting}
          isInvalid={Boolean(visibleErrors.email)}
          validationBehavior="aria"
        >
          <Label>Email address</Label>
          <Input
            autoComplete="email"
            placeholder="you@example.com"
            maxLength={254}
          />
          <FieldError>{visibleErrors.email}</FieldError>
        </TextField>
        <div className={styles.selectField}>
          <label htmlFor="booking-session">Session type</label>
          <select
            id="booking-session"
            name="sessionType"
            value={sessionType}
            disabled={submission.isSubmitting}
            aria-invalid={Boolean(visibleErrors.sessionType)}
            aria-describedby={
              visibleErrors.sessionType ? "session-type-error" : undefined
            }
            onChange={(event) => {
              if (isSessionType(event.target.value)) {
                onSessionChange(event.target.value);
                submission.reset();
              }
            }}
          >
            {sessionOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
          {visibleErrors.sessionType && (
            <p id="session-type-error" className={"form-error-summary"}>
              {visibleErrors.sessionType}
            </p>
          )}
        </div>
        <TextField
          name="message"
          value={draft.message}
          onChange={(value) => handleChange("message", value)}
          onBlur={() => handleBlur("message")}
          isReadOnly={submission.isSubmitting}
          isInvalid={Boolean(visibleErrors.message)}
          validationBehavior="aria"
        >
          <Label>
            Anything to share?{" "}
            <span className={styles.optional}>(optional)</span>
          </Label>
          <TextArea
            placeholder="Your goals, where you’re at, or anything you’d like me to know."
            rows={4}
            maxLength={2000}
          />
          <FieldError>{visibleErrors.message}</FieldError>
        </TextField>
        <Button
          type="submit"
          variant="primary"
          className={styles.submit}
          isDisabled={!submission.isHydrated || submission.isSubmitting}
        >
          {submission.isSubmitting ? "Sending…" : "Send enquiry"}
        </Button>
        <FormFeedback
          status={submission.status}
          hasErrors={Object.values(visibleErrors).some(Boolean)}
          message={submission.message}
          kind="coaching"
        />
      </Form>
    </div>
  );
}
