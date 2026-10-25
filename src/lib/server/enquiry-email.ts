import "server-only";
import { coach } from "@/content/coach";
import type { Enquiry } from "@/types/forms";

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });
}

export function renderEnquiryEmail(
  enquiry: Enquiry,
  sessionLabel?: string,
): string {
  const title =
    enquiry.kind === "coaching"
      ? "New coaching enquiry"
      : "New contact message";
  const email = escapeHtml(enquiry.email);
  // Keep the address separator literal for mail-client compatibility.
  const recipient = encodeURIComponent(enquiry.email).replace(/%40/gi, "@");
  const replyUrl = escapeHtml(`mailto:${recipient}`);
  const message = escapeHtml(
    enquiry.message || "(No additional message)",
  ).replace(/\r\n?|\n/g, "<br />");
  const name =
    enquiry.kind === "coaching" ? escapeHtml(enquiry.name) : undefined;

  return `<!doctype html>
<html lang="en" dir="ltr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="x-apple-disable-message-reformatting" />
  <title>${title} | ${escapeHtml(coach.brand)}</title>
</head>
<body style="margin:0;padding:24px 16px;background-color:#ffffff;color:#202124;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:22px;-webkit-text-size-adjust:100%;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;table-layout:fixed;">
    <tr><td style="overflow-wrap:anywhere;word-break:break-word;">
      <h1 style="margin:0 0 20px;font-size:18px;line-height:26px;font-weight:600;">${title}</h1>
      ${name ? `<p style="margin:0 0 6px;"><strong>Name:</strong> ${name}</p>` : ""}
      <p style="margin:0 0 6px;"><strong>Email:</strong> <a href="${replyUrl}" style="color:#175cd3;text-decoration:underline;">${email}</a></p>
      ${sessionLabel ? `<p style="margin:0 0 6px;"><strong>Interest:</strong> ${escapeHtml(sessionLabel)}</p>` : ""}
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:20px;border-top:1px solid #e4e7ec;table-layout:fixed;">
        <tr><td style="padding-top:20px;overflow-wrap:anywhere;word-break:break-word;">
          <p style="margin:0 0 8px;font-weight:600;">Message</p>
          <p style="margin:0;">${message}</p>
        </td></tr>
      </table>
      ${enquiry.kind === "coaching" ? `<p style="margin:20px 0 0;color:#5f6368;font-size:12px;line-height:19px;">This is an enquiry; no session has been booked.</p>` : ""}
      <p style="margin:20px 0 0;color:#5f6368;font-size:12px;line-height:19px;">Reply to this email to respond directly to the customer.</p>
      <p style="margin:8px 0 0;color:#5f6368;font-size:12px;line-height:19px;">Sent from the ${escapeHtml(coach.brand)} website.</p>
    </td></tr>
  </table>
</body>
</html>`;
}
