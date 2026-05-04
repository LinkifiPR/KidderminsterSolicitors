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
  keyTakeaways?: string[];
  sections?: {
    heading: string;
    body: string[];
  }[];
  relatedGuideSlugs?: string[];
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
  keyTakeaways: string[];
  sections: {
    heading: string;
    body: string[];
  }[];
  relatedGuideSlugs: string[];
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
      "Compare conveyancing solicitor options in Kidderminster and request a no obligation quote from a suitable solicitor partner.",
    category: "Conveyancing",
    summary:
      "Buying, selling, remortgaging, or transferring equity in and around Kidderminster.",
    intro:
      "Buying, selling, remortgaging, or transferring equity can involve searches, lender checks, title issues, contract paperwork, and completion deadlines. This page helps you understand what to compare before requesting a conveyancing quote in Kidderminster.",
    localAngle:
      "Whether the property is near Kidderminster town centre, Comberton, Franche, Stourport Road, Bewdley, Cookley, Hagley, or another part of the Wyre Forest area, clear communication and a transparent quote can make the process easier to manage.",
    keyTakeaways: [
      "A conveyancing quote should separate legal fees from searches, Land Registry costs, bank transfer fees, and other third-party costs.",
      "Tell the solicitor early if the property is leasehold, mortgage-funded, new-build, shared ownership, or involves a gifted deposit.",
      "This website is an independent guide and may introduce you to a suitable solicitor partner, but it does not provide legal advice.",
    ],
    sections: [
      {
        heading: "What conveyancing solicitors may help with",
        body: [
          "A conveyancing solicitor may handle the legal work for buying, selling, remortgaging, transfers of equity, leasehold sales and purchases, and lender requirements. Their work normally includes reviewing title, checking contracts, raising or answering enquiries, dealing with searches, arranging exchange and completion, and registering ownership or lender interests where required.",
          "The exact work depends on the transaction. A straightforward freehold sale is different from a leasehold flat purchase, a new-build home, or a remortgage with a transfer of equity. A useful quote should reflect the actual matter rather than treating every property transaction as identical.",
        ],
      },
      {
        heading: "What to compare before requesting a quote",
        body: [
          "Compare what is included in the legal fee, what is listed as a disbursement, whether VAT is shown clearly, whether lender work is included, and whether extra fees may apply for leasehold, gifted deposits, Help to Buy-related work, or unregistered title. A low headline price can be less useful than a clear itemised quote.",
          "You should also compare communication. Ask who will manage the file, how updates are provided, whether the firm can act for your mortgage lender, and what happens if the transaction falls through before exchange.",
        ],
      },
      {
        heading: "Local Kidderminster property context",
        body: [
          "Property transactions around Kidderminster and Wyre Forest can involve a mix of older homes, newer estates, flats, terraces, rural edges, leasehold issues, rights of way, drainage questions, planning history, and chain pressure. Local authority searches and enquiries may raise practical points that need explaining before exchange.",
          "A local or regional conveyancing solicitor may be useful if you want familiarity with Worcestershire property transactions, but many matters can also be handled remotely. The key is choosing a firm that explains the process clearly and gives you realistic expectations.",
        ],
      },
      {
        heading: "What to prepare",
        body: [
          "Before requesting a quote, prepare the property postcode, estimated price, whether you are buying or selling, mortgage lender if known, tenure if known, and any special circumstances such as gifted deposits, leasehold, shared ownership, or a related sale.",
          "You do not need to send confidential documents through the quote form. A short practical summary is enough at enquiry stage. Detailed documents should be shared directly with a solicitor or legal service provider if you choose to instruct them.",
        ],
      },
    ],
    relatedGuideSlugs: [
      "how-much-do-conveyancing-solicitors-cost-in-kidderminster",
      "what-does-a-conveyancing-solicitor-do",
      "buying-a-house-in-kidderminster-legal-checklist",
    ],
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
      "Find probate solicitor options in Kidderminster and request a no obligation quote from a suitable legal service provider.",
    category: "Probate",
    summary:
      "Support with probate, estate administration, grants of representation, and related legal paperwork.",
    intro:
      "Probate can involve legal paperwork, estate assets, debts, property, tax forms, beneficiary communication, and sensitive family circumstances. This page helps executors and families understand what to compare before requesting a probate solicitor quote.",
    localAngle:
      "Families in Kidderminster, Stourport, Bewdley, Cookley, Hagley, and nearby Worcestershire communities may need help dealing with local property, accounts, beneficiaries, estate documents, and practical administration.",
    keyTakeaways: [
      "Probate support can range from help with a grant application to full estate administration.",
      "Property, tax questions, unclear paperwork, multiple beneficiaries, or disagreement can make professional support more useful.",
      "This website provides general information and solicitor introductions only, not probate advice.",
    ],
    sections: [
      {
        heading: "What probate solicitors may help with",
        body: [
          "A probate solicitor may help identify who can act, check the will, value estate assets, prepare inheritance tax paperwork where required, apply for a grant of representation, deal with banks and financial institutions, handle estate accounts, and distribute assets to beneficiaries.",
          "Some users only need limited help with the grant. Others need full estate administration because there is property to sell, tax paperwork, missing documents, overseas assets, business interests, trusts, or a risk of disagreement. Ask firms to explain the scope clearly before comparing fees.",
        ],
      },
      {
        heading: "What to compare before choosing probate support",
        body: [
          "Compare whether the firm offers fixed-fee support, hourly rates, percentage-based fees, or staged pricing. Ask what is included, what is excluded, who will communicate with beneficiaries, and whether property sale coordination is part of the service.",
          "Executors should also ask how the firm handles estate accounts, inheritance tax paperwork, missing information, and potential disputes. Clear process matters because probate can take months and may involve several third parties.",
        ],
      },
      {
        heading: "Local estate and property context",
        body: [
          "Probate enquiries around Kidderminster and Wyre Forest often involve family homes, local estate agents, property valuations, utility accounts, and relatives living in different places. Local property sale steps can become a major part of the estate timetable.",
          "A local or regional probate solicitor may help where practical coordination matters, but the most important factor is whether the provider can explain responsibilities, costs, and timescales clearly.",
        ],
      },
      {
        heading: "What to prepare",
        body: [
          "Useful information includes the will, death certificate, property details, bank and savings information, pension and life policy details, debts, funeral costs, utility bills, tax records, and beneficiary contact information.",
          "If you are unsure whether probate is needed, prepare a short list of assets and how they were owned. The solicitor or legal provider can then explain what information they need next if you choose to instruct them.",
        ],
      },
    ],
    relatedGuideSlugs: [
      "what-does-a-probate-solicitor-do",
      "how-long-does-probate-take",
      "do-you-need-a-solicitor-for-probate",
    ],
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
      "Compare family law solicitor options in Kidderminster and request a no obligation quote from a suitable solicitor partner.",
    category: "Family Law",
    summary:
      "Guidance for family arrangements, children matters, separation, and related solicitor enquiries.",
    intro:
      "Family law enquiries can involve children, separation, finances, housing, communication, and sensitive personal circumstances. This page helps users compare family law solicitor options in Kidderminster without treating this website as an advice provider.",
    localAngle:
      "For families in Kidderminster, Stourport, Bewdley, Cookley, Hagley, and the wider Wyre Forest area, practical local factors such as schools, housing, travel, and support networks may be relevant when speaking directly with a solicitor.",
    keyTakeaways: [
      "Family law support may relate to separation, child arrangements, finances, cohabitation, protective steps, and related documents.",
      "Keep enquiry forms proportionate and share sensitive documents directly with a solicitor if you choose to instruct them.",
      "This website may introduce you to a suitable solicitor partner, but it does not provide legal advice.",
    ],
    sections: [
      {
        heading: "What family law solicitors may help with",
        body: [
          "A family law solicitor may help with divorce, separation, child arrangements, financial arrangements, cohabitation issues, protective steps, prenuptial or postnuptial agreements, and related documentation. The right support depends on the facts and what needs to be resolved.",
          "Some users need a first conversation to understand process and next steps. Others may already have mediation history, correspondence, court papers, or urgent concerns. The more clearly you can explain the situation, the easier it is for a provider to assess whether they may be suitable.",
        ],
      },
      {
        heading: "What to compare before choosing a firm",
        body: [
          "Ask whether the firm regularly handles matters like yours, who will manage the file, how costs are explained, whether fixed-fee initial appointments are available, and what information is needed before the first appointment.",
          "You should also ask how communication works, whether mediation may be relevant, and how the firm explains options without promising a particular outcome. Sensitive family matters need clear expectations and careful language.",
        ],
      },
      {
        heading: "Local family law context",
        body: [
          "Family enquiries around Kidderminster and Wyre Forest may involve school routines, local housing, childcare, work travel, and nearby family support. These practical details can matter when discussing arrangements with a solicitor or legal service provider.",
          "A local or regional provider may be helpful where meetings or local knowledge matter, but suitability depends on the matter, urgency, communication style, and the support needed.",
        ],
      },
      {
        heading: "What to prepare",
        body: [
          "Prepare a short timeline, key dates, current arrangements, children details if relevant, property and mortgage information, income, savings, debts, pensions, and any correspondence or court papers. Keep the first enquiry brief and factual.",
          "Avoid sending unnecessary sensitive documents through the quote form. Use the form to explain the broad issue and preferred contact method, then share detailed material directly with a solicitor if you choose to instruct them.",
        ],
      },
    ],
    relatedGuideSlugs: [
      "what-does-a-family-law-solicitor-help-with",
      "how-to-prepare-for-a-divorce-solicitor-consultation",
    ],
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
      "Personal injury marketing needs especially careful language. This site avoids outcome promises and does not claim users will win a claim.",
    localAngle:
      "Users in Kidderminster may want to speak with a regulated firm that can explain funding, eligibility, and next steps.",
    comparisonPoints: [
      "Ask how fees work and whether any deductions may apply.",
      "Avoid relying on any website that promises a result.",
      "Confirm who will handle your matter and how evidence will be reviewed.",
    ],
    faq: [
      {
        question: "Does this site promise compensation?",
        answer:
          "No. We do not promise outcomes and do not provide legal advice.",
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
      "Conveyancing costs in Kidderminster are not just one legal fee. A useful quote should separate the solicitor's fee from third-party costs, explain what is included, and make clear when extras may apply. This matters because two quotes that look similar at first glance can end up very different once searches, lender work, leasehold checks, bank transfer fees, and Land Registry costs are added.",
    keyTakeaways: [
      "Compare the full quote breakdown, not just the headline legal fee.",
      "Property type, tenure, lender requirements, and transaction complexity can all affect final cost.",
      "A no obligation quote should help you understand likely fees without committing to instruct a firm.",
    ],
    sections: [
      {
        heading: "The main parts of a conveyancing quote",
        body: [
          "Most conveyancing quotes have two broad parts: the solicitor's own legal fee and disbursements. The legal fee is what the firm charges for handling the transaction. Disbursements are third-party costs paid to others, such as search providers, HM Land Registry, identity check providers, or bank transfer services.",
          "When comparing Kidderminster conveyancing quotes, ask whether the legal fee includes acting for the lender, reporting on the mortgage offer, dealing with gifted deposits, handling completion funds, and submitting the Stamp Duty Land Tax return where needed. Some firms include these as standard; others list them as additional items.",
        ],
      },
      {
        heading: "Why a cheaper headline price can be misleading",
        body: [
          "A low headline price can be attractive, especially when you are already budgeting for removals, survey fees, mortgage costs, and deposit funds. The risk is that the cheapest-looking quote may not include everything your transaction needs. Leasehold properties, new-build homes, Help to Buy redemptions, shared ownership, gifted deposits, and unregistered land can all add work.",
          "A good comparison is not simply 'which solicitor is cheapest?' It is 'which quote is clear, complete, and suitable for this property?' For a home in Kidderminster, Stourport, Bewdley, Cookley, or Hagley, the work required will still depend on the title, lender, property type, chain, and searches rather than the town alone.",
        ],
      },
      {
        heading: "What can affect the final cost",
        body: [
          "Property value can affect Land Registry fees and sometimes the legal fee. Whether you are buying, selling, remortgaging, or transferring equity will also change the work involved. A purchase with a mortgage usually involves more steps than a straightforward cash sale. Leasehold matters often require more document review than freehold houses.",
          "Search packs can vary too. Your solicitor may order local authority, drainage and water, environmental, and other searches depending on the property and lender requirements. For homes around the Wyre Forest area, local authority information, planning history, access, drainage, mining or environmental points may need to be reviewed carefully by the conveyancer.",
        ],
      },
      {
        heading: "Where conveyancing costs often go wrong",
        body: [
          "Problems usually begin when a quote is not itemised. If you cannot see what is included, you cannot tell whether a later fee is genuinely additional or something that should have been expected from the start. Vague wording such as 'standard legal work' is less useful than a clear list of included tasks.",
          "Costs can also rise when important facts are not mentioned early. Tell the solicitor if the property is leasehold, has a management company, is a new build, involves a gifted deposit, is being bought with a mortgage, or is part of a chain. The sooner the firm understands the transaction, the more realistic the quote is likely to be.",
        ],
      },
      {
        heading: "What to prepare before requesting a quote",
        body: [
          "Have the property price, postcode, property type, tenure if known, mortgage lender, and transaction type ready. If you are selling, know whether there is a mortgage to redeem and whether the property is freehold or leasehold. If you are buying, know whether you are using a mortgage, cash, gifted deposit, or Help to Buy-related arrangement.",
          "You do not need to send confidential documents through a comparison form. A short summary is enough at quote stage. Keep details practical: buying or selling, location, price, mortgage lender, leasehold/freehold if known, and any timing pressure. Documents can be shared directly with the solicitor firm if you choose to instruct them.",
        ],
      },
      {
        heading: "Questions to ask a conveyancing solicitor",
        body: [
          "Ask whether the quote includes VAT, searches, Land Registry fees, SDLT form submission, lender work, bank transfer fees, ID checks, and acting on a gifted deposit if relevant. Ask who will handle your file day to day, how updates are provided, and whether you can contact the case handler directly.",
          "Also ask whether the firm is on your mortgage lender's panel. If they are not, the lender may need separate representation, which can cause extra cost and delay. Finally, ask what happens if the transaction falls through before exchange and whether any part of the fee remains payable.",
        ],
      },
      {
        heading: "Next step",
        body: [
          "If you are comparing conveyancing solicitors in Kidderminster, use the conveyancing quote page to request a no obligation quote. We will review the enquiry and may pass it to a suitable solicitor partner who can contact you directly.",
          "Kidderminster Solicitors is an independent legal information and solicitor introduction website. We are not a law firm and do not provide legal advice. You are under no obligation to instruct any firm introduced through this website.",
        ],
      },
    ],
    relatedGuideSlugs: [
      "what-does-a-conveyancing-solicitor-do",
      "buying-a-house-in-kidderminster-legal-checklist",
    ],
    faq: [
      {
        question: "Is the cheapest conveyancing quote always best?",
        answer:
          "Not necessarily. A low headline price may exclude work or disbursements that are needed later. Compare the full breakdown, not just the first figure.",
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
      "A conveyancing solicitor deals with the legal work needed to transfer, mortgage, remortgage, or change ownership of property. Their role is practical and document-heavy: checking title, reviewing contracts, raising enquiries, dealing with lenders, managing exchange and completion, and making sure the right registrations happen after completion.",
    keyTakeaways: [
      "A conveyancing solicitor checks legal title, contract paperwork, searches, lender requirements, and completion steps.",
      "They do not inspect the physical condition of the property, so surveys remain separate.",
      "Clear communication matters because delays often come from missing documents, search issues, lender checks, or unanswered enquiries.",
    ],
    sections: [
      {
        heading: "What they do when you are buying",
        body: [
          "For a purchase, the solicitor reviews the contract pack from the seller's solicitor, checks the legal title, orders searches, raises enquiries, reviews replies, reports to you and your lender, prepares the transfer and mortgage deed, requests funds, exchanges contracts, completes the purchase, and registers your ownership.",
          "That sounds linear, but conveyancing rarely moves in a perfectly straight line. A search result may raise a planning question, the lender may request clarification, a management company may be slow to supply leasehold information, or the seller's solicitor may need time to answer enquiries. The solicitor's job is to identify legal issues and keep the process moving where possible.",
        ],
      },
      {
        heading: "What they do when you are selling",
        body: [
          "For a sale, the solicitor prepares the draft contract pack, obtains title documents, helps you complete property information forms, answers enquiries from the buyer's solicitor, obtains mortgage redemption figures, manages exchange and completion, repays the mortgage if there is one, pays estate agent fees where authorised, and sends the remaining sale proceeds to you.",
          "Sellers can help by completing forms accurately and quickly. If work has been done to the property, gather building regulation certificates, planning permissions, guarantees, FENSA certificates, boiler service records, or other documents before they are requested. Missing paperwork can slow a Kidderminster sale even where the buyer is ready.",
        ],
      },
      {
        heading: "What they do for remortgages and transfers",
        body: [
          "For a remortgage, the solicitor checks the new lender's requirements, deals with title checks, obtains a redemption statement from the existing lender, completes the new mortgage, repays the old one, and registers the new charge. This can be simpler than a purchase but still needs careful handling.",
          "For a transfer of equity, the solicitor may deal with ownership changes, lender consent, transfer documents, identity checks, and registration. If money changes hands or a mortgage is involved, the work can be more involved than people expect. The solicitor may also recommend separate advice where parties have different interests.",
        ],
      },
      {
        heading: "Where things often go wrong",
        body: [
          "Common problems include slow replies in a chain, mortgage offer delays, missing leasehold packs, unclear rights of way, gifted deposit checks, title restrictions, discrepancies between the property and title plan, or search results that need further explanation. These issues are not always dramatic, but they can affect timing.",
          "Communication problems are also common. Ask at the outset how updates are provided, who your main contact will be, and whether you will be told when the file is waiting on another party. A good process does not remove every delay, but it should make the cause of delay easier to understand.",
        ],
      },
      {
        heading: "What to prepare",
        body: [
          "Buyers should prepare proof of identity, source of funds information, mortgage details, gifted deposit information if relevant, estate agent details, and any timing requirements. Sellers should prepare title paperwork, property forms, certificates, guarantees, leasehold information if applicable, mortgage details, and estate agent details.",
          "For Kidderminster and Wyre Forest transactions, it can also help to mention practical local points early: whether the property is leasehold, has shared access, is near a watercourse, has extensions, has parking arrangements, or includes land that may not be obvious from the address.",
        ],
      },
      {
        heading: "Questions to ask before instructing",
        body: [
          "Ask whether the firm can act for your lender, what the quote includes, what extras may apply, who will handle the file, how quickly they normally respond, and what happens if your transaction falls through. If you are in a chain, ask how the firm manages communication with estate agents and other solicitors.",
          "Ask whether the firm regularly handles the kind of property you are dealing with. Leasehold flats, new-build homes, remortgages, equity transfers, and unregistered land can all require different experience. The right question is not just 'what does it cost?' but 'can this firm handle this transaction clearly and efficiently?'",
        ],
      },
      {
        heading: "Next step",
        body: [
          "If you need help comparing conveyancing solicitors in Kidderminster, you can request a no obligation quote through the conveyancing page. A suitable solicitor partner may contact you directly if they are able to help.",
          "This guide is general information only. Kidderminster Solicitors is not a law firm and does not provide legal advice.",
        ],
      },
    ],
    relatedGuideSlugs: [
      "how-much-do-conveyancing-solicitors-cost-in-kidderminster",
      "buying-a-house-in-kidderminster-legal-checklist",
    ],
    faq: [
      {
        question: "Does a conveyancing solicitor check the physical condition of the property?",
        answer:
          "No. A solicitor reviews legal title and documents. A surveyor checks the physical condition of the property.",
      },
      {
        question: "Can I use a solicitor outside Kidderminster?",
        answer:
          "Yes. Many conveyancing matters are handled remotely, but some users prefer a local or regional firm for familiarity and communication.",
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
      "Buying a home in Kidderminster is easier to manage when you know which legal steps come next, what documents to prepare, and where avoidable delays often happen.",
    keyTakeaways: [
      "Prepare ID, source of funds, mortgage details, and deposit information before the file starts.",
      "Searches, enquiries, lender checks, and chain readiness all affect purchase timing.",
      "A local or regional conveyancing solicitor may help you understand property-specific issues around Kidderminster and Wyre Forest.",
    ],
    sections: [
      {
        heading: "Quick checklist before you instruct",
        body: [
          "Before you instruct a conveyancing solicitor, check that the firm can act for your mortgage lender, confirm who will handle your file day to day, and ask for a written quote that separates legal fees from third-party costs. If you are buying with a gifted deposit, Help to Buy ISA, Lifetime ISA, or family support, mention this early because it may require extra checks.",
          "You should also make sure your mortgage application, deposit funds, identity documents, and proof of funds are ready. Conveyancing often feels slow because several people need to act in sequence. Having the basics prepared can remove simple blockers from the start.",
        ],
      },
      {
        heading: "Legal steps after your offer is accepted",
        body: [
          "Once your offer is accepted, the seller's solicitor will usually send a draft contract pack. Your solicitor reviews the title, contract, property information forms, fittings and contents list, lease documents if relevant, and any guarantees or permissions supplied by the seller.",
          "Searches are then ordered, enquiries are raised, and your mortgage offer is reviewed. When the legal checks are complete, you will receive a report explaining the key points before exchange of contracts. Exchange makes the transaction legally binding, so the legal review should be clear before you commit.",
        ],
      },
      {
        heading: "Where purchases can slow down",
        body: [
          "Common delays include missing title documents, slow management company replies on leasehold properties, unanswered enquiries, mortgage offer issues, gifted deposit paperwork, or search results that need further explanation. Chains can also create delay because your purchase may depend on other buyers and sellers being ready.",
          "In and around Kidderminster, Stourport, Bewdley, Cookley, and Hagley, local searches may raise planning, drainage, highways, conservation, or access points that need checking. This does not mean there is a problem, but it does mean the issue should be understood before exchange.",
        ],
      },
      {
        heading: "What to prepare",
        body: [
          "Prepare photo ID, proof of address, source of funds evidence, mortgage details, estate agent details, deposit information, and any documents relating to a sale if you are buying and selling at the same time. If someone is contributing to the purchase, ask early what evidence the solicitor will need from them.",
          "If the property is leasehold, ask for service charge information, ground rent details, lease length, management company details, and any planned major works. Leasehold paperwork can be one of the biggest causes of delay, so early clarity helps.",
        ],
      },
      {
        heading: "Questions to ask a solicitor",
        body: [
          "Ask whether the firm is on your lender's panel, what is included in the quote, what is charged separately, how often you will receive updates, who will be your contact, and how urgent issues are handled. If you have a target moving date, ask whether it is realistic rather than assuming it can be promised.",
          "You can also ask how the firm deals with leasehold packs, gifted deposits, remortgages linked to the purchase, and title issues. Good conveyancing communication is not just about speed. It is about knowing what still needs to happen and who is responsible for the next step.",
        ],
      },
      {
        heading: "Local relevance for Kidderminster buyers",
        body: [
          "Kidderminster has a mixture of older homes, newer estates, flats, terraces, and properties in nearby Wyre Forest villages. Different property types can raise different legal questions, from rights of way and boundaries to lease terms or planning permissions.",
          "A local or regional conveyancing solicitor may be helpful if you want familiarity with Worcestershire property transactions, although many matters can be handled remotely. The important point is to choose a firm that communicates clearly and understands the type of property you are buying.",
        ],
      },
      {
        heading: "Next step",
        body: [
          "If you are preparing to buy in Kidderminster or the wider Wyre Forest area, compare conveyancing options and request a no obligation quote through the conveyancing page. A suitable solicitor partner may contact you directly if they are able to help.",
          "This guide is general information only. Kidderminster Solicitors is not a law firm and does not provide legal advice.",
        ],
      },
    ],
    relatedGuideSlugs: [
      "how-much-do-conveyancing-solicitors-cost-in-kidderminster",
      "what-does-a-conveyancing-solicitor-do",
    ],
    faq: [
      {
        question: "Should I instruct a solicitor before or after my offer is accepted?",
        answer:
          "Many buyers compare firms before offering and formally instruct once the offer is accepted. This can help you move quickly when the seller is ready.",
      },
      {
        question: "Can conveyancing timescales be promised?",
        answer:
          "No. Timescales depend on searches, mortgage offers, enquiries, chains, and third parties. A solicitor can explain likely steps but should not guarantee a completion date before the file is ready.",
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
      "A probate solicitor can help executors and families understand the legal and practical steps involved in administering an estate, particularly where property, tax, paperwork, or family circumstances make the process harder to manage alone.",
    keyTakeaways: [
      "A probate solicitor may help with the grant application, estate administration, tax paperwork, property sale coordination, and beneficiary communication.",
      "Executor mistakes can be costly, especially where assets, debts, family circumstances, or tax questions are unclear.",
      "You can compare limited probate support and full estate administration depending on what the estate needs.",
    ],
    sections: [
      {
        heading: "Common probate support",
        body: [
          "Probate support may include identifying estate assets, checking the will, confirming who can act, preparing inheritance tax paperwork where needed, applying for a grant of representation, dealing with financial institutions, and distributing the estate to beneficiaries.",
          "Some families only need help with the grant application. Others want full estate administration, including collecting assets, paying debts, keeping estate accounts, selling property, and managing beneficiary communication. It is worth asking exactly which parts of the process a firm will handle.",
        ],
      },
      {
        heading: "When help may be useful",
        body: [
          "Professional support may be useful where the estate includes a property, business interest, overseas asset, trust, inheritance tax issue, missing paperwork, unclear will, multiple beneficiaries, or a risk of disagreement. Executors can be personally responsible for mistakes, so uncertainty should be taken seriously.",
          "A solicitor may also help where the executor lives away from Kidderminster but the deceased person's property, bank, or family arrangements are local. Practical distance can make estate administration slower if no one is available to gather documents or deal with local property matters.",
        ],
      },
      {
        heading: "Where things can go wrong",
        body: [
          "Problems often arise when executors distribute funds too early, miss liabilities, misunderstand the will, fail to keep clear records, or do not communicate properly with beneficiaries. Property sales can add further complexity if the home needs insurance, clearance, valuation, or maintenance before sale.",
          "Tax and deadlines can also cause concern. This website cannot advise on inheritance tax or probate deadlines, but it can help users understand when speaking directly to a qualified solicitor or legal service provider may be sensible.",
        ],
      },
      {
        heading: "What to prepare",
        body: [
          "Useful documents include the will and any codicils, death certificate, property details, bank and savings information, pension and life policy details, debts, funeral costs, utility bills, tax records, and beneficiary contact information. If there is no will, gather details of close family members and their relationship to the person who died.",
          "It also helps to prepare a simple asset list with approximate values and notes on whether accounts were sole or joint. The first conversation with a solicitor is more productive when the estate picture is clear, even if exact figures are not yet available.",
        ],
      },
      {
        heading: "Questions to ask a solicitor",
        body: [
          "Ask whether the firm can handle the full estate or only the grant application, how fees are calculated, what information is needed first, who will contact beneficiaries, and how estate accounts will be prepared. If there is property in Kidderminster or Worcestershire, ask how property sale steps fit into the probate process.",
          "You should also ask what happens if a dispute arises, whether inheritance tax forms are likely to be needed, and how often you will receive updates. Clear communication matters because probate can last months, not days.",
        ],
      },
      {
        heading: "Local relevance around Kidderminster",
        body: [
          "Probate enquiries around Kidderminster, Stourport, Bewdley, Cookley, and Hagley often involve local property, family homes, bank paperwork, and executors who may not all live nearby. A local or regional solicitor can sometimes make practical coordination easier, especially where property sale and family communication overlap.",
          "The right firm should explain the process without making unrealistic promises. Probate can be sensitive, so users should look for calm communication, transparent fees, and a clear plan for what happens next.",
        ],
      },
      {
        heading: "Next step",
        body: [
          "If you are acting as an executor or trying to understand whether probate support is needed, you can compare probate solicitor options in Kidderminster and request a no obligation quote. A suitable solicitor partner may contact you directly if they are able to help.",
          "This guide is general information only. Kidderminster Solicitors is not a law firm and does not provide legal advice.",
        ],
      },
    ],
    relatedGuideSlugs: [
      "how-long-does-probate-take",
      "do-you-need-a-solicitor-for-probate",
    ],
    faq: [
      {
        question: "Does every estate need probate?",
        answer:
          "Not always. Whether probate is needed depends on the assets, ownership, financial institutions, and circumstances. A solicitor or provider can explain this based on the estate details.",
      },
      {
        question: "Can a probate solicitor deal with beneficiaries?",
        answer:
          "Many firms can help communicate with beneficiaries as part of estate administration, but you should confirm the scope of work before instructing.",
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
      "Probate timescales vary widely. A simple estate may move relatively quickly, while estates involving property, tax, missing paperwork, or disagreements can take much longer.",
    keyTakeaways: [
      "Probate is not finished when the grant is issued; estate administration can continue afterwards.",
      "Property sales, tax paperwork, missing information, and beneficiary issues are common sources of delay.",
      "Organised estate records and early clarity on assets can reduce avoidable hold-ups.",
    ],
    sections: [
      {
        heading: "The short answer",
        body: [
          "There is no single assured probate timescale. The grant application is only one stage. Executors first need to identify assets and liabilities, value the estate, deal with tax paperwork where required, submit the application, receive the grant, collect funds, settle debts, and distribute the estate.",
          "Some estates can be administered in months. Others take longer because a property must be sold, beneficiaries need tracing, tax questions need resolving, or financial institutions take time to respond.",
        ],
      },
      {
        heading: "What affects timing",
        body: [
          "Timing can depend on how quickly asset values are gathered, whether inheritance tax forms are needed, whether the will is clear, how busy the probate registry is, and whether banks, pension providers, insurers, or beneficiaries respond promptly.",
          "If the estate includes a home in Kidderminster or the wider Wyre Forest area, the property sale can become a major part of the timetable. Insurance, clearance, valuations, estate agent steps, conveyancing, and buyer delays may all affect when funds can be distributed.",
        ],
      },
      {
        heading: "Where things can go wrong",
        body: [
          "Executors can run into problems if they distribute money before all debts, tax, and claims are understood. Delays can also happen where there are missing account details, no clear will, disagreement between family members, or uncertainty about who has authority to act.",
          "Probate can also feel slow because third parties are involved. A solicitor may be waiting for valuations, registry responses, bank paperwork, property sale updates, or beneficiary instructions. Clear updates help, but not every delay is within one person's control.",
        ],
      },
      {
        heading: "What to prepare",
        body: [
          "Prepare the will, death certificate, property information, bank details, pension details, investment statements, debts, funeral invoice, utility details, insurance policies, and beneficiary information. If you are unsure what exists, make a list of organisations to contact.",
          "Keep a written record of correspondence and decisions. Executors should be able to show what they have done and why. Good records make it easier for a solicitor to understand the estate and reduce duplicated work.",
        ],
      },
      {
        heading: "Questions to ask a solicitor",
        body: [
          "Ask which stages are likely to affect timing, whether inheritance tax forms may be needed, how property sale timing is handled, what you can do to speed up information gathering, and when it may be appropriate to make interim distributions.",
          "You can also ask how updates are provided and what information the solicitor needs from you first. A good answer should give a realistic process rather than an unrealistic promise of speed.",
        ],
      },
      {
        heading: "Local relevance for Wyre Forest estates",
        body: [
          "Many probate matters around Kidderminster, Stourport, Bewdley, Cookley, and Hagley involve family homes, local estate agents, local property valuations, and relatives living in different places. This can make coordination more important than people expect.",
          "A local or regional probate solicitor may be useful where property, family communication, and estate administration need to move together. The key is clear scope, transparent fees, and realistic timing.",
        ],
      },
      {
        heading: "Next step",
        body: [
          "If you need help understanding probate timescales for an estate connected to Kidderminster or Wyre Forest, you can compare probate solicitor options and request a no obligation quote. A suitable solicitor partner may contact you directly if they are able to help.",
          "This guide is general information only. Kidderminster Solicitors is not a law firm and does not provide legal advice.",
        ],
      },
    ],
    relatedGuideSlugs: [
      "what-does-a-probate-solicitor-do",
      "do-you-need-a-solicitor-for-probate",
    ],
    faq: [
      {
        question: "Is receiving the grant the end of probate?",
        answer:
          "No. The grant allows executors to deal with assets, but collecting funds, selling property, paying liabilities, and distributing the estate can take additional time.",
      },
      {
        question: "Can a solicitor speed up probate?",
        answer:
          "A solicitor may reduce avoidable delay by preparing paperwork correctly and explaining what information is needed, but third-party timings cannot be promised.",
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
      "Some executors deal with probate themselves, but professional support can be useful where the estate is complex, the executor is uncertain, or family circumstances make mistakes more costly.",
    keyTakeaways: [
      "Simple estates may be manageable without full solicitor support, but executors still carry responsibility.",
      "Property, tax, missing documents, overseas assets, trusts, or disputes can make professional help more important.",
      "Some firms offer limited probate support, while others handle full estate administration.",
    ],
    sections: [
      {
        heading: "When people handle it themselves",
        body: [
          "A simple estate may be manageable without a solicitor where there is a clear will, no property, no inheritance tax issue, straightforward bank accounts, no disputes, and beneficiaries who agree on the process. Even then, executors should understand their responsibilities before distributing funds.",
          "Handling probate yourself can reduce professional fees, but it also means you take on the administration, paperwork, deadlines, record keeping, and beneficiary communication. The practical workload is often larger than expected.",
        ],
      },
      {
        heading: "When support may help",
        body: [
          "A solicitor may be helpful where there is property, inheritance tax, missing documents, overseas assets, business interests, trusts, unclear family circumstances, or potential disagreement. Support can also be sensible where the executor is grieving, busy, or uncomfortable dealing with financial institutions.",
          "If the estate includes a property in Kidderminster, Stourport, Bewdley, Cookley, Hagley, or nearby Worcestershire areas, property sale steps may run alongside probate administration. That can add legal and practical complexity.",
        ],
      },
      {
        heading: "Where things can go wrong",
        body: [
          "Executors may accidentally miss debts, misunderstand the will, distribute too early, fail to keep estate accounts, or overlook tax paperwork. Beneficiary disputes can also become harder to manage if communication is unclear or inconsistent.",
          "This is why comparing levels of support matters. Some users need full estate administration, while others only need help with the grant application or a specific issue. A clear scope can control cost and reduce confusion.",
        ],
      },
      {
        heading: "What to prepare",
        body: [
          "Prepare the will, death certificate, list of assets and debts, property details, bank statements, pension information, tax records, funeral invoice, and beneficiary details. If you are not sure whether probate is needed, gather enough information for a solicitor to understand the estate structure.",
          "Make a note of any concerns, such as missing documents, family disagreement, overseas assets, lifetime gifts, or property that needs selling. These points help a solicitor explain whether limited support or full administration may be more suitable.",
        ],
      },
      {
        heading: "Questions to ask a solicitor",
        body: [
          "Ask whether probate is likely to be needed, whether the firm offers fixed-fee help for the grant, whether full estate administration is available, what fees are charged, and what work remains your responsibility.",
          "You should also ask who will communicate with beneficiaries, how estate accounts are handled, what documents are needed first, and how property sale steps are coordinated if the estate includes a home.",
        ],
      },
      {
        heading: "Next step",
        body: [
          "If you are unsure whether you need a probate solicitor, you can compare probate options in Kidderminster and request a no obligation quote. A suitable solicitor partner may contact you directly if they are able to help.",
          "This guide is general information only. Kidderminster Solicitors is not a law firm and does not provide legal advice.",
        ],
      },
    ],
    relatedGuideSlugs: [
      "what-does-a-probate-solicitor-do",
      "how-long-does-probate-take",
    ],
    faq: [
      {
        question: "Can an executor choose limited solicitor support?",
        answer:
          "Often, yes. Some firms offer help with specific stages, such as the grant application, while others provide full estate administration.",
      },
      {
        question: "Is probate support always expensive?",
        answer:
          "Costs vary depending on the estate and the work needed. Ask for a clear explanation of fees, what is included, and what may be charged separately.",
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
      "Preparing before a first divorce solicitor consultation can help you explain the situation clearly, understand the likely next steps, and avoid using the appointment just to gather basic facts.",
    keyTakeaways: [
      "A concise timeline and summary of children, property, finances, and urgent concerns can make the first conversation more useful.",
      "Keep enquiry forms proportionate and share sensitive documents directly with a solicitor if you choose to instruct them.",
      "Ask about process, costs, information needed, mediation context, and communication before deciding what to do next.",
    ],
    sections: [
      {
        heading: "What the first consultation should achieve",
        body: [
          "A first consultation is usually about understanding your circumstances, identifying the main issues, and explaining possible next steps. It is not about deciding everything immediately. Divorce, finances, child arrangements, housing, and communication can each need separate consideration.",
          "You do not need a perfect file before speaking to a solicitor. A clear summary of the relationship, the current position, and your main concerns is often more useful than a large bundle of unorganised documents.",
        ],
      },
      {
        heading: "Information to gather",
        body: [
          "It may help to list marriage or civil partnership dates, separation date, children's ages and arrangements, property ownership, mortgage details, income, savings, pensions, debts, business interests, and any urgent concerns such as housing or safety.",
          "For users in Kidderminster, Stourport, Bewdley, Cookley, Hagley, or nearby areas, practical arrangements such as school runs, local housing, childcare, and work patterns can be relevant when discussing next steps. Keep the first summary factual and proportionate.",
        ],
      },
      {
        heading: "Where things can go wrong",
        body: [
          "A consultation can become less useful if it focuses only on blame, long background detail, or arguments that do not affect the legal process. Try to separate facts, concerns, and goals. If something is urgent, put that near the top of your notes.",
          "Another common issue is underestimating finances. Pensions, debts, business interests, and future housing needs can matter. Even if figures are approximate, write them down so the solicitor can see what information is missing.",
        ],
      },
      {
        heading: "What to prepare",
        body: [
          "Prepare a one-page timeline, details of children and current arrangements, property and mortgage information, income and employment details, savings, debts, pensions, and any court papers or previous correspondence. If mediation has already taken place, note when and what happened.",
          "Avoid sending unnecessary sensitive documents through a general enquiry form. Use the form to explain the broad issue and preferred contact method, then share detailed documents directly with the solicitor or legal service provider if you choose to instruct them.",
        ],
      },
      {
        heading: "Questions to ask",
        body: [
          "Ask what the likely stages are, what information is needed first, whether mediation may be relevant, how finances and child arrangements are handled, what costs could look like, and who will be your day-to-day contact.",
          "You can also ask what should happen if communication with your former partner is difficult, whether urgent steps may be needed, and how the firm explains options without making unrealistic promises.",
        ],
      },
      {
        heading: "Next step",
        body: [
          "If you are preparing to speak to a divorce solicitor in Kidderminster or the wider Wyre Forest area, you can compare divorce solicitor options and request a no obligation quote. A suitable solicitor partner may contact you directly if they are able to help.",
          "This guide is general information only. Kidderminster Solicitors is not a law firm and does not provide legal advice.",
        ],
      },
    ],
    relatedGuideSlugs: [
      "what-does-a-family-law-solicitor-help-with",
      "when-should-you-speak-to-an-employment-solicitor",
    ],
    faq: [
      {
        question: "Do I need all financial documents before a first divorce consultation?",
        answer:
          "No, but a basic list of property, income, savings, pensions, and debts can make the first conversation more useful.",
      },
      {
        question: "Should I include sensitive details in the quote form?",
        answer:
          "Keep the form summary proportionate. Detailed personal documents should usually be shared directly with a solicitor or legal provider if you choose to instruct them.",
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
      "Family law solicitors may help with personal and sensitive matters involving relationships, children, finances, separation, and future arrangements.",
    keyTakeaways: [
      "Family law can cover separation, child arrangements, finances, cohabitation, protective steps, and related documents.",
      "Practical local factors such as schools, housing, work patterns, and family support can matter in Wyre Forest family enquiries.",
      "A first conversation should clarify process and next steps without promising a specific outcome.",
    ],
    sections: [
      {
        heading: "Common family law matters",
        body: [
          "Family law support may relate to separation, divorce, child arrangements, financial arrangements, cohabitation, domestic abuse protections, prenuptial or postnuptial agreements, and related documentation. The exact support needed depends on the circumstances.",
          "A solicitor may help explain process, prepare documents, negotiate with another party, support mediation outcomes, or represent a client where formal legal steps are needed. This website does not provide advice, but it can help users understand what type of solicitor support may be relevant.",
        ],
      },
      {
        heading: "Children, finances, and separation",
        body: [
          "Child arrangements can involve where children live, how time is shared, school practicalities, holidays, and communication. Financial matters can involve property, savings, pensions, debts, maintenance, and future housing needs.",
          "For families around Kidderminster, Stourport, Bewdley, Cookley, and Hagley, local routines can matter. School locations, work travel, family support, and housing availability can all affect what people need to discuss with a solicitor.",
        ],
      },
      {
        heading: "Where things can go wrong",
        body: [
          "Family matters can become harder when communication breaks down, informal agreements are unclear, financial information is missing, or one person does not understand the consequences of an arrangement. Sensitive issues should be handled carefully and with appropriate professional support.",
          "Another common problem is waiting until a situation becomes urgent. If there are deadlines, court papers, safeguarding concerns, or significant financial decisions, users should speak directly to a qualified provider rather than relying on general information.",
        ],
      },
      {
        heading: "What to prepare",
        body: [
          "Prepare a short timeline, key dates, current arrangements, details of children, housing information, income, debts, pensions, and any relevant correspondence or court papers. Keep notes factual and focus on what needs to be resolved.",
          "If your concern is mainly about children, note current routines and practical issues. If your concern is financial, gather property, mortgage, account, pension, and debt information where available.",
        ],
      },
      {
        heading: "Questions to ask a solicitor",
        body: [
          "Ask whether the firm handles matters like yours, how costs are explained, what information is needed first, whether mediation may be relevant, and who will manage your file. You should also ask what can and cannot be resolved through informal agreement.",
          "A good first conversation should help you understand the process and next steps without promising an outcome. Be cautious of absolute claims, especially in sensitive family matters.",
        ],
      },
      {
        heading: "Next step",
        body: [
          "If you need family law solicitor support in Kidderminster or the wider Wyre Forest area, you can compare family law options and request a no obligation quote. A suitable solicitor partner may contact you directly if they are able to help.",
          "This guide is general information only. Kidderminster Solicitors is not a law firm and does not provide legal advice.",
        ],
      },
    ],
    relatedGuideSlugs: [
      "how-to-prepare-for-a-divorce-solicitor-consultation",
      "do-you-need-a-solicitor-for-probate",
    ],
    faq: [
      {
        question: "Does family law only mean divorce?",
        answer:
          "No. Family law can include child arrangements, separation, finances, cohabitation, protective steps, and other relationship-related legal matters.",
      },
      {
        question: "Can this website advise on a family law problem?",
        answer:
          "No. This website provides general information and solicitor introductions only. Legal advice must come from a qualified solicitor or legal service provider.",
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
      "A settlement agreement is commonly used to record agreed terms between an employer and employee, often when employment is ending or a workplace dispute is being resolved.",
    keyTakeaways: [
      "Settlement agreements usually require independent legal advice to be effective for employment claims.",
      "The review should cover payment terms, claims being waived, restrictions, confidentiality, references, and timing.",
      "Employees and employers should avoid treating a settlement agreement as a simple template exercise.",
    ],
    sections: [
      {
        heading: "What a settlement agreement does",
        body: [
          "A settlement agreement normally sets out what the employer will provide and what the employee agrees in return. It may cover termination date, notice, holiday pay, compensation, confidentiality, references, restrictive covenants, company property, and claims being waived.",
          "For the agreement to be valid in relation to employment claims, independent legal advice is usually required. The adviser should explain the effect of the agreement and the rights being waived. This website cannot provide that advice.",
        ],
      },
      {
        heading: "Why legal advice matters",
        body: [
          "Settlement agreement advice is not just a signature exercise. The solicitor or adviser should help the employee understand the wording, practical consequences, and any points that may need clarifying before signing.",
          "Employers around Kidderminster and Worcestershire may also need advice when preparing settlement agreements so that the process is handled properly, wording is clear, and risks are understood.",
        ],
      },
      {
        heading: "Where things can go wrong",
        body: [
          "Problems can arise where the termination payment is unclear, tax treatment is misunderstood, post-employment restrictions are too broad, references are not agreed, confidentiality wording is unrealistic, or deadlines are too tight for proper review.",
          "Employees should avoid signing before they understand the agreement. Employers should avoid assuming a template will be suitable for every situation. The context matters, especially where there has been a grievance, redundancy process, sickness absence, or performance issue.",
        ],
      },
      {
        heading: "What to prepare",
        body: [
          "Prepare the draft settlement agreement, employment contract, staff handbook if relevant, recent payslips, bonus or commission information, benefits details, redundancy calculations, and any correspondence about the issue. If there is a deadline, note it clearly.",
          "It also helps to list questions before the appointment. For example, whether the payment is correct, whether the reference wording is acceptable, whether restrictions affect future work, and whether the employer contribution covers the advice cost.",
        ],
      },
      {
        heading: "Questions to ask a solicitor",
        body: [
          "Ask what the agreement means, which claims are being waived, whether any wording needs changing, whether the payment is clearly explained, how tax is treated, what restrictions apply after employment, and whether the employer's contribution is enough for the advice required.",
          "You can also ask how quickly the review can be completed. Settlement agreements can be time sensitive, but the process should still allow enough time for meaningful advice.",
        ],
      },
      {
        heading: "Local relevance for Kidderminster employees and employers",
        body: [
          "Employment issues in Kidderminster, Stourport, Bewdley, Cookley, Hagley, and the wider Worcestershire area may involve local employers, hybrid work, regional offices, or small businesses where relationships are close and reputational concerns matter.",
          "Whether you are an employee asked to sign or an employer preparing terms, clear employment solicitor support can help avoid confusion. The right next step depends on the agreement, deadline, and surrounding facts.",
        ],
      },
      {
        heading: "Next step",
        body: [
          "If you need settlement agreement support, you can compare employment solicitor options in Kidderminster and request a no obligation quote. A suitable solicitor partner may contact you directly if they are able to help.",
          "This guide is general information only. Kidderminster Solicitors is not a law firm and does not provide legal advice.",
        ],
      },
    ],
    relatedGuideSlugs: [
      "when-should-you-speak-to-an-employment-solicitor",
      "how-to-prepare-for-a-divorce-solicitor-consultation",
    ],
    faq: [
      {
        question: "Does my employer usually pay for settlement agreement advice?",
        answer:
          "Employers often contribute to the cost, but the amount varies. Ask the solicitor whether the contribution is likely to cover the work needed.",
      },
      {
        question: "Can I negotiate a settlement agreement?",
        answer:
          "Sometimes points can be queried or negotiated, but this depends on the facts and the employer's position. A qualified adviser can explain options.",
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
      "Employment issues can move quickly. Speaking to a solicitor may be useful where deadlines, documents, workplace disputes, or exit terms need careful handling.",
    keyTakeaways: [
      "Employment support may be useful before deadlines, meetings, dismissals, grievances, redundancies, or settlement agreements move too far.",
      "Employees and employers should prepare documents, timelines, and key correspondence before speaking to a solicitor.",
      "This website cannot assess claims or deadlines, so users should speak directly with a qualified provider where timing may matter.",
    ],
    sections: [
      {
        heading: "Employee situations",
        body: [
          "Employees may seek help with settlement agreements, dismissal concerns, redundancy, discrimination concerns, grievances, disciplinary issues, sickness absence issues, contract questions, restrictive covenants, or unpaid wages. The right time to speak to a solicitor is often before making a final decision or missing a deadline.",
          "If you work in Kidderminster, Stourport, Bewdley, Cookley, Hagley, or elsewhere in Worcestershire, local employment issues may involve smaller workplaces where relationships and references matter. A solicitor can explain process and options based on the facts if you choose to instruct them.",
        ],
      },
      {
        heading: "Employer situations",
        body: [
          "Employers may need support with contracts, policies, grievances, disciplinaries, dismissals, redundancies, settlement agreements, absence management, restructures, and tribunal risk. Small businesses often benefit from early guidance before a problem becomes formal.",
          "This is especially relevant where a decision affects someone's job, pay, working pattern, or reputation. Clear documents and fair process can matter as much as the final decision.",
        ],
      },
      {
        heading: "Where things can go wrong",
        body: [
          "Employment issues can escalate when emails are sent in anger, deadlines are missed, meetings are attended without preparation, or a settlement agreement is signed without understanding its effect. Employers can also create risk by skipping process or using unclear wording.",
          "Internal deadlines and employment tribunal time limits can be short. This website cannot advise on deadlines, so users should speak directly with a qualified solicitor or legal service provider where timing may matter.",
        ],
      },
      {
        heading: "What to prepare",
        body: [
          "Prepare your contract, staff handbook or policies, relevant emails, meeting notes, payslips, redundancy letters, disciplinary or grievance documents, and any settlement agreement. Write a short timeline with dates and what happened.",
          "Employers should prepare the relevant contract, policy documents, correspondence, decision notes, consultation records, and the commercial outcome they want to achieve. The more organised the facts are, the easier it is for a solicitor to identify the next sensible step.",
        ],
      },
      {
        heading: "Questions to ask a solicitor",
        body: [
          "Ask whether there are urgent deadlines, what information is needed first, what options may be available, how costs are handled, who will manage the matter, and what communication should be avoided until advice is taken.",
          "Employees may want to ask about settlement, references, restrictions, pay, and process. Employers may want to ask about risk, documentation, consultation, and whether a proposed step is proportionate.",
        ],
      },
      {
        heading: "Next step",
        body: [
          "If you are unsure whether to speak to an employment solicitor, you can compare employment solicitor options in Kidderminster and request a no obligation quote. A suitable solicitor partner may contact you directly if they are able to help.",
          "This guide is general information only. Kidderminster Solicitors is not a law firm and does not provide legal advice.",
        ],
      },
    ],
    relatedGuideSlugs: [
      "settlement-agreements-explained",
      "what-does-a-family-law-solicitor-help-with",
    ],
    faq: [
      {
        question: "Should I wait until my employer makes a final decision?",
        answer:
          "Not always. Early support may be useful where meetings, deadlines, settlement agreements, or dismissal risks are involved.",
      },
      {
        question: "Can this website tell me if I have a claim?",
        answer:
          "No. This website provides general information and solicitor introductions only. A qualified solicitor or legal provider would need to assess the facts.",
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
