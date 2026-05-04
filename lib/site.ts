export const baseUrl = "https://kidderminstersolicitors.co.uk";

export const phaseOneServiceSlugs = [
  "conveyancing-solicitors-kidderminster",
  "probate-solicitors-kidderminster",
  "family-law-solicitors-kidderminster",
] as const;

export type Faq = {
  question: string;
  answer: string;
};

export type ServicePage = {
  type: "service";
  slug: string;
  title: string;
  h1: string;
  metaDescription: string;
  category: string;
  summary: string;
  intro: string;
  localAngle: string;
  comparisonPoints: string[];
  faq: Faq[];
};

export type TrustPage = {
  type: "trust";
  slug: string;
  title: string;
  h1: string;
  metaDescription: string;
  body: string[];
};

export type GuidePage = {
  type: "guide";
  slug: string;
  title: string;
  h1: string;
  metaDescription: string;
  category: string;
  updated: string;
  relatedServiceSlug: string;
  intro: string;
  sections: {
    heading: string;
    body: string;
  }[];
  faq?: Faq[];
};

export type SitePage = ServicePage | TrustPage | GuidePage;

export const servicePages: ServicePage[] = [
  {
    type: "service",
    slug: "conveyancing-solicitors-kidderminster",
    title: "Conveyancing Solicitors Kidderminster",
    h1: "Conveyancing solicitors in Kidderminster",
    metaDescription:
      "Compare conveyancing solicitor options in Kidderminster and request a no obligation quote from a trusted local partner.",
    category: "Conveyancing",
    summary:
      "Buying, selling, remortgaging, or transferring equity in and around Kidderminster.",
    intro:
      "Conveyancing is the first commercial focus for this website because local intent is strong, the process is easy for users to understand, and quotes can be compared clearly.",
    localAngle:
      "Whether the property is near the town centre, Comberton, Franche, Stourport Road, or another part of the Wyre Forest area, the right solicitor should communicate clearly and keep the transaction moving.",
    comparisonPoints: [
      "Check whether the quote includes legal fees, VAT, searches, bank transfer fees, and Land Registry costs.",
      "Ask who will handle your file day to day and how quickly they respond.",
      "Make sure the firm can act for your mortgage lender if you are buying with finance.",
    ],
    faq: [
      {
        question: "Can I compare conveyancing quotes through this website?",
        answer:
          "Yes. You can request a no obligation quote and your enquiry may be passed to a solicitor firm or legal service provider who can contact you directly.",
      },
      {
        question: "Is this website a conveyancing firm?",
        answer:
          "No. This is an independent local information and comparison website. Legal advice is provided only by the solicitor firm you choose to instruct.",
      },
      {
        question: "Do I have to instruct a firm introduced through this website?",
        answer:
          "No. You are under no obligation to instruct any firm introduced through this website.",
      },
    ],
  },
  {
    type: "service",
    slug: "probate-solicitors-kidderminster",
    title: "Probate Solicitors Kidderminster",
    h1: "Probate solicitors in Kidderminster",
    metaDescription:
      "Find probate solicitor options in Kidderminster and request a no obligation quote from a trusted legal provider.",
    category: "Probate",
    summary:
      "Support with probate, estate administration, grants of representation, and related legal paperwork.",
    intro:
      "Probate can be practical, emotional, and time sensitive. This guide helps you understand what to compare before speaking to a solicitor.",
    localAngle:
      "Families in Kidderminster, Stourport, Bewdley, and nearby villages may need help dealing with property, accounts, beneficiaries, and estate documents.",
    comparisonPoints: [
      "Ask whether the firm charges a fixed fee, hourly rate, or percentage-based fee.",
      "Clarify which parts of the estate administration are included.",
      "Check whether the solicitor handles inheritance tax forms, property transfers, and beneficiary communication.",
    ],
    faq: [
      {
        question: "When might I need a probate solicitor?",
        answer:
          "You may want professional help where the estate includes property, multiple beneficiaries, tax issues, disputed matters, or unfamiliar paperwork.",
      },
      {
        question: "Can I request a probate quote without obligation?",
        answer:
          "Yes. The quote request is no obligation, and users remain free to contact firms independently.",
      },
      {
        question: "Does this website provide probate advice?",
        answer:
          "No. We provide general information and introductions only. Any legal advice comes from the solicitor or legal service provider you choose.",
      },
    ],
  },
  {
    type: "service",
    slug: "family-law-solicitors-kidderminster",
    title: "Family Law Solicitors Kidderminster",
    h1: "Family law solicitors in Kidderminster",
    metaDescription:
      "Compare family law solicitor options in Kidderminster and request a no obligation quote from a trusted local partner.",
    category: "Family Law",
    summary:
      "Guidance for family arrangements, children matters, separation, and related solicitor enquiries.",
    intro:
      "Family law enquiries can be sensitive, so the site uses careful language and routes users to professional firms rather than offering advice directly.",
    localAngle:
      "A local or regional solicitor may be helpful where meetings, documentation, or court familiarity matter to the user.",
    comparisonPoints: [
      "Ask who will handle your matter and what experience they have with similar family law work.",
      "Clarify likely costs, timescales, and what is included before instructing a firm.",
      "Check whether the firm offers fixed-fee initial advice or staged pricing.",
    ],
    faq: [
      {
        question: "Can I use this site for sensitive family law enquiries?",
        answer:
          "Yes, but the site is an introduction route only. You should avoid sending unnecessary confidential detail until you are speaking directly with a solicitor.",
      },
      {
        question: "Will I receive legal advice from this website?",
        answer:
          "No. This website is not a law firm and does not provide legal advice.",
      },
      {
        question: "Am I obliged to instruct a partner firm?",
        answer:
          "No. You are never obliged to instruct a firm introduced through this website.",
      },
    ],
  },
  {
    type: "service",
    slug: "divorce-solicitors-kidderminster",
    title: "Divorce Solicitors Kidderminster",
    h1: "Divorce solicitors in Kidderminster",
    metaDescription:
      "Compare divorce solicitor options in Kidderminster and request a no obligation quote.",
    category: "Divorce",
    summary:
      "Solicitor introductions for divorce, financial arrangements, and separation-related legal support.",
    intro:
      "Divorce matters need clear communication and transparent costs. This page helps users compare what to ask before choosing a firm.",
    localAngle:
      "Users in Kidderminster and nearby Worcestershire areas may prefer a firm that can explain the process clearly and respond quickly.",
    comparisonPoints: [
      "Ask whether the firm handles financial remedy work as well as the divorce process.",
      "Check whether fixed-fee or staged pricing is available.",
      "Confirm how contact will be managed and how quickly updates are normally provided.",
    ],
    faq: [
      {
        question: "Can this website advise me about divorce?",
        answer:
          "No. We provide general information and introductions only. Legal advice must come from a qualified legal provider.",
      },
      {
        question: "Can I request a divorce solicitor quote?",
        answer:
          "Yes. You can submit a no obligation enquiry and a suitable partner may contact you.",
      },
      {
        question: "Will my enquiry be confidential?",
        answer:
          "We handle enquiries carefully, but users should avoid sending unnecessary sensitive information until speaking directly with a solicitor.",
      },
    ],
  },
  {
    type: "service",
    slug: "wills-solicitors-kidderminster",
    title: "Wills Solicitors Kidderminster",
    h1: "Wills solicitors in Kidderminster",
    metaDescription:
      "Find wills solicitor options in Kidderminster and request a no obligation quote.",
    category: "Wills",
    summary:
      "Help finding solicitors for wills, estate planning, and related private client work.",
    intro:
      "A professionally prepared will can reduce uncertainty for families. This guide helps users compare local solicitor options.",
    localAngle:
      "Kidderminster users may want a local or regional firm that can explain the process in plain English and help with related documents.",
    comparisonPoints: [
      "Ask what the quote includes and whether mirror wills cost extra.",
      "Check whether the solicitor can advise on inheritance tax and trusts if needed.",
      "Confirm how signing and witnessing will be handled.",
    ],
    faq: [
      {
        question: "Do I need a solicitor to make a will?",
        answer:
          "Not always, but a solicitor can be useful where your estate, family arrangements, or wishes are more complex.",
      },
      {
        question: "Can I get a no obligation quote?",
        answer:
          "Yes. The quote request can be passed to a solicitor firm or legal service provider.",
      },
      {
        question: "Is this site a wills provider?",
        answer:
          "No. This site is an independent guide and introduction website.",
      },
    ],
  },
  {
    type: "service",
    slug: "employment-solicitors-kidderminster",
    title: "Employment Solicitors Kidderminster",
    h1: "Employment solicitors in Kidderminster",
    metaDescription:
      "Compare employment solicitor options in Kidderminster and request a no obligation quote.",
    category: "Employment",
    summary:
      "Introductions for workplace disputes, settlement agreements, contracts, and employer or employee matters.",
    intro:
      "Employment law questions can be time sensitive. This page helps users request a suitable solicitor introduction without treating the website as an advice provider.",
    localAngle:
      "Kidderminster workers and employers may need quick, practical guidance from a regulated legal provider.",
    comparisonPoints: [
      "Check whether the firm acts for employees, employers, or both.",
      "Ask about fees for settlement agreements and urgent document reviews.",
      "Clarify timescales where tribunal or response deadlines may apply.",
    ],
    faq: [
      {
        question: "Can I get employment law advice here?",
        answer:
          "No. This website does not provide legal advice. It can introduce you to a legal service provider who may be able to help.",
      },
      {
        question: "Are employment enquiries time sensitive?",
        answer:
          "They can be. You should speak directly with a solicitor as soon as possible if deadlines may apply.",
      },
      {
        question: "Is the quote request binding?",
        answer:
          "No. The quote request is no obligation.",
      },
    ],
  },
  {
    type: "service",
    slug: "personal-injury-solicitors-kidderminster",
    title: "Personal Injury Solicitors Kidderminster",
    h1: "Personal injury solicitors in Kidderminster",
    metaDescription:
      "Compare personal injury solicitor options in Kidderminster with clear referral disclosure.",
    category: "Personal Injury",
    summary:
      "Introductions for personal injury enquiries, with transparent wording around referral relationships.",
    intro:
      "Personal injury marketing needs especially careful language. This site avoids guarantees and does not claim users will win a claim.",
    localAngle:
      "Users in Kidderminster may want to speak with a regulated firm that can explain funding, eligibility, and next steps.",
    comparisonPoints: [
      "Ask how fees work and whether any deductions may apply.",
      "Avoid relying on any website that guarantees a result.",
      "Confirm who will handle your matter and how evidence will be reviewed.",
    ],
    faq: [
      {
        question: "Does this site promise compensation?",
        answer:
          "No. We do not guarantee outcomes and do not provide legal advice.",
      },
      {
        question: "What does no win no fee mean?",
        answer:
          "Funding terms can vary. A solicitor should explain any agreement, deductions, insurance, and potential costs before you sign.",
      },
      {
        question: "Can I request a call?",
        answer:
          "Yes. You can submit an enquiry and a partner firm may contact you.",
      },
    ],
  },
  {
    type: "service",
    slug: "commercial-solicitors-kidderminster",
    title: "Commercial Solicitors Kidderminster",
    h1: "Commercial solicitors in Kidderminster",
    metaDescription:
      "Compare commercial solicitor options for Kidderminster businesses and request a no obligation quote.",
    category: "Commercial Law",
    summary:
      "Introductions for business law, contracts, disputes, and commercial legal support.",
    intro:
      "Local businesses often need legal help that is practical, responsive, and clear on cost.",
    localAngle:
      "Kidderminster and Wyre Forest businesses may need support with contracts, leases, disputes, terms, and trading arrangements.",
    comparisonPoints: [
      "Ask whether the firm has experience with businesses of your size and sector.",
      "Clarify whether advice is fixed-fee, hourly, or retainer-based.",
      "Check who will be your day-to-day contact.",
    ],
    faq: [
      {
        question: "Can businesses use the quote form?",
        answer:
          "Yes. Business owners can request a no obligation introduction to a solicitor partner.",
      },
      {
        question: "Does this website review contracts?",
        answer:
          "No. Contract review and advice must come from the solicitor or legal service provider.",
      },
      {
        question: "Can commercial placement be exclusive?",
        answer:
          "Commercial partner placement can be configured by category, subject to suitability and disclosure.",
      },
    ],
  },
  {
    type: "service",
    slug: "landlord-tenant-solicitors-kidderminster",
    title: "Landlord and Tenant Solicitors Kidderminster",
    h1: "Landlord and tenant solicitors in Kidderminster",
    metaDescription:
      "Find landlord and tenant solicitor options in Kidderminster and request a no obligation quote.",
    category: "Landlord Tenant",
    summary:
      "Introductions for tenancy disputes, landlord issues, possession matters, and housing-related enquiries.",
    intro:
      "Landlord and tenant matters can involve strict process and deadlines, so users should speak directly with a qualified legal provider.",
    localAngle:
      "Kidderminster landlords and tenants may need local or regional support for practical property disputes.",
    comparisonPoints: [
      "Ask whether the firm acts for landlords, tenants, or both.",
      "Clarify urgent deadlines and documents before delaying.",
      "Check costs, likely stages, and what information the solicitor needs first.",
    ],
    faq: [
      {
        question: "Can this site help with urgent landlord and tenant matters?",
        answer:
          "The website can pass an enquiry to a partner, but it does not provide emergency legal advice.",
      },
      {
        question: "Should I send documents through the quote form?",
        answer:
          "No. Keep the message brief and provide documents only when speaking directly with a solicitor or legal provider.",
      },
      {
        question: "Is there an obligation to instruct?",
        answer:
          "No. There is no obligation to instruct any firm introduced through the website.",
      },
    ],
  },
];

