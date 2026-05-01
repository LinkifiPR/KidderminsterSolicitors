"use client";

import { useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
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
      onSubmit={handleSubmit}
      className="rounded-2xl border border-[var(--border)] bg-white p-6 text-[var(--charcoal)] shadow-[0_22px_70px_rgba(7,24,39,0.1)] sm:p-7"
    >
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase text-[var(--mid-blue)]">
          Request a no obligation quote
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-[var(--navy)]">
          Request a no obligation quote
        </h2>
        <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
          Tell us what legal help you need and we&apos;ll connect you with a
          suitable solicitor partner where appropriate.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="sm:col-span-2">
          <span className="form-label">Legal matter type</span>
          <select
            value={form.legalMatterType}
            onChange={(event) =>
              updateField("legalMatterType", event.target.value as LegalMatterType)
            }
            className="form-input"
            required
          >
            {matterOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

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
      </div>

      <div className="mt-5 space-y-3">
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
            I understand this website is an independent guide and my enquiry may
            be passed to a solicitor firm or legal service provider who can
            contact me about my enquiry.
          </span>
        </label>
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 w-full rounded-full bg-[var(--gold)] px-6 py-4 text-sm font-bold uppercase text-[var(--navy)] transition hover:bg-[#d8b66f] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "submitting" ? "Sending enquiry..." : "Request my quote"}
      </button>

      <p className="mt-4 text-xs leading-5 text-[var(--muted)]">
        By submitting this form, you agree that we may use your details to
        handle your enquiry and may pass them to a solicitor firm or legal
        service provider where appropriate. See our{" "}
        <Link href="/privacy-policy/" className="font-semibold text-[var(--navy)]">
          Privacy Policy
        </Link>{" "}
        for details. We are not a law firm and do not provide legal advice.
      </p>

      {message ? (
        <p
          className={`mt-4 rounded-2xl px-4 py-3 text-sm leading-6 ${
            status === "success"
              ? "bg-[var(--pale-blue)] text-[var(--trust-blue)]"
              : "bg-red-50 text-red-800"
          }`}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
