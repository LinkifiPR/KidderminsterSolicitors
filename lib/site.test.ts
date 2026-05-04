import { describe, expect, it } from "vitest";
import {
  baseUrl,
  buildCanonicalUrl,
  getAllPageSlugs,
  guideOrganizationSchema,
  guidePages,
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
      expect.arrayContaining([...phaseOneServiceSlugs]),
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
    const page = trustPages.find((trustPage) => trustPage.slug === "advertising-disclosure");

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

  it("includes the next commercial service pages and guide content cluster", () => {
    expect(servicePages.map((page) => page.slug)).toEqual(
      expect.arrayContaining([
        "divorce-solicitors-kidderminster",
        "wills-solicitors-kidderminster",
        "employment-solicitors-kidderminster",
        "personal-injury-solicitors-kidderminster",
        "commercial-solicitors-kidderminster",
        "landlord-tenant-solicitors-kidderminster",
      ]),
    );

    expect(guidePages.map((page) => page.slug)).toEqual(
      expect.arrayContaining([
        "how-much-do-conveyancing-solicitors-cost-in-kidderminster",
        "what-does-a-conveyancing-solicitor-do",
        "buying-a-house-in-kidderminster-legal-checklist",
        "what-does-a-probate-solicitor-do",
        "how-long-does-probate-take",
        "do-you-need-a-solicitor-for-probate",
        "how-to-prepare-for-a-divorce-solicitor-consultation",
        "what-does-a-family-law-solicitor-help-with",
        "settlement-agreements-explained",
        "when-should-you-speak-to-an-employment-solicitor",
      ]),
    );

    expect(getAllPageSlugs()).toContain("legal-guides");
    expect(getAllPageSlugs()).toContain(
      "how-much-do-conveyancing-solicitors-cost-in-kidderminster",
    );
  });

  it("keeps guide content useful, local, and conversion-aware", () => {
    const localPattern =
      /Kidderminster|Wyre Forest|Stourport|Bewdley|Cookley|Hagley|Worcestershire/i;
    const prohibitedPattern = /our solicitors|we advise|our legal team/i;

    guidePages.forEach((page) => {
      const fullText = [
        page.title,
        page.h1,
        page.metaDescription,
        page.intro,
        ...page.keyTakeaways,
        ...page.sections.flatMap((section) => [
          section.heading,
          ...section.body,
        ]),
        ...(page.faq ?? []).flatMap((item) => [item.question, item.answer]),
      ].join(" ");

      expect(fullText.length).toBeGreaterThan(3000);
      expect(fullText).toMatch(localPattern);
      expect(fullText).not.toMatch(prohibitedPattern);
      expect(page.keyTakeaways.length).toBeGreaterThanOrEqual(3);
      expect(page.relatedGuideSlugs.length).toBeGreaterThan(0);
      expect(page.faq?.length).toBeGreaterThanOrEqual(2);
      page.faq?.forEach((item) => {
        expect(item.question.length).toBeGreaterThan(20);
        expect(item.answer.length).toBeGreaterThan(40);
      });
      expect(page.sections.some((section) => /what to prepare/i.test(section.heading))).toBe(
        true,
      );
      expect(page.sections.some((section) => /questions to ask/i.test(section.heading))).toBe(
        true,
      );
      expect(fullText).toMatch(/no obligation quote|request a quote/i);
      expect(fullText).toMatch(/not a law firm/i);
    });
  });
});
