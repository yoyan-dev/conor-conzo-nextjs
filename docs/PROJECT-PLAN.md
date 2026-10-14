# TRYHRD / Coach Conzo website plan

> Current scope: UI only, as clarified on 14 October 2026. Follow [UI-DEVELOPMENT-PLAN.md](UI-DEVELOPMENT-PLAN.md) for the active backlog, source-combination rules, file structure, and naming conventions. The production integration and launch work below is deferred. The latest primary selection is Figma node 14:56; node 3:89 below records the earlier research.

Prepared 14 October 2026. Scope: study the references and copy, initialise Next.js + HeroUI, and define an implementation and launch plan. A small runnable foundation preview is included; the complete landing page and live booking system are separate implementation phases.

## 1. Sources and precedence

1. **Primary visual design:** [Figma Design, selected node 3:89](https://www.figma.com/design/iP7VbSVY0JB6hOmDLLPTb5/Untitled?node-id=3-89). The selected node is the Online Coaching service panel inside Desktop - 1. Browser review covered the containing 1440 x 4275 desktop frame from hero to FAQ.
2. **Content authority:** [Final Scripts Website Copy (Overview)](https://docs.google.com/document/d/1no5QRCAFMdXkIz-m9IfTZJHZ0gXLwQU7PEmzSO-ZFeo/edit). Full text was read and saved as `docs/source-copy.txt`.
3. **Inspiration only:** [Figma Make landing page](https://www.figma.com/make/7K0G5BFSIaAR1BXVdZftzH/Landing-page). This is not the final layout or content authority.
4. **Coach photography:** the user supplied `coach-conzo-image.png`; the local project copy is `public/images/coach-conzo.png` (approximately 175 KB). Use this real portrait rather than a substitute.

The user confirmed retaining the monochrome style and layout with usability improvements, then clarified the primary Figma. Preserve its dark identity with the restrained blue wordmark/glow visible in the primary file. Do not copy the inspiration's reversed hero layout.

Access limitation: browser viewing works. Figma's design-context connector returned an edit-access requirement. Exact layer properties, original component mappings, and assets cannot yet be extracted with that connector. The review below is based on visible browser evidence; the inspiration's observed Raleway font is not proof of the primary file's exact font. Obtain editor access or exported specifications before claiming a precise match. The starter preview is not the finished Figma implementation.

## 2. What the references communicate

The primary design puts a large real coach portrait on the left with a blue backlight, and the coach introduction, large headline, credentials, and two CTAs on the right. A compact masthead and secondary navigation lead into flat service columns, three orientation options, a two-column booking section, and compact FAQ rows. Dark surface changes and generous spacing separate sections.

Strengths worth preserving: a recognisable human face, strong headline scale, straightforward coaching categories, a low-pressure free call, and a consistent visual language.

Issues to improve: small low-contrast gray copy; desktop-only composition; header controls with unclear purpose; generic or incomplete destinations; service and orientation choices without a clear next action; insufficient form error/success behavior; contradictory confirmation promises. The main frame ends after FAQ, so testimonials, contact, and the footer need a deliberate extension using the same design system.

## 3. Content reconciliation

| Topic                  | Reference issue                                                 | Implementation decision                                                                                                            |
| ---------------------- | --------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Headline               | Old Train Hard / Laugh Often wording                            | Use the document's Stronger bodies. No judgement. Fitness for life.                                                                |
| Experience             | 9+ years coaching in both designs                               | Use 16 years of fitness, as supplied. Do not relabel this as 16 years of professional coaching.                                    |
| Qualification          | Missing in inspiration                                          | Display Level 3 PT as supplied; obtain awarding-body details before adding further credential claims.                              |
| Audience               | Some reference language may intimidate beginners                | Use the document's welcoming, human, judgment-free copy.                                                                           |
| Services               | Old shorter descriptions                                        | Use the four document descriptions; make only punctuation/formatting corrections.                                                  |
| Starter / Intermediate | 60 / 90 minutes                                                 | Preserve these durations.                                                                                                          |
| Advanced               | Document explicitly questions 120 versus 90 minutes             | Keep the duration unpublished until the user decides. Stored as null in content data.                                              |
| Booking                | Instant confirmation versus within 24 hours                     | Choose one real workflow. A request receipt is different from a confirmed appointment.                                             |
| Reviews                | Inspiration contains sample names, numbers, dates, and outcomes | Do not publish those as real. The document supplies no review text. Keep the review collection empty.                              |
| Identification         | Document asks for direct reviews with minimal identification    | Obtain approved review text, rating, and consented display name, first name, or initials. No photos or unnecessary client details. |
| Social links           | Inspiration uses placeholders and different handles             | Use Instagram coachconzo, TikTok conzo03, and YouTube @conzo03 from the document; verify account ownership before launch.          |
| Email                  | Inspiration says hello@tryhrd.co                                | Use coachconzo@gmail.com from the document.                                                                                        |
| Location               | Online / Worldwide                                              | Preserve this; do not invent a gym address, city, service area, or business hours.                                                 |
| Newsletter / X         | Present only in inspiration                                     | Omit unless supplied and confirmed.                                                                                                |

Keep editorial instructions, alternative copy, and parenthetical notes out of public content. Keep claims, terminology, and confirmation language consistent across the website and scheduler.

## 4. Page structure and conversion flow

Treat the seven "pages" in the content document as seven sections of one landing page initially, matching the overall reference. Expand to independent service pages only when there is enough distinct useful content.

| Section                      | Content and behavior                                                                                                                                                                                                   |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Hero                         | Portrait-left desktop composition, document headline, short introduction, supplied credentials. Primary free-call CTA, secondary See coaching anchor. Keep the primary action visible on a small laptop.               |
| Coaching / #about            | Human-first introduction and four services in the reference's flat layout. Stack cleanly on narrow screens. Each offer links to an appropriate enquiry or booking choice.                                              |
| Orientations / #orientations | Starter, Intermediate, Advanced. Clear selection state, durations only when confirmed, and a CTA that carries the selected orientation into the booking flow. Do not make a passive information panel look selectable. |
| Book a call / #book          | Explain the free 30-minute call and what happens next. Use a real scheduler or reliable enquiry endpoint with accurate availability and confirmation language.                                                         |
| Testimonials / #reviews      | Add only when permissioned source reviews arrive. Use readable quotes and accessible ratings, adapting the desktop reference table to mobile. Hide both section and nav item when empty.                               |
| FAQ / #faq                   | Five supplied questions and answers. Use accessible expandable controls; keep answer content in the initial rendered document.                                                                                         |
| Contact / #contact           | Verified social destinations, clickable email, online/worldwide availability, and an enquiry path. Add privacy/terms links only when actual policy pages exist.                                                        |

The provisional primary conversion is the free discovery call, inferred from both designs and the copy. The conversion question remains unanswered. Avoid a competing Sign Up action unless its purpose and destination are supplied. Keep navigation targets valid, add scroll offsets below sticky headers, and make the mobile menu keyboard accessible.

## 5. Technical architecture

- Next.js App Router, React, strict TypeScript, Tailwind CSS v4, HeroUI v3, and ESLint. Installed versions are locked in `package-lock.json` after installation.
- Server Components for page composition and content. Client boundaries only for the mobile menu, orientation selection, FAQ interactions, and form state.
- HeroUI for accessible interactive components, themed to the reference. Use supported v3 component imports and styles. HeroUI v3 does not require the old v2 provider/Framer Motion setup.
- Keep approved copy in typed content modules; do not fetch Google Docs or Figma at request time. Retain source snapshots and change notes.
- Use static generation for the landing page. Do not add a database, CMS, authentication, animation framework, or state library until a real requirement justifies it.
- Use Next Image for the supplied portrait, explicit dimensions, appropriate responsive sizes, and preload only for the actual LCP image. Use a local, licensed font after verifying the primary design's font properties. The starter currently uses a system font.
- Final components: SiteHeader, Hero, Services, Orientations, Booking, Testimonials, FAQ, Contact, SiteFooter. Keep data and presentation separate; avoid prop-heavy universal sections.

Framework references: [Next.js installation](https://nextjs.org/docs/app/getting-started/installation), [HeroUI requirements and styles](https://heroui.com/en/docs/react/getting-started/quick-start), [HeroUI framework integration](https://heroui.com/en/docs/react/getting-started/frameworks).

## 6. Performance plan and acceptance budgets

These are targets, not measured results for a finished website.

| Metric                         | Acceptance target                                    | Verification                                                                         |
| ------------------------------ | ---------------------------------------------------- | ------------------------------------------------------------------------------------ |
| LCP                            | At most 2.5 seconds                                  | Field p75, mobile and desktop separately                                             |
| INP                            | At most 200 ms                                       | Field p75; real interaction monitoring                                               |
| CLS                            | At most 0.1                                          | Field p75; reserve portrait, font, and embed space                                   |
| Lighthouse mobile performance  | At least 90 as a project target                      | Production build, documented device/network settings, median of three runs           |
| Accessibility / SEO Lighthouse | At least 95 as a supporting check                    | Automated checks plus manual review; scores do not prove compliance or rankings      |
| Initial route JS               | Starting budget of 200 KB gzip                       | Measure built transfer sizes; investigate increases and document necessary tradeoffs |
| Hero image                     | Prefer at most 150 KB at the delivered viewport size | Inspect actual optimised transfer, not only the source PNG                           |

Core Web Vitals thresholds and p75 methodology: [Google Web Vitals](https://web.dev/articles/vitals). Lighthouse cannot measure real INP from a passive page-load run; use TBT as a lab diagnostic and measure INP with real interactions.

Actions: render meaningful content immediately; keep text visible during font loading; avoid loading-screen entrances and render-blocking animation; reserve media and scheduler dimensions; lazy-load third-party scheduling UI only after intent, with a direct-link fallback; avoid social-media embeds; defer analytics; import small HeroUI entry points; use CSS for the blue backlight rather than a video or large decorative raster. Check cold-cache mobile loads and lower-end devices.

After launch, collect real Core Web Vitals, inspect Search Console when sufficient field data exists, and track regressions after asset or integration changes. Do not claim passing field metrics from local Lighthouse alone.

## 7. SEO and discoverability

- Target actual intent: Coach Conzo branded searches, personal training, online fitness coaching, beginner gym guidance. These are initial hypotheses; validate location, audience, competition, and search demand before final keyword targeting.
- Use one clear H1, ordered H2/H3 sections, semantic landmarks, crawlable internal links, descriptive image alt text, and useful visible copy. Do not stuff keywords or add hidden text.
- Provide a specific title/description, canonical origin, Open Graph/Twitter image, favicon, sitemap, robots policy, and an informative 404. The foundation already has these mechanisms; production origin is intentionally unset.
- Keep previews noindex. Set the production origin and explicitly enable indexing only after content, links, and booking work. Rebuild after changing these values. Do not rely on robots.txt as a privacy or authentication control.
- Plan accurate Person, WebSite, and Service JSON-LD based on the final visible content. Add LocalBusiness only if a genuine eligible business location and required information exist. Do not invent an address to qualify.
- Do not add fabricated ratings or expect self-published testimonials to produce review stars in search. Structured data and FAQ content do not guarantee rich results.
- Verify schema with the appropriate validators and inspect the published URL. Register the verified domain in Google Search Console, submit the sitemap, and monitor indexing, coverage, queries, and click-through rates.
- Phase-two service pages can cover Online Coaching, Personal Training, and Gym Orientations with original details, suitable internal links, and clear offers. Add local pages only for real service locations. Add useful coaching articles when there is an editorial owner and actual expertise to share.

References: [Next metadata](https://nextjs.org/docs/app/getting-started/metadata-and-og-images), [Google LocalBusiness guidance](https://developers.google.com/search/docs/appearance/structured-data/local-business). SEO work improves accessibility to search engines; rankings are not guaranteed.

## 8. Accessibility and usability

Target WCAG 2.2 AA. Check 4.5:1 normal-text contrast and 3:1 large-text contrast, control boundaries and focus visibility, keyboard operation, sensible heading order, skip navigation, 200% zoom, and reflow at 320 CSS pixels. Use at least 44px for important touch controls. Avoid conveying selected level or rating with color alone.

Provide programmatic field labels, suitable autocomplete/input types, field-level validation tied to controls, a focused error summary when appropriate, and announced loading/success/error states. Test FAQ and mobile navigation with keyboard and a screen reader. Respect reduced motion. Ensure content and primary links remain usable if scripts fail. HeroUI helps with interaction semantics; custom layout and integration still require testing.

## 9. Booking, contact, reliability, and privacy

The starter opens an explicitly labelled email enquiry. An optional BOOKING_URL switches the CTA to a scheduler. No simulated success state or automatic confirmation exists.

Before building the final form, choose a scheduling provider or a request-only workflow. For scheduling, define timezone display, availability, cancellation/rescheduling, confirmation delivery, and fallback contact. For requests, say Request a call and separate Request received from Appointment confirmed.

For a custom endpoint: validate on the server, cap request sizes, rate-limit, add spam protection, prevent duplicate submissions, handle provider timeouts, retry safely, and record delivery failures without retaining unnecessary personal data. Send mail only through a configured provider with a verified sender. Test with controlled addresses. Browser submission must not expose service secrets.

Collect only name, email, service interest, and an optional short message initially. Do not request medical histories or sensitive health information in an ordinary lead form. Move detailed intake to an appropriate private process. Write a real privacy notice describing the chosen service providers, retention, and contact details. Choose cookies/consent behavior based on the actual deployed tools and applicable requirements.

The starter includes MIME-sniffing, referrer, framing, and browser-feature headers. Plan a Content Security Policy after the scheduler and analytics domains are known and test it in report-only mode first. Use HTTPS, environment-managed secrets, dependency maintenance, server-side validation, and minimal operational logging.

## 10. What will make this site stand out

1. **A recognisable coach, not generic fitness imagery.** Use the provided portrait and a coherent restrained blue backlight aligned with the main design.
2. **A specific welcome for beginners.** The judgment-free promise should appear in the headline, offer descriptions, FAQ, and first-contact experience.
3. **A clear fit for each offer.** Explain who it is for, what happens in a session, duration when confirmed, and the next step. Avoid competing generic buttons.
4. **Genuine evidence.** Use real qualifications and permissioned direct client reviews. Distinguish personal fitness experience from coaching tenure.
5. **A low-friction mobile path.** Readable type, fast loads, useful orientation selection, a clear free-call action, and a dependable fallback.
6. **Small, intentional motion.** Subtle hover/focus transitions and optional restrained reveals after the page is readable. Preserve access for reduced-motion users.
7. **Useful original coaching content over time.** Practical gym guidance and clear service explanations can support trust and discovery more sustainably than decorative effects.

## 11. Delivery phases

| Phase                      | Deliverable                                                                                       | Exit condition                                                                                          |
| -------------------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| 0: Research and foundation | Source study, portrait, structured copy, framework setup, metadata/crawler scaffolding, this plan | Install, lint, typecheck, production build, and local smoke check pass                                  |
| 1: Figma implementation    | Exact primary design inspection, verified fonts/tokens, responsive seven-section page             | Editor-access layer extraction available; desktop and mobile visual review; no placeholder destinations |
| 2: Conversion and proof    | Chosen scheduler or real enquiry endpoint, approved reviews, final policies                       | Controlled end-to-end submission, delivery and failure tests; no misleading confirmations               |
| 3: Launch quality          | Performance, accessibility, technical SEO, cross-browser QA, configured production domain         | Acceptance checks complete, production settings reviewed, deploy authorised                             |
| 4: Improve                 | Search Console, consent-aware conversion metrics, useful service content                          | Baseline established and improvements based on real evidence                                            |

## 12. Measurement and launch checklist

Measure meaningful events: free-call CTA click, orientation selected, scheduler opened, enquiry actually received, and booking confirmed by the scheduling system. A click or thank-you screen is not proof of a confirmed booking. Never include names, emails, or health details in analytics events. Choose and configure an analytics service only when required.

Launch checks:

- Build, lint, and strict type checking pass; no runtime/hydration errors.
- Visual review at 320, 375/390, 768, 1024, 1440px, and a short laptop viewport; no clipped primary CTA or horizontal page overflow.
- Chrome, Firefox, Safari, and mobile touch behavior reviewed.
- All nav anchors, social URLs, email links, policy pages, and booking paths work.
- Correct desktop portrait slot, aspect ratio, actual local asset, and rendered mobile geometry verified.
- Keyboard, screen-reader forms/FAQ/navigation, reduced motion, contrast, zoom, and automated accessibility checks complete.
- Correct origin, canonical, OG image, sitemap, robots, indexing environment, and validated structured data.
- Performance measured on the production build with stated conditions; no unmeasured score claims.
- Real booking/enquiry confirmation and provider-failure behavior tested; production alerts have an owner.
- Real source reviews and credential details approved; advanced duration resolved.
- Production domain, HTTPS, privacy content, monitoring, and deployment rollback plan in place.

## 13. Inputs still needed for the final site

- Editor access to the primary Figma for precise connector-based implementation, or exported layer specifications.
- The advanced orientation duration (90 or 120 minutes), or permission to leave it unspecified.
- Final primary conversion goal, scheduling provider/URL, timezone, and confirmation workflow.
- Approved review text, ratings, and display names; no sample testimonials will be substituted.
- Final production domain, service location if in-person/local SEO matters, and any prices to publish.
- Verification of supplied social profiles and qualification wording; policy owner and form/analytics decisions.

These inputs do not prevent local setup, structured content preparation, or technical planning. They are dependencies for their respective implementation and launch phases.
