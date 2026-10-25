import "server-only";
import nodemailer, {
  type Transporter,
  type SMTPSentMessageInfo,
} from "nodemailer";
import { coach } from "@/content/coach";
import { sessionOptions } from "@/content/sessions";
import { validateContactDraft } from "@/lib/form-validation";
import type { Enquiry } from "@/types/forms";
import { renderEnquiryEmail } from "@/lib/server/enquiry-email";

let transport: Transporter<SMTPSentMessageInfo> | undefined;

function getTransport() {
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_APP_PASSWORD?.replace(/\s/g, "");
  if (
    !user ||
    validateContactDraft({ email: user, message: "SMTP" }).email ||
    !pass
  ) {
    throw new Error("Email configuration is incomplete.");
  }
  transport ??= nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: { user, pass },
    dnsTimeout: 5_000,
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
    disableFileAccess: true,
    disableUrlAccess: true,
  });
  return { transport, user };
}

export async function sendEnquiry(enquiry: Enquiry): Promise<void> {
  const { transport, user } = getTransport();
  const session =
    enquiry.kind === "coaching"
      ? sessionOptions.find((option) => option.id === enquiry.sessionType)
      : undefined;
  const subject = session
    ? `TRYHRD coaching enquiry: ${session.label}`
    : "TRYHRD contact enquiry";
  const text = [
    enquiry.kind === "coaching"
      ? "New coaching enquiry"
      : "New contact message",
    "",
    ...(enquiry.kind === "coaching" ? [`Name: ${enquiry.name}`] : []),
    `Email: ${enquiry.email}`,
    ...(session ? [`Interest: ${session.label}`] : []),
    "",
    "Message:",
    enquiry.message || "(No additional message)",
    "",
    ...(session ? ["This is an enquiry; no session has been booked.", ""] : []),
    "Reply to this email to respond directly to the customer.",
    "",
    `Sent from the ${coach.brand} website.`,
  ].join("\n");

  const info = await transport.sendMail({
    from: { name: `${coach.brand} / ${coach.name}`, address: user },
    to: { name: coach.name, address: coach.email },
    replyTo: { address: enquiry.email },
    subject,
    text,
    html: renderEnquiryEmail(enquiry, session?.label),
  });
  if (
    !info.accepted.some(
      (address) => address.toLowerCase() === coach.email.toLowerCase(),
    )
  ) {
    throw new Error("Email recipient was not accepted.");
  }
}
