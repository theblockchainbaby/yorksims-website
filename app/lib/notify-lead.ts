import nodemailer from "nodemailer";

/**
 * Emails York when someone submits a form on the site.
 *
 * Sends through Gmail SMTP as LEAD_NOTIFY_USER (an app password, not the
 * account password) to LEAD_NOTIFY_TO. Plain text only, so nothing a visitor
 * types can render as HTML. Never throws: a failed notice must not fail the
 * visitor's submission. Returns true when the email went out.
 */
const LABELS: Record<string, string> = {
  "team-order": "Team order request",
  "memoir-list": "Memoir list signup",
  "intro-pdf": "Intro PDF download",
};

export async function notifyLead(
  email: string,
  source: string,
  metadata: Record<string, unknown> = {},
  duplicate = false,
  saved = true
): Promise<boolean> {
  const user = process.env.LEAD_NOTIFY_USER;
  const pass = process.env.LEAD_NOTIFY_PASS?.replace(/\s+/g, "");
  const to = process.env.LEAD_NOTIFY_TO || user;
  if (!user || !pass || !to) return false;

  const label = LABELS[source] ?? `Form: ${source}`;
  const lines = [
    `${label} on yorksims.com`,
    "",
    `Email: ${email}`,
    ...Object.entries(metadata).map(([k, v]) => `${k}: ${String(v ?? "").slice(0, 2000)}`),
    "",
    duplicate ? "This email has submitted this form before." : "",
    saved ? "Also saved to Supabase > leads table." : "NOT saved to Supabase (database unreachable). This email is the only record.",
  ];

  try {
    const transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user, pass },
    });
    await transport.sendMail({
      from: `yorksims.com <${user}>`,
      to,
      replyTo: email,
      subject: `${label}: ${email}`,
      text: lines.filter((l, i, a) => l !== "" || a[i - 1] !== "").join("\n"),
    });
    return true;
  } catch (err) {
    console.error("[leads] notify failed", err instanceof Error ? err.message : err);
    return false;
  }
}
