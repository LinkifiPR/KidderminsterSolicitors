import { NextResponse } from "next/server";
import { submitLeadToKit } from "../../../lib/kit";
import { sendLeadNotificationEmail } from "../../../lib/lead-email";
import { validateLeadPayload } from "../../../lib/leads";

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
  const formId = process.env.KIT_FORM_ID || "9391183";
  const resendApiKey = process.env.RESEND_API_KEY;
  const leadNotificationFrom =
    process.env.LEAD_NOTIFICATION_FROM ||
    "Kidderminster Solicitors <onboarding@resend.dev>";
  const partnerLeadEmail = process.env.PARTNER_LEAD_EMAIL;
  const adminLeadEmail = process.env.ADMIN_LEAD_EMAIL;

  if (!apiKey || !resendApiKey || !partnerLeadEmail) {
    return NextResponse.json(
      { ok: false, errors: ["Lead capture is not configured yet."] },
      { status: 503 },
    );
  }

  try {
    await sendLeadNotificationEmail(validation.lead, {
      apiKey: resendApiKey,
      from: leadNotificationFrom,
      partnerEmail: partnerLeadEmail,
      adminEmail: adminLeadEmail,
    });
  } catch (error) {
    console.error("Lead notification failed", error);
    return NextResponse.json(
      { ok: false, errors: ["Lead notification failed. Please try again."] },
      { status: 502 },
    );
  }

  try {
    await submitLeadToKit(validation.lead, { apiKey, formId });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Kit lead capture failed after notification email", error);
    return NextResponse.json({
      ok: true,
      warnings: ["Subscriber capture needs review."],
    });
  }
}
