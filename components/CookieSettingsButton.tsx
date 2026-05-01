"use client";

export function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("open-cookie-settings"))}
      className="text-left text-sm text-white/70 transition hover:text-white"
    >
      Cookie settings
    </button>
  );
}
