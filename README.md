# TRYHRD / Coach Conzo

Next.js 16.4 App Router, React 19.3, HeroUI 3.2.6, Tailwind CSS 4.3, TypeScript, and ESLint. The repository includes a runnable foundation preview, source copy, the supplied portrait, and a researched implementation plan. The complete landing page and booking backend are future implementation phases, not completed features.

## Run

Use Node.js 22 or newer (an active LTS is recommended for deployment).

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Use `npm run lint`, `npm run typecheck`, and `npm run build` to validate. Type generation for Next routes happens during build. To exercise the production build use `npm run start`.

## Current scope

The current request is to plan the complete UI only. Follow [docs/UI-DEVELOPMENT-PLAN.md](docs/UI-DEVELOPMENT-PLAN.md): primary Figma Design node 14:56 controls the visual system; Figma Make contributes interaction ideas; the Google Doc controls copy. Backend integration and deployment are deferred. No full-page implementation is marked complete by this planning update.

## Project map

- `docs/UI-DEVELOPMENT-PLAN.md`: active UI roadmap, component/file structure, naming conventions, interaction states, dependencies, and acceptance checks.
- `docs/PROJECT-PLAN.md`: source study, section plan, performance and SEO budgets, accessibility, conversion flow, roadmap, launch acceptance criteria.
- `docs/source-copy.txt`: snapshot of the supplied Google Doc, captured 2026-10-14.
- `PRODUCT.md`: audience, brand, and strategic constraints.
- `DESIGN.md`: source priority, observed visual direction, and planned tokens.
- `src/content/coach.ts`: structured copy for services, orientations, FAQ, and social links. Reviews are intentionally empty; advanced duration is intentionally unresolved.
- `src/app`: server-rendered foundation, metadata, social image, crawler controls, icon, and 404 page.
- `src/components/contact-button.tsx`: small HeroUI client boundary.
- `public/images/coach-conzo.png`: user-supplied portrait, served with Next Image optimisation.

## Configuration

Copy `.env.example` to `.env.local` and set the real production `SITE_URL` and optional public HTTPS `BOOKING_URL`. Do not put private keys or confidential tokens in a booking URL. Without a booking URL, the CTA explicitly offers an email enquiry and opens the visitor's email client. It does not submit a booking or send an email automatically.

Indexing is disabled by default. Set `ENABLE_INDEXING=true` only when the final website is ready. Vercel preview deployments remain noindex. Other hosting providers must set `ENABLE_INDEXING=false` on previews. Metadata and crawler routes depend on build-time configuration; rebuild after changes.

The starter does not include a form endpoint, analytics, a CMS, privacy/terms text, or fabricated testimonials. No analytics cookies or sensitive health intake data are collected. The main Figma requires editor access for connector-based layer extraction; browser review is documented in the plan.

## Deployment

Any Node-compatible Next.js host works; Vercel is a straightforward option. Connect the repository, set the environment values, create a preview, complete the plan's checks, and then publish. This task does not publish or change external service settings.

## Tooling compatibility

ESLint 9.39.5 is pinned because the React, import, and accessibility plugins in the current Next.js lint preset do not yet declare ESLint 10 compatibility. npm marks ESLint 9 as out of support. Track an upgrade of that plugin set; no forced peer overrides are used. Formatting uses Prettier. Next type generation runs before standalone type checking.
