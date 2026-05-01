import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { submitLeadToKit } from "./kit";
import { validateLeadPayload } from "./leads";

const payload = {
  legalMatterType: "conveyancing",
  name: "Sarah Example",
  phone: "01562 123456",
  email: "sarah@example.com",
  postcode: "DY10 1AA",
  preferredContactTime: "Morning",
  message: "I am buying a house in Kidderminster.",
  consentAccepted: true,
  disclosureAccepted: true,
  sourcePage: "https://kidderminstersolicitors.co.uk/?utm_source=google",
  utmSource: "google",
};

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

describe("submitLeadToKit", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    fetchMock.mockReset();
  });

  it("creates a subscriber, adds them to the form, creates/reuses tags, and applies tags", async () => {
    const result = validateLeadPayload(payload);

    if (!result.ok) {
      throw new Error("Expected payload to be valid");
    }

    fetchMock
      .mockResolvedValueOnce(
        jsonResponse({
          subscriber: { id: 123, email_address: "sarah@example.com" },
        }),
      )
      .mockResolvedValueOnce(
        jsonResponse({
          subscriber: { id: 123, email_address: "sarah@example.com" },
        }),
      )
      .mockResolvedValueOnce(jsonResponse({ tag: { id: 10 } }))
      .mockResolvedValueOnce(
        jsonResponse({
          subscriber: { id: 123, email_address: "sarah@example.com" },
        }),
      )
      .mockResolvedValueOnce(jsonResponse({ tag: { id: 11 } }))
      .mockResolvedValueOnce(
        jsonResponse({
          subscriber: { id: 123, email_address: "sarah@example.com" },
        }),
      )
      .mockResolvedValueOnce(jsonResponse({ tag: { id: 12 } }))
      .mockResolvedValueOnce(
        jsonResponse({
          subscriber: { id: 123, email_address: "sarah@example.com" },
        }),
      );

    await submitLeadToKit(result.lead, {
      apiKey: "test-key",
      formId: "9391183",
    });

    expect(fetchMock).toHaveBeenNthCalledWith(
      1,
      "https://api.kit.com/v4/subscribers",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          "X-Kit-Api-Key": "test-key",
        }),
      }),
    );
    expect(fetchMock).toHaveBeenNthCalledWith(
      2,
      "https://api.kit.com/v4/forms/9391183/subscribers",
      expect.objectContaining({ method: "POST" }),
    );
    expect(fetchMock).toHaveBeenNthCalledWith(
      3,
      "https://api.kit.com/v4/tags",
      expect.objectContaining({
        body: JSON.stringify({ name: "Lead - Website" }),
      }),
    );
    expect(fetchMock).toHaveBeenNthCalledWith(
      4,
      "https://api.kit.com/v4/tags/10/subscribers",
      expect.objectContaining({
        body: JSON.stringify({ email_address: "sarah@example.com" }),
      }),
    );
    expect(fetchMock).toHaveBeenCalledTimes(8);
  });
});
