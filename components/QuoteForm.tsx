"use client";

import { useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import { Check, ChevronDown, Send } from "lucide-react";
import { legalMatterLabels, type LegalMatterType } from "../lib/leads";

type FormState = {
  legalMatterType: LegalMatterType;
  name: string;
  phone: string;
  email: string;
  postcode: string;
  preferredContactTime: string;
  message: string;
  consentAccepted: boolean;
  disclosureAccepted: boolean;
};

const initialState: FormState = {
  legalMatterType: "conveyancing",
  name: "",
  phone: "",
  email: "",
  postcode: "",
  preferredContactTime: "",
  message: "",
  consentAccepted: false,
  disclosureAccepted: false,
};

function getAttribution() {
  if (typeof window === "undefined") {
    return {
      sourcePage: "",
      utmSource: "",
      utmMedium: "",
      utmCampaign: "",
      utmTerm: "",
      utmContent: "",
    };
  }

  const params = new URLSearchParams(window.location.search);

  return {
    sourcePage: window.location.href,
    utmSource: params.get("utm_source") || "",
    utmMedium: params.get("utm_medium") || "",
    utmCampaign: params.get("utm_campaign") || "",
    utmTerm: params.get("utm_term") || "",
    utmContent: params.get("utm_content") || "",
  };
}

export function QuoteForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");
  const [legalMatterOpen, setLegalMatterOpen] = useState(false);
  const matterOptions = useMemo(
    () =>
      Object.entries(legalMatterLabels).map(([value, label]) => ({
        value: value as LegalMatterType,
        label,
      })),
    [],
  );

  function updateField<Field extends keyof FormState>(
    field: Field,
    value: FormState[Field],
  ) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function chooseLegalMatter(value: LegalMatterType) {
    updateField("legalMatterType", value);
    setLegalMatterOpen(false);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        ...getAttribution(),
      }),
    });

    if (response.ok) {
      setStatus("success");
      setForm(initialState);
      setMessage(
        "Thank you. Your enquiry has been received. A solicitor partner may contact you directly if they are able to help.",
      );
      return;
    }

    let error = "Something went wrong. Please check your details and try again.";

    try {
      const json = await response.json();
      if (Array.isArray(json.errors) && json.errors.length > 0) {
        error = json.errors.join(" ");
      }
    } catch {
      // Keep the generic form error if the response is not JSON.
    }

    setStatus("error");
    setMessage(error);
  }

  return (
    <form
      aria-label="Quote request"
      onSubmit={handleSubmit}
      className="quote-form-card mx-auto w-full max-w-2xl overflow-hidden rounded-[1.65rem] border border-white/80 bg-white text-[var(--charcoal)] shadow-[0_24px_90px_rgba(7,24,39,0.16)] ring-1 ring-[rgba(198,161,91,0.24)]"
    >
      <div className="bg-[linear-gradient(135deg,var(--navy),var(--trust-blue))] px-5 py-5 text-white sm:px-6">
        <div className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-[var(--gold)]">
          Private quote request
        </div>
        <h2 className="mt-3 text-2xl font-semibold leading-tight">
          Request a no obligation quote
        </h2>
        <p className="mt-2 text-sm leading-6 text-white/78">
          Tell us what legal help you need and we&apos;ll connect you with a
          suitable solicitor partner where appropriate.
        </p>
      </div>

      <div className="grid gap-3 p-5 sm:grid-cols-2 sm:p-6">
        <div className="relative sm:col-span-2">
          <span id="legal-matter-label" className="form-label">
            Legal matter type
          </span>
          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded={legalMatterOpen}
            aria-labelledby="legal-matter-label legal-matter-value"
            onClick={() => setLegalMatterOpen((open) => !open)}
            className="legal-matter-trigger flex w-full items-center justify-between gap-4 rounded-[1.05rem] border border-[rgba(198,161,91,0.42)] bg-[linear-gradient(135deg,#ffffff,#f8f5ef)] px-4 py-3.5 text-left font-semibold text-[var(--navy)] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_10px_28px_rgba(7,24,39,0.07)] transition hover:border-[var(--gold)] focus:outline-none focus:ring-4 focus:ring-[rgba(198,161,91,0.18)]"
          >
            <span className="flex min-w-0 items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--navy)] text-xs font-bold text-[var(--gold)]">
                KS
              </span>
              <span id="legal-matter-value" className="truncate">
                {legalMatterLabels[form.legalMatterType]}
              </span>
            </span>
            <ChevronDown
              className={`h-5 w-5 shrink-0 text-[var(--gold)] transition ${
                legalMatterOpen ? "rotate-180" : ""
              }`}
              aria-hidden
            />
          </button>

          {legalMatterOpen ? (
            <div
              role="listbox"
              aria-label="Legal matter type"
              className="legal-matter-listbox absolute z-30 mt-3 grid w-full gap-1.5 rounded-[1.25rem] border border-[rgba(198,161,91,0.35)] bg-white p-2 shadow-[0_22px_70px_rgba(7,24,39,0.18)]"
            >
              {matterOptions.map((option) => {
                const isSelected = option.value === form.legalMatterType;

                return (
                  <button
                    key={option.value}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => chooseLegalMatter(option.value)}
                    className={`legal-matter-option flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-semibold text-[var(--navy)] transition hover:bg-[var(--pale-blue)] ${
                      isSelected
                        ? "bg-[var(--pale-blue)] text-[var(--trust-blue)]"
                        : "bg-white"
                    }`}
                  >
                    <span>{option.label}</span>
                    {isSelected ? (
                      <Check className="h-4 w-4 text-[var(--gold)]" aria-hidden />
                    ) : null}
                  </button>
                );
              })}
            </div>
          ) : null}
        </div>

        <label>
          <span className="form-label">Name</span>
          <input
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
            className="form-input"
            autoComplete="name"
            required
          />
        </label>

        <label>
          <span className="form-label">Phone</span>
          <input
            value={form.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            className="form-input"
            autoComplete="tel"
            required
          />
        </label>

        <label>
          <span className="form-label">Email</span>
          <input
            type="email"
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            className="form-input"
            autoComplete="email"
            required
          />
        </label>

        <label>
          <span className="form-label">Postcode</span>
          <input
            value={form.postcode}
            onChange={(event) => updateField("postcode", event.target.value)}
            className="form-input"
            autoComplete="postal-code"
            required
          />
        </label>

        <label className="sm:col-span-2">
          <span className="form-label">Preferred contact time</span>
          <input
            value={form.preferredContactTime}
            onChange={(event) =>
              updateField("preferredContactTime", event.target.value)
            }
            className="form-input"
            placeholder="Morning, afternoon, evening..."
          />
        </label>

        <label className="sm:col-span-2">
          <span className="form-label">Brief description</span>
          <textarea
            value={form.message}
            onChange={(event) => updateField("message", event.target.value)}
            className="form-input min-h-28 resize-y"
            required
          />
        </label>
        <div className="space-y-3 rounded-2xl border border-[var(--border)] bg-[var(--pale-blue)] p-4 sm:col-span-2">
          <label className="flex gap-3 text-xs leading-5 text-[var(--muted)]">
            <input
              type="checkbox"
              checked={form.consentAccepted}
              onChange={(event) =>
                updateField("consentAccepted", event.target.checked)
              }
              className="mt-1 h-4 w-4 accent-[var(--gold)]"
              required
            />
            <span>
              I consent to being contacted about my enquiry using the details I
              have provided.
            </span>
          </label>
          <label className="flex gap-3 text-xs leading-5 text-[var(--muted)]">
            <input
              type="checkbox"
              checked={form.disclosureAccepted}
              onChange={(event) =>
                updateField("disclosureAccepted", event.target.checked)
              }
              className="mt-1 h-4 w-4 accent-[var(--gold)]"
              required
            />
            <span>
              I understand this website is an independent guide and my enquiry
              may be passed to a solicitor firm or legal service provider who
              can contact me about my enquiry.
            </span>
          </label>
        </div>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="group mt-1 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--gold)] px-6 py-4 text-sm font-bold uppercase text-[var(--navy)] shadow-[0_14px_30px_rgba(198,161,91,0.32)] transition hover:bg-[#d8b66f] disabled:cursor-not-allowed disabled:opacity-70 sm:col-span-2"
        >
          {status === "submitting" ? "Sending enquiry..." : "Request my quote"}
          <Send
            className="h-4 w-4 transition group-hover:translate-x-0.5"
            aria-hidden
          />
        </button>

        <p className="sm:col-span-2 text-xs leading-5 text-[var(--muted)]">
          By submitting this form, you agree that we may use your details to
          handle your enquiry and may pass them to a solicitor firm or legal
          service provider where appropriate. See our{" "}
          <Link
            href="/privacy-policy/"
            className="font-semibold text-[var(--navy)]"
          >
            Privacy Policy
          </Link>{" "}
          for details. We are not a law firm and do not provide legal advice.
        </p>

        {message ? (
          <p
            className={`sm:col-span-2 rounded-2xl px-4 py-3 text-sm leading-6 ${
              status === "success"
                ? "bg-[var(--pale-blue)] text-[var(--trust-blue)]"
                : "bg-red-50 text-red-800"
            }`}
          >
            {message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
