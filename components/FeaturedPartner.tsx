import Link from "next/link";
import { BadgeCheck, ExternalLink, MapPin, Phone } from "lucide-react";
import { featuredPartner } from "../lib/site";

export function FeaturedPartner() {
  return (
    <section className="bg-white px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 rounded-[2rem] border border-[var(--line)] bg-[var(--cream)] p-7 shadow-[0_30px_90px_rgba(7,24,39,0.08)] lg:grid-cols-[0.95fr_1.05fr] lg:p-10">
          <div>
            <p className="text-sm font-semibold uppercase text-[var(--gold)]">
              Featured partner
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-[var(--navy)] sm:text-4xl">
              Featured Kidderminster solicitor partner
            </h2>
            <p className="mt-5 text-base leading-8 text-[var(--muted)]">
              Partner placement is presented with disclosure and should feel like
              an editorial recommendation, not a directory listing or fake firm
              profile.
            </p>
          </div>

          <div className="rounded-[1.5rem] bg-white p-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[var(--navy)] text-[var(--gold)]">
                <BadgeCheck className="h-7 w-7" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-[var(--navy)]">
                  {featuredPartner.firmName}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                  {featuredPartner.shortDescription}
                </p>
              </div>
            </div>

            <div className="mt-7 grid gap-4 text-sm text-[var(--muted)] sm:grid-cols-2">
              <span className="flex gap-3">
                <MapPin className="h-5 w-5 text-[var(--gold)]" aria-hidden />
                {featuredPartner.address}
              </span>
              <span className="flex gap-3">
                <Phone className="h-5 w-5 text-[var(--gold)]" aria-hidden />
                {featuredPartner.phone}
              </span>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {featuredPartner.practiceAreas.map((area) => (
                <span
                  key={area}
                  className="rounded-full border border-[var(--line)] px-3 py-2 text-xs font-semibold text-[var(--navy)]"
                >
                  {area}
                </span>
              ))}
            </div>

            <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <Link
                href={featuredPartner.websiteUrl}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--navy)] px-5 py-3 text-sm font-semibold text-white"
              >
                Request a quote
                <ExternalLink className="h-4 w-4" aria-hidden />
              </Link>
              <span className="text-xs leading-5 text-[var(--muted)]">
                SRA number: {featuredPartner.sraNumber}
              </span>
            </div>

            <p className="mt-6 border-t border-[var(--line)] pt-5 text-xs leading-5 text-[var(--muted)]">
              {featuredPartner.disclosure}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
