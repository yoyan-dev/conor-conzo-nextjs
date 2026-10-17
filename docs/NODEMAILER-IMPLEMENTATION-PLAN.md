# Nodemailer implementation plan and record

The implementation follows the explored repository's Gmail SMTP setup using Nodemailer directly in Next.js. The simplified configuration agreed with the user supersedes the earlier provider-configurable plan.

## Implemented configuration

Only two mail credentials and the preview/live switch are added:

```dotenv
FORM_MODE=preview
SMTP_USER=
SMTP_APP_PASSWORD=
```

The Gmail host (smtp.gmail.com), port (587), and required STARTTLS are fixed in server code. The authenticated Gmail account supplies From. The existing coach.email supplies To. The visitor's validated email supplies Reply-To. A new Google App Password is required; credentials from the reference repository must never be copied.

The existing SITE_URL setting supplies the allowed HTTPS origin in production. Development supports the local request origin. FORM_MODE defaults to preview, and Vercel previews always stay in preview. The homepage resolves the public mode on the server per request; SMTP credentials never enter client code.

## Implemented flow

1. In preview mode, the existing client forms validate locally and show explicit no-request-sent feedback. A direct API call cannot send mail in preview mode.
2. In live mode, contact and coaching forms submit JSON to POST /api/enquiries.
3. The server checks origin, JSON content type, a 16 KiB streamed body limit, a honeypot, and strict field/type/length validation. Unknown fields and session choices are rejected.
4. A cached, server-only Nodemailer transport sends one plain-text notification to Coach Conzo. Coaching interest is mapped to a server-controlled session label; no unresolved duration is invented.
5. Success is returned only when SMTP accepts the coach recipient. Thrown delivery errors are caught and private SMTP details are neither logged nor returned.
6. Forms announce pending, success, and failure states, preserve drafts on failure, and invalidate feedback when details or session selection change. An enquiry never confirms a booked session.

## Implementation files

- src/lib/server/form-mode.ts: preview/live gate.
- src/lib/server/mailer.ts: fixed Gmail transport and notification composition.
- src/lib/server/enquiry-handler.ts: request processing and safe responses.
- src/app/api/enquiries/route.ts: Node.js Route Handler.
- src/lib/enquiry-validation.ts and src/lib/form-validation.ts: payload and field rules.
- src/types/forms.ts: shared payload/result types.
- src/hooks/use-enquiry-submission.ts: client submission state and stale-result handling.
- src/components/forms: form integration, notices, honeypots, and feedback.
- src/app/page.tsx and the booking/contact sections: pass only the resolved public mode.
- .env.example, AGENTS.md, README.md: setup instructions and updated authorized scope.

## Abuse protection and limits

A bounded process-wide limiter permits 10 same-origin JSON attempts per minute across both forms. This is intentionally simple and introduces no service credentials. It resets on process restart and is not shared across instances. Before publicly enabling live email, add a shared rate limit in the hosting firewall or gateway; exact configuration depends on the chosen host. Origin validation is not bot authentication.

There is no durable storage, outbox, automatic resend, or final-delivery tracking. A timeout may leave delivery uncertain, so feedback directs the visitor to check by email before resubmitting. Gmail can impose quotas or block server connections. Scheduling, payment, autoresponders, attachments, and deployment remain outside this phase.

## Validation

Required commands: npm run lint, npm run typecheck, npm run build, npm run test:unit, npm run test:e2e, and npm run test:e2e:live.

Unit tests use mocked delivery for malformed input, size/type/field limits, recipient overrides, origin checks, rate limiting, SMTP failure, Gmail configuration, fixed coach addressing, Reply-To, and missing configuration. Preview browser tests assert no submission requests. Live browser tests mock API delivery and verify pending/success/failure states, preserved drafts, selection changes, mobile layout, and accessibility. Test server environments omit SMTP credentials.

## Remaining activation work

- Supply the authenticating Gmail account and a new App Password through local/hosting secrets.
- Confirm the existing coach.email as the receiving inbox and configure the existing SITE_URL for production.
- Confirm the Node.js host permits outbound Gmail SMTP and configure a shared hosting rate limit.
- Perform one controlled real email check and inspect the notification and Reply target before public activation.
- Keep preview deployments in preview mode and retain independent indexing controls.

The referenced PRODUCT.md, DESIGN.md, docs/UI-DEVELOPMENT-PLAN.md, docs/PROJECT-PLAN.md, and docs/source-copy.txt are absent from this checkout. The functional integration preserves existing layout and structured content; recover those documents before further design or editorial changes.

## Sources

- [Reference mail helper](https://github.com/kleinpetr/nuxt-nodemailer/blob/v1.1.2/src/runtime/server/useNodeMailer.ts)
- [SMTP transport and verification](https://nodemailer.com/smtp)
- [Gmail authentication and limitations](https://nodemailer.com/guides/using-gmail)
- [Next.js Route Handlers](https://nextjs.org/docs/app/api-reference/file-conventions/route)

## Verification record

- npm run lint: passed with two existing unused-variable warnings in orientation-option.tsx and services-section.tsx.
- npm run typecheck and npm run build: passed.
- npm run test:unit: 24 passed; no SMTP connections were made.
- Final targeted preview browser checks: 4 passed, including no-request behavior and the no-JavaScript GET guard.
- npm run test:e2e:live: 5 passed, including mobile accessibility and missing credentials; delivery was mocked or disabled.
- Full preview UI suite: 28 passed and 3 failed. Two failures target service links already commented out in the committed services-section.tsx; this integration leaves that existing design choice intact. The third was the desktop scroll-reveal check, which passed on an isolated rerun alongside its mobile variant.
- Automated accessibility checks passed at mobile and desktop sizes; responsive and reduced-motion checks passed. Desktop contact and mobile live-feedback screenshots were inspected.
- Final browser assets contain no SMTP host, SMTP_APP_PASSWORD reference, or server enquiry handler. git diff --check passed.

No real Gmail delivery was attempted. Supply your own credentials and complete the controlled delivery check described above before public activation.
