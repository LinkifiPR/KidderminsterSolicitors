import { describe, expect, it } from "vitest";
import {
  buildLeadTags,
  mapLeadToKitFields,
  validateLeadPayload,
} from "./leads";

const validPayload = {
  legalMatterType: "conveyancing",
  name: "Sarah Example",
  phone: "01562 123456",
  email: "sarah@example.com",
  postcode: "DY10 1AA",
  preferredContactTime: "Morning",
  address: "1 High Street, Kidderminster",
  hasContactedSolicitor: "No",
  enquiryUrgency: "Within 1 week",
  matterStage: "Ready to compare quotes",
  message: "I am buying a house in Kidderminster.",
  consentAccepted: true,
  disclosureAccepted: true,
  sourcePage: "https://kidderminstersolicitors.co.uk/",
  utmSource: "google",
};

describe("validateLeadPayload", () => {
  it("accepts a complete lead payload", () => {
    const result = validateLeadPayload(validPayload);

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.lead.email).toBe("sarah@example.com");
      expect(result.lead.town).toBe("Kidderminster");
    }
  });

  it("rejects leads without consent and disclosure acceptance", () => {
    const result = validateLeadPayload({
      ...validPayload,
      consentAccepted: false,
      disclosureAccepted: false,
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors).toContain("Consent is required.");
      expect(result.errors).toContain("Disclosure acceptance is required.");
    }
  });

  it("rejects invalid UK phone numbers and postcodes", () => {
    const result = validateLeadPayload({
      ...validPayload,
      phone: "123",
      postcode: "not a postcode",
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors).toContain("Please enter a valid UK phone number.");
      expect(result.errors).toContain("Please enter a valid UK postcode.");
    }
  });

  it("accepts common UK postcode formats used by Kidderminster enquiries", () => {
    for (const postcode of ["DY10 1AA", "DY101AA", "dy10 1aa", "DY10 4TD"]) {
      const result = validateLeadPayload({
        ...validPayload,
        postcode,
      });

      expect(result.ok).toBe(true);
    }
  });

  it("requires preferred contact time and lead qualification answers", () => {
    const result = validateLeadPayload({
      ...validPayload,
      preferredContactTime: "",
      hasContactedSolicitor: "",
      enquiryUrgency: "",
      matterStage: "",
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors).toContain("Preferred contact time is required.");
      expect(result.errors).toContain(
        "Please confirm whether you have already contacted a solicitor.",
      );
      expect(result.errors).toContain("Urgency is required.");
      expect(result.errors).toContain("Matter stage is required.");
    }
  });
});

describe("mapLeadToKitFields", () => {
  it("maps validated lead data to the Kit custom field keys", () => {
    const result = validateLeadPayload(validPayload);

    if (!result.ok) {
      throw new Error("Expected payload to be valid");
    }

    expect(mapLeadToKitFields(result.lead)).toMatchObject({
      full_name: "Sarah Example",
      email: "sarah@example.com",
      phone: "01562 123456",
      postcode: "DY10 1AA",
      legal_category: "Conveyancing",
      legal_matter_type: "Conveyancing",
      town: "Kidderminster",
      address: "1 High Street, Kidderminster",
      enquiry_message: "I am buying a house in Kidderminster.",
      has_contacted_solicitor: "No",
      enquiry_urgency: "Within 1 week",
      matter_stage: "Ready to compare quotes",
      source_page: "https://kidderminstersolicitors.co.uk/",
      utm_source: "google",
      consent_given: "true",
      disclosure_accepted: "true",
      referral_disclosure_accepted: "true",
      submitted_at: result.lead.leadTimestamp,
    });
  });
});

describe("buildLeadTags", () => {
  it("creates commercial routing, town, and category tags", () => {
    const result = validateLeadPayload(validPayload);

    if (!result.ok) {
      throw new Error("Expected payload to be valid");
    }

    expect(buildLeadTags(result.lead)).toEqual([
      "Legal Lead",
      "Kidderminster",
      "Wyre Forest",
      "Category: Conveyancing",
      "Lead - Website",
      "Town - Kidderminster",
      "Category - Conveyancing",
    ]);
  });
});
