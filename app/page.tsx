import Link from "next/link";
import {
  BadgeCheck,
  BookOpenText,
  FileCheck,
  Handshake,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { QuoteForm } from "../components/QuoteForm";
import { FeaturedPartner } from "../components/FeaturedPartner";
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
    text: "Clear information for people comparing solicitor services in Kidderminster.",
    icon: ShieldCheck,
  },
  {
    title: "Transparent referral disclosure",
    text: "Featured placement and commercial relationships are disclosed.",
    icon: FileCheck,
  },
  {
    title: "No obligation to instruct",
    text: "You remain free to choose whether any introduced firm is right for you.",
    icon: BadgeCheck,
  },
  {
    title: "Solicitor partner introductions",
    text: "A suitable solicitor firm or legal service provider may contact you directly.",
    icon: Handshake,
  },
];

const expectationCards = [
  {
    title: "Clear process",
    text: "A straightforward quote request with plain-language disclosure.",
  },
  {
    title: "No obligation quote",
    text: "You can compare your options without committing to instruct a firm.",
  },
  {
    title: "Local solicitor partner introduction",
    text: "Your enquiry may be passed to a relevant solicitor partner where appropriate.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <SiteHeader />

      <section className="bg-[var(--pale-blue)] px-5 py-14 sm:px-8 lg:py-18">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="text-sm font-semibold uppercase text-[var(--mid-blue)]">
              Independent local solicitor guide
            </p>
            <h1 className="mt-4 max-w-4xl text-5xl font-semibold leading-[1.04] text-[var(--navy)] sm:text-6xl">
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
                className="inline-flex justify-center rounded-full bg-[var(--gold)] px-6 py-4 text-sm font-bold uppercase text-[var(--navy)]"
              >
                Get a no obligation quote
              </Link>
              <Link
                href="#services"
                className="inline-flex justify-center rounded-full border border-[var(--border)] bg-white px-6 py-4 text-sm font-bold uppercase text-[var(--trust-blue)]"
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
              <div className="h-[430px] bg-[url('https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1400&q=80')] bg-cover bg-center" />
            </div>
            <div className="absolute -bottom-7 left-6 right-6 rounded-2xl border border-[var(--border)] bg-white p-5 shadow-[0_18px_55px_rgba(7,24,39,0.13)]">
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

      <section id="quote" className="bg-white px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase text-[var(--mid-blue)]">
              Start here
            </p>
            <h2 className="mt-3 text-4xl font-semibold text-[var(--navy)]">
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

      <section id="services" className="bg-[var(--cream)] px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase text-[var(--mid-blue)]">
                Services for you
              </p>
              <h2 className="mt-3 text-4xl font-semibold text-[var(--navy)]">
                Compare solicitor services in Kidderminster.
              </h2>
              <p className="mt-5 text-base leading-8 text-[var(--muted)]">
                Choose the category that best matches your enquiry and compare
                what to ask before choosing a solicitor firm.
              </p>
            </div>
            <Link
              href="/conveyancing-solicitors-kidderminster/"
              className="text-sm font-bold uppercase text-[var(--trust-blue)]"
            >
              View service guides
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {servicePages.slice(0, 8).map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-12 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 xl:grid-cols-4">
          {trustItems.map((item) => {
            const Icon = item.icon;

            return (
              <article key={item.title} className="rounded-2xl border border-[var(--border)] bg-white p-6">
                <Icon className="h-7 w-7 text-[var(--gold)]" aria-hidden />
                <h3 className="mt-5 text-lg font-semibold text-[var(--navy)]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                  {item.text}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <FeaturedPartner />
      <HowItWorks />

      <section className="bg-white px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-semibold uppercase text-[var(--mid-blue)]">
              Why use this guide
            </p>
            <h2 className="mt-3 text-4xl font-semibold text-[var(--navy)]">
              Local information with clear commercial disclosure.
            </h2>
          </div>
          <div className="space-y-5 text-base leading-8 text-[var(--muted)]">
            <p>
              This website is built around organic local search, helpful
              comparison content, and transparent solicitor partner
              introductions.
            </p>
            <p>
              We do not present the website as a solicitor practice, regulated
              legal provider, or fake local office. Users should verify the
              credentials, costs, and suitability of any firm before instructing
              them.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--pale-blue)] px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-semibold uppercase text-[var(--mid-blue)]">
                Local area
              </p>
              <h2 className="mt-3 text-4xl font-semibold text-[var(--navy)]">
                Serving Kidderminster and the wider Wyre Forest area.
              </h2>
            </div>
            <p className="text-base leading-8 text-[var(--muted)]">
              The guide is written for people looking for solicitor services in
              Kidderminster, Stourport, Bewdley, and nearby Worcestershire
              communities. It focuses on practical local intent rather than
              pretending to operate from a physical law firm office.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase text-[var(--mid-blue)]">
            What users can expect
          </p>
          <h2 className="mt-3 text-4xl font-semibold text-[var(--navy)]">
            No fake reviews. Just a clear process.
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {expectationCards.map((card) => (
              <article
                key={card.title}
                className="rounded-2xl border border-[var(--border)] bg-[var(--cream)] p-6"
              >
                <h3 className="text-xl font-semibold text-[var(--navy)]">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                  {card.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--cream)] px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between gap-5">
            <div>
              <p className="text-sm font-semibold uppercase text-[var(--mid-blue)]">
                Legal guides
              </p>
              <h2 className="mt-3 text-4xl font-semibold text-[var(--navy)]">
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
                className="rounded-2xl border border-[var(--border)] bg-white p-6"
              >
                <p className="text-xs font-semibold uppercase text-[var(--mid-blue)]">
                  Guide
                </p>
                <h3 className="mt-3 text-xl font-semibold text-[var(--navy)]">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                  {service.summary}
                </p>
                <span className="mt-6 inline-flex text-sm font-semibold text-[var(--trust-blue)]">
                  Read more
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--trust-blue)] px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mx-auto max-w-2xl text-center text-white">
            <p className="text-sm font-semibold uppercase text-[var(--gold)]">
              Speak to a solicitor partner
            </p>
            <h2 className="mt-3 text-4xl font-semibold">
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

      <section className="bg-white px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <p className="text-sm font-semibold uppercase text-[var(--mid-blue)]">
              FAQs
            </p>
            <h2 className="mt-3 text-4xl font-semibold text-[var(--navy)]">
              Common questions before requesting a quote.
            </h2>
            <p className="mt-5 text-base leading-8 text-[var(--muted)]">
              Clear answers about how the introduction process works and what
              you are agreeing to.
            </p>
          </div>
          <div className="faq-panel grid gap-4 rounded-[2rem] border border-[var(--border)] bg-[var(--pale-blue)] p-4 shadow-[0_22px_70px_rgba(7,24,39,0.08)]">
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
                "Do I have to use the featured solicitor partner?",
                "No. You are under no obligation to instruct any firm introduced through this website.",
              ],
            ].map(([question, answer]) => (
              <details
                key={question}
                className="faq-item group rounded-2xl border border-[var(--border)] bg-white p-5 transition open:shadow-[0_16px_45px_rgba(7,24,39,0.08)]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold text-[var(--navy)]">
                  <span>{question}</span>
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
