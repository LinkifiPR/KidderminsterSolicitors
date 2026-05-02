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
      enquiry_message: "I am buying a house in Kidderminster.",
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
