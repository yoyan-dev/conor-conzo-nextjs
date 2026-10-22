// Marker classes preserve behavior and descendant selectors; all styles use Tailwind utilities.
export const styles = {
  layout: [
    "faq-layout grid gap-10 [align-items:start] md:[grid-template-columns:minmax(0,_0.8fr)_minmax(0,_1.2fr)]",
    "md:gap-[clamp(2rem,_6vw,_7rem)]",
  ].join(" "),
  description:
    "faq-description [color:var(--text-muted)] leading-[1.7] max-w-[34ch] m-[1.5rem_0]",
  accordion: "faq-accordion w-full",
  item: [
    "faq-item [border-top:1px_solid_var(--divider)] [&::after]:hidden",
    "[&:last-child]:[border-bottom:1px_solid_var(--divider)]",
  ].join(" "),
  trigger: [
    "faq-trigger [font-size:1rem] font-[600] [color:var(--foreground)] p-[1.5rem_0] gap-6 min-h-18",
    "[&:hover]:[background-color:transparent]! [&:hover]:[color:var(--brand-blue)]",
    '[&[aria-expanded="true"]_.faq-indicator::after]:[transform:rotate(0)]',
  ].join(" "),
  indicator: [
    "faq-indicator relative w-6 h-6 [border:1px_solid_var(--divider)] rounded-[50%] [flex-shrink:0]",
    '[&::before]:[content:""] [&::before]:absolute [&::before]:[background:currentColor]',
    "[&::before]:top-[calc(50%_-_0.5px)] [&::before]:left-[30%] [&::before]:w-[40%] [&::before]:h-[1px]",
    '[&::after]:[content:""] [&::after]:absolute [&::after]:[background:currentColor] [&::after]:top-[calc(50%_-_0.5px)]',
    "[&::after]:left-[30%] [&::after]:w-[40%] [&::after]:h-[1px] [&::after]:[transform:rotate(90deg)]",
    "[&::after]:[transition:transform_180ms_ease-out]",
  ].join(" "),
  answer:
    "faq-answer p-[0_2rem_1.75rem_0] [color:var(--text-muted)] [font-size:1rem] leading-[1.75] max-w-[65ch]",
} as const;
