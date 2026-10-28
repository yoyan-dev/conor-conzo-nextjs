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

Both forms use one submission flow: they validate locally, then submit to the email enquiry endpoint. They show success only after the server accepts delivery, and preserve entered details when delivery fails.

Copy `.env.example` to `.env.local`. Email uses two server-only settings:

```dotenv
SMTP_USER=
SMTP_APP_PASSWORD=
```

Configure the authenticating Gmail account and a newly generated Google App Password, then restart the server. Google App Passwords require 2-Step Verification. Keep credentials in local or hosting secrets; never commit them or prefix them with NEXT_PUBLIC_. Do not reuse credentials from another repository.

Gmail's SMTP host and port are fixed in code: smtp.gmail.com:587 with STARTTLS required. Notifications go to `coach.email` in `src/content/coach.ts`, as configured in that content file. The authenticated account is the sender; the visitor's validated email is Reply-To. Each submission sends one coach notification with plain-text and escaped HTML versions. It sends no visitor autoresponder, calendar invitation, booking confirmation, or payment request.

The existing `SITE_URL` must be the confirmed HTTPS origin in production. Requests from other origins are rejected. Local development can use its own request origin without SITE_URL. Static coaching content stays in Server Components.

Messages are emailed to the coach so they can respond. The app does not store enquiries in a database. Visitors are asked to avoid sensitive health information. SMTP acceptance does not guarantee final inbox delivery; failed or uncertain submissions preserve entered details and provide the email fallback. There are no automatic retries.

## API and abuse controls

`POST /api/enquiries` accepts contact or coaching enquiries. The Node.js Route Handler independently validates types, lengths, allowed session IDs, and fixed payload fields. It rejects arbitrary recipient/header overrides, filled honeypots, non-JSON input, foreign origins, and request bodies over 16 KiB.

A bounded process-local limiter allows at most 10 same-origin JSON attempts per visitor in a rolling minute across both forms. On Vercel it uses the platform's trusted client-IP header and keeps only salted identity hashes in memory. Other hosts share a local fallback bucket rather than trusting arbitrary proxy headers. It does not persist across restarts or coordinate between instances. Before deployment, configure the single Hobby-compatible WAF rule in [the Vercel guide](docs/VERCEL-DEPLOYMENT.md). Its counters are shared within each region, not a strict worldwide quota. Origin checks and honeypots alone do not stop automated clients. No additional service or environment variables are introduced by this implementation.

Missing SMTP configuration or a production origin fails with explicit error feedback. Configure SMTP secrets only in environments intended to send email; there is no separate form mode. Do not deploy on an Edge-only or static-export host; Gmail SMTP requires outbound TCP from a Node.js runtime.

## Validation

```sh
npm run lint
npm run typecheck
npm run build
npm run check
```

For a real delivery check, configure your own credentials locally, submit once with controlled content, inspect the received coach notification, and verify Reply addresses the visitor. Lint, typechecking, and builds do not establish actual Gmail delivery.

GitHub Actions runs lint, TypeScript, and a production build on pull requests and main/dev pushes. Temporary behavioural tests and their dedicated dependencies are removed after verification at the owner's request. Manual interaction checks and deployment requirements are in [docs/VERCEL-DEPLOYMENT.md](docs/VERCEL-DEPLOYMENT.md).

To measure a running production build with locally installed Chrome, run `npm run audit:performance -- http://localhost:3000 mobile` (or `desktop`). Set `CHROME_PATH` if Chrome is not discovered. HTML and JSON reports go into `.reports/`; no paid monitoring service is needed.

## Content and deployment

Indexing remains disabled by default and independent of email. Set the existing SITE_URL and ENABLE_INDEXING only for the final website. Vercel preview deployments remain noindex.

Advanced orientation duration remains unresolved. This integration preserves the existing testimonial content. Scheduling, payments, durable queues, delivery webhooks, analytics, and deployment are deferred.

Architecture ownership and styling contracts are documented in [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md). Vercel Hobby feature compatibility does not establish commercial-use eligibility: Hobby is limited to personal, non-commercial use. See [the deployment guide](docs/VERCEL-DEPLOYMENT.md) before launching this coaching site.

## Project map

- `src/components/forms`: contact and coaching form UI, notices, and accessible feedback.
- `src/hooks/use-enquiry-submission.ts`: submission state, draft preservation, and errors.
- `src/app/api/enquiries/route.ts`: Node.js submission endpoint.
- `src/lib/server`: private request handling and Gmail delivery.
- `src/lib/enquiry-validation.ts`: strict payload validation using existing field rules.
- `src/content/coach.ts` and `src/content/sessions.ts`: approved coach details and session choices.
- `src/lib/server/enquiry-rate-limit.ts`: bounded local rate-limit backstop.
- `docs/ARCHITECTURE.md`: ownership, state, styling, and maintenance contracts.
- `docs/VERCEL-DEPLOYMENT.md`: Hobby-compatible settings, firewall rule, and manual release checks.
