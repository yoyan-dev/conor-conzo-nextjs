// Marker classes preserve behavior and descendant selectors; all styles use Tailwind utilities.
export const styles = {
  layout: [
    "contact-layout grid gap-12 mt-12 md:[grid-template-columns:minmax(0,_1fr)_minmax(0,_1fr)]",
    "md:gap-[clamp(2rem,_6vw,_7rem)]",
  ].join(" "),
  socials: "contact-socials mt-4",
  social: [
    "contact-social flex items-center gap-5 py-6 [border-bottom:1px_solid_var(--divider)] [text-decoration:none] min-h-22",
    "[&_strong]:block [&_strong]:[font-size:1rem] [&_strong]:font-[750]",
  ].join(" "),
  icon: "contact-icon grid [place-items:center] [border:1px_solid_var(--divider)] w-11 h-11 rounded-[0.5rem] [flex-shrink:0]",
  handle:
    "contact-handle block [font-size:0.875rem] [color:var(--text-muted)] mt-[0.375rem]",
  details: [
    "contact-details grid gap-7 mt-10 [&_>_div]:grid [&_>_div]:gap-3 [&_a]:w-[fit-content] [&_a]:min-h-11",
    "[&_a]:inline-flex [&_a]:items-center [&_a]:gap-3 [&_a]:[overflow-wrap:anywhere] [&_p]:m-0",
    "[&_p]:[color:var(--text-muted)]",
  ].join(" "),
  formTitle: "contact-formTitle [font-size:1.5rem] font-[750] m-[0_0_0.75rem]",
  formIntro:
    "contact-formIntro [color:var(--text-muted)] leading-[1.65] m-[0_0_1.75rem]",
} as const;
