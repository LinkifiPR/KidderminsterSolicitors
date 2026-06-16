import { describe, expect, it } from "vitest";
import {
  baseUrl,
  buildBreadcrumbItems,
  buildBreadcrumbSchema,
  buildCanonicalUrl,
  buildGuideArticleSchema,
  coreServiceSlugs,
  getAllPageSlugs,
  getDynamicPageSlugs,
  getGuidesForCategoryGroup,
  getMoreGuidesInCategory,
  getPageBySlug,
  getRelatedServicesForPage,
  getRootPageSlugs,
  guideCategoryGroups,
  guideOrganizationSchema,
  guidePages,
  extractInlineInternalLinks,
  parseInlineInternalLinks,
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

  it("parses controlled inline internal link syntax into safe page paths", () => {
    expect(
      parseInlineInternalLinks(
        "Compare [[conveyancing solicitors in Kidderminster|conveyancing-solicitors-kidderminster]] before requesting a quote.",
      ),
    ).toEqual([
      { type: "text", text: "Compare " },
      {
        type: "link",
        text: "conveyancing solicitors in Kidderminster",
        href: "/conveyancing-solicitors-kidderminster/",
        slug: "conveyancing-solicitors-kidderminster",
      },
      { type: "text", text: " before requesting a quote." },
    ]);
  });

  it("adds one or two varied contextual in-content pillar links to every guide", () => {
    const serviceSlugs = new Set(servicePages.map((page) => page.slug));
    const anchorsByCategory = new Map<string, Set<string>>();
    const pillarSlugByCategory = new Map([
      ["Conveyancing", "conveyancing-solicitors-kidderminster"],
      ["Probate and Wills", "probate-solicitors-kidderminster"],
      ["Family and Divorce", "family-law-solicitors-kidderminster"],
      ["Employment", "employment-solicitors-kidderminster"],
      ["Commercial, Debt, Landlord and Tenant", "commercial-solicitors-kidderminster"],
      ["Rural and Agricultural", "rural-solicitors-worcestershire"],
      ["Personal Injury and Negligence", "personal-injury-solicitors-kidderminster"],
    ]);

    guidePages.forEach((page) => {
      const fullText = [
        page.intro,
        ...page.sections.flatMap((section) => section.body),
      ].join(" ");
      const links = extractInlineInternalLinks(fullText);
      const pillarSlug = pillarSlugByCategory.get(page.category);

      expect(links.length).toBeGreaterThanOrEqual(1);
      expect(links.length).toBeLessThanOrEqual(2);
      expect(pillarSlug).toBeDefined();
      expect(links.some((link) => link.slug === pillarSlug)).toBe(true);

      if (page.relatedServiceSlug !== pillarSlug) {
        expect(links.some((link) => link.slug === page.relatedServiceSlug)).toBe(
          true,
        );
      }

      links.forEach((link) => {
        expect(serviceSlugs.has(link.slug)).toBe(true);
        expect(link.text.length).toBeGreaterThan(8);
        expect(link.text).not.toMatch(/click here|read more|learn more/i);
      });

      if (!anchorsByCategory.has(page.category)) {
        anchorsByCategory.set(page.category, new Set());
      }

      links.forEach((link) => anchorsByCategory.get(page.category)?.add(link.text));
    });

    anchorsByCategory.forEach((anchors, category) => {
      const guideCount = guidePages.filter((page) => page.category === category).length;

      if (guideCount > 1) {
        expect(anchors.size).toBeGreaterThan(1);
      }
    });
  });

  it("adds contextual in-content pillar links to supporting service pages", () => {
    const pillarSlugs = new Set([
      "conveyancing-solicitors-kidderminster",
      "probate-solicitors-kidderminster",
      "family-law-solicitors-kidderminster",
      "employment-solicitors-kidderminster",
      "commercial-solicitors-kidderminster",
      "rural-solicitors-worcestershire",
      "personal-injury-solicitors-kidderminster",
    ]);
    const pillarSlugByServiceSlug = new Map<string, string>();

    guideCategoryGroups.forEach((group) => {
      const pillarSlug = group.serviceSlugs.find((slug) => pillarSlugs.has(slug));

      expect(pillarSlug).toBeDefined();
      group.serviceSlugs.forEach((slug) => {
        pillarSlugByServiceSlug.set(slug, pillarSlug ?? "");
      });
    });

    servicePages.forEach((page) => {
      const pillarSlug = pillarSlugByServiceSlug.get(page.slug);

      if (!pillarSlug || page.slug === pillarSlug) {
        return;
      }

      const fullText = [
        page.intro,
        page.localAngle,
        ...(page.sections ?? []).flatMap((section) => section.body),
      ].join(" ");
      const links = extractInlineInternalLinks(fullText);

      expect(links.some((link) => link.slug === pillarSlug)).toBe(true);
      expect(links.some((link) => link.slug === page.slug)).toBe(false);
      links.forEach((link) => {
        expect(link.text).not.toMatch(/click here|read more|learn more/i);
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

  it("includes CE2 Phase 2 batch A1 business services and guides", () => {
    expect(servicePages.map((page) => page.slug)).toEqual(
      expect.arrayContaining([
        "small-business-solicitors-kidderminster",
        "sme-legal-support-kidderminster",
        "business-sale-solicitors-kidderminster",
        "selling-business-solicitors-kidderminster",
        "shareholder-dispute-solicitors-kidderminster",
        "partnership-dispute-solicitors-kidderminster",
        "director-dispute-solicitors-kidderminster",
      ]),
    );

    expect(guidePages.map((page) => page.slug)).toEqual(
      expect.arrayContaining([
        "buying-business-legal-checklist",
        "commercial-contract-review-guide",
        "terms-and-conditions-solicitor-guide",
      ]),
    );

    [
      "small-business-solicitors-kidderminster",
      "sme-legal-support-kidderminster",
      "business-sale-solicitors-kidderminster",
      "buying-business-legal-checklist",
      "selling-business-solicitors-kidderminster",
      "shareholder-dispute-solicitors-kidderminster",
      "partnership-dispute-solicitors-kidderminster",
      "director-dispute-solicitors-kidderminster",
      "commercial-contract-review-guide",
      "terms-and-conditions-solicitor-guide",
    ].forEach((slug) => {
      expect(getAllPageSlugs()).toContain(slug);
    });
  });

  it("includes CE2 Phase 2 batch A2 commercial dispute and debt pages", () => {
    expect(servicePages.map((page) => page.slug)).toEqual(
      expect.arrayContaining([
        "business-contract-dispute-solicitors-kidderminster",
        "breach-of-contract-solicitors-kidderminster",
        "supplier-dispute-solicitors-kidderminster",
        "customer-dispute-solicitors-kidderminster",
        "late-payment-solicitors-kidderminster",
        "commercial-lease-review-solicitors-kidderminster",
        "franchise-agreement-solicitors-kidderminster",
      ]),
    );

    expect(guidePages.map((page) => page.slug)).toEqual(
      expect.arrayContaining([
        "commercial-debt-recovery-process",
        "unpaid-invoice-legal-options",
        "nda-solicitor-guide",
      ]),
    );

    [
      "business-contract-dispute-solicitors-kidderminster",
      "breach-of-contract-solicitors-kidderminster",
      "supplier-dispute-solicitors-kidderminster",
      "customer-dispute-solicitors-kidderminster",
      "late-payment-solicitors-kidderminster",
      "commercial-debt-recovery-process",
      "unpaid-invoice-legal-options",
      "commercial-lease-review-solicitors-kidderminster",
      "nda-solicitor-guide",
      "franchise-agreement-solicitors-kidderminster",
    ].forEach((slug) => {
      expect(getAllPageSlugs()).toContain(slug);
    });
  });

  it("includes CE2 Phase 2 batch A3 commercial property and premises pages", () => {
    expect(servicePages.map((page) => page.slug)).toEqual(
      expect.arrayContaining([
        "commercial-property-purchase-solicitors-kidderminster",
        "commercial-property-sale-solicitors-kidderminster",
        "commercial-lease-solicitors-kidderminster",
        "commercial-lease-renewal-solicitors-kidderminster",
        "commercial-rent-arrears-solicitors-kidderminster",
        "dilapidations-solicitors-kidderminster",
      ]),
    );

    expect(guidePages.map((page) => page.slug)).toEqual(
      expect.arrayContaining([
        "commercial-lease-break-clause-guide",
        "commercial-lease-repairing-obligations",
        "commercial-property-due-diligence-checklist",
        "business-premises-legal-checklist",
      ]),
    );

    [
      "commercial-property-purchase-solicitors-kidderminster",
      "commercial-property-sale-solicitors-kidderminster",
      "commercial-lease-solicitors-kidderminster",
      "commercial-lease-renewal-solicitors-kidderminster",
      "commercial-rent-arrears-solicitors-kidderminster",
      "dilapidations-solicitors-kidderminster",
      "commercial-lease-break-clause-guide",
      "commercial-lease-repairing-obligations",
      "commercial-property-due-diligence-checklist",
      "business-premises-legal-checklist",
    ].forEach((slug) => {
      expect(getAllPageSlugs()).toContain(slug);
    });
  });

  it("includes CE2 Phase 2 batch A4 corporate and transaction pages", () => {
    expect(servicePages.map((page) => page.slug)).toEqual(
      expect.arrayContaining([
        "business-partnership-agreement-solicitors-kidderminster",
        "shareholders-agreement-solicitors-kidderminster",
        "directors-duties-solicitors-kidderminster",
        "company-formation-solicitors-kidderminster",
        "business-restructuring-solicitors-kidderminster",
        "management-buyout-solicitors-kidderminster",
        "share-purchase-agreement-solicitors-kidderminster",
        "asset-purchase-agreement-solicitors-kidderminster",
      ]),
    );

    expect(guidePages.map((page) => page.slug)).toEqual(
      expect.arrayContaining([
        "heads-of-terms-business-sale-guide",
        "business-due-diligence-checklist",
      ]),
    );

    [
      "business-partnership-agreement-solicitors-kidderminster",
      "shareholders-agreement-solicitors-kidderminster",
      "directors-duties-solicitors-kidderminster",
      "company-formation-solicitors-kidderminster",
      "business-restructuring-solicitors-kidderminster",
      "management-buyout-solicitors-kidderminster",
      "share-purchase-agreement-solicitors-kidderminster",
      "asset-purchase-agreement-solicitors-kidderminster",
      "heads-of-terms-business-sale-guide",
      "business-due-diligence-checklist",
    ].forEach((slug) => {
      expect(getAllPageSlugs()).toContain(slug);
    });
  });

  it("includes CE2 Phase 2 batch A5 employer employment pages", () => {
    expect(servicePages.map((page) => page.slug)).toEqual(
      expect.arrayContaining([
        "employer-employment-law-solicitors-kidderminster",
        "employment-contract-solicitors-kidderminster",
        "staff-handbook-solicitors-kidderminster",
        "redundancy-for-employers-solicitors-kidderminster",
        "disciplinary-grievance-solicitors-kidderminster",
        "restrictive-covenant-solicitors-kidderminster",
        "tupe-solicitors-kidderminster",
        "settlement-agreement-employer-solicitors-kidderminster",
      ]),
    );

    expect(guidePages.map((page) => page.slug)).toEqual(
      expect.arrayContaining([
        "workplace-investigation-guide",
        "employment-tribunal-employer-guide",
      ]),
    );

    [
      "employer-employment-law-solicitors-kidderminster",
      "employment-contract-solicitors-kidderminster",
      "staff-handbook-solicitors-kidderminster",
      "redundancy-for-employers-solicitors-kidderminster",
      "disciplinary-grievance-solicitors-kidderminster",
      "restrictive-covenant-solicitors-kidderminster",
      "tupe-solicitors-kidderminster",
      "settlement-agreement-employer-solicitors-kidderminster",
      "workplace-investigation-guide",
      "employment-tribunal-employer-guide",
    ].forEach((slug) => {
      expect(getAllPageSlugs()).toContain(slug);
    });
  });

  it("includes CE2 Phase 2 batch A6 IP, data, and digital trading pages", () => {
    expect(servicePages.map((page) => page.slug)).toEqual(
      expect.arrayContaining([
        "intellectual-property-solicitors-kidderminster",
        "trade-mark-solicitors-kidderminster",
        "copyright-solicitors-kidderminster",
        "data-protection-solicitors-kidderminster",
        "gdpr-solicitors-businesses",
        "website-terms-conditions-solicitors",
        "ecommerce-terms-solicitors",
        "software-contract-solicitors",
      ]),
    );

    expect(guidePages.map((page) => page.slug)).toEqual(
      expect.arrayContaining([
        "licensing-agreement-guide",
        "data-processing-agreement-guide",
      ]),
    );

    [
      "intellectual-property-solicitors-kidderminster",
      "trade-mark-solicitors-kidderminster",
      "copyright-solicitors-kidderminster",
      "data-protection-solicitors-kidderminster",
      "gdpr-solicitors-businesses",
      "website-terms-conditions-solicitors",
      "ecommerce-terms-solicitors",
      "software-contract-solicitors",
      "licensing-agreement-guide",
      "data-processing-agreement-guide",
    ].forEach((slug) => {
      expect(getAllPageSlugs()).toContain(slug);
    });
  });

  it("includes CE2 Phase 2 batch A7 family finance and child arrangement pages", () => {
    expect(servicePages.map((page) => page.slug)).toEqual(
      expect.arrayContaining([
        "financial-remedy-solicitors-kidderminster",
        "consent-order-solicitors-kidderminster",
        "pension-sharing-order-solicitors-kidderminster",
        "child-arrangements-order-solicitors-kidderminster",
        "cohabitation-agreement-solicitors-kidderminster",
        "prenuptial-agreement-solicitors-kidderminster",
        "non-molestation-order-solicitors-kidderminster",
        "occupation-order-solicitors-kidderminster",
      ]),
    );

    expect(guidePages.map((page) => page.slug)).toEqual(
      expect.arrayContaining([
        "child-maintenance-after-separation-guide",
        "miam-family-mediation-guide",
      ]),
    );

    [
      "financial-remedy-solicitors-kidderminster",
      "consent-order-solicitors-kidderminster",
      "pension-sharing-order-solicitors-kidderminster",
      "child-arrangements-order-solicitors-kidderminster",
      "cohabitation-agreement-solicitors-kidderminster",
      "prenuptial-agreement-solicitors-kidderminster",
      "non-molestation-order-solicitors-kidderminster",
      "occupation-order-solicitors-kidderminster",
      "child-maintenance-after-separation-guide",
      "miam-family-mediation-guide",
    ].forEach((slug) => {
      expect(getAllPageSlugs()).toContain(slug);
    });
  });

  it("includes CE2 Phase 2 batch A8 probate and later-life planning pages", () => {
    expect(servicePages.map((page) => page.slug)).toEqual(
      expect.arrayContaining([
        "estate-administration-solicitors-kidderminster",
        "intestacy-solicitors-kidderminster",
        "inheritance-tax-planning-solicitors-kidderminster",
        "deed-of-variation-solicitors-kidderminster",
        "executor-dispute-solicitors-kidderminster",
        "deputyship-solicitors-kidderminster",
        "care-home-fees-solicitors-kidderminster",
        "trust-solicitors-kidderminster",
      ]),
    );

    expect(guidePages.map((page) => page.slug)).toEqual(
      expect.arrayContaining([
        "applying-for-letters-of-administration-guide",
        "deed-of-variation-explained",
      ]),
    );

    [
      "estate-administration-solicitors-kidderminster",
      "intestacy-solicitors-kidderminster",
      "inheritance-tax-planning-solicitors-kidderminster",
      "deed-of-variation-solicitors-kidderminster",
      "executor-dispute-solicitors-kidderminster",
      "deputyship-solicitors-kidderminster",
      "care-home-fees-solicitors-kidderminster",
      "trust-solicitors-kidderminster",
      "applying-for-letters-of-administration-guide",
      "deed-of-variation-explained",
    ].forEach((slug) => {
      expect(getAllPageSlugs()).toContain(slug);
    });
  });

  it("includes CE2 Phase 2 batch A9 rural and agricultural pages", () => {
    expect(servicePages.map((page) => page.slug)).toEqual(
      expect.arrayContaining([
        "rural-solicitors-worcestershire",
        "agricultural-property-solicitors",
        "agricultural-tenancy-solicitors",
        "farm-business-solicitors",
        "rural-land-dispute-solicitors",
        "rights-of-way-access-solicitors",
        "common-land-solicitors",
      ]),
    );

    expect(guidePages.map((page) => page.slug)).toEqual(
      expect.arrayContaining([
        "agricultural-holdings-act-tenancy-guide",
        "farm-partnership-agreement-guide",
        "public-rights-of-way-guide",
      ]),
    );

    [
      "rural-solicitors-worcestershire",
      "agricultural-property-solicitors",
      "agricultural-tenancy-solicitors",
      "farm-business-solicitors",
      "rural-land-dispute-solicitors",
      "rights-of-way-access-solicitors",
      "common-land-solicitors",
      "agricultural-holdings-act-tenancy-guide",
      "farm-partnership-agreement-guide",
      "public-rights-of-way-guide",
    ].forEach((slug) => {
      expect(getAllPageSlugs()).toContain(slug);
    });
  });

  it("includes CE2 Phase 2 batch A10 final rural and specialist pages", () => {
    expect(servicePages.map((page) => page.slug)).toEqual(
      expect.arrayContaining([
        "insolvency-solicitors-kidderminster",
        "regulatory-solicitors-kidderminster",
        "notary-public-services-kidderminster",
      ]),
    );

    expect(guidePages.map((page) => page.slug)).toEqual(
      expect.arrayContaining([
        "estate-owner-legal-advice",
        "buying-selling-agricultural-property",
        "common-land-town-village-greens",
        "public-rights-of-way-highways-disputes",
        "rural-business-structures",
        "rural-leisure-pursuits-legal-issues",
        "rural-tax-succession-planning",
      ]),
    );

    [
      "insolvency-solicitors-kidderminster",
      "regulatory-solicitors-kidderminster",
      "notary-public-services-kidderminster",
      "estate-owner-legal-advice",
      "buying-selling-agricultural-property",
      "common-land-town-village-greens",
      "public-rights-of-way-highways-disputes",
      "rural-business-structures",
      "rural-leisure-pursuits-legal-issues",
      "rural-tax-succession-planning",
    ].forEach((slug) => {
      expect(getAllPageSlugs()).toContain(slug);
    });
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

describe("breadcrumbs, article, and organization schema", () => {
  it("builds a two-level breadcrumb for service pages", () => {
    const service = servicePages[0];
    const items = buildBreadcrumbItems(service);

    expect(items).toHaveLength(2);
    expect(items[0]).toMatchObject({ name: "Home", path: "/" });
    expect(items[1]).toMatchObject({
      name: service.h1,
      url: buildCanonicalUrl(service.slug),
    });
  });

  it("builds a three-level breadcrumb for guide pages", () => {
    const guide = guidePages[0];
    const items = buildBreadcrumbItems(guide);

    expect(items.map((item) => item.name)).toEqual([
      "Home",
      "Legal guides",
      guide.h1,
    ]);
    expect(items[2].url).toBe(buildCanonicalUrl(guide.slug));
  });

  it("emits a BreadcrumbList with sequential positions and absolute URLs", () => {
    const schema = buildBreadcrumbSchema(guidePages[0]) as {
      "@type": string;
      itemListElement: { position: number; item: string }[];
    };

    expect(schema["@type"]).toBe("BreadcrumbList");
    schema.itemListElement.forEach((entry, index) => {
      expect(entry.position).toBe(index + 1);
      expect(entry.item).toMatch(/^https:\/\//);
    });
  });

  it("emits Article schema for guides without implying a law firm", () => {
    const guide = guidePages[0];
    const schema = buildGuideArticleSchema(guide) as Record<string, unknown>;

    expect(schema["@type"]).toBe("Article");
    expect(schema.headline).toBe(guide.h1);
    expect(schema.mainEntityOfPage).toMatchObject({
      "@id": buildCanonicalUrl(guide.slug),
    });

    const serialized = JSON.stringify(schema);
    expect(serialized).not.toContain("LegalService");
    expect(serialized).not.toContain("Attorney");
  });

  it("enriches the organization schema while staying a guide brand", () => {
    expect(guideOrganizationSchema).toMatchObject({
      "@type": "Organization",
      areaServed: expect.stringMatching(/Kidderminster/i),
    });
    expect(JSON.stringify(guideOrganizationSchema)).not.toContain("LegalService");
  });
});

describe("link target integrity", () => {
  it("resolves every related guide slug to a guide page", () => {
    const guideSlugs = new Set(guidePages.map((guide) => guide.slug));

    servicePages.forEach((service) => {
      (service.relatedGuideSlugs ?? []).forEach((slug) => {
        expect(
          guideSlugs.has(slug),
          `service "${service.slug}" -> missing guide "${slug}"`,
        ).toBe(true);
      });
    });

    guidePages.forEach((guide) => {
      guide.relatedGuideSlugs.forEach((slug) => {
        expect(
          guideSlugs.has(slug),
          `guide "${guide.slug}" -> missing guide "${slug}"`,
        ).toBe(true);
      });
    });
  });

  it("resolves every inline [[anchor|slug]] link to a real page", () => {
    const pattern = /\[\[([^\]|]+)\|([a-z0-9-]+)\]\]/g;

    [...servicePages, ...guidePages].forEach((page) => {
      const blob = JSON.stringify(page);
      for (const match of blob.matchAll(pattern)) {
        const slug = match[2];
        expect(
          getPageBySlug(slug),
          `page "${page.slug}" -> unresolved inline link "${slug}"`,
        ).toBeTruthy();
      }
    });
  });
});
