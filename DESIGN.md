# TRYHRD Design System

## Source priority

Primary visual design: https://www.figma.com/design/iP7VbSVY0JB6hOmDLLPTb5/Untitled?node-id=14-56
Copy: docs/source-copy.txt, from the supplied Google Doc.
Inspiration only: https://www.figma.com/make/7K0G5BFSIaAR1BXVdZftzH/Landing-page
Portrait: user-supplied public/images/coach-conzo.png.

The user clarified the source priority on 2026-10-14 after confirming the dark monochrome direction with usability improvements. The main frame includes restrained blue in the wordmark, one headline word, and a backlight behind the portrait. Preserve its composition; use the updated document headline rather than stale design copy.

## Observed primary design

Desktop - 1 is 1440 x 4275. The latest selected node 14:56 is an image layer of the FAQ region within the desktop frame; browser inspection shows 1493 x 449. The earlier node 3:89 selected the Online Coaching panel. Use the containing desktop frame for the full-page composition. The hero has the real coach on the left and centred introduction/headline/actions on the right. The masthead is compact. A secondary navigation strip separates the hero from services. Four flat service columns are followed by three orientation choices, two-column booking, and FAQ rows. The supplied main frame ends after FAQ. Extend its system for genuine testimonials, contact, and footer.

Dark surfaces, bright heavy sans headings, muted gray copy, pill actions, generous section gaps, and thin separators form the visual system. Improve the visible low-contrast text, small controls, mobile reflow, and anchor destinations. The inspiration uses Raleway 900, but the primary font is not yet verified.

## Inspection limit

Browser visual review is complete. Figma get_design_context returned an edit-access requirement. Exact font, layer, asset, and Code Connect properties are unverified. The current page is a small independent foundation preview using a system font, not the full Figma implementation. Do not claim an exact match until layer extraction and rendered comparison are complete.

## Planned engineering tokens

These are proposed accessible implementation tokens, not extracted exact Figma values.

- Background: oklch(0.12 0.005 260)
- Surface: oklch(0.17 0.005 260)
- Foreground: oklch(0.97 0.005 260)
- Muted foreground: oklch(0.74 0.005 260)
- Divider: oklch(0.32 0.005 260)
- Blue accent: oklch(0.73 0.14 254), restrained
- Pill action: off-white with dark text; clear outlined secondary
- Content width: approximately 1240px, responsive gutters 20-64px
- Display: fluid 40-88px after font verification; body 16-18px / 1.6
- Important touch controls: at least 44px

Use one licensed, self-hosted font if it matches verified design properties. Use the provided portrait with natural aspect ratio, explicit space, responsive sizes, and Next Image. No generated image is required.

## Interaction and responsiveness

Server-render long content. Use HeroUI for interactive controls. Keep client boundaries small. Selection must have visible and semantic state. Anchors need sticky-header offsets. Stack the hero and flat columns for narrow screens while keeping the CTA visible. Use opacity/transform motion only where useful, respect reduced motion, and avoid entrance effects that delay the main content.

## Current UI scope

Follow docs/UI-DEVELOPMENT-PLAN.md for the frontend-only implementation plan, component structure, and naming. Use Figma Make for interaction ideas and visual-system extensions where the main design is incomplete. Booking/contact forms are explicitly local previews; no backend, email delivery, or scheduling integration is required in this phase.

## Outstanding choices

Primary conversion is provisionally the free discovery call. Advanced duration remains unpublished. Reviews remain empty until sourced. Integration details and exact visual values are dependencies of later phases; see docs/PROJECT-PLAN.md.