export const trustPages: TrustPage[] = [
  {
    type: "trust",
    slug: "about",
    title: "About Kidderminster Solicitors",
    h1: "About this independent local guide",
    metaDescription:
      "Learn how Kidderminster Solicitors works as an independent legal information and solicitor comparison website.",
    body: [
      "KidderminsterSolicitors.co.uk is an independent local legal guide designed to help people compare solicitor services and request a no obligation quote.",
      "The website is not a law firm, solicitor practice, regulated legal provider, or Google Business Profile-style local business.",
      "Enquiries submitted through this website may be passed to a solicitor firm or legal service provider that can contact the user about their enquiry.",
      "Users remain free to contact firms independently and are under no obligation to instruct any firm introduced through this website.",
    ],
  },
  {
    type: "trust",
    slug: "contact",
    title: "Contact Kidderminster Solicitors",
    h1: "Contact the guide",
    metaDescription:
      "Contact Kidderminster Solicitors, an independent local guide and solicitor comparison website.",
    body: [
      "Use the quote form for legal service enquiries. General website, advertising, and editorial enquiries can be sent through the same route with a short message.",
      "Please do not send confidential legal documents through this website. Legal advice is provided only by the solicitor firm or legal service provider you choose to instruct.",
      "If a matter is urgent or court deadlines may apply, contact a qualified legal provider directly.",
    ],
  },
  {
    type: "trust",
    slug: "privacy-policy",
    title: "Privacy Policy",
    h1: "Privacy policy",
    metaDescription:
      "Privacy information for KidderminsterSolicitors.co.uk quote and contact enquiries.",
    body: [
      "This website collects enquiry information such as name, email address, phone number, postcode, legal matter type, preferred contact time, message, source page, and attribution data where available.",
      "We use this information to process the enquiry, route it to a suitable solicitor firm or legal service provider, send confirmation, and maintain basic reporting.",
      "Enquiries may be processed to handle your request and may be shared with a partner firm or legal service provider for the purpose of responding to the enquiry.",
      "Users should avoid submitting unnecessary sensitive information through the website form. Further details can be shared directly with the solicitor or legal provider if the user chooses to proceed.",
      "Users can request deletion or correction of their information by contacting the website operator.",
    ],
  },
  {
    type: "trust",
    slug: "terms",
    title: "Terms",
    h1: "Terms of use",
    metaDescription:
      "Terms of use for KidderminsterSolicitors.co.uk, an independent legal information and comparison website.",
    body: [
      "This website provides general information and solicitor introduction services. It does not provide legal advice.",
      "No solicitor-client relationship is created by using this website or submitting an enquiry form.",
      "Any decision to instruct a solicitor firm or legal service provider is the user's own decision.",
      "Users should verify a firm's regulatory status, services, costs, and suitability before instructing them.",
      "We aim for accuracy but cannot guarantee that all information remains complete, current, or suitable for every user.",
    ],
  },
  {
    type: "trust",
    slug: "advertising-disclosure",
    title: "Advertising Disclosure",
    h1: "Advertising and referral disclosure",
    metaDescription:
      "How referral fees, marketing fees, and commercial relationships work on KidderminsterSolicitors.co.uk.",
    body: [
      "This website is an independent legal information and solicitor comparison website. It is not a law firm and does not provide legal advice.",
      "Solicitor firms or legal service providers may have a commercial relationship with this website.",
      "We may receive a referral fee, marketing fee, or other commercial payment from partner firms or legal service providers.",
      "Commercial placement does not guarantee that a firm is suitable for every user or every matter.",
      "Users are under no obligation to instruct any firm introduced through this website and can contact firms independently.",
    ],
  },
  {
    type: "trust",
    slug: "editorial-policy",
    title: "Editorial Policy",
    h1: "Editorial policy",
    metaDescription:
      "How KidderminsterSolicitors.co.uk writes local legal guides and explains solicitor introductions.",
    body: [
      "The website aims to publish clear, useful, local information about solicitor services in Kidderminster and the wider Wyre Forest area.",
      "Solicitor introductions may be influenced by relevance, availability, category fit, and commercial relationships with this website.",
      "Commercial relationships may affect placement, but advertising should be identifiable and the website should not misrepresent itself as a solicitor firm.",
      "Users should verify credentials, regulatory status, costs, and suitability before instructing any solicitor or legal service provider.",
      "Legal advice comes only from the solicitor firm or legal service provider, not from this website.",
    ],
  },
  {
    type: "trust",
    slug: "cookie-policy",
    title: "Cookie Policy",
    h1: "Cookie policy",
    metaDescription:
      "How KidderminsterSolicitors.co.uk uses necessary, analytics, and marketing cookies.",
    body: [
      "Necessary cookies are used to make the website work and remember choices such as cookie preferences.",
      "Analytics cookies help us understand site performance and improve the user experience. They are off by default until consent is given.",
      "Marketing cookies may support marketing activity where consent is given. They are off by default until consent is given.",
      "You can accept all cookies, reject non-essential cookies, or manage preferences using the cookie settings link in the footer.",
    ],
  },
];

