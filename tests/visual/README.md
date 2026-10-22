# Visual parity checks

Run `npm run build`, then `npm run test:visual`.

The 74 reference screenshots cover the current Tailwind UI and its single email enquiry flow. Form responses are intercepted by shared browser fixtures so screenshots never send email. They cover the homepage, gallery, not-found page, individual sections, responsive breakpoint boundaries, enquiry success/error feedback, navigation, keyboard focus, hover states, and the lightbox.

Comparisons allow zero changed pixels. The configuration uses the project's Chrome/Chromium setup with consistent software rendering, reduced motion, loaded fonts/images, and hidden text carets. Use the same browser version and operating system when comparing these reference images. Normal animation timing and reduced-motion changes are covered separately by the regular browser tests.

Keep reference screenshots unchanged during styling refactors. Update them only for an intentional, reviewed visual or content change. Computed-style diagnostics and failed-image comparisons are written to the ignored `test-results` directory.

Component styling lives in colocated `*-styles.ts` utility sets; layout and shared sets avoid duplicating repeated utilities. Marker classes are unstyled hooks for descendant variants, existing scroll-reveal logic, and tests. `globals.css` retains imports, theme values, document defaults, accessibility/scrollbar rules, and the original keyframes. The document cascade layer sits between HeroUI components and utilities to preserve inherited control typography while allowing explicit component styles to win.
