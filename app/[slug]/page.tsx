import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { QuoteForm } from "../../components/QuoteForm";
import { FeaturedPartner } from "../../components/FeaturedPartner";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import {
  buildCanonicalUrl,
  buildFaqSchema,
  getAllPageSlugs,
  getPageBySlug,
} from "../../lib/site";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getAllPageSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getPageBySlug(slug);

  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.metaDescription,
    alternates: {
      canonical: buildCanonicalUrl(page.slug),
    },
    openGraph: {
      title: page.title,
      description: page.metaDescription,
      url: buildCanonicalUrl(page.slug),
    },
  };
}

export default async function ContentPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getPageBySlug(slug);

  if (!page) {
    notFound();
  }

  const isService = page.type === "service";
  const hasQuoteForm = isService || page.slug === "contact";

  return (
    <main className="min-h-screen bg-[var(--cream)]">
      <SiteHeader />
      <section className="relative isolate overflow-hidden bg-[var(--navy)] px-5 pb-16 pt-32 text-white sm:px-8">
        <div className="absolute inset-0 -z-20 bg-[url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=2200&q=80')] bg-cover bg-center opacity-30" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgba(7,24,39,0.96),rgba(7,24,39,0.82)_54%,rgba(7,24,39,0.62))]" />
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="text-sm font-semibold uppercase text-[var(--gold)]">
              {isService ? "Solicitor comparison guide" : "Trust and disclosure"}
            </p>
            <h1 className="mt-4 max-w-4xl text-5xl font-semibold leading-[1.04] sm:text-6xl">
              {page.h1}
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/76">
              {page.metaDescription}
            </p>
            <p className="mt-6 max-w-2xl text-sm leading-6 text-white/64">
              Independent local guide. We are not a law firm and do not provide
              legal advice.
            </p>
          </div>

          {hasQuoteForm ? (
            <div id={isService ? undefined : "quote"}>
              <QuoteForm />
            </div>
          ) : null}
        </div>
      </section>

      {isService ? (
        <>
          <section className="bg-white px-5 py-20 sm:px-8">
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="text-sm font-semibold uppercase text-[var(--gold)]">
                  {page.category}
                </p>
                <h2 className="mt-3 text-4xl font-semibold text-[var(--navy)]">
                  What to compare before choosing a solicitor.
                </h2>
              </div>
              <div className="space-y-6 text-base leading-8 text-[var(--muted)]">
                <p>{page.intro}</p>
                <p>{page.localAngle}</p>
                <ul className="grid gap-4">
                  {page.comparisonPoints.map((point) => (
                    <li
                      key={point}
                      className="rounded-2xl border border-[var(--line)] bg-[var(--cream)] p-5"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <FeaturedPartner />

          <section className="bg-white px-5 py-20 sm:px-8">
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.85fr]">
              <div>
                <p className="text-sm font-semibold uppercase text-[var(--gold)]">
                  FAQs
                </p>
                <h2 className="mt-3 text-4xl font-semibold text-[var(--navy)]">
                  Questions about {page.category.toLowerCase()} enquiries.
                </h2>
                <div className="mt-8 divide-y divide-[var(--line)] rounded-[1.5rem] border border-[var(--line)]">
                  {page.faq.map((item) => (
                    <details key={item.question} className="p-6">
                      <summary className="cursor-pointer list-none text-lg font-semibold text-[var(--navy)]">
                        {item.question}
                      </summary>
                      <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                        {item.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
              <div id="quote" className="lg:sticky lg:top-24 lg:self-start">
                <QuoteForm />
              </div>
            </div>
          </section>

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(buildFaqSchema(page)),
            }}
          />
        </>
      ) : (
        <section className="bg-white px-5 py-20 sm:px-8">
          <div className="mx-auto max-w-4xl rounded-[2rem] border border-[var(--line)] bg-[var(--cream)] p-7 text-base leading-8 text-[var(--muted)] shadow-[0_30px_90px_rgba(7,24,39,0.08)] sm:p-10">
            {page.body.map((paragraph) => (
              <p key={paragraph} className="mb-5 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
        </section>
      )}

      {hasQuoteForm ? (
        <a
          href="#quote"
          className="fixed inset-x-4 bottom-4 z-30 rounded-full bg-[var(--gold)] px-5 py-4 text-center text-sm font-bold uppercase text-[var(--navy)] shadow-[0_18px_60px_rgba(7,24,39,0.28)] lg:hidden"
        >
          Request a quote
        </a>
      ) : null}
      <SiteFooter />
    </main>
  );
}
