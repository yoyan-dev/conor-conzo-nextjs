// Marker classes preserve behavior and descendant selectors; all styles use Tailwind utilities.
export const sharedStyles = {
  "page-container": [
    "page-container w-[min(calc(100%_-_2.5rem),_var(--content-width))] mx-auto",
    "md:w-[min(calc(100%_-_4rem),_var(--content-width))] lg:w-[min(calc(100%_-_6rem),_var(--content-width))]",
  ].join(" "),
  section: "section py-[var(--section-space)]",
  "surface-section": "surface-section [background:var(--surface)]",
  "section-heading": [
    "section-heading [&_h2]:[font-size:clamp(2rem,_3.4vw,_3.25rem)] [&_h2]:font-[850] [&_h2]:tracking-[-0.04em]",
    "[&_h2]:leading-[1.12] [&_h2]:m-0 [&_h2]:text-balance",
  ].join(" "),
  eyebrow:
    "eyebrow uppercase [font-size:0.75rem] tracking-[0.1em] font-[650] [color:var(--text-muted)] m-[0_0_1.5rem] block",
  "muted-heading": "muted-heading [color:var(--text-muted)]",
  "section-description":
    "section-description [color:var(--text-muted)] leading-[1.7] max-w-[65ch] m-[1.25rem_0_0]",
  microcopy:
    "microcopy [font-size:0.8125rem] [color:var(--text-muted)] leading-[1.6]",
  "action-link": [
    "action-link inline-flex items-center justify-center gap-3 min-h-12 p-[0.75rem_1.75rem] rounded-[100px]",
    "[border:1px_solid_transparent] [font-size:0.875rem] font-[750] [text-decoration:none]",
    "[transition:background-color_160ms_ease-out,_color_160ms_ease-out,_border-color_160ms_ease-out]",
  ].join(" "),
  "action-link--primary": [
    "action-link--primary [background:var(--foreground)] [color:var(--background)]",
    "[&:hover]:[background:var(--accent-hover)] [&:hover]:[color:var(--background)]",
  ].join(" "),
  "action-link--secondary": [
    "action-link--secondary [&.action-link]:[border-color:oklch(0.52_0.005_260)] [color:var(--foreground)]",
    "[&:hover]:[border-color:var(--foreground)] [&:hover]:[color:var(--foreground)]",
    "[&:hover]:[background:var(--surface-selected)]",
  ].join(" "),
  "action-link--text": [
    "action-link--text [&.action-link]:[justify-content:start] [&.action-link]:p-[0.5rem_0] [&.action-link]:rounded-[0]",
    "[&.action-link]:[color:var(--foreground)] [&.action-link]:[font-size:0.8125rem]",
    "[&.action-link:hover]:[color:var(--brand-blue-text)]",
  ].join(" "),
  "service-action": ["service-action text-left", "leading-[1.5]"].join(" "),
  "rating-stars":
    "rating-stars [color:var(--foreground)] tracking-[0.125em] [font-size:1rem]",
  "rating-star-empty": "rating-star-empty [color:var(--divider)]",
  "skip-link": [
    "skip-link fixed top-3 left-3 [transform:translateY(-200%)] [background:var(--foreground)] [color:var(--background)]",
    "p-[0.75rem_1.25rem] [z-index:calc(var(--z-header)_+_1)] [&:focus]:[transform:translateY(0)]",
  ].join(" "),
  "not-found": [
    "not-found min-h-[80svh] flex flex-col justify-center [align-items:start] gap-6 [&_h1]:[font-size:clamp(2.5rem,_5vw,_4rem)]",
    "[&_h1]:font-[850] [&_h1]:m-0",
  ].join(" "),
} as const;
