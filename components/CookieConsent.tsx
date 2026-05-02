"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Consent = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

const storageKey = "cookie-consent";

function saveConsent(consent: Consent) {
  localStorage.setItem(storageKey, JSON.stringify(consent));
  window.dispatchEvent(
    new CustomEvent("cookie-consent-updated", { detail: consent }),
  );
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [managing, setManaging] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    const revealTimer = saved
      ? undefined
      : window.setTimeout(() => setVisible(true), 0);

    function openSettings() {
      const current = localStorage.getItem(storageKey);

      if (current) {
        try {
          const parsed = JSON.parse(current) as Consent;
          setAnalytics(Boolean(parsed.analytics));
          setMarketing(Boolean(parsed.marketing));
        } catch {
          setAnalytics(false);
          setMarketing(false);
        }
      }

      setManaging(true);
      setVisible(true);
    }

    window.addEventListener("open-cookie-settings", openSettings);

    return () => {
      if (revealTimer) {
        window.clearTimeout(revealTimer);
      }
      window.removeEventListener("open-cookie-settings", openSettings);
    };
  }, []);

  function acceptAll() {
    saveConsent({ necessary: true, analytics: true, marketing: true });
    setVisible(false);
  }

  function rejectNonEssential() {
    saveConsent({ necessary: true, analytics: false, marketing: false });
    setVisible(false);
  }

  function savePreferences() {
    saveConsent({ necessary: true, analytics, marketing });
    setVisible(false);
  }

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-3xl rounded-3xl border border-[var(--border)] bg-white p-5 shadow-[0_24px_90px_rgba(7,24,39,0.22)]">
      <div className="grid gap-5 md:grid-cols-[1.25fr_0.75fr]">
        <div>
          <p className="text-sm font-semibold uppercase text-[var(--mid-blue)]">
            Cookie preferences
          </p>
          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
            We use cookies to make this site work, improve your experience,
            measure site performance, and, where you consent, support marketing
            activity. You can accept all cookies, reject non-essential cookies,
            or manage your preferences.
          </p>
          <div className="mt-3 flex gap-4 text-xs font-semibold text-[var(--navy)]">
            <Link href="/privacy-policy/">Privacy Policy</Link>
            <Link href="/cookie-policy/">Cookie Policy</Link>
          </div>
        </div>

        {managing ? (
          <div className="space-y-3 rounded-2xl bg-[var(--pale-blue)] p-4 text-sm">
            <label className="flex items-center justify-between gap-4">
              <span>Necessary</span>
              <input type="checkbox" checked readOnly />
            </label>
            <label className="flex items-center justify-between gap-4">
              <span>Analytics</span>
              <input
                type="checkbox"
                checked={analytics}
                onChange={(event) => setAnalytics(event.target.checked)}
              />
            </label>
            <label className="flex items-center justify-between gap-4">
              <span>Marketing</span>
              <input
                type="checkbox"
                checked={marketing}
                onChange={(event) => setMarketing(event.target.checked)}
              />
            </label>
            <button
              type="button"
              onClick={savePreferences}
              className="w-full rounded-full bg-[var(--navy)] px-4 py-3 text-xs font-bold uppercase text-white"
            >
              Save preferences
            </button>
          </div>
        ) : (
          <div className="grid content-center gap-3">
            <button
              type="button"
              onClick={acceptAll}
              className="rounded-full bg-[var(--gold)] px-4 py-3 text-xs font-bold uppercase text-[var(--navy)]"
            >
              Accept all
            </button>
            <button
              type="button"
              onClick={rejectNonEssential}
              className="rounded-full border border-[var(--border)] px-4 py-3 text-xs font-bold uppercase text-[var(--navy)]"
            >
              Reject non-essential
            </button>
            <button
              type="button"
              onClick={() => setManaging(true)}
              className="rounded-full border border-[var(--border)] px-4 py-3 text-xs font-bold uppercase text-[var(--navy)]"
            >
              Manage preferences
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
