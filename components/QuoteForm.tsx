"use client";

import { useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import { Check, ChevronDown, Clock, MapPin, Send } from "lucide-react";
import { legalMatterLabels, type LegalMatterType } from "../lib/leads";

type FormState = {
  legalMatterType: LegalMatterType;
  name: string;
  phone: string;
  email: string;
  address: string;
  postcode: string;
  preferredContactTime: string;
  hasContactedSolicitor: string;
  enquiryUrgency: string;
  matterStage: string;
  message: string;
  consentAccepted: boolean;
  disclosureAccepted: boolean;
};

const initialState: FormState = {
  legalMatterType: "conveyancing",
  name: "",
  phone: "",
  email: "",
  address: "",
  postcode: "",
  preferredContactTime: "",
  hasContactedSolicitor: "",
  enquiryUrgency: "",
  matterStage: "",
  message: "",
  consentAccepted: false,
  disclosureAccepted: false,
};

type SelectOption<Value extends string> = {
  value: Value;
  label: string;
  hint?: string;
};

const contactTimeOptions: SelectOption<string>[] = [
  { value: "Morning", label: "Morning", hint: "9am to 12pm" },
  { value: "Afternoon", label: "Afternoon", hint: "12pm to 5pm" },
  { value: "Evening", label: "Evening", hint: "5pm to 7pm" },
  { value: "Anytime", label: "Anytime", hint: "No strong preference" },
  { value: "As soon as possible", label: "As soon as possible" },
];

const contactedSolicitorOptions: SelectOption<string>[] = [
  { value: "No", label: "No" },
  { value: "Yes - comparing options", label: "Yes, comparing options" },
  { value: "Yes - waiting for a response", label: "Yes, waiting for a response" },
  { value: "Not sure", label: "Not sure" },
];

const urgencyOptions: SelectOption<string>[] = [
  { value: "As soon as possible", label: "As soon as possible" },
  { value: "This week", label: "This week" },
  { value: "Next 2 weeks", label: "Next 2 weeks" },
  { value: "This month", label: "This month" },
  { value: "No fixed deadline", label: "No fixed deadline" },
];

const matterStageOptions: SelectOption<string>[] = [
  { value: "Ready to compare quotes", label: "Ready to compare quotes" },
  { value: "Researching options", label: "Researching options" },
  { value: "Need help understanding next steps", label: "Need next steps" },
  { value: "Already have documents or correspondence", label: "Have documents" },
];

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
  const [openSelect, setOpenSelect] = useState<string | null>(null);
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

  function handlePhoneChange(value: string) {
    const cleaned = value.replace(/[^\d+()\s.-]/g, "");
    updateField("phone", cleaned);
  }

  function handlePostcodeChange(value: string) {
    updateField("postcode", value.toUpperCase());
  }

  function CustomSelect<Field extends keyof FormState>({
    name,
    label,
    value,
    options,
    icon,
  }: {
    name: Field;
    label: string;
    value: string;
    options: SelectOption<FormState[Field] & string>[];
    icon?: "clock" | "pin" | "ks";
  }) {
    const isOpen = openSelect === String(name);
    const selected = options.find((option) => option.value === value);
    const Icon = icon === "clock" ? Clock : icon === "pin" ? MapPin : null;
    const buttonId = `${String(name)}-value`;
    const labelId = `${String(name)}-label`;

    return (
      <div className="relative">
        <span id={labelId} className="form-label">
          {label}
        </span>
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-labelledby={`${labelId} ${buttonId}`}
          onClick={() =>
            setOpenSelect((open) =>
              open === String(name) ? null : String(name),
            )
          }
          className="legal-matter-trigger flex w-full items-center justify-between gap-4 rounded-[1.05rem] border border-[rgba(198,161,91,0.42)] bg-[linear-gradient(135deg,#ffffff,#f8f5ef)] px-4 py-3.5 text-left font-semibold text-[var(--navy)] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_10px_28px_rgba(7,24,39,0.07)] transition hover:border-[var(--gold)] focus:outline-none focus:ring-4 focus:ring-[rgba(198,161,91,0.18)]"
        >
          <span className="flex min-w-0 items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--navy)] text-xs font-bold text-[var(--gold)]">
              {Icon ? <Icon className="h-4 w-4" aria-hidden /> : "KS"}
            </span>
            <span id={buttonId} className="min-w-0">
              <span
                className={
                  selected ? "block truncate" : "block truncate text-[var(--muted)]"
                }
              >
                {selected?.label || "Please select"}
              </span>
              {selected?.hint ? (
                <span className="block truncate text-xs font-semibold text-[var(--muted)]">
                  {selected.hint}
                </span>
              ) : null}
            </span>
          </span>
          <ChevronDown
            className={`h-5 w-5 shrink-0 text-[var(--gold)] transition ${
              isOpen ? "rotate-180" : ""
            }`}
            aria-hidden
          />
        </button>

        {isOpen ? (
          <div
            role="listbox"
            aria-label={label}
            className="legal-matter-listbox absolute z-30 mt-3 grid w-full gap-1.5 rounded-[1.25rem] border border-[rgba(198,161,91,0.35)] bg-white p-2 shadow-[0_22px_70px_rgba(7,24,39,0.18)]"
          >
            {options.map((option) => {
              const isSelected = option.value === value;

              return (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    updateField(name, option.value as FormState[Field]);
                    setOpenSelect(null);
                  }}
                  className={`legal-matter-option flex w-full items-center justify-between gap-3 rounded-2xl px-4 py-3 text-left text-sm font-semibold text-[var(--navy)] transition hover:bg-[var(--pale-blue)] ${
                    isSelected
                      ? "bg-[var(--pale-blue)] text-[var(--trust-blue)]"
                      : "bg-white"
                  }`}
                >
                  <span className="min-w-0">
                    <span className="block truncate">{option.label}</span>
                    {option.hint ? (
                      <span className="block text-xs text-[var(--muted)]">
                        {option.hint}
                      </span>
                    ) : null}
                  </span>
                  {isSelected ? (
                    <Check
                      className="h-4 w-4 shrink-0 text-[var(--gold)]"
                      aria-hidden
                    />
                  ) : null}
                </button>
              );
            })}
          </div>
        ) : null}
      </div>
    );
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
      window.location.assign("/thank-you/");
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
      className="quote-form-card mx-auto w-full max-w-2xl overflow-visible rounded-[1.65rem] border border-white/80 bg-white text-[var(--charcoal)] shadow-[0_24px_90px_rgba(7,24,39,0.16)] ring-1 ring-[rgba(198,161,91,0.24)]"
    >
      <div className="rounded-t-[1.65rem] bg-[linear-gradient(135deg,var(--navy),var(--trust-blue))] px-5 py-5 text-white sm:px-6">
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
        <div className="sm:col-span-2">
          <CustomSelect
            name="legalMatterType"
            label="Legal matter type"
            value={form.legalMatterType}
            options={matterOptions}
          />
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
          <span className="form-label">UK phone number</span>
          <input
            type="tel"
            value={form.phone}
            onChange={(event) => handlePhoneChange(event.target.value)}
            className="form-input"
            autoComplete="tel"
            inputMode="tel"
            pattern="^(0[1-9][0-9 ]{8,13}|\\+44[1-9][0-9 ]{8,13})$"
            placeholder="07123 456789"
            title="Enter a UK phone number starting 0 or +44"
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
            onChange={(event) => handlePostcodeChange(event.target.value)}
            className="form-input"
            autoComplete="postal-code"
            inputMode="text"
            pattern="^[A-Za-z]{1,2}[0-9][A-Za-z0-9]?\\s*[0-9][A-Za-z]{2}$"
            placeholder="DY10 1AA"
            title="Enter a valid UK postcode"
            required
          />
        </label>

        <label className="sm:col-span-2">
          <span className="form-label">Address or first line</span>
          <input
            value={form.address}
            onChange={(event) => updateField("address", event.target.value)}
            className="form-input"
            autoComplete="street-address"
            placeholder="Optional, but useful for property or local enquiries"
          />
        </label>

        <div className="sm:col-span-2">
          <CustomSelect
            name="preferredContactTime"
            label="Preferred contact time"
            value={form.preferredContactTime}
            options={contactTimeOptions}
            icon="clock"
          />
        </div>

        <div className="sm:col-span-2 grid gap-3 rounded-[1.35rem] border border-[rgba(216,226,234,0.92)] bg-[linear-gradient(135deg,#f8fbfd,#f8f5ef)] p-4">
          <div>
            <p className="text-sm font-bold text-[var(--navy)]">
              Help us send a stronger enquiry
            </p>
            <p className="mt-1 text-xs leading-5 text-[var(--muted)]">
              These details help a solicitor partner understand how ready and
              urgent your enquiry is.
            </p>
          </div>
          <CustomSelect
            name="hasContactedSolicitor"
            label="Have you contacted a solicitor already?"
            value={form.hasContactedSolicitor}
            options={contactedSolicitorOptions}
          />
          <CustomSelect
            name="enquiryUrgency"
            label="How urgent is this?"
            value={form.enquiryUrgency}
            options={urgencyOptions}
          />
          <CustomSelect
            name="matterStage"
            label="What stage are you at?"
            value={form.matterStage}
            options={matterStageOptions}
          />
        </div>

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
