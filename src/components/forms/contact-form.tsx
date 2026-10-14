"use client";
import { useState, type FormEvent } from "react";
import { Button } from "@heroui/react/button";
import { Form } from "@heroui/react/form";
import { TextField } from "@heroui/react/textfield";
import { Input } from "@heroui/react/input";
import { TextArea } from "@heroui/react/textarea";
import { Label } from "@heroui/react/label";
import { FieldError } from "@heroui/react/field-error";
import { FormFeedback } from "@/components/forms/form-feedback";
import { validateContactDraft } from "@/lib/form-validation";
import type { ContactDraft, FormErrors } from "@/types/forms";
import styles from "./forms.module.css";
export function ContactForm() {
  const [draft, setDraft] = useState<ContactDraft>({ email: "", message: "" });
  const [errors, setErrors] = useState<FormErrors<ContactDraft>>({});
  const [isReady, setIsReady] = useState(false);
  function handleChange(field: keyof ContactDraft, value: string) {
    const next = { ...draft, [field]: value };
    setDraft(next);
    setIsReady(false);
    if (errors[field])
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
  function handlePreviewSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateContactDraft(draft);
    setErrors(nextErrors);
    setIsReady(false);
    const first = Object.keys(nextErrors)[0];
    if (first) {
      event.currentTarget
        .querySelector<HTMLElement>(`[name="${first}"]`)
        ?.focus();
      return;
    }
    setIsReady(true);
  }
  return (
    <Form
      validationBehavior="aria"
      onSubmit={handlePreviewSubmit}
      className={styles.form}
      aria-label="Contact preview"
    >
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
        <Label>Your email</Label>
        <Input
          autoComplete="email"
          placeholder="you@example.com"
          maxLength={254}
        />
        <FieldError>{errors.email}</FieldError>
      </TextField>
      <TextField
        name="message"
        value={draft.message}
        onChange={(value) => handleChange("message", value)}
        onBlur={() => handleBlur("message")}
        isRequired
        isInvalid={Boolean(errors.message)}
        validationBehavior="aria"
      >
        <Label>Your message</Label>
        <TextArea
          placeholder="What would you like to know?"
          rows={4}
          maxLength={2000}
        />
        <FieldError>{errors.message}</FieldError>
      </TextField>
      <p className={styles.previewNotice}>
        UI preview only. No message will be sent.
      </p>
      <Button type="submit" className={styles.submit} variant="primary">
        Preview message
      </Button>
      <FormFeedback
        isReady={isReady}
        hasErrors={Object.values(errors).some(Boolean)}
      />
    </Form>
  );
}
