# Email enquiry implementation

Contact and coaching forms use one submission flow, without a live/preview switch.

## Configuration

Set server-only SMTP_USER and SMTP_APP_PASSWORD through local or hosting secrets. The example file contains empty placeholders. Never expose these values through NEXT_PUBLIC_ variables or commit credentials.

Gmail SMTP host (smtp.gmail.com), port (587), and STARTTLS are fixed in server code. The authenticated account is From, coach.email is To, and the validated visitor email is Reply-To. Production requires the existing confirmed HTTPS SITE_URL; development can use its request origin. Configure SMTP secrets only where email delivery is intended. Indexing controls remain independent.

## Flow

1. Forms validate required fields locally before POST /api/enquiries.
2. The server checks origin, JSON content type, a streamed 16 KiB body limit, a honeypot, allowed fields/session IDs, and a process-wide rate limit.
3. A server-only Nodemailer transport sends one HTML notification with a plain-text fallback to the coach. The email uses a simple heading, labeled customer details, and a message separated by a subtle divider. The customer address is a standard mailto link, and Reply-To supports replying directly to the customer through the email client. Submitted HTML content is escaped. Success requires recipient acceptance; failures never expose private SMTP details.
4. Forms announce pending, success, and error states. Drafts survive failure; changing details or coaching selection invalidates stale feedback. An enquiry never confirms a booking.

## Validation

Run npm run lint, npm run typecheck, and npm run build.

## Deferred work

Scheduling, payment, visitor autoresponders, deployment, durable queues, and delivery tracking remain deferred. The process-wide rate limiter is not shared across instances; configure shared protection in the hosting firewall or gateway before public deployment.

The referenced PRODUCT.md, DESIGN.md, docs/UI-DEVELOPMENT-PLAN.md, docs/PROJECT-PLAN.md, and docs/source-copy.txt are absent from this checkout. Recover them before further design or editorial changes.
