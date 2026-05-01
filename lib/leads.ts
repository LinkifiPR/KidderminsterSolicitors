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
  postcode: string;
  preferredContactTime: string;
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

export function validateLeadPayload(payload: unknown): ValidationResult {
  const data =
    payload && typeof payload === "object"
      ? (payload as Record<string, unknown>)
      : {};

  const legalMatterType = asString(data.legalMatterType);
  const name = asString(data.name);
  const phone = asString(data.phone);
  const email = asString(data.email).toLowerCase();
  const postcode = asString(data.postcode).toUpperCase();
  const preferredContactTime = asString(data.preferredContactTime);
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
  }

  if (!email || !email.includes("@")) {
    errors.push("Email is required.");
  }

  if (!postcode) {
    errors.push("Postcode is required.");
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
      postcode,
      preferredContactTime,
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
    "Lead - Website",
    "Town - Kidderminster",
    `Category - ${legalMatterLabels[lead.legalMatterType]}`,
  ];
}

export function mapLeadToKitFields(lead: Lead) {
  return {
    phone: lead.phone,
    postcode: lead.postcode,
    legal_matter_type: legalMatterLabels[lead.legalMatterType],
    town: lead.town,
    preferred_contact_time: lead.preferredContactTime,
    message: lead.message,
    source_page: lead.sourcePage,
    utm_source: lead.utmSource,
    utm_medium: lead.utmMedium,
    utm_campaign: lead.utmCampaign,
    utm_term: lead.utmTerm,
    utm_content: lead.utmContent,
    consent_given: String(lead.consentAccepted),
    disclosure_accepted: String(lead.disclosureAccepted),
    assigned_partner: lead.assignedPartner,
    lead_timestamp: lead.leadTimestamp,
  };
}
