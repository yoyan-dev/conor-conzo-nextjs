// Marker classes preserve behavior and descendant selectors; all styles use Tailwind utilities.
export const styles = {
  booking:
    "form-booking [border:1px_solid_var(--divider)] p-[clamp(1.25rem,_3vw,_2.5rem)] rounded-[0.5rem]",
  heading: "form-heading [font-size:1.5rem] font-[800] m-[0_0_0.5rem]",
  formDescription:
    "form-formDescription [color:var(--text-muted)] [font-size:0.9375rem] m-[0_0_2rem] leading-[1.6]",
  form: [
    'form-form flex flex-col gap-5 w-full [&_>_[data-slot="text-field"]]:w-full',
    '[&_[data-slot="label"]]:[font-size:0.75rem] [&_[data-slot="label"]]:font-[700] [&_[data-slot="label"]]:uppercase',
    '[&_[data-slot="label"]]:tracking-[0.065em] [&_[data-slot="label"]]:[color:var(--text-muted)]',
    '[&_[data-slot="label"]]:mb-2 [&_[data-slot="label"]]:block [&_[data-slot="input"]]:w-full',
    '[&_[data-slot="input"]]:[border:1px_solid_var(--field-border)] [&_[data-slot="input"]]:rounded-[0.25rem]',
    '[&_[data-slot="input"]]:[background:var(--field-background)] [&_[data-slot="input"]]:[color:var(--foreground)]',
    '[&_[data-slot="input"]]:[font-size:1rem] [&_[data-slot="input"]]:p-[0.875rem_1rem]',
    '[&_[data-slot="input"]]:[box-shadow:none] [&_[data-slot="input"]]:min-h-12 [&_[data-slot="textarea"]]:w-full',
    '[&_[data-slot="textarea"]]:[border:1px_solid_var(--field-border)] [&_[data-slot="textarea"]]:rounded-[0.25rem]',
    '[&_[data-slot="textarea"]]:[background:var(--field-background)] [&_[data-slot="textarea"]]:[color:var(--foreground)]',
    '[&_[data-slot="textarea"]]:[font-size:1rem] [&_[data-slot="textarea"]]:p-[0.875rem_1rem]',
    '[&_[data-slot="textarea"]]:[box-shadow:none] [&_[data-slot="textarea"]]:resize-y',
    '[&_[data-slot="textarea"]]:leading-[1.6] [&_[data-slot="textarea"]]:min-h-28',
    '[&_[data-slot="input"]::placeholder]:[color:var(--text-muted)] [&_[data-slot="input"]::placeholder]:[opacity:1]',
    '[&_[data-slot="textarea"]::placeholder]:[color:var(--text-muted)]',
    '[&_[data-slot="textarea"]::placeholder]:[opacity:1]',
    '[&_[data-slot="text-field"][data-invalid="true"]_[data-slot="input"]]:[border-color:var(--danger)]',
    '[&_[data-slot="text-field"][data-invalid="true"]_[data-slot="textarea"]]:[border-color:var(--danger)]',
    '[&_[data-slot="field-error"]]:[font-size:0.8125rem] [&_[data-slot="field-error"]]:leading-[1.5]',
    '[&_[data-slot="field-error"]]:[color:var(--danger)] [&_.form-error-summary:empty]:hidden',
    "[&_.form-error-summary]:[color:var(--danger)] [&_.form-error-summary]:[font-size:0.875rem]",
    "[&_.form-error-summary]:leading-[1.6] [&_.form-feedback]:[border:1px_solid_var(--divider)]",
    "[&_.form-feedback]:[background:var(--surface-selected)] [&_.form-feedback]:p-5 [&_.form-feedback]:rounded-[0.25rem]",
    "[&_.form-feedback_strong]:[font-size:1rem] [&_.form-feedback_p]:[color:var(--text-muted)]",
    "[&_.form-feedback_p]:leading-[1.65] [&_.form-feedback_p]:[font-size:0.875rem] [&_.form-feedback_p]:m-[0.5rem_0_0]",
  ].join(" "),
  selectField: [
    "form-selectField [&_label]:[font-size:0.75rem] [&_label]:font-[700] [&_label]:uppercase [&_label]:tracking-[0.065em]",
    "[&_label]:[color:var(--text-muted)] [&_label]:mb-2 [&_label]:block [&_select]:w-full",
    "[&_select]:[border:1px_solid_var(--field-border)] [&_select]:rounded-[0.25rem]",
    "[&_select]:[background:var(--field-background)] [&_select]:[color:var(--foreground)] [&_select]:[font-size:1rem]",
    "[&_select]:p-[0.875rem_1rem] [&_select]:[box-shadow:none] [&_select]:min-h-12 w-full [&_select]:pr-8",
    "[&_select]:[cursor:pointer]",
  ].join(" "),
  optional: "form-optional normal-case tracking-[0] font-[450]",
  notice: [
    "form-notice [font-size:0.8125rem] [color:var(--text-muted)] leading-[1.6] m-0 p-[0.75rem_1rem]",
    "[border-left:2px_solid_var(--brand-blue)] [background:var(--surface)]",
  ].join(" "),
  submit: [
    "form-submit w-full rounded-[100px] min-h-12 [background:var(--foreground)] [color:var(--background)]",
    "[font-size:0.875rem] font-[750] px-6 [&:hover]:[background:var(--accent-hover)] [&:hover]:[color:var(--background)]",
  ].join(" "),
  honeypot:
    "form-honeypot absolute w-[1px] h-[1px] overflow-hidden [clip-path:inset(50%)] whitespace-nowrap",
} as const;
