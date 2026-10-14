# Foundation verification

Verified 14 October 2026 against the local production build. This covers the scaffold preview, not the future complete landing page.

## Passed

- `npm run lint`: no errors or warnings.
- `npm run typecheck`: Next route type generation and strict TypeScript pass.
- `npm run build`: production build passes; homepage, icon, Open Graph image, robots, sitemap, and 404 are prerendered.
- `npm run format:check`: source and documentation use the configured formatter.
- `npm ls --depth=0`: installed dependency tree resolves without peer-dependency errors.
- `npm audit --omit=dev --audit-level=high`: zero known production dependency vulnerabilities reported at verification time.
- Local HTTP smoke: homepage 200, noindex metadata, robots disallow by default, sitemap without an invented production origin, Open Graph PNG 200, optimised portrait 200, missing route 404, MIME-sniffing header present.
- Optimised portrait request at width 384 using WebP: 14,632 transferred image bytes in the local smoke check. This is one image request, not a page-performance score.
- Chrome visual review at 390 x 844 and 1366 x 768, plus narrow-layout check at 320 x 740: no horizontal page overflow; the 48px enquiry action is inside the initial viewport at each tested size.
- Supplied portrait loads with preserved aspect ratio. The link opens a correctly addressed mailto enquiry; no email was sent during verification.
- Browser console capture contains no errors or warnings for the preview.
- Temporary browser viewport overrides were reset after checks.

## Corrections made during verification

- Replaced an internal raw anchor with Next Link and corrected a JSX apostrophe lint error.
- Made the HeroUI enquiry control a semantic link that works without a JavaScript click handler.
- Corrected link/button text-color interaction that hid the label against the light button background.
- Reduced desktop hero spacing so the action stays visible on a short laptop viewport.
- Run Next type generation before standalone TypeScript checks, supporting fresh checkouts.

## Limits

No Lighthouse score, field Core Web Vitals, completed accessibility conformance, cross-browser certification, booking delivery, final Figma fidelity, or search ranking is claimed. Those checks belong to the implementation and launch phases in PROJECT-PLAN.md. A production origin and real booking service are not yet configured. ESLint 9 remains pinned for the Next preset's plugin peer compatibility; its upstream support warning is recorded in README.md.
