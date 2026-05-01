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
  it("maps validated lead data to the Kit custom field labels", () => {
    const result = validateLeadPayload(validPayload);

    if (!result.ok) {
      throw new Error("Expected payload to be valid");
    }

    expect(mapLeadToKitFields(result.lead)).toMatchObject({
      Phone: "01562 123456",
      Postcode: "DY10 1AA",
      "Legal Matter Type": "Conveyancing",
      Town: "Kidderminster",
      "Source Page": "https://kidderminstersolicitors.co.uk/",
      "UTM Source": "google",
      "Consent Given": "true",
      "Disclosure Accepted": "true",
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
