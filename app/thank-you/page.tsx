import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileText,
  ShieldCheck,
} from "lucide-react";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import { baseUrl, servicePages } from "../../lib/site";

export const metadata: Metadata = {
  title: "Thank You",
  description:
    "Your Kidderminster solicitor quote enquiry has been received by this independent local guide.",
  alternates: {
    canonical: `${baseUrl}/thank-you/`,
  },
  openGraph: {
    title: "Thank You | Kidderminster Solicitors",
    description:
      "Your no obligation solicitor quote enquiry has been received.",
    url: `${baseUrl}/thank-you/`,
  },
  robots: {
    index: false,
    follow: false,
  },
};

const nextSteps = [
  {
    title: "We review your enquiry",
    text: "We check the details you submitted and consider whether a suitable solicitor partner may be able to help.",
    icon: FileText,
  },
  {
    title: "A partner may contact you",
    text: "A solicitor firm or legal service provider may contact you directly if your enquiry is a good fit.",
    icon: Clock3,
  },
  {
    title: "There is no obligation",
    text: "You are under no obligation to instruct any firm introduced through this website.",
    icon: ShieldCheck,
  },
];

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-white">
      <SiteHeader />

      <section className="bg-[linear-gradient(180deg,#ffffff_0%,var(--pale-blue)_100%)] px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 rounded-[2rem] border border-[var(--border)] bg-white p-7 shadow-[0_26px_90px_rgba(7,24,39,0.1)] sm:p-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--pale-blue)] text-[var(--mid-blue)]">
              <CheckCircle2 className="h-7 w-7" aria-hidden />
            </div>
            <p className="mt-6 text-sm font-semibold uppercase text-[var(--gold)]">
              Enquiry received
            </p>
            <h1 className="mt-4 max-w-3xl text-5xl font-extrabold leading-[1.04] text-[var(--navy)] sm:text-6xl">
              Thank you. Your enquiry has been received.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">
              We&apos;ll review your enquiry and, where appropriate, pass it to a
              suitable solicitor partner who can contact you directly.
            </p>
            <p className="mt-5 max-w-2xl text-sm leading-6 text-[var(--muted)]">
              Kidderminster Solicitors is an independent local guide. We are not
              a law firm and do not provide legal advice.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--gold)] px-6 py-4 text-sm font-extrabold uppercase text-[var(--navy)] shadow-[0_16px_36px_rgba(198,161,91,0.3)] transition hover:-translate-y-0.5 hover:bg-[#d8b66f]"
              >
                Back to homepage
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                href="/conveyancing-solicitors-kidderminster/"
                className="inline-flex justify-center rounded-full border border-[var(--border)] bg-white px-6 py-4 text-sm font-extrabold uppercase text-[var(--trust-blue)] shadow-sm transition hover:border-[var(--mid-blue)] hover:bg-[var(--pale-blue)]"
              >
                View conveyancing
              </Link>
            </div>
          </div>

          <div className="grid content-center gap-4">
            {nextSteps.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--cream)] p-5 shadow-[0_16px_45px_rgba(7,24,39,0.06)]"
                >
                  <div className="flex gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-[var(--mid-blue)] shadow-sm">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <div>
                      <h2 className="text-lg font-extrabold text-[var(--navy)]">
                        {item.title}
                      </h2>
                      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase text-[var(--mid-blue)]">
              Compare services
            </p>
            <h2 className="mt-3 text-4xl font-extrabold text-[var(--navy)]">
              Browse common solicitor services.
            </h2>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {servicePages.slice(0, 8).map((service) => (
              <Link
                key={service.slug}
                href={`/${service.slug}/`}
                className="rounded-[1.25rem] border border-[var(--border)] bg-white p-5 shadow-[0_14px_40px_rgba(7,24,39,0.06)] transition hover:-translate-y-1 hover:border-[rgba(23,92,142,0.35)] hover:shadow-[0_22px_60px_rgba(7,24,39,0.1)]"
              >
                <h3 className="text-lg font-extrabold text-[var(--navy)]">
                  {service.category}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                  {service.summary}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
