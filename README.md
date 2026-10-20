# TRYHRD / Coach Conzo

Next.js 16 App Router, React 19, HeroUI v3, Tailwind CSS v4, and strict TypeScript. The existing homepage is a foundation preview, not a claim of complete Figma implementation. The supplied portrait and structured coaching copy remain the content sources.

## Run

Use Node.js 22 or newer.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. For a production build, run `npm run build` and `npm run start`.

## Contact and coaching enquiries

Both forms support local preview and optional Gmail delivery. Preview is the default: validation and feedback happen locally, with no submission request. Vercel preview deployments always use preview mode, even if live mode was configured.

Copy `.env.example` to `.env.local`. Only three settings are added for email:

```dotenv
FORM_MODE=preview
SMTP_USER=
SMTP_APP_PASSWORD=
```

To enable real enquiries, set `FORM_MODE=live`, fill in the authenticating Gmail account and a newly generated Google App Password, and restart the server. Google App Passwords require 2-Step Verification. Keep credentials in local or hosting secrets; never commit them or prefix them with NEXT_PUBLIC_. Do not reuse credentials from another repository.

Gmail's SMTP host and port are fixed in code: smtp.gmail.com:587 with STARTTLS required. Notifications go to `coach.email` in `src/content/coach.ts`, currently coachconzo@gmail.com. The authenticated account is the sender; the visitor's validated email is Reply-To. Each submission sends one plain-text coach notification. It sends no visitor autoresponder, calendar invitation, booking confirmation, or payment request.

The existing `SITE_URL` must be the confirmed HTTPS origin when running production live mode. Requests from other origins are rejected. Local development can use its own request origin without SITE_URL. The form mode is resolved on the server per request, so restarting with a new mode does not require rebuilding. Static coaching content stays in Server Components.

Messages are emailed to the coach so they can respond. The app does not store enquiries in a database. Visitors are asked to avoid sensitive health information. SMTP acceptance does not guarantee final inbox delivery; failed or uncertain submissions preserve entered details and provide the email fallback. There are no automatic retries.

## API and abuse controls

`POST /api/enquiries` accepts contact or coaching enquiries. The Node.js Route Handler independently validates types, lengths, allowed session IDs, and fixed payload fields. It rejects arbitrary recipient/header overrides, filled honeypots, non-JSON input, foreign origins, and request bodies over 16 KiB.

A small process-wide limiter allows at most 10 same-origin JSON attempts per minute across both forms. It does not persist across server restarts or coordinate between instances. Before public live deployment, configure a shared rate limit in the hosting firewall or gateway. Origin checks and honeypots alone do not stop automated clients. No additional service or environment variables are introduced by this implementation.

Live mode without complete SMTP configuration or a production origin fails with explicit error feedback; it never reports preview success. Other hosting providers must explicitly configure preview deployments with FORM_MODE=preview and omit SMTP secrets. Do not deploy on an Edge-only or static-export host; Gmail SMTP requires outbound TCP from a Node.js runtime.

## Validation

```sh
npm run lint
npm run typecheck
npm run build
npm run test:unit
npm run test:e2e
npm run test:e2e:live
```

Unit tests mock SMTP, including rejection and missing configuration. Browser tests cover preview conversion paths, live submitting/success/error states, session selection, mobile layout, and accessibility. Live browser tests intercept the API and start their server with empty SMTP credentials; no test sends real email. Browser tests require the production build and Chrome on Windows (Chromium elsewhere).

For a real delivery check, configure your own credentials locally, submit once with controlled content, inspect the received coach notification, and verify Reply addresses the visitor. Automated checks do not establish actual Gmail delivery.

## Content and deployment

Indexing remains disabled by default and independent of email. Set the existing SITE_URL and ENABLE_INDEXING only for the final website. Vercel preview deployments remain noindex. Optional BOOKING_URL behavior is unchanged.

Advanced orientation duration remains unresolved. This integration preserves the existing testimonial content. Scheduling, payments, durable queues, delivery webhooks, analytics, and deployment are deferred.

AGENTS.md references PRODUCT.md, DESIGN.md, docs/UI-DEVELOPMENT-PLAN.md, docs/PROJECT-PLAN.md, and docs/source-copy.txt, which are missing from this checkout. Restore those sources before further design or editorial work.

## Project map

- `src/components/forms`: contact and coaching form UI, notices, and accessible feedback.
- `src/hooks/use-enquiry-submission.ts`: local previews and live submission states.
- `src/app/api/enquiries/route.ts`: Node.js submission endpoint.
- `src/lib/server`: private form-mode, request handling, and Gmail delivery.
- `src/lib/enquiry-validation.ts`: strict payload validation using existing field rules.
- `src/content/coach.ts` and `src/content/sessions.ts`: approved coach details and session choices.
- `docs/NODEMAILER-IMPLEMENTATION-PLAN.md`: simplified implementation record and remaining activation work.
