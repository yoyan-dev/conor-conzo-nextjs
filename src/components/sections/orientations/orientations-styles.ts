// Marker classes preserve behavior and descendant selectors; all styles use Tailwind utilities.
export const styles = {
  options:
    "orientations-options grid gap-4 mt-10 md:[grid-template-columns:repeat(3,_minmax(0,_1fr))] md:gap-4",
  option: [
    "orientations-option relative w-full [background:transparent] [border:1px_solid_var(--divider)] rounded-[0.5rem]",
    "[transition:background-color_180ms_ease-out,_border-color_180ms_ease-out]",
    '[&[data-selected="true"]]:[background:var(--accent-soft)] [&[data-selected="true"]]:[border-color:var(--brand-blue)]',
    '[&[data-selected="true"]_.orientations-selection]:[color:var(--foreground)]',
    '[&[data-focus-visible="true"]]:[outline:2px_solid_var(--focus)] [&[data-focus-visible="true"]]:[outline-offset:-4px]',
    "[@media_(hover:_hover)]:[&:hover]:[background:var(--surface-selected)]",
    '[&[data-selected="true"]_.orientations-control]:[border-color:var(--brand-blue)]',
    '[&[data-selected="true"]_.orientations-control]:[background:var(--brand-blue)]',
  ].join(" "),
  optionContent: [
    "orientations-optionContent flex flex-col items-stretch w-full h-full gap-0 p-7 rounded-[0.5rem] text-left",
    'whitespace-normal [&[data-focus-visible="true"]]:[outline:2px_solid_var(--focus)]',
    '[&[data-focus-visible="true"]]:[outline-offset:-4px] md:p-7',
  ].join(" "),
  optionTop: [
    "orientations-optionTop flex items-center justify-between mb-4 [&_.orientations-control]:hidden",
    "[&_.orientations-control]:w-4 [&_.orientations-control]:h-4 [&_.eyebrow]:mb-0",
    "[&_.orientations-control]:[border:1px_solid_oklch(0.56_0.005_260)]",
    "[&_.orientations-control]:[background:transparent]",
  ].join(" "),
  control: "orientations-control",
  title: "orientations-title [font-size:1.25rem] leading-[1.3] font-[800] mb-2",
  duration:
    "orientations-duration [color:var(--text-muted)] [font-size:0.875rem] mb-6 min-h-[1.5em]",
  description:
    "orientations-description [color:var(--text-muted)] [font-size:1rem] leading-[1.65] mb-6",
  selection: [
    "orientations-selection [font-size:0.8125rem] [color:var(--text-muted)] mt-auto flex items-center justify-between",
    "pt-4 [border-top:1px_solid_var(--divider)] font-[700]",
  ].join(" "),
  action: "orientations-action text-center mt-8 [&_>_p]:mt-4",
  imageFrame: [
    "orientations-imageFrame relative block [flex-shrink:0] w-full [aspect-ratio:4_/_3] overflow-hidden",
    "rounded-[0.375rem] [background:var(--surface-selected)] mb-6",
  ].join(" "),
  image: "orientations-image object-cover",
} as const;
