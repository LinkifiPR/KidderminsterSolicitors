import { NextResponse } from "next/server";
import { submitLeadToKit } from "../../../lib/kit";
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

  if (!apiKey) {
    return NextResponse.json(
      { ok: false, errors: ["Lead capture is not configured yet."] },
      { status: 503 },
    );
  }

  try {
    await submitLeadToKit(validation.lead, { apiKey, formId });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, errors: ["Lead capture failed. Please try again."] },
      { status: 502 },
    );
  }
}
