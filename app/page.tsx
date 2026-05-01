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

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--cream)]">
      <SiteHeader />
      <section className="relative isolate overflow-hidden bg-[var(--navy)] px-5 pb-12 pt-28 text-white sm:px-8 lg:min-h-screen">
        <div className="absolute inset-0 -z-20 bg-[url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=2200&q=80')] bg-cover bg-center opacity-40" />
        <div className="hero-motion absolute inset-0 -z-10 opacity-30" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgba(7,24,39,0.94),rgba(7,24,39,0.74)_48%,rgba(7,24,39,0.48))]" />
        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="max-w-4xl">
            <p className="mb-5 text-sm font-semibold uppercase text-[var(--gold)]">
              Premium local legal comparison
            </p>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] text-white sm:text-6xl lg:text-7xl">
              Find trusted solicitors in Kidderminster
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/78 sm:text-xl">
              Compare local legal services and request a no obligation quote
              from a trusted solicitor partner.
            </p>
            <div className="mt-9 grid max-w-2xl gap-3 text-sm text-white/78 sm:grid-cols-3">
              <span className="rounded-full border border-white/15 bg-white/10 px-4 py-3">
                Independent local guide
              </span>
              <span className="rounded-full border border-white/15 bg-white/10 px-4 py-3">
                Clear referral disclosure
              </span>
              <span className="rounded-full border border-white/15 bg-white/10 px-4 py-3">
                Custom Kit lead routing
              </span>
            </div>
            <p className="mt-7 max-w-2xl text-sm leading-6 text-white/64">
              Independent legal information site. We are not a law firm and do
              not provide legal advice.
            </p>
          </div>

          <div id="quote">
          <QuoteForm />
          </div>
        </div>

        <div className="mx-auto mt-12 grid max-w-7xl gap-3 border-t border-white/15 pt-5 text-sm text-white/64 sm:grid-cols-3">
          <span>Serving Kidderminster and the wider Wyre Forest area.</span>
          <span>Transparent referral and advertising disclosure.</span>
          <span>Powered by custom forms routed into Kit.</span>
        </div>
      </section>

      <section className="bg-white px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="text-sm font-semibold uppercase text-[var(--gold)]">
                Popular solicitor services
              </p>
              <h2 className="mt-3 text-4xl font-semibold text-[var(--navy)]">
                Compare local solicitor services in Kidderminster.
              </h2>
              <p className="mt-5 text-base leading-8 text-[var(--muted)]">
                Start with the area of law that best matches your enquiry. Each
                page keeps the comparison angle clear and includes a quote route
                with disclosure.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {servicePages.slice(0, 6).map((service) => (
                <ServiceCard key={service.slug} service={service} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <FeaturedPartner />
      <HowItWorks />

      <section className="bg-white px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="text-sm font-semibold uppercase text-[var(--gold)]">
              Local trust
            </p>
            <h2 className="mt-3 text-4xl font-semibold text-[var(--navy)]">
              Built for Kidderminster, not as a fake solicitor office.
            </h2>
          </div>
          <div className="space-y-5 text-base leading-8 text-[var(--muted)]">
            <p>
              This project is designed for organic rankings, local comparison
              content, and transparent lead capture. It should not be represented
              as a solicitor practice, regulated legal provider, or fake local
              business location.
            </p>
            <p>
              Every commercial placement should be disclosed, and users should
              verify the credentials, costs, and suitability of any firm before
              instructing them.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--cream)] px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-semibold uppercase text-[var(--gold)]">
            FAQs
          </p>
          <h2 className="mt-3 text-4xl font-semibold text-[var(--navy)]">
            Common questions before requesting a quote.
          </h2>
          <div className="mt-10 divide-y divide-[var(--line)] rounded-[1.5rem] border border-[var(--line)] bg-white">
            {[
              [
                "Is KidderminsterSolicitors.co.uk a law firm?",
                "No. It is an independent local information and solicitor comparison website.",
              ],
              [
                "What happens when I submit the form?",
                "Your enquiry is sent into Kit, tagged by category and town, and may be passed to a solicitor firm or legal service provider.",
              ],
              [
                "Do I have to use the featured solicitor partner?",
                "No. You are under no obligation to instruct any firm introduced through this website.",
              ],
            ].map(([question, answer]) => (
              <details key={question} className="group p-6">
                <summary className="cursor-pointer list-none text-lg font-semibold text-[var(--navy)]">
                  {question}
                </summary>
                <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                  {answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--navy)] px-5 py-20 text-white sm:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase text-[var(--gold)]">
            Ready to compare options?
          </p>
          <h2 className="mt-3 text-4xl font-semibold">
            Request a no obligation quote from a trusted solicitor partner.
          </h2>
          <a
            href="#quote"
            className="mt-8 inline-flex rounded-full bg-[var(--gold)] px-7 py-4 text-sm font-bold uppercase text-[var(--navy)]"
          >
            Get a no obligation quote
          </a>
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
