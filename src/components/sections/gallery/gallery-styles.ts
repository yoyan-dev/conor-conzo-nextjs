// Marker classes preserve behavior and descendant selectors; all styles use Tailwind utilities.
export const styles = {
  grid: [
    "gallery-grid grid gap-4 m-[2.5rem_0_0] p-0 list-none min-[36rem]:[grid-template-columns:repeat(2,_minmax(0,_1fr))]",
    "md:[grid-template-columns:repeat(3,_minmax(0,_1fr))]",
  ].join(" "),
  frame: [
    "gallery-frame relative min-w-0 [aspect-ratio:3_/_4] overflow-hidden [border:1px_solid_var(--divider)]",
    "rounded-[0.5rem] [background:var(--surface-selected)]",
  ].join(" "),
  image: "gallery-image object-cover [transition:transform_220ms_ease-out]",
  trigger: [
    "gallery-trigger absolute inset-0 block w-full h-full min-w-0 p-0 overflow-hidden [border:0] rounded-[inherit]",
    '[background:transparent] [cursor:zoom-in] [&[data-focus-visible="true"]]:[outline:2px_solid_var(--focus)]',
    '[&[data-focus-visible="true"]]:[outline-offset:-4px]',
    '[@media_(hover:_hover)]:[&[data-hovered="true"]_.gallery-image]:[transform:scale(1.025)]',
  ].join(" "),
  zoomHint: [
    "gallery-zoomHint absolute right-3 bottom-3 grid [place-items:center] w-9 h-9",
    "[border:1px_solid_rgb(255_255_255_/_0.3)] rounded-[50%] [background:rgb(5_6_7_/_0.8)] [color:#fff]",
    "pointer-events-none",
  ].join(" "),
  actions: "gallery-actions flex justify-center mt-8",
  backLink:
    "gallery-backLink inline-flex items-center min-h-11 ml-auto [font-size:0.875rem] font-[650] [text-decoration:none]",
  heading:
    "gallery-heading m-0 [font-size:clamp(2rem,_3.4vw,_3.25rem)] font-[850] tracking-[-0.04em] leading-[1.12]",
} as const;
