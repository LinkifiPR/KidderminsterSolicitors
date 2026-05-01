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
      phone: "01562 123456",
      postcode: "DY10 1AA",
      legal_matter_type: "Conveyancing",
      town: "Kidderminster",
      source_page: "https://kidderminstersolicitors.co.uk/",
      utm_source: "google",
      consent_given: "true",
      disclosure_accepted: "true",
    });
  });
});

describe("buildLeadTags", () => {
  it("creates website, town, and category tags for Kit automation routing", () => {
    const result = validateLeadPayload(validPayload);

    if (!result.ok) {
      throw new Error("Expected payload to be valid");
    }

    expect(buildLeadTags(result.lead)).toEqual([
      "Lead - Website",
      "Town - Kidderminster",
      "Category - Conveyancing",
    ]);
  });
});