export const guidePages: GuidePage[] = [
  {
    type: "guide",
    slug: "how-much-do-conveyancing-solicitors-cost-in-kidderminster",
    title: "How Much Do Conveyancing Solicitors Cost in Kidderminster?",
    h1: "How much do conveyancing solicitors cost in Kidderminster?",
    metaDescription:
      "A general guide to conveyancing solicitor costs in Kidderminster, what may be included, and what to compare before requesting a quote.",
    category: "Conveyancing",
    updated: "2026-05-04",
    relatedServiceSlug: "conveyancing-solicitors-kidderminster",
    intro:
      "Conveyancing costs can vary depending on the property, lender requirements, leasehold issues, searches, and how complex the transaction becomes.",
    sections: [
      {
        heading: "What is usually included",
        body:
          "A conveyancing quote may include the solicitor's legal fee, VAT, search fees, Land Registry fees, bank transfer fees, identity checks, and other disbursements. Ask for a full breakdown so you can compare like with like.",
      },
      {
        heading: "Why quotes differ",
        body:
          "A leasehold flat, remortgage, shared ownership property, gifted deposit, or purchase with a mortgage can involve extra checks. A cheaper headline price may not include every required item.",
      },
      {
        heading: "How to compare local options",
        body:
          "If you are buying or selling in Kidderminster or the Wyre Forest area, compare response times, lender panel status, what is included, and who will handle your file day to day.",
      },
    ],
    faq: [
      {
        question: "Is the cheapest conveyancing quote always best?",
        answer:
          "Not necessarily. Compare what is included, how extras are charged, and how clearly the firm communicates.",
      },
      {
        question: "Can I request a conveyancing quote through this website?",
        answer:
          "Yes. You can request a no obligation quote and a suitable solicitor partner may contact you directly.",
      },
    ],
  },
  {
    type: "guide",
    slug: "what-does-a-conveyancing-solicitor-do",
    title: "What Does a Conveyancing Solicitor Do?",
    h1: "What does a conveyancing solicitor do?",
    metaDescription:
      "General guide to what a conveyancing solicitor may handle when buying, selling, remortgaging, or transferring property.",
    category: "Conveyancing",
    updated: "2026-05-04",
    relatedServiceSlug: "conveyancing-solicitors-kidderminster",
    intro:
      "A conveyancing solicitor helps with the legal process of transferring property ownership. Their role depends on whether you are buying, selling, remortgaging, or transferring equity.",
    sections: [
      {
        heading: "For buyers",
        body:
          "A solicitor may review the contract pack, raise enquiries, order searches, report to your lender, handle exchange and completion, and register ownership after completion.",
      },
      {
        heading: "For sellers",
        body:
          "A solicitor may prepare contract paperwork, answer buyer enquiries, manage mortgage redemption figures, handle exchange and completion, and account for sale proceeds.",
      },
      {
        heading: "Why communication matters",
        body:
          "Property transactions often involve estate agents, lenders, surveyors, and other solicitors. Clear communication helps keep each stage moving.",
      },
    ],
  },
  {
    type: "guide",
    slug: "buying-a-house-in-kidderminster-legal-checklist",
    title: "Buying a House in Kidderminster: Legal Checklist",
    h1: "Buying a house in Kidderminster: legal checklist",
    metaDescription:
      "A practical general checklist for legal steps when buying a house in Kidderminster or the wider Wyre Forest area.",
    category: "Conveyancing",
    updated: "2026-05-04",
    relatedServiceSlug: "conveyancing-solicitors-kidderminster",
    intro:
      "Buying a property is easier to manage when you understand the common legal steps and the information your solicitor may ask for.",
    sections: [
      {
        heading: "Before instructing",
        body:
          "Check the firm can act for your mortgage lender, ask for a full quote, and confirm who will handle your file.",
      },
      {
        heading: "Early paperwork",
        body:
          "Be ready for identity checks, source of funds questions, mortgage details, and information about any gifted deposit.",
      },
      {
        heading: "Local practicalities",
        body:
          "For homes around Kidderminster, Stourport, Bewdley, and nearby villages, searches and enquiries may raise local planning, drainage, access, or title issues that need reviewing by the solicitor.",
      },
    ],
  },
  {
    type: "guide",
    slug: "what-does-a-probate-solicitor-do",
    title: "What Does a Probate Solicitor Do?",
    h1: "What does a probate solicitor do?",
    metaDescription:
      "General information about what probate solicitors may help executors and families with during estate administration.",
    category: "Probate and Wills",
    updated: "2026-05-04",
    relatedServiceSlug: "probate-solicitors-kidderminster",
    intro:
      "A probate solicitor can help executors and families understand and manage the legal and practical steps involved in administering an estate.",
    sections: [
      {
        heading: "Common probate support",
        body:
          "Support may include identifying estate assets, preparing probate forms, applying for a grant of representation, dealing with tax paperwork, and distributing the estate.",
      },
      {
        heading: "When help may be useful",
        body:
          "Professional help may be useful where there is property, inheritance tax, multiple beneficiaries, overseas assets, unclear paperwork, or a dispute risk.",
      },
      {
        heading: "What to prepare",
        body:
          "Useful documents can include the will, death certificate, asset details, liability details, bank information, pension details, and beneficiary contact information.",
      },
    ],
  },
  {
    type: "guide",
    slug: "how-long-does-probate-take",
    title: "How Long Does Probate Take?",
    h1: "How long does probate take?",
    metaDescription:
      "A general guide to probate timescales, common delays, and what can affect estate administration.",
    category: "Probate and Wills",
    updated: "2026-05-04",
    relatedServiceSlug: "probate-solicitors-kidderminster",
    intro:
      "Probate timescales vary. Some estates are straightforward, while others take longer because of property, tax, missing information, or disputes.",
    sections: [
      {
        heading: "What affects timing",
        body:
          "Timing can depend on how quickly asset values are gathered, whether tax forms are needed, how busy the probate registry is, and whether beneficiaries or documents are difficult to trace.",
      },
      {
        heading: "Estate administration can take longer",
        body:
          "Receiving the grant is only one stage. Selling property, paying liabilities, resolving tax matters, and distributing funds may take additional time.",
      },
      {
        heading: "How to reduce delay",
        body:
          "Clear records, prompt replies, accurate asset information, and early professional support can help reduce avoidable delays.",
      },
    ],
  },
  {
    type: "guide",
    slug: "do-you-need-a-solicitor-for-probate",
    title: "Do You Need a Solicitor for Probate?",
    h1: "Do you need a solicitor for probate?",
    metaDescription:
      "General information about when executors may handle probate themselves and when solicitor support may be useful.",
    category: "Probate and Wills",
    updated: "2026-05-04",
    relatedServiceSlug: "probate-solicitors-kidderminster",
    intro:
      "Some executors handle probate themselves, but professional support can be useful where the estate is complex or the executor is unsure about the process.",
    sections: [
      {
        heading: "When people handle it themselves",
        body:
          "A simple estate with clear assets, no property, no tax issues, and cooperative beneficiaries may be more manageable for an executor.",
      },
      {
        heading: "When support may help",
        body:
          "A solicitor may be helpful where there is property, inheritance tax, missing documents, overseas assets, business interests, trusts, or potential disagreement.",
      },
      {
        heading: "Comparing options",
        body:
          "Ask whether the solicitor can handle the full estate administration or only specific parts, and compare how fees are calculated.",
      },
    ],
  },
  {
    type: "guide",
    slug: "how-to-prepare-for-a-divorce-solicitor-consultation",
    title: "How to Prepare for a Divorce Solicitor Consultation",
    h1: "How to prepare for a divorce solicitor consultation",
    metaDescription:
      "General preparation checklist for speaking to a divorce solicitor about separation, finances, and child arrangements.",
    category: "Family and Divorce",
    updated: "2026-05-04",
    relatedServiceSlug: "divorce-solicitors-kidderminster",
    intro:
      "Preparing before a first divorce consultation can help you explain the situation clearly and make better use of the appointment.",
    sections: [
      {
        heading: "Information to gather",
        body:
          "It may help to list important dates, marriage or civil partnership details, children arrangements, property, savings, pensions, debts, and income information.",
      },
      {
        heading: "Questions to ask",
        body:
          "Ask about likely stages, communication, costs, timescales, what information is needed, and whether mediation or other support may be relevant.",
      },
      {
        heading: "Keep detail proportionate",
        body:
          "Use the initial enquiry to outline the matter. Avoid sending unnecessary sensitive information through comparison forms before speaking directly with a solicitor.",
      },
    ],
  },
  {
    type: "guide",
    slug: "what-does-a-family-law-solicitor-help-with",
    title: "What Does a Family Law Solicitor Help With?",
    h1: "What does a family law solicitor help with?",
    metaDescription:
      "General guide to the types of issues a family law solicitor may help with, including separation and child arrangements.",
    category: "Family and Divorce",
    updated: "2026-05-04",
    relatedServiceSlug: "family-law-solicitors-kidderminster",
    intro:
      "Family law solicitors may help with a wide range of personal matters, often involving relationships, children, finances, and future arrangements.",
    sections: [
      {
        heading: "Common family law matters",
        body:
          "Support may relate to separation, divorce, child arrangements, financial arrangements, cohabitation, domestic abuse protections, and related documentation.",
      },
      {
        heading: "Choosing support",
        body:
          "Ask whether the firm regularly handles matters like yours, how costs are explained, and who will be your day-to-day contact.",
      },
      {
        heading: "Local considerations",
        body:
          "Some users prefer a local or regional solicitor where meetings, local services, or practical support around Kidderminster and Wyre Forest matter.",
      },
    ],
  },
  {
    type: "guide",
    slug: "settlement-agreements-explained",
    title: "Settlement Agreements Explained",
    h1: "Settlement agreements explained",
    metaDescription:
      "General information about settlement agreements, why independent legal advice is usually required, and what to prepare.",
    category: "Employment",
    updated: "2026-05-04",
    relatedServiceSlug: "employment-solicitors-kidderminster",
    intro:
      "A settlement agreement is commonly used to record agreed terms between an employer and employee, often when employment is ending.",
    sections: [
      {
        heading: "Why legal advice matters",
        body:
          "Settlement agreements usually require independent legal advice for the agreement to be valid. The adviser should explain the effect of the agreement and the rights being waived.",
      },
      {
        heading: "What to prepare",
        body:
          "Useful information can include the draft agreement, employment contract, recent payslips, bonus or commission information, and any relevant correspondence.",
      },
      {
        heading: "Costs and timing",
        body:
          "Employers often contribute to advice costs, but the amount varies. Settlement agreements can be time sensitive, so prompt contact with a solicitor may be important.",
      },
    ],
  },
  {
    type: "guide",
    slug: "when-should-you-speak-to-an-employment-solicitor",
    title: "When Should You Speak to an Employment Solicitor?",
    h1: "When should you speak to an employment solicitor?",
    metaDescription:
      "General guide to situations where speaking to an employment solicitor may be useful for employees or employers.",
    category: "Employment",
    updated: "2026-05-04",
    relatedServiceSlug: "employment-solicitors-kidderminster",
    intro:
      "Employment issues can move quickly. Speaking to a solicitor may be useful where deadlines, documents, or workplace disputes need careful handling.",
    sections: [
      {
        heading: "Employee situations",
        body:
          "Employees may seek help with settlement agreements, dismissal concerns, redundancy, discrimination concerns, grievances, disciplinary issues, or contract questions.",
      },
      {
        heading: "Employer situations",
        body:
          "Employers may need support with contracts, policies, grievances, dismissals, redundancies, settlement agreements, and tribunal risk.",
      },
      {
        heading: "Do not delay where deadlines may apply",
        body:
          "Employment tribunal and internal process deadlines can be short. This website cannot advise on deadlines, so users should speak directly with a qualified provider where timing may matter.",
      },
    ],
  },
];

export const guideOrganizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Kidderminster Solicitors",
  url: baseUrl,
  description:
    "An independent local guide to finding trusted solicitors in Kidderminster.",
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Kidderminster Solicitors",
  url: baseUrl,
  potentialAction: {
    "@type": "SearchAction",
    target: `${baseUrl}/?s={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export function buildFaqSchema(page: ServicePage) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildCanonicalUrl(slug: string) {
  return slug ? `${baseUrl}/${slug}/` : baseUrl;
}

export function getAllPageSlugs() {
  return ["legal-guides", ...servicePages, ...trustPages, ...guidePages].map(
    (page) => (typeof page === "string" ? page : page.slug),
  );
}

export function getPageBySlug(slug: string) {
  return [...servicePages, ...trustPages, ...guidePages].find(
    (page) => page.slug === slug,
  );
}
