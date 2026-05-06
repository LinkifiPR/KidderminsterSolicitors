import { describe, expect, it, vi } from "vitest";
import { buildLeadNotificationEmail, sendLeadNotificationEmail } from "./lead-email";
import { validateLeadPayload } from "./leads";

const validPayload = {
  legalMatterType: "probate",
  name: "Chris Test",
  phone: "07873 737474",
  email: "chris@example.com",
  postcode: "DY10 1AA",
  preferredContactTime: "Morning",
  message: "I need help with probate for a Kidderminster estate.",
  consentAccepted: true,
  disclosureAccepted: true,
  sourcePage: "https://kidderminstersolicitors.co.uk/probate-solicitors-kidderminster/",
  utmSource: "google",
};

function validLead() {
  const result = validateLeadPayload(validPayload);
  if (!result.ok) {
    throw new Error("Fixture should validate");
  }
  return result.lead;
}

describe("buildLeadNotificationEmail", () => {
  it("formats the partner lead email with all important lead details", () => {
    const email = buildLeadNotificationEmail(validLead(), {
      from: "Kidderminster Solicitors <leads@kidderminstersolicitors.co.uk>",
      partnerEmail: "partner@example.com",
      adminEmail: "admin@example.com",
    });

    expect(email).toMatchObject({
      from: "Kidderminster Solicitors <leads@kidderminstersolicitors.co.uk>",
      to: ["partner@example.com"],
      cc: ["admin@example.com"],
      reply_to: "chris@example.com",
      subject: "You have received a lead from KidderminsterSolicitors.co.uk",
    });
    expect(email.text).toContain("Name: Chris Test");
    expect(email.text).toContain("Email: chris@example.com");
    expect(email.text).toContain("Phone: 07873 737474");
    expect(email.text).toContain("Postcode: DY10 1AA");
    expect(email.text).toContain("Legal matter type: Probate");
    expect(email.text).toContain("Preferred contact time: Morning");
    expect(email.text).toContain("Brief description: I need help with probate");
    expect(email.text).toContain("Source page: https://kidderminstersolicitors.co.uk/probate-solicitors-kidderminster/");
    expect(email.text).toContain("UTM source: google");
    expect(email.text).toContain("Consent accepted: Yes");
    expect(email.text).toContain("Referral disclosure accepted: Yes");
    expect(email.html).toContain("<strong>Name:</strong>");
    expect(email.html).toContain("Chris Test");
  });
});

describe("sendLeadNotificationEmail", () => {
  it("sends the formatted email through Resend using server-side config", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ id: "email_123" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );
    vi.stubGlobal("fetch", fetchMock);

    await sendLeadNotificationEmail(validLead(), {
      apiKey: "resend-test-key",
      from: "Kidderminster Solicitors <onboarding@resend.dev>",
      partnerEmail: "chrispanteli@gmail.com",
    });

    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.resend.com/emails",
      expect.objectContaining({
        method: "POST",
        headers: {
          Authorization: "Bearer resend-test-key",
          "Content-Type": "application/json",
        },
      }),
    );
    expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toMatchObject({
      from: "Kidderminster Solicitors <onboarding@resend.dev>",
      to: ["chrispanteli@gmail.com"],
      reply_to: "chris@example.com",
      subject: "You have received a lead from KidderminsterSolicitors.co.uk",
    });
  });
});
