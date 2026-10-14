# UI development plan: Coach Conzo / TRYHRD

Updated 14 October 2026. Current scope is the complete responsive frontend UI only. The user asked for planning; this document does not mark the full UI as implemented. The working application remains a foundation preview.

## 1. Source priority and combination

1. **Main visual authority:** [Figma Design](https://www.figma.com/design/iP7VbSVY0JB6hOmDLLPTb5/Untitled?node-id=14-56). Follow the containing desktop design for composition, section rhythm, alignment, type hierarchy, portrait placement, dark surfaces, restrained blue accents, and buttons. Node 14:56 currently selects the FAQ image region, shown in the browser as a 1493 x 449 image layer within Desktop - 1; it is not a separate specification for the whole website.
2. **Interaction and completeness reference:** [Figma Make](https://www.figma.com/make/7K0G5BFSIaAR1BXVdZftzH/Landing-page?code-node-id=0-6&p=f&fullscreen=1&preview-route=%2F%23orientations). Use its orientation selection, navigation, expandable FAQ, and social/contact ideas where they support the main design. Extend missing sections in the main design's visual language. Do not mix its alternative hero composition or stale copy into the main design.
3. **Public copy authority:** the supplied Google Doc, preserved in `docs/source-copy.txt` and structured in `src/content/coach.ts`.
4. **Portrait:** the user's `public/images/coach-conzo.png`.

**Recommended combination:** one visual system from Figma Design, interaction ideas from Figma Make, and final copy from the document. If two references disagree visually, Figma Design wins. If reference copy disagrees with the document, the document wins. Preserve the desktop design while adapting its layout for mobile and correcting accessibility issues.

Design-context extraction for node 14:56 still returns an edit-access requirement. Browser inspection is available. Exact font measurements and original layer/component metadata must be distinguished from visual observations. Do not claim a precise layer-based match until access/specifications and rendered comparison support it. Do not render the FAQ screenshot as the webpage; rebuild accessible text and controls.

## 2. Scope boundary

### In this UI phase

- Complete single-page frontend with header, hero, service overview, orientations, booking UI, testimonial presentation, FAQ, social/contact, and footer.
- Responsive desktop, tablet, and mobile layouts using the existing Next.js, React, HeroUI, Tailwind, and TypeScript foundation.
- Working anchor navigation, mobile menu, orientation selection, FAQ expansion, focus behavior, and frontend form validation.
- Booking/contact preview states with explicit feedback that no request has been sent.
- Correct approved copy, the supplied portrait, visual polish, accessibility, reduced-motion behavior, and frontend performance checks.
- Existing technical metadata, social preview, favicon, and noindex safeguards retained and checked.

### Deferred until requested

Live scheduling, email sending, API routes, server actions for enquiries, database/storage, authentication, payments, admin dashboard, CMS, analytics integrations, Search Console setup, production deployment, production legal/policy implementation, and sensitive client intake. The earlier project plan describes these as future work, not requirements for this phase.

## 3. Screen and section specification

| Area         | Main-design treatment                                                                                      | UI behavior                                                                                                                                                               | Content handling                                                                                                                                                                         |
| ------------ | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Header       | Match the main wordmark, proportions, dividers, and menu placement                                         | Desktop anchors; mobile toggle with expanded state, Escape close, focus return, close after choosing a destination                                                        | Use only destinations that exist; omit unexplained Sign Up/search actions                                                                                                                |
| Hero         | Portrait on the left, copy on the right, restrained blue backlight, strong headline hierarchy, two actions | Primary action scrolls to booking UI; secondary scrolls to coaching                                                                                                       | Approved headline, introduction, 16 years of fitness, Level 3 PT; no invented follower counts                                                                                            |
| Services     | Main design's flat four-column arrangement, spacing, labels, and separators                                | Stack at narrow widths; service actions choose the relevant enquiry interest                                                                                              | Four approved service descriptions; avoid turning passive panels into fake buttons                                                                                                       |
| Orientations | Three options with the main design's active treatment                                                      | Exactly one selection; visible selected state and keyboard operation; booking action carries selection to the form                                                        | Starter 60 min, Intermediate 90 min, Advanced duration omitted until resolved                                                                                                            |
| Booking UI   | Two-column explanation and form styled like the main design                                                | Name/email/session/message fields; field validation; selection synchronisation; clear preview result                                                                      | No automatic-confirmation promises; label submission as preview while UI-only                                                                                                            |
| Testimonials | Extend main typography and surfaces using the Make reference's review structure where helpful              | Readable desktop layout; stacked mobile presentation; accessible star labels                                                                                              | Reusable component supports name, quote, rating. Real collection remains empty. Optional clearly labelled fixtures belong in a separate developer preview, never as real client evidence |
| FAQ          | Follow node 14:56's left introduction and right ruled rows                                                 | Accessible expand/collapse; keyboard activation; answer visible to assistive technology; more than one answer may remain open unless inspected design specifies otherwise | All five approved questions and answers                                                                                                                                                  |
| Contact      | Adapt Make's social/contact organisation to the main dark design                                           | Actual social/mail links; optional client-only contact form preview                                                                                                       | Supplied handles/email; Online / Worldwide; no invented newsletter or address                                                                                                            |
| Footer       | Quiet continuation of main wordmark, dividers, and spacing                                                 | Functional links only                                                                                                                                                     | No empty privacy/terms anchors; add real policy pages in a later phase                                                                                                                   |

Use one H1 and a logical H2/H3 order. The main action should remain visible on a short laptop viewport. Mobile content order should prioritise the message and action while keeping the coach portrait prominent nearby; do not merely shrink the desktop canvas.

## 4. Target file structure

This is the intended structure after the UI implementation, not a claim that these files already exist. Add files when a real responsibility requires them. Avoid empty stubs and unnecessary wrappers.

```text
src/
  app/
    layout.tsx                     # Document shell, global metadata, fonts
    page.tsx                       # Server Component composing page sections
    globals.css                    # Tailwind/HeroUI imports, shared tokens, base styles
    icon.svg
    opengraph-image.tsx
    robots.ts
    sitemap.ts
    not-found.tsx
  components/
    layout/
      site-header.tsx              # Header shell and desktop navigation
      mobile-navigation.tsx        # Client: mobile open/close and focus behavior
      section-navigation.tsx       # Repeated section links if retained from main design
      site-footer.tsx
    sections/
      hero-section.tsx
      services-section.tsx
      orientations-section.tsx     # Controlled selection UI, no duplicate state store
      booking-section.tsx          # Booking introduction and form arrangement
      testimonials-section.tsx
      faq-section.tsx              # Section shell/content composition
      contact-section.tsx
    coaching/
      coaching-flow.tsx            # Small client owner for orientation -> booking selection
      orientation-option.tsx       # One option, rendered by orientations-section
    forms/
      booking-form.tsx             # Client: labels, inputs, validation, preview feedback
      contact-form.tsx             # Client, only if included in the final contact composition
      form-feedback.tsx            # Shared announced feedback if both forms need it
    ui/
      action-link.tsx              # Shared styled navigation action, composed from HeroUI
      section-heading.tsx          # Reused heading/eyebrow pattern where appropriate
      rating-stars.tsx             # Only if approved review content needs this
      faq-accordion.tsx            # HeroUI accordion and its local interactive boundary
  content/
    coach.ts                       # Existing approved copy and typed section data
    navigation.ts                  # Canonical anchor labels and IDs
  hooks/
    use-mobile-navigation.ts       # Only if focus/menu logic is substantial and reusable
  lib/
    site.ts                        # Existing site metadata/configuration
    form-validation.ts             # Pure helpers shared by forms, when justified
  types/
    coaching.ts                    # Shared service/orientation domain types
    forms.ts                       # Shared form draft/result types only when needed
public/
  images/
    coach-conzo.png
  fonts/                           # Verified licensed font files and licence if needed
    LICENSE.txt
    ...woff2
tests/
  e2e/
    navigation.spec.ts
    coaching-flow.spec.ts
    forms-preview.spec.ts
    faq.spec.ts
  accessibility/
    landing-page.spec.ts
docs/
  UI-DEVELOPMENT-PLAN.md            # Current execution plan
  PROJECT-PLAN.md                   # Source research and deferred production roadmap
  VERIFICATION.md                   # Existing foundation evidence
  UI-VERIFICATION.md                # Added after full UI checks, not before
```

Component styling starts with Tailwind classes and shared tokens. When a section needs substantial bespoke CSS, colocate a file such as `hero-section.module.css` rather than growing one page-wide stylesheet.

Refactor the current `src/components/contact-button.tsx` into the shared action-link pattern if its responsibilities match. Avoid leaving two abstractions for the same visual action. Keep metadata routes and the existing portrait; do not rewrite stable foundation code without a reason.

## 5. Naming and component rules

| Item                          | Convention                                 | Example                                                      |
| ----------------------------- | ------------------------------------------ | ------------------------------------------------------------ |
| Component file                | kebab-case `.tsx`                          | `hero-section.tsx`                                           |
| Component / named export      | PascalCase, descriptive                    | `HeroSection`, `BookingForm`                                 |
| Hook                          | `use-` kebab-case file, camelCase function | `use-mobile-navigation.ts`, `useMobileNavigation`            |
| Local variables and functions | camelCase                                  | `selectedOrientationId`, `validateEmail`                     |
| Callback props                | `on` + action                              | `onOrientationChange`, `onPreviewSubmit`                     |
| Local handlers                | `handle` + action                          | `handleOrientationChange`                                    |
| Boolean state/props           | `is`, `has`, or `can`                      | `isOpen`, `hasErrors`                                        |
| Shared types                  | PascalCase                                 | `OrientationId`, `BookingDraft`                              |
| Props types                   | Component name + `Props`, colocated        | `BookingFormProps`                                           |
| Data arrays                   | Plural camelCase                           | `services`, `orientations`, `faqs`                           |
| Stable IDs                    | Meaningful kebab-case strings              | `personal-training`, `build-your-program`                    |
| Anchor IDs                    | Existing consistent section IDs            | `about`, `orientations`, `book`, `reviews`, `faq`, `contact` |
| CSS custom properties         | kebab-case semantic roles                  | `--brand-blue`, `--surface`, `--text-muted`                  |
| Test files                    | Feature name + `.spec.ts`                  | `coaching-flow.spec.ts`                                      |
| Next route files              | Framework conventions                      | `page.tsx`, `layout.tsx`, `not-found.tsx`                    |

Prefer named exports for reusable components; keep default exports where Next.js requires them. Use `@/` imports. Avoid barrel export files that pull entire component folders into a client bundle. Import HeroUI from supported component subpaths. Avoid vague names such as `Box2`, `CardNew`, `Common`, or `Utils`.

Keep domain data in `content/`, meaningful shared types in `types/`, and component-specific types beside the component. Do not extract a hook or helper solely to wrap one simple state value. Share layout primitives only when the design actually repeats them; do not force different sections through one universal component.

## 6. Rendering and state design

- `app/page.tsx` remains a Server Component and composes the page. The root page must not become a client component to support one menu or form.
- Header shell, hero, services, testimonial text, and footer stay server-rendered where possible.
- `CoachingFlow` owns the selected orientation and renders only the related orientation/booking interaction region. Pass an explicit `OrientationId | null` to controlled children. Do not duplicate selected values in unrelated stores.
- Choosing an orientation updates the booking interest. Clicking its action navigates to `#book` and moves focus appropriately without trapping keyboard users. Editing another form field must not reset the chosen interest.
- FAQ interaction uses HeroUI; render approved answers into the initial document rather than fetching on expansion.
- Mobile-menu state is local. Close the menu on a selected navigation link and return focus on Escape. Use ordinary navigation semantics unless an overlay truly needs dialog behavior.
- Forms retain values in memory only for the preview session. Do not silently persist personal details in local storage. Use native form semantics and browser-friendly labels/autocomplete.
- No global state library, new backend, or remote content fetch is needed for this phase.

## 7. Interaction state inventory

| Component          | States to design and verify                                                          |
| ------------------ | ------------------------------------------------------------------------------------ |
| Navigation         | Default, hover, keyboard focus, mobile closed/open, destination selected             |
| Action link/button | Default, hover, focus, pressed; disabled only when there is a real reason            |
| Orientation        | Default/unselected, hover, focus, selected; selected is not expressed by color alone |
| Form field         | Empty, filled, focused, invalid with linked error text, corrected                    |
| Form preview       | Unsubmitted, invalid, valid preview result, edit again; no fabricated network delay  |
| FAQ                | Collapsed, expanded, focus; readable with long answers                               |
| Reviews            | Empty collection, one review, several approved reviews, long quote/name              |
| Page               | Narrow viewport, short viewport, 200% zoom, reduced motion, failed image fallback    |

A valid client-only submit must say something equivalent to **Preview only. No booking or message was sent.** Do not show Appointment confirmed, Message delivered, a fake reference number, or an email-sent claim. Place the preview notice near the action before submission as well. Do not use artificial loading spinners to imply a live service.

For testimonials, implement and verify the component using clearly marked test/developer fixtures if needed, but keep the public section and its navigation item hidden when there are no approved reviews. Review content is not a dependency for completing the reusable UI component.

## 8. Ordered implementation backlog

All items below are planned. Foundation setup and its earlier checks are already complete.

| ID    | Work package                                                                                      | Depends on                                           | Completion check                                                                                     |
| ----- | ------------------------------------------------------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| UI-01 | Inventory the main frame, confirm typography/assets, record tokens and responsive interpretations | Reference access/specifications for exact values     | Source measurements and observations are clearly distinguished; section/source mapping recorded      |
| UI-02 | Finalise navigation IDs, typed content, shared data and naming conventions                        | UI-01 for visual details; existing document for copy | All seven content sections mapped; no stale claims or invented values                                |
| UI-03 | Establish global tokens, font handling, section container and action styles                       | UI-01                                                | HeroUI controls match chosen tokens; readable contrast and visible focus                             |
| UI-04 | Implement header, secondary navigation if retained, mobile menu, and footer                       | UI-02, UI-03                                         | Every rendered link has a valid destination; keyboard/mobile behavior works                          |
| UI-05 | Match the primary hero with supplied portrait and document headline                               | UI-03                                                | Correct desktop composition; undistorted image; action visible on short laptop; usable mobile layout |
| UI-06 | Build the four-service overview                                                                   | UI-02, UI-03                                         | Main-design spacing and hierarchy; clean narrow-screen stacking; approved descriptions               |
| UI-07 | Build orientation options and controlled selection                                                | UI-02, UI-03                                         | Keyboard-selectable, one selected option, unresolved duration omitted                                |
| UI-08 | Build booking UI and connect it to orientation selection                                          | UI-07                                                | Interest carries through; labels/errors/focus work; valid preview sends nothing                      |
| UI-09 | Implement FAQ using the latest selected region                                                    | UI-02, UI-03                                         | Five approved answers; accessible accordion and long-copy layout                                     |
| UI-10 | Build testimonial presentation and its empty-data behavior                                        | UI-03                                                | Desktop/mobile layout works with fixtures; no fictional reviews on the page                          |
| UI-11 | Build social/contact UI and optional contact form preview                                         | UI-02, UI-03                                         | Correct supplied destinations; no unsupported contact claims or real submission                      |
| UI-12 | Integrate the full page and tune responsive layouts                                               | UI-04 through UI-11                                  | No broken anchors, overlap, clipping, repeated IDs, or horizontal page overflow                      |
| UI-13 | Add restrained motion and interaction polish                                                      | UI-12                                                | Motion does not hide/delay content; reduced-motion path and focus remain correct                     |
| UI-14 | Run visual, interaction, accessibility, and performance QA                                        | UI-12; UI-13 if motion added                         | Evidence recorded; material issues fixed; implementation compared against the main Figma             |
| UI-15 | Deliver the complete UI preview, cleanup, and handoff                                             | UI-14                                                | Checks pass, source structure matches conventions, documented preview-only boundaries                |

Suggested build order: design/content inventory -> shared styles -> header/hero -> services -> orientation/booking flow -> FAQ -> review/contact/footer -> full responsive pass -> polish -> verification. Finish complete sections and verify them before adding decorative effects. These are effort groups, not promised calendar dates.

## 9. Responsive and visual QA

Use the main design as the desktop target and define responsive behavior deliberately where no mobile frames are supplied.

- Review widths 320, 375/390, 768, 1024, and 1440px, plus 1366 x 768 laptop and 200% browser zoom.
- Preserve the portrait's aspect ratio and match its intended desktop slot and crop. Do not stretch it or replace it with the inspiration's alternate positioning.
- Compare header height, content width, headline line breaks, portrait scale, section gaps, dividers, control dimensions, background changes, and blue accent intensity.
- Check wrapped navigation, long service descriptions, FAQ expansion, error messages, and long testimonial content.
- Ensure sticky elements do not cover heading anchors or focused inputs. Use scroll-margin-top where appropriate.
- Keep normal body text comfortably readable; raise contrast where the reference's gray text is too faint.
- Verify source assets and live text separately. A screenshot of a whole section is a reference, never a replacement for semantic implementation.

Record the actual viewport and screenshot for comparisons. Fix in-scope differences and document any deliberate accessibility/responsive departures from the source design.

## 10. Frontend performance, SEO, and accessibility

Retain the earlier technical plan's performance goals, scoped here to frontend work. They are acceptance targets, not current full-page results.

- Static/server-rendered content, narrow client boundaries, local optimised portrait, reserved media geometry, and a licensed self-hosted font after verification.
- No social iframe embeds, scheduler scripts, analytics scripts, autoplay media, or animation framework just for simple transitions.
- LCP <= 2.5s, INP <= 200ms, and CLS <= 0.1 are field goals. Production-build Lighthouse mobile performance target >= 90 is a lab check; it cannot establish real field INP. [Web Vitals reference](https://web.dev/articles/vitals).
- Inspect initial JS and delivered image bytes against the existing plan's starting budgets. Investigate regressions rather than adding speculative optimisation code.
- Preserve one H1, semantic sections, useful alt text, metadata/OG output, and preview noindex. Production-domain and search-service configuration remain deferred.
- Target WCAG 2.2 AA: meaningful labels, visible focus, keyboard navigation, readable contrast, reduced motion, announced form feedback, and reflow. Use at least 44px for important touch controls.
- Test the full UI with automated accessibility checks plus manual keyboard/screen-reader review. A score alone does not establish conformance.

## 11. Verification plan

Reuse the existing lint/type/build/formatter scripts. Add browser interaction coverage only for meaningful behaviors, not implementation-mirroring unit tests.

| Check             | Required evidence                                                                                               |
| ----------------- | --------------------------------------------------------------------------------------------------------------- |
| Build quality     | `npm run lint`, `npm run typecheck`, `npm run build`, `npm run format:check` pass                               |
| Navigation        | Desktop anchors, mobile toggle, Escape, focus return, and menu close after destination selection                |
| Coaching flow     | Keyboard orientation selection updates booking interest and survives editing other fields                       |
| Forms             | Invalid values expose linked messages; valid preview announces no submission; no enquiry network request occurs |
| FAQ               | Controls expose expanded state, work with keyboard, and reveal approved answer text                             |
| Testimonials      | Empty dataset hides section/nav; approved-data fixture layout handles long content                              |
| Responsive layout | Recorded target viewport checks, no overflow or clipped actions; portrait geometry correct                      |
| Accessibility     | Automated scan plus keyboard, reduced-motion, zoom, and representative screen-reader review                     |
| Performance       | Measurements from the production build with documented conditions; no invented field results                    |
| Runtime           | No console/hydration errors; no broken local assets or anchor destinations                                      |

Use a small Playwright suite if the project needs repeatable end-to-end coverage. Avoid introducing a broad test stack or snapshotting every presentational component. Do not claim Safari/Firefox checks unless those browsers were actually exercised.

## 12. UI completion definition

The UI phase is complete when all intended sections are implemented, visually coherent with the primary Figma, responsive, keyboard accessible, and backed by the meaningful checks above. Navigation, selection, FAQ, and form previews must work. The page must use approved copy and real assets, contain no misleading proof or submission claims, and keep preview indexing disabled.

Handoff includes the local preview, source organised under the named folders, an updated `DESIGN.md`, and `docs/UI-VERIFICATION.md` listing actual checks and remaining limitations. Live integrations and deployment are a separately scoped next phase.

## 13. Decisions that can safely remain open

- **Exact visual extraction:** connector edit access or exported specifications are needed before claiming a precise Figma match; browser review still supports planning.
- **Advanced duration:** keep it unpublished; this does not block orientation UI.
- **Real reviews:** build the component and empty state; supplied reviews can be added later.
- **Primary CTA:** free-call UI remains the working assumption from both references; its service integration is deferred.
- **Domain, scheduler, mail provider, analytics, policies, and pricing:** not dependencies for this UI-only phase.

No new backend or production-service decisions are required to complete this plan.
