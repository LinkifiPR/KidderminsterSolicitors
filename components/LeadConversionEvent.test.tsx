import { render, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { LeadConversionEvent } from "./LeadConversionEvent";

describe("LeadConversionEvent", () => {
  const originalMeasurementId = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;

  beforeEach(() => {
    process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID = "G-TEST123";
    localStorage.clear();
    sessionStorage.clear();
    vi.useRealTimers();
    delete window.gtag;
  });

  afterEach(() => {
    process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID = originalMeasurementId;
    vi.restoreAllMocks();
  });

  it("does not fire without analytics consent", () => {
    const gtag = vi.fn();
    window.gtag = gtag;

    render(<LeadConversionEvent />);

    expect(gtag).not.toHaveBeenCalled();
  });

  it("fires a non-sensitive generate_lead event when consent and GA4 are available", async () => {
    const gtag = vi.fn();
    window.gtag = gtag;
    localStorage.setItem(
      "cookie-consent",
      JSON.stringify({ necessary: true, analytics: true, marketing: false }),
    );

    render(<LeadConversionEvent />);

    await waitFor(() => {
      expect(gtag).toHaveBeenCalledWith(
        "event",
        "generate_lead",
        expect.objectContaining({
          event_category: "lead",
          event_label: "quote_request",
          send_to: "G-TEST123",
        }),
      );
    });

    expect(JSON.stringify(gtag.mock.calls)).not.toMatch(
      /email|phone|postcode|message|enquiry/i,
    );
  });

  it("only fires once per browser session", async () => {
    const gtag = vi.fn();
    window.gtag = gtag;
    localStorage.setItem(
      "cookie-consent",
      JSON.stringify({ necessary: true, analytics: true, marketing: false }),
    );

    render(
      <>
        <LeadConversionEvent />
        <LeadConversionEvent />
      </>,
    );

    await waitFor(() => {
      expect(gtag).toHaveBeenCalledTimes(1);
    });
  });

  it("waits briefly for GA4 to become available after page load", async () => {
    vi.useFakeTimers();
    localStorage.setItem(
      "cookie-consent",
      JSON.stringify({ necessary: true, analytics: true, marketing: false }),
    );

    render(<LeadConversionEvent />);

    const gtag = vi.fn();
    window.gtag = gtag;

    await vi.advanceTimersByTimeAsync(100);

    expect(gtag).toHaveBeenCalledWith(
      "event",
      "generate_lead",
      expect.objectContaining({
        event_category: "lead",
        event_label: "quote_request",
      }),
    );
  });
});
