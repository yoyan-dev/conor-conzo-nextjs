// Marker classes preserve behavior and descendant selectors; all styles use Tailwind utilities.
export const styles = {
  intro: [
    "services-intro grid gap-6 mb-12 [&_>_p]:max-w-[40ch] [&_>_p]:[align-self:end] [&_>_p]:[color:var(--text-muted)]",
    "[&_>_p]:leading-[1.7] [&_>_p]:m-0 lg:[grid-template-columns:1.5fr_1fr] lg:[align-items:end] lg:gap-28 lg:mb-16",
  ].join(" "),
  services: [
    "services-services grid sm:[grid-template-columns:repeat(2,_minmax(0,_1fr))]",
    "lg:[grid-template-columns:repeat(4,_minmax(0,_1fr))]",
  ].join(" "),
  service: [
    "services-service py-7 [border-top:1px_solid_var(--divider)] flex flex-col min-w-0 [&_h3]:[font-size:1.125rem]",
    "[&_h3]:leading-[1.3] [&_h3]:font-[800] [&_h3]:m-[0_0_1rem] [&_>_p]:[color:var(--text-muted)]",
    "[&_>_p]:[font-size:1rem] [&_>_p]:leading-[1.65] [&_>_p]:m-[0_0_1.75rem] [&_a]:mt-auto sm:px-6",
    "sm:max-lg:[&:nth-child(odd)]:pl-0 sm:[&:nth-child(even)]:[border-left:1px_solid_var(--divider)] sm:max-lg:[&:nth-child(even)]:pr-0",
    "lg:p-[1rem_1.75rem] lg:[border-top:0] lg:px-7 lg:[&:first-child]:pl-0 lg:[&:last-child]:pr-0",
    "lg:[&_+_.services-service]:[border-left:1px_solid_var(--divider)]",
  ].join(" "),
  label: [
    "services-label flex justify-between [color:var(--text-muted)] [font-size:0.75rem] uppercase tracking-[0.08em] mb-4",
    "[&_span:last-child]:[color:var(--text-muted)] [&_span:last-child]:font-[800]",
  ].join(" "),
} as const;
