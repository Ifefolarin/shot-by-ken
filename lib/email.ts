import { Resend } from "resend";
import type { ContactFormData } from "./sanitize";

// Lazy-initialize so the constructor never runs at build time (only at call time).
function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY environment variable is not set.");
  return new Resend(key);
}

const SERVICE_LABELS: Record<string, string> = {
  studio:   "Studio Session",
  events:   "Events",
  weddings: "Wedding",
  other:    "Other",
};

export async function sendContactEmail(data: ContactFormData): Promise<void> {
  const { name, email, phone, service, date, message } = data;

  await getResend().emails.send({
    from:    "Shot by Ken Website <no-reply@shottbyken.ca>",
    to:      [process.env.CONTACT_EMAIL!],
    replyTo: email,
    subject: `New booking enquiry from ${name}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a">
        <h2 style="border-bottom:1px solid #c4c7c7;padding-bottom:16px">
          New Booking Enquiry
        </h2>
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:8px 0;color:#444748;width:140px">Name</td>
              <td style="padding:8px 0"><strong>${name}</strong></td></tr>
          <tr><td style="padding:8px 0;color:#444748">Email</td>
              <td style="padding:8px 0"><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding:8px 0;color:#444748">Phone</td>
              <td style="padding:8px 0">${phone}</td></tr>
          <tr><td style="padding:8px 0;color:#444748">Service</td>
              <td style="padding:8px 0">${SERVICE_LABELS[service] ?? service}</td></tr>
          ${date ? `<tr><td style="padding:8px 0;color:#444748">Preferred date</td>
              <td style="padding:8px 0">${date}</td></tr>` : ""}
        </table>
        <div style="margin-top:24px">
          <p style="color:#444748;margin:0 0 8px">Message</p>
          <div style="background:#f5f3f3;padding:16px;white-space:pre-wrap">${message}</div>
        </div>
        <p style="color:#747878;font-size:12px;margin-top:32px">
          Sent via shottbyken.ca
        </p>
      </div>
    `,
  });
}

export async function sendErrorAlert(
  error: Error,
  context?: Record<string, unknown>
): Promise<void> {
  await getResend().emails.send({
    from:    "Shot by Ken Alerts <no-reply@shottbyken.ca>",
    to:      [process.env.ALERT_EMAIL!],
    subject: `[Shot by Ken] Site error: ${error.message.slice(0, 80)}`,
    html: `
      <div style="font-family:monospace;max-width:700px;margin:0 auto;color:#1a1a1a">
        <h2 style="color:#ba1a1a">Site Error</h2>
        <p><strong>Message:</strong> ${error.message}</p>
        ${context ? `<p><strong>Context:</strong></p><pre style="background:#f5f3f3;padding:16px;overflow:auto">${JSON.stringify(context, null, 2)}</pre>` : ""}
        <p><strong>Stack:</strong></p>
        <pre style="background:#f5f3f3;padding:16px;overflow:auto;font-size:12px">${error.stack ?? "No stack trace"}</pre>
      </div>
    `,
  });
}
