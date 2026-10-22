// Marker classes preserve behavior and descendant selectors; all styles use Tailwind utilities.
export const styles = {
  layout: [
    "booking-layout grid gap-10 [align-items:start] md:[grid-template-columns:minmax(0,_1fr)_minmax(0,_1fr)]",
    "md:gap-[clamp(2rem,_6vw,_7rem)]",
  ].join(" "),
  description:
    "booking-description [color:var(--text-muted)] leading-[1.75] max-w-[44ch] m-[1.75rem_0]",
  benefits: [
    "booking-benefits list-none p-0 grid gap-4 [color:var(--text-muted)] [font-size:0.9375rem] [&_li]:flex [&_li]:gap-3",
    "[&_li]:items-baseline [&_span]:[color:var(--brand-blue)]",
  ].join(" "),
  coachNote: [
    "booking-coachNote [border:1px_solid_var(--divider)] p-6 mt-10 max-w-120 [&_p]:[color:var(--text-muted)]",
    "[&_p]:[font-size:0.9375rem] [&_p]:leading-[1.7] [&_p]:m-[1rem_0]",
  ].join(" "),
  signature: "booking-signature font-[750] [font-size:0.875rem]",
  introduction: "",
} as const;
