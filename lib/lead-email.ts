import { legalMatterLabels, type Lead } from "./leads";

const RESEND_API_URL = "https://api.resend.com/emails";
const DEFAULT_SUBJECT =
  "You have received a lead from KidderminsterSolicitors.co.uk";
const CONFIRMATION_SUBJECT = "We’ve received your solicitor enquiry";
export const DEFAULT_REPLY_TO_EMAIL = "leads@kidderminstersolicitors.co.uk";

type LeadNotificationConfig = {
  apiKey?: string;
  from: string;
  partnerEmail: string;
  adminEmail?: string;
  fallbackReplyTo?: string;
};

type LeadConfirmationConfig = {
  apiKey?: string;
  from: string;
  replyTo?: string;
};

type ResendEmailPayload = {
  from: string;
  to: string[];
  cc?: string[];
  reply_to: string;
  subject: string;
  text: string;
  html: string;
};

function yesNo(value: boolean) {
  return value ? "Yes" : "No";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function compact(values: string[]) {
  return values.map((value) => value.trim()).filter(Boolean);
}

function uniqueEmails(values: string[]) {
  return Array.from(new Set(compact(values).map((value) => value.toLowerCase())));
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function safeReplyTo(value: string, fallback = DEFAULT_REPLY_TO_EMAIL) {
  return isValidEmail(value) ? value.trim().toLowerCase() : fallback;
}

function buildRows(lead: Lead) {
  return [
    ["Name", lead.name],
    ["Email", lead.email],
    ["Phone", lead.phone],
    ["Address", lead.address || "Not provided"],
    ["Postcode", lead.postcode],
    ["Legal matter type", legalMatterLabels[lead.legalMatterType]],
    ["Preferred contact time", lead.preferredContactTime || "Not specified"],
    ["Already contacted a solicitor?", lead.hasContactedSolicitor],
    ["Urgency", lead.enquiryUrgency],
    ["Matter stage", lead.matterStage],
    ["Brief description", lead.message],
    ["Source page", lead.sourcePage || "Not captured"],
    ["UTM source", lead.utmSource],
    ["UTM medium", lead.utmMedium],
    ["UTM campaign", lead.utmCampaign],
    ["UTM term", lead.utmTerm],
    ["UTM content", lead.utmContent],
    ["Submitted at", lead.leadTimestamp],
    ["Consent accepted", yesNo(lead.consentAccepted)],
    ["Referral disclosure accepted", yesNo(lead.disclosureAccepted)],
  ].filter(([, value]) => value !== "");
}

export function buildLeadNotificationEmail(
  lead: Lead,
  config: LeadNotificationConfig,
): ResendEmailPayload {
  const to = uniqueEmails([config.partnerEmail]);
  const cc = uniqueEmails([config.adminEmail || ""]).filter(
    (email) => !to.includes(email),
  );
  const rows = buildRows(lead);
  const text = [
    DEFAULT_SUBJECT,
    "",
    "A new quote request has been submitted through KidderminsterSolicitors.co.uk.",
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "This enquiry may be suitable for solicitor partner follow-up. Please handle the user's personal data carefully and in line with your own data protection obligations.",
  ].join("\n");
  const htmlRows = rows
    .map(
      ([label, value]) =>
        `<tr><th align="left" style="padding:8px 12px;border-bottom:1px solid #d8e2ea;color:#071827;"><strong>${escapeHtml(
          label,
        )}:</strong></th><td style="padding:8px 12px;border-bottom:1px solid #d8e2ea;color:#1f2933;">${escapeHtml(
          value,
        )}</td></tr>`,
    )
    .join("");

  return {
    from: config.from,
    to,
    cc: cc.length > 0 ? cc : undefined,
    reply_to: safeReplyTo(lead.email, config.fallbackReplyTo),
    subject: DEFAULT_SUBJECT,
    text,
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.5;color:#1f2933;">
        <h1 style="font-size:20px;color:#071827;">New Kidderminster Solicitors lead</h1>
        <p>A new quote request has been submitted through KidderminsterSolicitors.co.uk.</p>
        <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;max-width:720px;border:1px solid #d8e2ea;">
          ${htmlRows}
        </table>
        <p style="margin-top:18px;color:#667085;font-size:13px;">
          This enquiry may be suitable for solicitor partner follow-up. Please handle the user's personal data carefully and in line with your own data protection obligations.
        </p>
      </div>
    `,
  };
}

export function buildLeadConfirmationEmail(
  lead: Lead,
  config: LeadConfirmationConfig,
): ResendEmailPayload {
  const summaryRows = [
    ["Legal matter type", legalMatterLabels[lead.legalMatterType]],
    ["Postcode", lead.postcode],
    ["Preferred contact time", lead.preferredContactTime],
    ["Urgency", lead.enquiryUrgency],
    ["Matter stage", lead.matterStage],
    ["Already contacted a solicitor", lead.hasContactedSolicitor],
  ];
  const text = [
    `Hello ${lead.name},`,
    "",
    "Thank you for submitting your enquiry through Kidderminster Solicitors.",
    "",
    "We’ve received the details you provided and may pass your enquiry to a suitable solicitor partner where appropriate.",
    "",
    "You are under no obligation to instruct any solicitor or legal service provider who contacts you.",
    "",
    "Your enquiry summary:",
    "",
    ...summaryRows.map(([label, value]) => `- ${label}: ${value}`),
    "",
    "Brief description:",
    "",
    lead.message,
    "",
    "Please note: Kidderminster Solicitors is an independent legal information and solicitor introduction website. We are not a law firm and do not provide legal advice.",
    "",
    "Kind regards,",
    "Kidderminster Solicitors",
  ].join("\n");
  const htmlRows = summaryRows
    .map(
      ([label, value]) =>
        `<li><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value)}</li>`,
    )
    .join("");

  return {
    from: config.from,
    to: [lead.email],
    reply_to: config.replyTo || DEFAULT_REPLY_TO_EMAIL,
    subject: CONFIRMATION_SUBJECT,
    text,
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#1f2933;max-width:680px;">
        <p>Hello ${escapeHtml(lead.name)},</p>
        <p>Thank you for submitting your enquiry through Kidderminster Solicitors.</p>
        <p>We’ve received the details you provided and may pass your enquiry to a suitable solicitor partner where appropriate.</p>
        <p>You are under no obligation to instruct any solicitor or legal service provider who contacts you.</p>
        <h2 style="font-size:18px;color:#071827;">Your enquiry summary</h2>
        <ul>${htmlRows}</ul>
        <h2 style="font-size:18px;color:#071827;">Brief description</h2>
        <p>${escapeHtml(lead.message)}</p>
        <p style="margin-top:18px;color:#667085;font-size:13px;">
          Please note: Kidderminster Solicitors is an independent legal information and solicitor introduction website. We are not a law firm and do not provide legal advice.
        </p>
        <p>Kind regards,<br />Kidderminster Solicitors</p>
      </div>
    `,
  };
}

async function sendResendEmail(payload: ResendEmailPayload, apiKey?: string) {
  if (!apiKey) {
    throw new Error("Resend email is not configured.");
  }

  const response = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    let details = response.statusText;

    try {
      const json = await response.json();
      if (typeof json.message === "string") {
        details = json.message;
      } else if (typeof json.error === "string") {
        details = json.error;
      }
    } catch {
      // Keep the HTTP status text when Resend returns a non-JSON error.
    }

    throw new Error(`Resend email failed: ${response.status} ${details}`);
  }
}

export async function sendLeadNotificationEmail(
  lead: Lead,
  config: LeadNotificationConfig,
) {
  if (!config.apiKey || !config.partnerEmail || !config.from) {
    throw new Error("Lead notification email is not configured.");
  }

  await sendResendEmail(buildLeadNotificationEmail(lead, config), config.apiKey);
}

export async function sendLeadConfirmationEmail(
  lead: Lead,
  config: LeadConfirmationConfig,
) {
  if (!config.apiKey || !config.from) {
    throw new Error("Lead confirmation email is not configured.");
  }

  await sendResendEmail(buildLeadConfirmationEmail(lead, config), config.apiKey);
}
