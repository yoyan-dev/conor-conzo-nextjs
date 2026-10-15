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
import type { BookingDraft, FormErrors } from "@/types/forms";
import styles from "./forms.module.css";
export function BookingForm() {
  const { sessionType, revision, onSessionChange } = useCoachingSelection();
  const [draft, setDraft] = useState<BookingDraft>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors<BookingDraft>>({});
  const [previewedRevision, setPreviewedRevision] = useState<number | null>(
    null,
  );
  const isReady = previewedRevision === revision;
  function handleChange(field: keyof BookingDraft, value: string) {
    const next = { ...draft, [field]: value };
    setDraft(next);
    setPreviewedRevision(null);
    if (errors[field])
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
  function handlePreviewSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateBookingDraft(draft);
    setErrors(nextErrors);
    setPreviewedRevision(null);
    const first = Object.keys(nextErrors)[0];
    if (first) {
      event.currentTarget
        .querySelector<HTMLElement>(`[name="${first}"]`)
        ?.focus();
      return;
    }
    setPreviewedRevision(revision);
  }
  return (
    <div className={styles.booking}>
      <h3 className={styles.heading}>Schedule your session</h3>
      <Form
        validationBehavior="aria"
        onSubmit={handlePreviewSubmit}
        className={styles.form}
        aria-label="Booking preview"
        aria-describedby="booking-preview-notice"
      >
        <TextField
          name="name"
          value={draft.name}
          onChange={(value) => handleChange("name", value)}
          onBlur={() => handleBlur("name")}
          isRequired
          isInvalid={Boolean(errors.name)}
          validationBehavior="aria"
        >
          <Label>Your name</Label>
          <Input
            autoComplete="name"
            placeholder="e.g. Jordan Smith"
            maxLength={120}
          />
          <FieldError>{errors.name}</FieldError>
        </TextField>
        <TextField
          name="email"
          type="email"
          value={draft.email}
          onChange={(value) => handleChange("email", value)}
          onBlur={() => handleBlur("email")}
          isRequired
          isInvalid={Boolean(errors.email)}
          validationBehavior="aria"
        >
          <Label>Email address</Label>
          <Input
            autoComplete="email"
            placeholder="you@example.com"
            maxLength={254}
          />
          <FieldError>{errors.email}</FieldError>
        </TextField>
        <div className={styles.selectField}>
          <label htmlFor="booking-session">Session type</label>
          <select
            id="booking-session"
            name="sessionType"
            value={sessionType}
            onChange={(event) => {
              if (isSessionType(event.target.value)) {
                onSessionChange(event.target.value);
                setPreviewedRevision(null);
              }
            }}
          >
            {sessionOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <TextField
          name="message"
          value={draft.message}
          onChange={(value) => handleChange("message", value)}
          isInvalid={Boolean(errors.message)}
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
          <FieldError>{errors.message}</FieldError>
        </TextField>
        <Button type="submit" variant="primary" className={styles.submit}>
          Preview request
        </Button>
      </Form>
    </div>
  );
}
