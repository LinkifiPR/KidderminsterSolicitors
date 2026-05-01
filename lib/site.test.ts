import { describe, expect, it } from "vitest";
import {
  baseUrl,
  buildCanonicalUrl,
  getAllPageSlugs,
  getPageBySlug,
  guideOrganizationSchema,
  phaseOneServiceSlugs,
  servicePages,
  trustPages,
} from "./site";

describe("site content model", () => {
  it("includes the Phase 1 service pages", () => {
    expect(phaseOneServiceSlugs).toEqual([
      "conveyancing-solicitors-kidderminster",
      "probate-solicitors-kidderminster",
      "family-law-solicitors-kidderminster",
    ]);

    expect(servicePages.map((page) => page.slug)).toEqual(
      expect.arrayContaining(phaseOneServiceSlugs),
    );
  });

  it("includes required trust and disclosure pages", () => {
    expect(trustPages.map((page) => page.slug)).toEqual(
      expect.arrayContaining([
        "about",
        "contact",
        "privacy-policy",
        "terms",
        "advertising-disclosure",
        "editorial-policy",
      ]),
    );
  });

  it("keeps the site positioned as an independent guide, not a law firm", () => {
    const page = getPageBySlug("advertising-disclosure");

    expect(page?.body).toEqual(
      expect.arrayContaining([
        expect.stringMatching(/not a law firm/i),
        expect.stringMatching(/commercial relationship/i),
      ]),
    );
    expect(guideOrganizationSchema["@type"]).toBe("Organization");
    expect(JSON.stringify(guideOrganizationSchema)).not.toContain("LegalService");
  });

  it("builds canonical URLs for every static page", () => {
    expect(buildCanonicalUrl("")).toBe(baseUrl);
    expect(buildCanonicalUrl("privacy-policy")).toBe(`${baseUrl}/privacy-policy/`);
    expect(getAllPageSlugs()).toContain("conveyancing-solicitors-kidderminster");
  });
});
