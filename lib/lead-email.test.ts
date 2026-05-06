import { describe, expect, it, vi } from "vitest";
import {
  buildLeadConfirmationEmail,
  buildLeadNotificationEmail,
  sendLeadConfirmationEmail,
  sendLeadNotificationEmail,
} from "./lead-email";
import { validateLeadPayload } from "./leads";

const validPayload = {
  legalMatterType: "probate",
  name: "Chris Test",
  phone: "07873 737474",
  email: "chris@example.com",
  postcode: "DY10 1AA",
  preferredContactTime: "Morning",
  address: "1 High Street, Kidderminster",
  hasContactedSolicitor: "No",
  enquiryUrgency: "This week",
  matterStage: "Ready to compare quotes",
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
    expect(email.text).toContain("Address: 1 High Street, Kidderminster");
    expect(email.text).toContain("Postcode: DY10 1AA");
    expect(email.text).toContain("Legal matter type: Probate");
    expect(email.text).toContain("Preferred contact time: Morning");
    expect(email.text).toContain("Already contacted a solicitor?: No");
    expect(email.text).toContain("Urgency: This week");
    expect(email.text).toContain("Matter stage: Ready to compare quotes");
    expect(email.text).toContain("Brief description: I need help with probate");
    expect(email.text).toContain("Source page: https://kidderminstersolicitors.co.uk/probate-solicitors-kidderminster/");
    expect(email.text).toContain("UTM source: google");
    expect(email.text).toContain("Consent accepted: Yes");
    expect(email.text).toContain("Referral disclosure accepted: Yes");
    expect(email.html).toContain("<strong>Name:</strong>");
    expect(email.html).toContain("Chris Test");
  });

  it("falls back to the site reply-to when the submitted email is invalid", () => {
    const email = buildLeadNotificationEmail(
      {
        ...validLead(),
        email: "not-an-email",
      },
      {
        from: "Kidderminster Solicitors <leads@kidderminstersolicitors.co.uk>",
        partnerEmail: "partner@example.com",
        fallbackReplyTo: "leads@kidderminstersolicitors.co.uk",
      },
    );

    expect(email.reply_to).toBe("leads@kidderminstersolicitors.co.uk");
  });
});

describe("buildLeadConfirmationEmail", () => {
  it("formats a user confirmation email without Kit subscription wording", () => {
    const email = buildLeadConfirmationEmail(validLead(), {
      from: "Kidderminster Solicitors <leads@kidderminstersolicitors.co.uk>",
      replyTo: "leads@kidderminstersolicitors.co.uk",
    });

    expect(email).toMatchObject({
      from: "Kidderminster Solicitors <leads@kidderminstersolicitors.co.uk>",
      to: ["chris@example.com"],
      reply_to: "leads@kidderminstersolicitors.co.uk",
      subject: "We’ve received your solicitor enquiry",
    });
    expect(email.text).toContain("Hello Chris Test,");
    expect(email.text).toContain("Thank you for submitting your enquiry");
    expect(email.text).toContain("Legal matter type: Probate");
    expect(email.text).toContain("Postcode: DY10 1AA");
    expect(email.text).toContain("Urgency: This week");
    expect(email.text).toContain("Already contacted a solicitor: No");
    expect(email.text).toContain(
      "We are not a law firm and do not provide legal advice.",
    );
    expect(email.text).not.toContain("confirm your subscription");
    expect(email.text).not.toContain("Kit");
    expect(email.html).not.toContain("confirm your subscription");
    expect(email.html).not.toContain("Kit");
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

  it("sends the user confirmation through Resend", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ id: "email_456" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );
    vi.stubGlobal("fetch", fetchMock);

    await sendLeadConfirmationEmail(validLead(), {
      apiKey: "resend-test-key",
      from: "Kidderminster Solicitors <leads@kidderminstersolicitors.co.uk>",
      replyTo: "leads@kidderminstersolicitors.co.uk",
    });

    expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toMatchObject({
      from: "Kidderminster Solicitors <leads@kidderminstersolicitors.co.uk>",
      to: ["chris@example.com"],
      reply_to: "leads@kidderminstersolicitors.co.uk",
      subject: "We’ve received your solicitor enquiry",
    });
  });
});
