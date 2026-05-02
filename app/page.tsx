import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BookOpenText,
  Clock3,
  Compass,
  Eye,
  FileCheck,
  Handshake,
  MapPin,
  SearchCheck,
  ShieldCheck,
} from "lucide-react";
import { QuoteForm } from "../components/QuoteForm";
import { HowItWorks } from "../components/HowItWorks";
import { ServiceCard } from "../components/ServiceCard";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import {
  guideOrganizationSchema,
  servicePages,
  websiteSchema,
} from "../lib/site";

const trustItems = [
  {
    title: "Independent local guide",
    text: "Clear information for people comparing solicitor services locally.",
    icon: ShieldCheck,
  },
  {
    title: "No obligation quote",
    text: "Request an introduction without committing to instruct a firm.",
    icon: BadgeCheck,
  },
  {
    title: "Transparent referral disclosure",
    text: "We explain how solicitor introductions and commercial relationships work.",
    icon: FileCheck,
  },
  {
    title: "Suitable solicitor introductions",
    text: "A solicitor firm or legal service provider may contact you directly.",
    icon: Handshake,
  },
];

const benefitCards = [
  {
    title: "Save time",
    text: "Avoid contacting multiple firms individually before you know who may be suitable.",
    icon: Clock3,
  },
  {
    title: "No obligation",
    text: "You stay in control and do not have to instruct any introduced provider.",
    icon: BadgeCheck,
  },
  {
    title: "Local relevance",
    text: "The site is built around Kidderminster and Wyre Forest legal enquiries.",
    icon: Compass,
  },
  {
    title: "Clear commercial disclosure",
    text: "Referral and marketing relationships are explained in plain English.",
    icon: Eye,
  },
];

