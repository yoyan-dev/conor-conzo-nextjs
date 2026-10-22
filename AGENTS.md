# Repository guidance

Read PRODUCT.md, DESIGN.md, and docs/UI-DEVELOPMENT-PLAN.md before UI implementation. docs/PROJECT-PLAN.md retains source research and deferred production work.

- Primary visual reference: Figma Design iP7VbSVY0JB6hOmDLLPTb5, latest node 14:56 (FAQ region within the full desktop frame). Figma Make contributes interaction/completeness ideas in the main design visual language; the document governs copy.
- Approved content comes from docs/source-copy.txt and src/content/coach.ts. Preserve the welcoming coaching voice.
- Use the supplied public/images/hero/coach-conzo.png portrait. No invented reviews, statistics, credentials, addresses, or claims.
- Advanced orientation duration is unresolved. Empty reviews must remain unpublished.
- The existing homepage is a foundation preview. Do not claim it is the complete Figma implementation.
- Stack: Next.js 16 App Router, React 19, HeroUI v3, Tailwind CSS v4, strict TypeScript.
- Keep static content in Server Components and client boundaries narrow. Prefer HeroUI's supported component subpaths.
- Indexing is opt-in through deployment configuration. Never invent the production domain.
- The site offers an email enquiry link and Gmail SMTP enquiry forms with one submission flow. Keep SMTP credentials server-only, report delivery failures honestly, and never simulate booking confirmations. Tests must intercept or mock delivery and use empty SMTP credentials.
- Validate with npm run lint, npm run typecheck, and npm run build. Run browser checks for visible changes and conversion paths.
- Review performance, accessibility, semantic structure, and reduced-motion behavior with the design.

- Contact and coaching forms submit to the enquiry endpoint without a mode switch. Configure SMTP credentials only where email delivery is intended. Scheduling, payment, visitor autoresponders, and deployment remain deferred.
- Use kebab-case component filenames and PascalCase component exports. Group layout, sections, coaching interactions, forms, and shared UI by responsibility as specified in docs/UI-DEVELOPMENT-PLAN.md.

- Group image assets by purpose under public/images/hero, public/images/orientations, and public/images/gallery. Keep unreferenced photos in public/images/unused. Assets intentionally displayed across different sections belong in public/images/shared; reference a single file rather than duplicating it. An import used only for deduplication does not change an asset's category.
