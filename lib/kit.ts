import { buildLeadTags, mapLeadToKitFields, type Lead } from "./leads";

const KIT_API_BASE = "https://api.kit.com/v4";

type KitConfig = {
  apiKey: string;
  formId: string;
};

type KitSubscriberResponse = {
  subscriber?: {
    id?: number;
    email_address?: string;
  };
};

type KitTagResponse = {
  tag?: {
    id?: number;
  };
};

type KitTagsResponse = {
  tags?: Array<{
    id?: number;
    name?: string;
  }>;
};

async function kitRequest<T>(
  path: string,
  config: KitConfig,
  body?: Record<string, unknown>,
): Promise<T> {
  const response = await fetch(`${KIT_API_BASE}${path}`, {
    method: body ? "POST" : "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Kit-Api-Key": config.apiKey,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    let details = response.statusText;

    try {
      const json = await response.json();
      if (Array.isArray(json.errors)) {
        details = json.errors.join(", ");
      }
    } catch {
      // Keep the HTTP status text when Kit returns a non-JSON error.
    }

    throw new Error(`Kit API request failed: ${details}`);
  }

  return response.json() as Promise<T>;
}

async function createOrUpdateSubscriber(lead: Lead, config: KitConfig) {
  return kitRequest<KitSubscriberResponse>("/subscribers", config, {
    first_name: lead.name,
    email_address: lead.email,
    state: "active",
    fields: mapLeadToKitFields(lead),
  });
}

async function addSubscriberToForm(lead: Lead, config: KitConfig) {
  return kitRequest<KitSubscriberResponse>(
    `/forms/${config.formId}/subscribers`,
    config,
    {
      email_address: lead.email,
      referrer: lead.sourcePage || undefined,
    },
  );
}

async function createOrReuseTag(name: string, config: KitConfig) {
  const tagsResponse = await kitRequest<KitTagsResponse>("/tags", config);
  const existingTag = tagsResponse.tags?.find((tag) => tag.name === name);

  if (existingTag?.id) {
    return existingTag.id;
  }

  const response = await kitRequest<KitTagResponse>("/tags", config, { name });

  if (!response.tag?.id) {
    throw new Error(`Kit did not return an id for tag: ${name}`);
  }

  return response.tag.id;
}

async function tagSubscriber(email: string, tagId: number, config: KitConfig) {
  return kitRequest<KitSubscriberResponse>(
    `/tags/${tagId}/subscribers`,
    config,
    {
      email_address: email,
    },
  );
}

export async function submitLeadToKit(lead: Lead, config: KitConfig) {
  await createOrUpdateSubscriber(lead, config);
  await addSubscriberToForm(lead, config);

  for (const tagName of buildLeadTags(lead)) {
    const tagId = await createOrReuseTag(tagName, config);
    await tagSubscriber(lead.email, tagId, config);
  }
}