const expectationCards = [
  {
    title: "Clear quote process",
    text: "A straightforward quote request with plain-language disclosure.",
  },
  {
    title: "No obligation introductions",
    text: "You can compare your options without committing to instruct a firm.",
  },
  {
    title: "Local solicitor partner referrals",
    text: "Your enquiry may be passed to a relevant solicitor partner where appropriate.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <SiteHeader />

      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,var(--pale-blue)_100%)] px-5 py-16 sm:px-8 lg:py-20">
        <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--gold),transparent)]" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="min-w-0">
            <p className="inline-flex rounded-full border border-[rgba(23,92,142,0.18)] bg-white px-4 py-2 text-xs font-extrabold uppercase text-[var(--mid-blue)] shadow-sm">
              Independent local solicitor guide
            </p>
            <h1 className="mt-6 max-w-4xl text-5xl font-extrabold leading-[1.02] text-[var(--navy)] sm:text-6xl lg:text-7xl">
              Find trusted solicitors in Kidderminster
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">
              An independent local guide helping you compare solicitor services
              and request a no obligation quote from a suitable solicitor
              partner.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#quote"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[var(--gold)] px-7 py-4 text-sm font-extrabold uppercase text-[var(--navy)] shadow-[0_16px_36px_rgba(198,161,91,0.34)] transition hover:-translate-y-0.5 hover:bg-[#d8b66f] sm:px-6 lg:px-7"
              >
                Get a no obligation quote
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                href="#services"
                className="inline-flex justify-center whitespace-nowrap rounded-full border border-[var(--border)] bg-white px-7 py-4 text-sm font-extrabold uppercase text-[var(--trust-blue)] shadow-sm transition hover:border-[var(--mid-blue)] hover:bg-[var(--pale-blue)] sm:px-6 lg:px-7"
              >
                Compare solicitor services
              </Link>
            </div>
            <p className="mt-5 text-sm leading-6 text-[var(--muted)]">
              We are not a law firm and do not provide legal advice.
            </p>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-3xl border border-white bg-white shadow-[0_24px_90px_rgba(7,24,39,0.14)]">
              <div className="h-[430px] bg-[linear-gradient(180deg,rgba(7,24,39,0.02),rgba(7,24,39,0.16)),url('https://images.unsplash.com/photo-1560264280-88b68371db39?auto=format&fit=crop&w=1400&q=82')] bg-cover bg-center lg:h-[500px]" />
            </div>
            <div className="absolute -bottom-7 left-5 right-5 rounded-[1.4rem] border border-white/80 bg-white/95 p-5 shadow-[0_20px_60px_rgba(7,24,39,0.14)] ring-1 ring-[rgba(216,226,234,0.8)] backdrop-blur">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--pale-blue)] text-[var(--mid-blue)]">
                  <MapPin className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="text-sm font-semibold text-[var(--navy)]">
                    Serving Kidderminster and Wyre Forest
                  </p>
                  <p className="mt-1 text-sm leading-6 text-[var(--muted)]">
                    Built for local legal enquiries, comparison, and transparent
                    solicitor partner introductions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-8 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 rounded-[1.5rem] border border-[var(--border)] bg-white p-4 shadow-[0_18px_55px_rgba(7,24,39,0.06)] sm:grid-cols-2 lg:grid-cols-4">
          {trustItems.map((item) => {
            const Icon = item.icon;

            return (
              <article key={item.title} className="flex gap-3 rounded-2xl p-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--pale-blue)] text-[var(--mid-blue)]">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <h2 className="text-sm font-extrabold text-[var(--navy)]">
                    {item.title}
                  </h2>
                  <p className="mt-1 text-xs leading-5 text-[var(--muted)]">
                    {item.text}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section id="quote" className="bg-white px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase text-[var(--mid-blue)]">
              Start here
            </p>
            <h2 className="mt-3 text-4xl font-extrabold leading-tight text-[var(--navy)]">
              Request a no obligation quote
            </h2>
            <p className="mt-5 text-base leading-8 text-[var(--muted)]">
              Submit your enquiry and we&apos;ll connect you with a suitable
              solicitor partner. You are under no obligation to instruct them.
            </p>
          </div>
          <div className="mt-8">
            <QuoteForm />
          </div>
        </div>
      </section>

      <section id="services" className="bg-[var(--cream)] px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase text-[var(--mid-blue)]">
                Services for you
              </p>
              <h2 className="mt-3 max-w-3xl text-4xl font-extrabold leading-tight text-[var(--navy)]">
                Compare solicitor services in Kidderminster.
              </h2>
              <p className="mt-5 text-base leading-8 text-[var(--muted)]">
                Choose the category that best matches your enquiry and compare
                what to ask before choosing a solicitor firm.
              </p>
            </div>
            <Link
              href="/conveyancing-solicitors-kidderminster/"
              className="inline-flex items-center gap-2 text-sm font-extrabold uppercase text-[var(--trust-blue)] transition hover:text-[var(--mid-blue)]"
            >
              View service guides
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {servicePages.slice(0, 8).map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-24 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div className="rounded-[2rem] bg-[linear-gradient(135deg,var(--navy),var(--trust-blue))] p-8 text-white shadow-[0_24px_80px_rgba(7,24,39,0.16)] lg:p-10">
            <p className="text-sm font-extrabold uppercase text-[var(--gold)]">
              Why use this site
            </p>
            <h2 className="mt-4 text-4xl font-extrabold leading-tight">
              Why use an independent local guide?
            </h2>
            <p className="mt-5 text-base leading-8 text-white/76">
              Save time contacting multiple firms individually. Tell us what
              legal help you need and we may connect you with a suitable
              solicitor partner based on your enquiry.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {benefitCards.map((card) => {
              const Icon = card.icon;

              return (
                <article
                  key={card.title}
                  className="rounded-[1.5rem] border border-[var(--border)] bg-white p-6 shadow-[0_18px_55px_rgba(7,24,39,0.07)]"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--pale-blue)] text-[var(--mid-blue)]">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-5 text-xl font-extrabold text-[var(--navy)]">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                    {card.text}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <HowItWorks />

      <section className="bg-[var(--pale-blue)] px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-white bg-white/70 p-8 shadow-[0_20px_70px_rgba(7,24,39,0.08)] lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase text-[var(--mid-blue)]">
                Local area
              </p>
              <h2 className="mt-3 text-4xl font-extrabold leading-tight text-[var(--navy)]">
                Serving Kidderminster and the wider Wyre Forest area.
              </h2>
            </div>
            <p className="text-base leading-8 text-[var(--muted)]">
              We help local residents and businesses compare solicitor services
              and request suitable introductions across Kidderminster, Stourport,
              Bewdley, Cookley, Hagley, and nearby Worcestershire communities.
              The focus is practical local relevance, transparent comparison,
              and no-pressure quote requests.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase text-[var(--mid-blue)]">
            What users can expect
          </p>
          <h2 className="mt-3 text-4xl font-extrabold leading-tight text-[var(--navy)]">
            No fake reviews. Just a clear process.
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {expectationCards.map((card, index) => (
              <article
                key={card.title}
                className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--cream)] p-7 shadow-[0_18px_55px_rgba(7,24,39,0.06)]"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[var(--mid-blue)] shadow-sm">
                  <SearchCheck className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-5 text-xl font-extrabold text-[var(--navy)]">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                  {card.text}
                </p>
                <p className="mt-5 text-xs font-extrabold uppercase text-[var(--gold)]">
                  0{index + 1}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--cream)] px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between gap-5">
            <div>
              <p className="text-sm font-semibold uppercase text-[var(--mid-blue)]">
                Legal guides
              </p>
              <h2 className="mt-3 text-4xl font-extrabold leading-tight text-[var(--navy)]">
                Local guides and solicitor comparisons.
              </h2>
            </div>
            <BookOpenText className="hidden h-10 w-10 text-[var(--gold)] sm:block" />
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {servicePages.slice(0, 3).map((service) => (
              <Link
                key={service.slug}
                href={`/${service.slug}/`}
                className="rounded-[1.5rem] border border-[var(--border)] bg-white p-7 shadow-[0_18px_55px_rgba(7,24,39,0.06)] transition hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(7,24,39,0.1)]"
              >
                <p className="text-xs font-semibold uppercase text-[var(--mid-blue)]">
                  Guide
                </p>
                <h3 className="mt-3 text-xl font-extrabold text-[var(--navy)]">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                  {service.summary}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-[var(--trust-blue)]">
                  Read more
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[linear-gradient(135deg,var(--trust-blue),var(--navy))] px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mx-auto max-w-2xl text-center text-white">
            <p className="text-sm font-semibold uppercase text-[var(--gold)]">
              Speak to a solicitor partner
            </p>
            <h2 className="mt-3 text-4xl font-extrabold">
              Request a no obligation quote
            </h2>
            <p className="mt-5 text-base leading-8 text-white/75">
              Tell us what legal help you need and we&apos;ll connect you with a
              suitable solicitor partner where appropriate.
            </p>
          </div>
          <div className="mt-8">
            <QuoteForm />
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-24 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.78fr_1.22fr]">
          <div className="min-w-0">
            <p className="text-sm font-semibold uppercase text-[var(--mid-blue)]">
              FAQs
            </p>
            <h2 className="mt-3 text-4xl font-extrabold leading-tight text-[var(--navy)]">
              Common questions before requesting a quote.
            </h2>
            <p className="mt-5 text-base leading-8 text-[var(--muted)]">
              Clear answers about how the introduction process works and what
              you are agreeing to.
            </p>
          </div>
          <div className="faq-panel grid min-w-0 gap-4 rounded-[2rem] border border-[var(--border)] bg-[var(--pale-blue)] p-4 shadow-[0_22px_70px_rgba(7,24,39,0.08)]">
            {[
              [
                "Is KidderminsterSolicitors.co.uk a law firm?",
                "No. It is an independent local information and solicitor comparison website.",
              ],
              [
                "What happens when I submit the form?",
                "We review your enquiry and may pass it to a suitable solicitor firm or legal service provider who can contact you directly.",
              ],
              [
                "Do I have to instruct a solicitor introduced through this site?",
                "No. You are under no obligation to instruct any firm introduced through this website.",
              ],
            ].map(([question, answer]) => (
              <details
                key={question}
                className="faq-item group rounded-2xl border border-[var(--border)] bg-white p-6 transition open:shadow-[0_16px_45px_rgba(7,24,39,0.08)]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-extrabold text-[var(--navy)]">
                  <span className="min-w-0">{question}</span>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--cream)] text-[var(--gold)] transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                  {answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([websiteSchema, guideOrganizationSchema]),
        }}
      />
    </main>
  );
}
