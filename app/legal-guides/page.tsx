import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, FileText } from "lucide-react";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import {
  baseUrl,
  buildGuidePath,
  buildPagePath,
  getGuidesForCategoryGroup,
  guideCategoryGroups,
  servicePages,
} from "../../lib/site";

const guideHubServices = guideCategoryGroups
  .map((group) =>
    servicePages.find((service) => service.slug === group.serviceSlugs[0]),
  )
  .filter((service): service is (typeof servicePages)[number] =>
    Boolean(service),
  );

export const metadata: Metadata = {
  title: "Legal Guides Kidderminster",
  description:
    "General legal guides for Kidderminster solicitor enquiries, including conveyancing, probate, family law, divorce, and employment topics.",
  alternates: {
    canonical: `${baseUrl}/legal-guides/`,
  },
  openGraph: {
    title: "Legal Guides | Kidderminster Solicitors",
    description:
      "General legal guides for Kidderminster solicitor enquiries and comparison research.",
    url: `${baseUrl}/legal-guides/`,
  },
};

export default function LegalGuidesPage() {
  return (
    <main className="min-h-screen bg-[var(--cream)]">
      <SiteHeader />

      <section className="bg-[linear-gradient(180deg,#ffffff_0%,var(--pale-blue)_100%)] px-5 py-16 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 rounded-[2rem] border border-[var(--border)] bg-white p-7 shadow-[0_26px_90px_rgba(7,24,39,0.1)] sm:p-10 lg:grid-cols-[1fr_0.85fr]">
          <div>
            <p className="text-sm font-semibold uppercase text-[var(--gold)]">
              Local legal guides
            </p>
            <h1 className="mt-4 max-w-4xl text-5xl font-extrabold leading-[1.04] text-[var(--navy)] sm:text-6xl">
              Legal guides for Kidderminster solicitor enquiries
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">
              Clear general information to help you understand common solicitor
              services before requesting a no obligation quote from a suitable
              solicitor partner.
            </p>
            <p className="mt-5 max-w-2xl text-sm leading-6 text-[var(--muted)]">
              Kidderminster Solicitors is an independent local guide. We are not
              a law firm and do not provide legal advice.
            </p>
          </div>

          <div className="grid content-center gap-4">
            {guideHubServices.map((service) => (
              <Link
                key={service.slug}
                href={`/${service.slug}/`}
                className="flex items-center justify-between gap-4 rounded-2xl border border-[var(--border)] bg-[var(--cream)] p-5 text-[var(--navy)] transition hover:border-[var(--mid-blue)] hover:bg-white hover:shadow-[0_16px_45px_rgba(7,24,39,0.08)]"
              >
                <span className="font-extrabold">{service.category}</span>
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8">
            {guideCategoryGroups.map((group) => {
              const guides = getGuidesForCategoryGroup(group);
              const services = group.serviceSlugs
                .map((slug) =>
                  servicePages.find((service) => service.slug === slug),
                )
                .filter((service): service is (typeof servicePages)[number] =>
                  Boolean(service),
                );

              if (!guides.length) {
                return null;
              }

              return (
                <section
                  key={group.title}
                  className="rounded-[2rem] border border-[var(--border)] bg-[var(--pale-blue)] p-5 shadow-[0_22px_70px_rgba(7,24,39,0.06)] sm:p-7"
                >
                  <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr] lg:items-start">
                    <div className="flex gap-3">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-[var(--mid-blue)] shadow-sm">
                        <BookOpen className="h-5 w-5" aria-hidden />
                      </span>
                      <div>
                        <h2 className="text-3xl font-extrabold text-[var(--navy)]">
                          {group.title}
                        </h2>
                        <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--muted)]">
                          {group.description}
                        </p>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-white/80 bg-white/70 p-4">
                      <p className="text-xs font-extrabold uppercase text-[var(--gold)]">
                        Related services
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {services.map((service) => (
                          <Link
                            key={service.slug}
                            href={buildPagePath(service)}
                            className="rounded-full border border-[var(--border)] bg-white px-3 py-2 text-xs font-extrabold uppercase text-[var(--trust-blue)] transition hover:border-[var(--mid-blue)] hover:bg-[var(--cream)]"
                          >
                            {service.category}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    {guides.map((guide) => (
                      <Link
                        key={guide.slug}
                        href={buildGuidePath(guide.slug)}
                        className="group rounded-2xl border border-[var(--border)] bg-white p-5 shadow-[0_14px_40px_rgba(7,24,39,0.05)] transition hover:-translate-y-1 hover:border-[rgba(23,92,142,0.35)] hover:shadow-[0_22px_60px_rgba(7,24,39,0.1)]"
                      >
                        <div className="flex gap-4">
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--cream)] text-[var(--gold)]">
                            <FileText className="h-5 w-5" aria-hidden />
                          </span>
                          <div>
                            <h3 className="text-lg font-extrabold text-[var(--navy)]">
                              {guide.h1}
                            </h3>
                            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                              {guide.metaDescription}
                            </p>
                            <span className="mt-4 inline-flex items-center gap-2 text-sm font-extrabold text-[var(--trust-blue)]">
                              Read guide
                              <ArrowRight
                                className="h-4 w-4 transition group-hover:translate-x-1"
                                aria-hidden
                              />
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
