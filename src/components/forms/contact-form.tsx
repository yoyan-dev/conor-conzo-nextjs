"use client";
import { useState, type FormEvent } from "react";
import { Button } from "@heroui/react/button";
import { Form } from "@heroui/react/form";
import { TextField } from "@heroui/react/textfield";
import { Input } from "@heroui/react/input";
import { TextArea } from "@heroui/react/textarea";
import { Label } from "@heroui/react/label";
import { FieldError } from "@heroui/react/field-error";
import { validateContactDraft } from "@/lib/form-validation";
import { useEnquirySubmission } from "@/hooks/use-enquiry-submission";
import { FormFeedback } from "./form-feedback";
import { EnquiryHoneypot, FormNotice } from "./form-notice";
import type { ContactDraft, FormErrors, FormMode } from "@/types/forms";
import { styles } from "@/components/forms/form-styles";

export function ContactForm({ mode = "preview" }: { mode?: FormMode }) {
  const [draft, setDraft] = useState<ContactDraft>({ email: "", message: "" });
  const [errors, setErrors] = useState<FormErrors<ContactDraft>>({});
  const submission = useEnquirySubmission(mode, JSON.stringify(draft));
  const visibleErrors = { ...errors, ...submission.fieldErrors };
  function handleChange(field: keyof ContactDraft, value: string) {
    const next = { ...draft, [field]: value };
    setDraft(next);
    submission.reset();
    if (visibleErrors[field])
      setErrors((current) => ({
        ...current,
        [field]: validateContactDraft(next)[field],
      }));
  }
  function handleBlur(field: keyof ContactDraft) {
    setErrors((current) => ({
      ...current,
      [field]: validateContactDraft(draft)[field],
    }));
  }
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateContactDraft(draft);
    setErrors(nextErrors);
    submission.reset();
    const first = Object.keys(nextErrors)[0];
    const form = event.currentTarget;
    if (first) {
      const input = form.elements.namedItem(first);
      if (input instanceof HTMLElement) input.focus();
      return;
    }
    await submission.submit({ kind: "contact", ...draft }, form);
  }
  return (
    <Form
      validationBehavior="aria"
      onSubmit={handleSubmit}
      className={styles.form}
      aria-label={mode === "preview" ? "Contact preview" : "Contact enquiry"}
      aria-describedby="contact-form-notice"
      aria-busy={submission.isSubmitting}
    >
      <FormNotice mode={mode} id="contact-form-notice" />
      <EnquiryHoneypot id="contact-website" />
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
        <Label>Your email</Label>
        <Input
          autoComplete="email"
          placeholder="you@example.com"
          maxLength={254}
        />
        <FieldError>{visibleErrors.email}</FieldError>
      </TextField>
      <TextField
        name="message"
        value={draft.message}
        onChange={(value) => handleChange("message", value)}
        onBlur={() => handleBlur("message")}
        isRequired
        isReadOnly={submission.isSubmitting}
        isInvalid={Boolean(visibleErrors.message)}
        validationBehavior="aria"
      >
        <Label>Your message</Label>
        <TextArea
          placeholder="What would you like to know?"
          rows={4}
          maxLength={2000}
        />
        <FieldError>{visibleErrors.message}</FieldError>
      </TextField>
      <Button
        type="submit"
        className={styles.submit}
        variant="primary"
        isDisabled={!submission.isHydrated || submission.isSubmitting}
      >
        {submission.isSubmitting
          ? "Sending…"
          : mode === "preview"
            ? "Preview message"
            : "Send message"}
      </Button>
      <FormFeedback
        status={submission.status}
        hasErrors={Object.values(visibleErrors).some(Boolean)}
        message={submission.message}
        kind="contact"
      />
    </Form>
  );
}
