"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const consentStorageKey = "cookie-consent";
const conversionStorageKey = "lead-conversion-event-fired";

function hasAnalyticsConsent() {
  try {
    const saved = localStorage.getItem(consentStorageKey);

    if (!saved) {
      return false;
    }

    const parsed = JSON.parse(saved) as { analytics?: boolean };
    return parsed.analytics === true;
  } catch {
    return false;
  }
}

export function LeadConversionEvent() {
  const measurementId = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;

  useEffect(() => {
    if (!measurementId || !hasAnalyticsConsent()) {
      return;
    }

    if (sessionStorage.getItem(conversionStorageKey) === "true") {
      return;
    }

    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let attempts = 0;

    function fireWhenReady() {
      if (sessionStorage.getItem(conversionStorageKey) === "true") {
        return;
      }

      if (!window.gtag) {
        attempts += 1;

        if (attempts <= 30) {
          timeoutId = setTimeout(fireWhenReady, 100);
        }

        return;
      }

      window.gtag("event", "generate_lead", {
        event_category: "lead",
        event_label: "quote_request",
        send_to: measurementId,
      });

      sessionStorage.setItem(conversionStorageKey, "true");
    }

    fireWhenReady();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [measurementId]);

  return null;
}
