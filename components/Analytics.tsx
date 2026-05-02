"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

type Consent = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const storageKey = "cookie-consent";

function hasAnalyticsConsent() {
  try {
    const saved = localStorage.getItem(storageKey);

    if (!saved) {
      return false;
    }

    const parsed = JSON.parse(saved) as Partial<Consent>;
    return parsed.analytics === true;
  } catch {
    return false;
  }
}

export function Analytics() {
  const pathname = usePathname();
  const measurementId = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(hasAnalyticsConsent());

    function handleConsentUpdate(event: Event) {
      const consent = (event as CustomEvent<Consent>).detail;
      setEnabled(consent.analytics === true);
    }

    window.addEventListener("cookie-consent-updated", handleConsentUpdate);

    return () => {
      window.removeEventListener("cookie-consent-updated", handleConsentUpdate);
    };
  }, []);

  useEffect(() => {
    if (!enabled || !measurementId || !window.gtag) {
      return;
    }

    window.gtag("config", measurementId, {
      page_path: pathname,
    });
  }, [enabled, measurementId, pathname]);

  if (!measurementId || !enabled) {
    return null;
  }

  return (
    <>
      <Script
        id="ga4-loader"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            page_path: window.location.pathname
          });
        `}
      </Script>
    </>
  );
}
