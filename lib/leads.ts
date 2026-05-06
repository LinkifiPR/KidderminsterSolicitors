export const legalMatterLabels = {
  conveyancing: "Conveyancing",
  probate: "Probate",
  family_law: "Family Law",
  divorce: "Divorce",
  wills: "Wills",
  employment: "Employment",
  personal_injury: "Personal Injury",
  commercial: "Commercial Law",
  landlord_tenant: "Landlord and Tenant",
} as const;

export type LegalMatterType = keyof typeof legalMatterLabels;

export type Lead = {
  legalMatterType: LegalMatterType;
  name: string;
  phone: string;
  email: string;
  address: string;
  postcode: string;
  preferredContactTime: string;
  hasContactedSolicitor: string;
  enquiryUrgency: string;
  matterStage: string;
  message: string;
  consentAccepted: true;
  disclosureAccepted: true;
  sourcePage: string;
  town: "Kidderminster";
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmTerm: string;
  utmContent: string;
  leadTimestamp: string;
  assignedPartner: string;
};

type ValidationResult =
  | {
      ok: true;
      lead: Lead;
    }
  | {
      ok: false;
      errors: string[];
    };

function asString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function asBoolean(value: unknown) {
  return value === true || value === "true";
}

function isLegalMatterType(value: string): value is LegalMatterType {
  return Object.hasOwn(legalMatterLabels, value);
}

function isValidUkPhone(value: string) {
  const compact = value.replace(/[()\s.-]/g, "");
  const normalized = compact.startsWith("0044")
    ? `+44${compact.slice(4)}`
    : compact;

  return /^(?:0[1-9]\d{9}|\+44[1-9]\d{9})$/.test(normalized);
}

function isValidUkPostcode(value: string) {
  return /^(?:GIR\s*0AA|[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2})$/.test(value);
}

export function validateLeadPayload(payload: unknown): ValidationResult {
  const data =
    payload && typeof payload === "object"
      ? (payload as Record<string, unknown>)
      : {};

  const legalMatterType = asString(data.legalMatterType);
  const name = asString(data.name);
  const phone = asString(data.phone);
  const email = asString(data.email).toLowerCase();
  const address = asString(data.address);
  const postcode = asString(data.postcode)
    .toUpperCase()
    .replace(/\s+/g, " ");
  const preferredContactTime = asString(data.preferredContactTime);
  const hasContactedSolicitor = asString(data.hasContactedSolicitor);
  const enquiryUrgency = asString(data.enquiryUrgency);
  const matterStage = asString(data.matterStage);
  const message = asString(data.message);
  const consentAccepted = asBoolean(data.consentAccepted);
  const disclosureAccepted = asBoolean(data.disclosureAccepted);
  const errors: string[] = [];

  if (!isLegalMatterType(legalMatterType)) {
    errors.push("Legal matter type is required.");
  }

  if (!name) {
    errors.push("Name is required.");
  }

  if (!phone) {
    errors.push("Phone is required.");
  } else if (!isValidUkPhone(phone)) {
    errors.push("Please enter a valid UK phone number.");
  }

  if (!email || !email.includes("@")) {
    errors.push("Email is required.");
  }

  if (!postcode) {
    errors.push("Postcode is required.");
  } else if (!isValidUkPostcode(postcode)) {
    errors.push("Please enter a valid UK postcode.");
  }

  if (!preferredContactTime) {
    errors.push("Preferred contact time is required.");
  }

  if (!hasContactedSolicitor) {
    errors.push("Please confirm whether you have already contacted a solicitor.");
  }

  if (!enquiryUrgency) {
    errors.push("Urgency is required.");
  }

  if (!matterStage) {
    errors.push("Matter stage is required.");
  }

  if (!message) {
    errors.push("Brief description is required.");
  }

  if (!consentAccepted) {
    errors.push("Consent is required.");
  }

  if (!disclosureAccepted) {
    errors.push("Disclosure acceptance is required.");
  }

  if (errors.length > 0 || !isLegalMatterType(legalMatterType)) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    lead: {
      legalMatterType,
      name,
      phone,
      email,
      address,
      postcode,
      preferredContactTime,
      hasContactedSolicitor,
      enquiryUrgency,
      matterStage,
      message,
      consentAccepted: true,
      disclosureAccepted: true,
      sourcePage: asString(data.sourcePage),
      town: "Kidderminster",
      utmSource: asString(data.utmSource),
      utmMedium: asString(data.utmMedium),
      utmCampaign: asString(data.utmCampaign),
      utmTerm: asString(data.utmTerm),
      utmContent: asString(data.utmContent),
      leadTimestamp: new Date().toISOString(),
      assignedPartner: asString(data.assignedPartner),
    },
  };
}

export function buildLeadTags(lead: Lead) {
  return [
    "Legal Lead",
    "Kidderminster",
    "Wyre Forest",
    `Category: ${legalMatterLabels[lead.legalMatterType]}`,
    "Lead - Website",
    "Town - Kidderminster",
    `Category - ${legalMatterLabels[lead.legalMatterType]}`,
  ];
}

function buildKitLeadSummary(lead: Lead) {
  return [
    lead.message,
    "",
    "Lead qualification details:",
    `Address: ${lead.address || "Not provided"}`,
    `Preferred contact time: ${lead.preferredContactTime}`,
    `Already contacted a solicitor?: ${lead.hasContactedSolicitor}`,
    `Urgency: ${lead.enquiryUrgency}`,
    `Matter stage: ${lead.matterStage}`,
  ].join("\n");
}

export function mapLeadToKitFields(lead: Lead) {
  const leadSummary = buildKitLeadSummary(lead);

  return {
    full_name: lead.name,
    email: lead.email,
    phone: lead.phone,
    postcode: lead.postcode,
    legal_category: legalMatterLabels[lead.legalMatterType],
    legal_matter_type: legalMatterLabels[lead.legalMatterType],
    town: lead.town,
    preferred_contact_time: lead.preferredContactTime,
    enquiry_message: leadSummary,
    message: leadSummary,
    source_page: lead.sourcePage,
    utm_source: lead.utmSource,
    utm_medium: lead.utmMedium,
    utm_campaign: lead.utmCampaign,
    utm_term: lead.utmTerm,
    utm_content: lead.utmContent,
    consent_given: String(lead.consentAccepted),
    disclosure_accepted: String(lead.disclosureAccepted),
    referral_disclosure_accepted: String(lead.disclosureAccepted),
    assigned_partner: lead.assignedPartner,
    submitted_at: lead.leadTimestamp,
    lead_timestamp: lead.leadTimestamp,
  };
}
