// Marker classes preserve behavior and descendant selectors; all styles use Tailwind utilities.
export const layoutStyles = {
  "site-header": [
    "site-header sticky top-0 [background:var(--background)] [z-index:var(--z-header)]",
    "[border-bottom:1px_solid_var(--divider)]",
  ].join(" "),
  "header-inner": "header-inner min-h-18 flex items-center gap-6 lg:min-h-20",
  wordmark: [
    "wordmark [font-size:1.125rem] font-[900] tracking-[-0.035em] [text-decoration:none] whitespace-nowrap",
    "[&_span]:[color:var(--brand-blue-text)]",
  ].join(" "),
  "desktop-navigation": [
    "desktop-navigation hidden items-center gap-7 ml-auto [&_a]:[text-decoration:none] [&_a]:[font-size:0.8125rem] [&_a]:font-[650]",
    "[&_a]:min-h-11 [&_a]:inline-flex [&_a]:items-center lg:flex",
  ].join(" "),
  "header-action": [
    "header-action [&.header-action]:hidden [&.header-action]:min-h-11",
    "[&.header-action]:[font-size:0.75rem] [&.header-action]:px-5",
    "md:[&.header-action]:inline-flex md:[&.header-action]:ml-auto",
    "lg:[&.header-action]:ml-4",
  ].join(" "),
  "mobile-navigation": "mobile-navigation ml-auto md:ml-0 lg:hidden",
  "menu-toggle": [
    "menu-toggle w-11 h-11 min-w-11 [border:1px_solid_var(--divider)] rounded-[50%] [color:var(--foreground)]",
    "[background:transparent]",
  ].join(" "),
  "menu-lines": [
    "menu-lines relative block w-[1.125rem] h-3 [&_span]:absolute [&_span]:left-0 [&_span]:top-[0.15rem] [&_span]:w-full",
    "[&_span]:h-[1px] [&_span]:[background:currentColor] [&_span]:[transition:transform_160ms_ease-out]",
    "[&_span:last-child]:top-[0.6rem]",
    '[&[data-open="true"]_span:first-child]:[transform:translateY(0.225rem)_rotate(45deg)]',
    '[&[data-open="true"]_span:last-child]:[transform:translateY(-0.225rem)_rotate(-45deg)]',
  ].join(" "),
  "mobile-menu": [
    "mobile-menu absolute top-[100%] left-0 right-0 [background:var(--background)]",
    "[border-bottom:1px_solid_var(--divider)] p-[1rem_1.25rem_1.5rem] [&_a]:flex [&_a]:justify-between",
    "[&_a]:p-[1rem_0.25rem] [&_a]:[text-decoration:none] [&_a]:[border-bottom:1px_solid_var(--divider)] [&_a]:font-[650]",
  ].join(" "),
  "section-navigation": [
    "section-navigation hidden [background:var(--surface)] [border-block:1px_solid_var(--divider)] [&_a]:inline-flex",
    "[&_a]:items-center [&_a]:min-h-11 [&_a]:[font-size:0.75rem] [&_a]:font-[700] [&_a]:[text-decoration:none] lg:block",
  ].join(" "),
  "section-navigation-inner":
    "section-navigation-inner flex justify-center gap-[0.5rem_1.25rem] flex-wrap py-[0.625rem] md:gap-12",
  "site-footer":
    "site-footer [border-top:1px_solid_var(--divider)] p-[2.5rem_0_max(1.5rem,_env(safe-area-inset-bottom))]",
  "footer-inner": [
    "footer-inner grid [grid-template-columns:repeat(2,_minmax(0,_1fr))] gap-10 [align-items:start] [&_p]:[font-size:0.875rem]",
    "[&_p]:[color:var(--text-muted)] [&_p]:m-0 md:[grid-template-columns:minmax(0,_1.5fr)_repeat(2,_minmax(0,_1fr))]",
    "md:gap-x-[clamp(2rem,_4vw,_4rem)]",
  ].join(" "),
  "footer-brand": [
    "footer-brand flex flex-col [align-items:start] gap-3 [grid-column:1_/_-1] min-w-0 [&_>_a:last-child]:[font-size:0.875rem]",
    "[&_>_a:last-child]:min-h-11 [&_>_a:last-child]:flex [&_>_a:last-child]:items-center [&_>_a:last-child]:gap-3",
    "md:[grid-column:auto]",
  ].join(" "),
  "footer-column": "footer-column min-w-0",
  "footer-heading":
    "footer-heading m-[0_0_0.75rem] [color:var(--text-muted)] [font-size:0.75rem] font-[700] tracking-[0.1em] uppercase",
  "footer-links": [
    "footer-links list-none m-0 p-0 [&_a]:flex [&_a]:items-center [&_a]:gap-3 [&_a]:w-[fit-content] [&_a]:min-h-11",
    "[&_a]:[font-size:0.875rem] [&_a]:font-[550] [&_a]:[text-decoration:none]",
  ].join(" "),
  "footer-socials": "footer-socials [&_svg]:[flex-shrink:0]",
  "footer-bottom": [
    "footer-bottom flex flex-wrap justify-between items-center gap-4 [color:var(--text-muted)] [font-size:0.75rem] mt-8",
    "[border-top:1px_solid_var(--divider)] pt-4 [&_p]:m-0 [&_a]:min-h-11 [&_a]:inline-flex [&_a]:items-center [&_a]:gap-3",
    "[&_a]:[text-decoration:none]",
  ].join(" "),
} as const;
