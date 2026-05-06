import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "./route";

const validPayload = {
  legalMatterType: "conveyancing",
  name: "Sarah Example",
  phone: "01562 123456",
  email: "sarah@example.com",
  postcode: "DY10 1AA",
  preferredContactTime: "Morning",
  message: "I am buying a house in Kidderminster.",
  consentAccepted: true,
  disclosureAccepted: true,
  sourcePage: "https://kidderminstersolicitors.co.uk/",
};

function request(body: unknown) {
  return new Request("https://kidderminstersolicitors.co.uk/api/leads", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

describe("POST /api/leads", () => {
  const fetchMock = vi.fn();
  const originalEnv = process.env;
  const originalFetch = globalThis.fetch;

  function mockKitSuccess() {
    fetchMock
      .mockResolvedValueOnce(jsonResponse({ subscriber: { id: 123 } }))
      .mockResolvedValueOnce(jsonResponse({ subscriber: { id: 123 } }))
      .mockResolvedValueOnce(jsonResponse({ tag: { id: 10 } }))
      .mockResolvedValueOnce(jsonResponse({ subscriber: { id: 123 } }))
      .mockResolvedValueOnce(jsonResponse({ tag: { id: 11 } }))
      .mockResolvedValueOnce(jsonResponse({ subscriber: { id: 123 } }))
      .mockResolvedValueOnce(jsonResponse({ tag: { id: 12 } }))
      .mockResolvedValueOnce(jsonResponse({ subscriber: { id: 123 } }))
      .mockResolvedValueOnce(jsonResponse({ tag: { id: 13 } }))
      .mockResolvedValueOnce(jsonResponse({ subscriber: { id: 123 } }))
      .mockResolvedValueOnce(jsonResponse({ tag: { id: 14 } }))
      .mockResolvedValueOnce(jsonResponse({ subscriber: { id: 123 } }))
      .mockResolvedValueOnce(jsonResponse({ tag: { id: 15 } }))
      .mockResolvedValueOnce(jsonResponse({ subscriber: { id: 123 } }))
      .mockResolvedValueOnce(jsonResponse({ tag: { id: 16 } }))
      .mockResolvedValueOnce(jsonResponse({ subscriber: { id: 123 } }));
  }

  beforeEach(() => {
    vi.stubGlobal("fetch", fetchMock);
    process.env = {
      ...originalEnv,
      KIT_API_KEY: "test-key",
      KIT_FORM_ID: "9391183",
      RESEND_API_KEY: "resend-test-key",
      LEAD_NOTIFICATION_FROM: "Kidderminster Solicitors <onboarding@resend.dev>",
      PARTNER_LEAD_EMAIL: "chrispanteli@gmail.com",
    };
  });

  afterEach(() => {
    if (originalFetch) {
      vi.stubGlobal("fetch", originalFetch);
    } else {
      Reflect.deleteProperty(globalThis, "fetch");
    }
    fetchMock.mockReset();
    process.env = originalEnv;
  });

  it("returns 400 for invalid lead payloads", async () => {
    const response = await POST(
      request({ ...validPayload, email: "", consentAccepted: false }),
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toMatchObject({
      ok: false,
      errors: expect.arrayContaining([
        "Email is required.",
        "Consent is required.",
      ]),
    });
  });

  it("returns 503 when the Kit API key is not configured", async () => {
    process.env.KIT_API_KEY = "";

    const response = await POST(request(validPayload));

    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toEqual({
      ok: false,
      errors: ["Lead capture is not configured yet."],
    });
  });

  it("submits valid leads to Kit", async () => {
    mockKitSuccess();
    fetchMock.mockResolvedValueOnce(jsonResponse({ id: "email_123" }));

    const response = await POST(request(validPayload));

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ ok: true });
    expect(fetchMock).toHaveBeenLastCalledWith(
      "https://api.resend.com/emails",
      expect.objectContaining({ method: "POST" }),
    );
  });

  it("returns 503 when lead notification email is not configured", async () => {
    process.env.RESEND_API_KEY = "";

    const response = await POST(request(validPayload));

    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toEqual({
      ok: false,
      errors: ["Lead capture is not configured yet."],
    });
  });

  it("returns 502 when the partner email notification fails", async () => {
    mockKitSuccess();
    fetchMock.mockResolvedValueOnce(
      jsonResponse({ message: "Email rejected" }, 422),
    );

    const response = await POST(request(validPayload));

    expect(response.status).toBe(502);
    await expect(response.json()).resolves.toEqual({
      ok: false,
      errors: ["Lead capture failed. Please try again."],
    });
  });
});
