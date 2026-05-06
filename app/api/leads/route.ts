import { NextResponse } from "next/server";
import { submitLeadToKit } from "../../../lib/kit";
import {
  DEFAULT_REPLY_TO_EMAIL,
  sendLeadConfirmationEmail,
  sendLeadNotificationEmail,
} from "../../../lib/lead-email";
import { validateLeadPayload } from "../../../lib/leads";

const DEFAULT_LEAD_NOTIFICATION_FROM =
  "Kidderminster Solicitors <leads@kidderminstersolicitors.co.uk>";

function normaliseLeadNotificationFrom(value: string | undefined) {
  const trimmed = (value || "").trim().replace(/^["']|["']$/g, "");

  if (!trimmed || trimmed.includes("onboarding@resend.dev")) {
    return DEFAULT_LEAD_NOTIFICATION_FROM;
  }

  return trimmed;
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, errors: ["Invalid JSON payload."] },
      { status: 400 },
    );
  }

  const validation = validateLeadPayload(body);

  if (!validation.ok) {
    return NextResponse.json(
      { ok: false, errors: validation.errors },
      { status: 400 },
    );
  }

  const apiKey = process.env.KIT_API_KEY;
  const resendApiKey = process.env.RESEND_API_KEY;
  const leadNotificationFrom = normaliseLeadNotificationFrom(
    process.env.LEAD_NOTIFICATION_FROM,
  );
  const leadConfirmationFrom = normaliseLeadNotificationFrom(
    process.env.LEAD_CONFIRMATION_FROM || leadNotificationFrom,
  );
  const partnerLeadEmail = process.env.PARTNER_LEAD_EMAIL;
  const adminLeadEmail = process.env.ADMIN_LEAD_EMAIL;

  if (!apiKey || !resendApiKey || !partnerLeadEmail) {
    return NextResponse.json(
      { ok: false, errors: ["Lead capture is not configured yet."] },
      { status: 503 },
    );
  }

  try {
    await submitLeadToKit(validation.lead, { apiKey });
    await sendLeadNotificationEmail(validation.lead, {
      apiKey: resendApiKey,
      from: leadNotificationFrom,
      partnerEmail: partnerLeadEmail,
      adminEmail: adminLeadEmail,
      fallbackReplyTo: DEFAULT_REPLY_TO_EMAIL,
    });
    await sendLeadConfirmationEmail(validation.lead, {
      apiKey: resendApiKey,
      from: leadConfirmationFrom,
      replyTo: DEFAULT_REPLY_TO_EMAIL,
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Lead capture failed", error);
    return NextResponse.json(
      { ok: false, errors: ["Lead capture failed. Please try again."] },
      { status: 502 },
    );
  }
}
