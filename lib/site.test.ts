import { describe, expect, it } from "vitest";
import {
  baseUrl,
  buildCanonicalUrl,
  coreServiceSlugs,
  getAllPageSlugs,
  getDynamicPageSlugs,
  getGuidesForCategoryGroup,
  getMoreGuidesInCategory,
  getRelatedServicesForPage,
  getRootPageSlugs,
  guideCategoryGroups,
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

  it("keeps the core homepage service set unique", () => {
    const coreServices = coreServiceSlugs.map((slug) =>
      servicePages.find((page) => page.slug === slug),
    );
    const categories = coreServices.map((page) => page?.category);

    expect(coreServices).not.toContain(undefined);
    expect(new Set(coreServiceSlugs).size).toBe(coreServiceSlugs.length);
    expect(new Set(categories).size).toBe(categories.length);
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
    expect(buildCanonicalUrl("what-does-a-conveyancing-solicitor-do")).toBe(
      `${baseUrl}/legal-guides/what-does-a-conveyancing-solicitor-do/`,
    );
    expect(getAllPageSlugs()).toContain("conveyancing-solicitors-kidderminster");
  });

  it("keeps static hubs out of dynamic slug generation", () => {
    expect(getAllPageSlugs()).toContain("legal-guides");
    expect(getDynamicPageSlugs()).not.toContain("legal-guides");
    expect(getRootPageSlugs()).not.toContain("what-does-a-conveyancing-solicitor-do");
  });

  it("gives every guide category a hub group and cluster service links", () => {
    const guideCategories = new Set(guidePages.map((page) => page.category));
    const groupedCategories = new Set<string>(
      guideCategoryGroups.flatMap((group) => group.categories),
    );
    const serviceSlugs = new Set(servicePages.map((page) => page.slug));

    expect(
      [...guideCategories].filter((category) => !groupedCategories.has(category)),
    ).toEqual([]);

    guideCategoryGroups.forEach((group) => {
      expect(getGuidesForCategoryGroup(group).length).toBeGreaterThan(0);
      group.serviceSlugs.forEach((slug) => {
        expect(serviceSlugs.has(slug)).toBe(true);
      });
    });
  });

  it("connects guides to money pages, sibling guides, and adjacent services", () => {
    const serviceSlugs = new Set(servicePages.map((page) => page.slug));

    guidePages.forEach((page) => {
      expect(serviceSlugs.has(page.relatedServiceSlug)).toBe(true);

      getRelatedServicesForPage(page).forEach((service) => {
        expect(service.slug).not.toBe(page.relatedServiceSlug);
        expect(serviceSlugs.has(service.slug)).toBe(true);
      });

      getMoreGuidesInCategory(page).forEach((guide) => {
        expect(guide.slug).not.toBe(page.slug);
        expect(page.relatedGuideSlugs).not.toContain(guide.slug);
        expect(guide.category).toBe(page.category);
      });
    });

    servicePages.forEach((page) => {
      getRelatedServicesForPage(page).forEach((service) => {
        expect(service.slug).not.toBe(page.slug);
        expect(serviceSlugs.has(service.slug)).toBe(true);
      });
    });
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
        "prepare-divorce-solicitor-consultation",
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

  it("gives Phase 1 money pages enough YMYL and conversion structure", () => {
    phaseOneServiceSlugs.forEach((slug) => {
      const page = servicePages.find((service) => service.slug === slug);

      expect(page).toBeDefined();
      expect(page?.keyTakeaways?.length).toBeGreaterThanOrEqual(3);
      expect(page?.sections?.length).toBeGreaterThanOrEqual(4);
      expect(page?.relatedGuideSlugs?.length).toBeGreaterThanOrEqual(2);
      expect(page?.faq.length).toBeGreaterThanOrEqual(3);

      const fullText = [
        page?.title,
        page?.h1,
        page?.metaDescription,
        page?.summary,
        page?.intro,
        page?.localAngle,
        ...(page?.keyTakeaways ?? []),
        ...(page?.sections ?? []).flatMap((section) => [
          section.heading,
          ...section.body,
        ]),
        ...(page?.comparisonPoints ?? []),
        ...(page?.faq ?? []).flatMap((item) => [item.question, item.answer]),
      ].join(" ");

      expect(fullText).toMatch(/Kidderminster|Wyre Forest/i);
      expect(fullText).toMatch(/no obligation quote|suitable solicitor partner/i);
      expect(fullText).not.toMatch(
        /our solicitors|our legal team|we advise|we represent you|guaranteed result|best solicitor|cheapest solicitor/i,
      );
    });
  });

  it("keeps every service page commercially useful and compliance-safe", () => {
    const localPattern =
      /Kidderminster|Wyre Forest|Stourport|Bewdley|Cookley|Hagley|Worcestershire/i;
    const prohibitedPattern =
      /our solicitors|our legal team|we advise|we represent you|guaranteed result|best solicitor|cheapest solicitor|commercial placement/i;

    servicePages.forEach((page) => {
      const fullText = [
        page.title,
        page.h1,
        page.metaDescription,
        page.summary,
        page.intro,
        page.localAngle,
        ...(page.keyTakeaways ?? []),
        ...(page.sections ?? []).flatMap((section) => [
          section.heading,
          ...section.body,
        ]),
        ...page.comparisonPoints,
        ...page.faq.flatMap((item) => [item.question, item.answer]),
      ].join(" ");

      expect(page.keyTakeaways?.length).toBeGreaterThanOrEqual(3);
      expect(page.sections?.length).toBeGreaterThanOrEqual(4);
      expect(page.relatedGuideSlugs?.length).toBeGreaterThanOrEqual(2);
      expect(page.faq.length).toBeGreaterThanOrEqual(3);
      expect(fullText.length).toBeGreaterThan(2500);
      expect(fullText).toMatch(localPattern);
      expect(fullText).toMatch(/no obligation quote|suitable solicitor partner|suitable introduction/i);
      expect(fullText).not.toMatch(prohibitedPattern);
      expect(page.sections?.some((section) => /what to prepare/i.test(section.heading))).toBe(
        true,
      );
      expect(page.sections?.some((section) => /questions to ask/i.test(section.heading))).toBe(
        true,
      );
    });
  });
});
