import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { QuoteForm } from "../../components/QuoteForm";
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
      <section className="relative isolate overflow-hidden bg-[var(--pale-blue)] px-5 pb-16 pt-12 sm:px-8">
        <div className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-white" />
        <div className="mx-auto grid max-w-7xl gap-10 rounded-[2rem] border border-[var(--border)] bg-white p-6 shadow-[0_26px_90px_rgba(7,24,39,0.1)] sm:p-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="self-center">
            <p className="text-sm font-semibold uppercase text-[var(--gold)]">
              {isService ? "Solicitor comparison guide" : "Trust and disclosure"}
            </p>
            <h1 className="mt-4 max-w-4xl text-5xl font-semibold leading-[1.04] text-[var(--navy)] sm:text-6xl">
              {page.h1}
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[var(--muted)]">
              {page.metaDescription}
            </p>
            <p className="mt-6 max-w-2xl text-sm leading-6 text-[var(--muted)]">
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
              <div className="min-w-0">
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

          <section className="bg-white px-5 py-20 sm:px-8">
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.85fr]">
              <div>
                <p className="text-sm font-semibold uppercase text-[var(--gold)]">
                  FAQs
                </p>
                <h2 className="mt-3 text-4xl font-semibold text-[var(--navy)]">
                  Questions about {page.category.toLowerCase()} enquiries.
                </h2>
                <div className="faq-panel mt-8 grid min-w-0 gap-4 rounded-[2rem] border border-[var(--border)] bg-[var(--pale-blue)] p-4 shadow-[0_22px_70px_rgba(7,24,39,0.08)]">
                  {page.faq.map((item) => (
                    <details
                      key={item.question}
                      className="faq-item group rounded-2xl border border-[var(--border)] bg-white p-5 transition open:shadow-[0_16px_45px_rgba(7,24,39,0.08)]"
                    >
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold text-[var(--navy)]">
                        <span className="min-w-0">{item.question}</span>
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--cream)] text-[var(--gold)] transition group-open:rotate-45">
                          +
                        </span>
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
