// Marker classes preserve behavior and descendant selectors; all styles use Tailwind utilities.
export const styles = {
  backdrop: [
    "gallery-lightbox-backdrop [z-index:calc(var(--z-header)_+_20)] p-4 [background:rgb(0_0_0_/_0.94)]",
    "[&[data-entering]]:[animation:backdrop-in_180ms_ease-out_both]",
    "[&[data-exiting]]:[animation:backdrop-out_160ms_ease-in_both] motion-reduce:[animation:none]!",
  ].join(" "),
  container: [
    "gallery-lightbox-container w-full max-w-304 h-auto max-h-[calc(100dvh_-_2rem)] p-0 [flex:initial]",
    "[&[data-entering]]:[animation:lightbox-in_220ms_cubic-bezier(0.22,_1,_0.36,_1)_both]",
    "[&[data-exiting]]:[animation:lightbox-out_160ms_ease-in_both] motion-reduce:[animation:none]!",
  ].join(" "),
  dialog: [
    "gallery-lightbox-dialog grid [grid-template-rows:auto_minmax(0,_1fr)_auto] gap-3 w-full max-w-none",
    "h-[min(52rem,_calc(100dvh_-_2rem))] max-h-full p-0 overflow-visible [background:transparent]",
    "[color:var(--foreground)] [box-shadow:none]",
  ].join(" "),
  toolbar: "gallery-lightbox-toolbar flex items-center justify-between gap-4",
  title:
    "gallery-lightbox-title m-0 [font-size:0.75rem] font-[700] tracking-[0.1em] uppercase",
  control: [
    "gallery-lightbox-control static inline-flex items-center justify-center [flex-shrink:0] w-11 h-11 min-w-11 p-0",
    "[border:1px_solid_rgb(255_255_255_/_0.3)] rounded-[50%] [background:rgb(255_255_255_/_0.08)] [color:#fff]",
    "[&:hover]:[background:rgb(255_255_255_/_0.16)]",
  ].join(" "),
  figure:
    "gallery-lightbox-figure grid [grid-template-rows:minmax(0,_1fr)_auto] gap-3 min-h-0 m-0",
  imageStage: "gallery-lightbox-imageStage relative min-h-0 w-full",
  lightboxImage: [
    'gallery-lightbox-lightboxImage object-contain [opacity:0] [&[data-loaded="true"]]:[opacity:1]',
    '[&[data-loaded="true"]]:[animation:photo-in_220ms_ease-out_both] motion-reduce:[animation:none]!',
  ].join(" "),
  loading:
    "gallery-lightbox-loading absolute inset-0 grid [place-items:center] m-0 [color:var(--text-muted)] text-center",
  caption: [
    "gallery-lightbox-caption max-w-[70ch] mx-auto [color:var(--text-muted)] [font-size:0.875rem] leading-[1.5]",
    "text-center",
  ].join(" "),
  controls:
    "gallery-lightbox-controls flex items-center justify-between gap-4 w-[min(100%,_24rem)] mx-auto",
  counter: "gallery-lightbox-counter m-0 [font-size:0.875rem] tabular-nums",
} as const;
