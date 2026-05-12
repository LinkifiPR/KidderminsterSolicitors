import { QuoteForm } from "./QuoteForm";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import {
  buildFaqSchema,
  buildGuidePath,
  buildPagePath,
  getMoreGuidesInCategory,
  getRelatedServicesForPage,
  guidePages,
  parseInlineInternalLinks,
  servicePages,
  type SitePage,
} from "../lib/site";

function buildSectionId(heading: string) {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function LinkedParagraph({ text }: { text: string }) {
  return (
    <p>
      {parseInlineInternalLinks(text).map((segment, index) =>
        segment.type === "link" ? (
          <a
            key={`${segment.slug}-${index}`}
            href={segment.href}
            className="font-semibold text-[var(--trust-blue)] underline decoration-[rgba(198,161,91,0.55)] underline-offset-4 transition hover:text-[var(--mid-blue)]"
          >
            {segment.text}
          </a>
        ) : (
          <span key={`text-${index}`}>{segment.text}</span>
        ),
      )}
    </p>
  );
}

function QuoteHeroPrompt({ category }: { category: string }) {
  return (
    <aside className="mx-auto w-full max-w-[27rem] rounded-[1.35rem] border border-white/80 bg-white shadow-[0_18px_60px_rgba(7,24,39,0.12)] ring-1 ring-[rgba(198,161,91,0.22)] lg:mx-0">
      <div className="rounded-t-[1.35rem] bg-[linear-gradient(135deg,var(--navy),var(--trust-blue))] p-5 text-white">
        <p className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[0.64rem] font-bold uppercase tracking-[0.12em] text-[var(--gold)]">
          Start here
        </p>
        <h2 className="mt-3 text-2xl font-semibold leading-tight">
          Request a no obligation quote
        </h2>
        <p className="mt-2 text-sm leading-6 text-white/78">
          Tell us what you need and we&apos;ll connect you with a suitable
          solicitor partner where appropriate.
        </p>
      </div>

      <div className="grid gap-4 p-5">
        <div className="grid gap-2 text-sm leading-6 text-[var(--muted)]">
          {[
            `${category} enquiry`,
            "No obligation to instruct",
            "Independent local guide",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-2.5 w-2.5 rounded-full bg-[var(--gold)]"
              />
              <span>{item}</span>
            </div>
          ))}
        </div>

        <a
          href="#quote"
          className="inline-flex items-center justify-center rounded-full bg-[var(--gold)] px-5 py-3 text-sm font-extrabold uppercase text-[var(--navy)] shadow-[0_12px_28px_rgba(198,161,91,0.3)] transition hover:-translate-y-0.5 hover:bg-[#d8b66f]"
        >
          Complete the quote form
        </a>

        <p className="text-xs leading-5 text-[var(--muted)]">
          The full enquiry form is below. We are not a law firm and do not
          provide legal advice.
        </p>
      </div>
    </aside>
  );
}

export function ContentPageView({ page }: { page: SitePage }) {
  const isService = page.type === "service";
  const isGuide = page.type === "guide";
  const hasQuoteForm = isService || page.slug === "contact";
  const relatedServiceLinks =
    page.type !== "trust" ? getRelatedServicesForPage(page) : [];
  const relatedService =
    isGuide && servicePages.find((service) => service.slug === page.relatedServiceSlug);
  const relatedGuides = isGuide
    ? page.relatedGuideSlugs
        .map((guideSlug) => guidePages.find((guide) => guide.slug === guideSlug))
        .filter((guide): guide is (typeof guidePages)[number] => Boolean(guide))
    : [];
  const moreGuidesInTopic = isGuide ? getMoreGuidesInCategory(page) : [];
  const relatedServiceGuides = isService
    ? (page.relatedGuideSlugs ?? [])
        .map((guideSlug) => guidePages.find((guide) => guide.slug === guideSlug))
        .filter((guide): guide is (typeof guidePages)[number] => Boolean(guide))
    : [];

  return (
    <main className="min-h-screen bg-[var(--cream)]">
      <SiteHeader />
      <section className="relative isolate overflow-hidden bg-[var(--pale-blue)] px-5 pb-16 pt-12 sm:px-8">
        <div className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-white" />
        <div className="mx-auto grid max-w-7xl gap-8 rounded-[2rem] border border-[var(--border)] bg-white p-6 shadow-[0_26px_90px_rgba(7,24,39,0.1)] sm:p-10 lg:grid-cols-[1.18fr_0.82fr] lg:items-start">
          <div className="self-center">
            <p className="text-sm font-semibold uppercase text-[var(--gold)]">
              {isService
                ? "Solicitor comparison guide"
                : isGuide
                  ? "Local legal guide"
                  : "Trust and disclosure"}
            </p>
            <h1 className="mt-4 max-w-4xl text-5xl font-semibold leading-[1.04] text-[var(--navy)] sm:text-6xl">
              {page.h1}
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[var(--muted)]">
              {isGuide ? page.intro : page.metaDescription}
            </p>
            {isGuide ? (
              <p className="mt-5 text-sm font-semibold uppercase text-[var(--trust-blue)]">
                Updated {new Date(page.updated).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            ) : null}
            <p className="mt-6 max-w-2xl text-sm leading-6 text-[var(--muted)]">
              Independent local guide. We are not a law firm and do not provide
              legal advice.
            </p>
          </div>

          {hasQuoteForm ? (
            <div id={isService ? undefined : "quote"} className="lg:justify-self-end">
              {isService ? (
                <QuoteHeroPrompt category={page.category} />
              ) : (
                <QuoteForm variant="compact" />
              )}
            </div>
          ) : isGuide && relatedService ? (
            <div className="self-center rounded-[2rem] border border-[var(--border)] bg-[var(--cream)] p-6 shadow-[0_22px_70px_rgba(7,24,39,0.08)]">
              <p className="text-sm font-semibold uppercase text-[var(--gold)]">
                Related service
              </p>
              <h2 className="mt-3 text-2xl font-extrabold text-[var(--navy)]">
                {relatedService.h1}
              </h2>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                {relatedService.summary}
              </p>
              <a
                href={`/${relatedService.slug}/#quote`}
                className="mt-6 inline-flex rounded-full bg-[var(--gold)] px-5 py-3 text-sm font-extrabold uppercase text-[var(--navy)] transition hover:bg-[#d9ba78]"
              >
                Request a quote
              </a>
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

          {page.keyTakeaways?.length || page.sections?.length ? (
            <section className="bg-[var(--cream)] px-5 py-20 sm:px-8">
              <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.72fr_1.28fr]">
                {page.keyTakeaways?.length ? (
                  <aside className="lg:sticky lg:top-28 lg:self-start">
                    <div className="rounded-[2rem] border border-[var(--border)] bg-white p-6 shadow-[0_18px_60px_rgba(7,24,39,0.08)]">
                      <p className="text-sm font-extrabold uppercase text-[var(--gold)]">
                        Key takeaways
                      </p>
                      <ul className="mt-5 grid gap-4 text-sm leading-7 text-[var(--navy)]">
                        {page.keyTakeaways.map((takeaway) => (
                          <li key={takeaway} className="flex gap-3">
                            <span
                              aria-hidden="true"
                              className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--gold)]"
                            />
                            <span>{takeaway}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </aside>
                ) : null}

                {page.sections?.length ? (
                  <div className="rounded-[2rem] border border-[var(--border)] bg-white p-7 shadow-[0_26px_90px_rgba(7,24,39,0.08)] sm:p-10">
                    <div className="space-y-10">
                      {page.sections.map((section) => (
                        <section key={section.heading}>
                          <h2 className="text-3xl font-extrabold text-[var(--navy)]">
                            {section.heading}
                          </h2>
                          <div className="mt-4 space-y-4 text-base leading-8 text-[var(--muted)]">
                            {section.body.map((paragraph, index) => (
                              <LinkedParagraph
                                key={`${section.heading}-${index}`}
                                text={paragraph}
                              />
                            ))}
                          </div>
                        </section>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </section>
          ) : null}

          {relatedServiceGuides.length ? (
            <section className="bg-white px-5 py-20 sm:px-8">
              <div className="mx-auto max-w-7xl">
                <p className="text-sm font-semibold uppercase text-[var(--gold)]">
                  Related guides
                </p>
                <h2 className="mt-3 text-4xl font-semibold text-[var(--navy)]">
                  Learn more before requesting a quote.
                </h2>
                <div className="mt-8 grid gap-5 md:grid-cols-3">
                  {relatedServiceGuides.map((guide) => (
                    <a
                      key={guide.slug}
                      href={buildGuidePath(guide.slug)}
                      className="rounded-2xl border border-[var(--border)] bg-[var(--pale-blue)] p-6 transition hover:-translate-y-1 hover:border-[var(--mid-blue)] hover:bg-white hover:shadow-[0_18px_45px_rgba(7,24,39,0.1)]"
                    >
                      <p className="text-xs font-extrabold uppercase text-[var(--gold)]">
                        {guide.category}
                      </p>
                      <h3 className="mt-3 text-xl font-extrabold leading-7 text-[var(--navy)]">
                        {guide.h1}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                        {guide.metaDescription}
                      </p>
                    </a>
                  ))}
                </div>
              </div>
            </section>
          ) : null}

          {relatedServiceLinks.length ? (
            <section className="bg-[var(--pale-blue)] px-5 py-20 sm:px-8">
              <div className="mx-auto max-w-7xl">
                <p className="text-sm font-semibold uppercase text-[var(--gold)]">
                  Related solicitor services
                </p>
                <h2 className="mt-3 max-w-3xl text-4xl font-semibold text-[var(--navy)]">
                  Compare connected legal support in Kidderminster.
                </h2>
                <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                  {relatedServiceLinks.map((service) => (
                    <a
                      key={service.slug}
                      href={buildPagePath(service)}
                      className="rounded-2xl border border-[var(--border)] bg-white p-6 transition hover:-translate-y-1 hover:border-[var(--mid-blue)] hover:shadow-[0_18px_45px_rgba(7,24,39,0.1)]"
                    >
                      <p className="text-xs font-extrabold uppercase text-[var(--gold)]">
                        {service.category}
                      </p>
                      <h3 className="mt-3 text-xl font-extrabold leading-7 text-[var(--navy)]">
                        {service.h1}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                        {service.summary}
                      </p>
                    </a>
                  ))}
                </div>
              </div>
            </section>
          ) : null}

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
      ) : isGuide ? (
        <>
          <section className="bg-white px-5 py-20 sm:px-8">
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.7fr_1.3fr]">
              <aside className="lg:sticky lg:top-28 lg:self-start">
                <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--pale-blue)] p-6 shadow-[0_18px_60px_rgba(7,24,39,0.08)]">
                  <p className="text-sm font-semibold uppercase text-[var(--gold)]">
                    {page.category}
                  </p>
                  <h2 className="mt-3 text-3xl font-extrabold text-[var(--navy)]">
                    General information only.
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                    This guide is for general information. Kidderminster
                    Solicitors is not a law firm and does not provide legal
                    advice.
                  </p>
                  <div className="mt-6 rounded-3xl border border-white/70 bg-white/70 p-4">
                    <p className="text-xs font-extrabold uppercase text-[var(--gold)]">
                      On this page
                    </p>
                    <nav aria-label="Guide sections" className="mt-3 grid gap-2">
                      {page.sections.map((section) => (
                        <a
                          key={section.heading}
                          href={`#${buildSectionId(section.heading)}`}
                          className="text-sm font-semibold leading-6 text-[var(--trust-blue)] transition hover:text-[var(--mid-blue)]"
                        >
                          {section.heading}
                        </a>
                      ))}
                    </nav>
                  </div>
                  {relatedService ? (
                    <a
                      href={`/${relatedService.slug}/`}
                      className="mt-6 inline-flex rounded-full border border-[var(--border)] bg-white px-5 py-3 text-sm font-extrabold uppercase text-[var(--trust-blue)] transition hover:border-[var(--mid-blue)] hover:bg-[var(--cream)]"
                    >
                      Compare {relatedService.category}
                    </a>
                  ) : null}
                  {relatedServiceLinks.length ? (
                    <div className="mt-6 rounded-3xl border border-white/70 bg-white/70 p-4">
                      <p className="text-xs font-extrabold uppercase text-[var(--gold)]">
                        Related services
                      </p>
                      <nav
                        aria-label="Related solicitor services"
                        className="mt-3 grid gap-2"
                      >
                        {relatedServiceLinks.map((service) => (
                          <a
                            key={service.slug}
                            href={buildPagePath(service)}
                            className="rounded-2xl border border-[var(--border)] bg-white px-4 py-3 text-sm font-semibold leading-6 text-[var(--trust-blue)] transition hover:border-[var(--mid-blue)] hover:bg-[var(--cream)]"
                          >
                            {service.category}
                          </a>
                        ))}
                      </nav>
                    </div>
                  ) : null}
                </div>
              </aside>

              <article className="rounded-[2rem] border border-[var(--border)] bg-white p-7 shadow-[0_26px_90px_rgba(7,24,39,0.08)] sm:p-10">
                <section className="mb-10 rounded-[2rem] border border-[var(--border)] bg-[var(--pale-blue)] p-6">
                  <p className="text-sm font-extrabold uppercase text-[var(--gold)]">
                    Key takeaways
                  </p>
                  <ul className="mt-4 grid gap-3 text-base leading-7 text-[var(--navy)]">
                    {page.keyTakeaways.map((takeaway) => (
                      <li key={takeaway} className="flex gap-3">
                        <span
                          aria-hidden="true"
                          className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--gold)]"
                        />
                        <span>{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </section>
                <div className="space-y-10">
                  {page.sections.map((section) => (
                    <section
                      key={section.heading}
                      id={buildSectionId(section.heading)}
                      className="scroll-mt-32"
                    >
                      <h2 className="text-3xl font-extrabold text-[var(--navy)]">
                        {section.heading}
                      </h2>
                      <div className="mt-4 space-y-4 text-base leading-8 text-[var(--muted)]">
                        {section.body.map((paragraph, index) => (
                          <LinkedParagraph
                            key={`${section.heading}-${index}`}
                            text={paragraph}
                          />
                        ))}
                      </div>
                    </section>
                  ))}
                </div>

                {relatedGuides.length ? (
                  <section className="mt-12 border-t border-[var(--border)] pt-10">
                    <h2 className="text-3xl font-extrabold text-[var(--navy)]">
                      Related guides
                    </h2>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      {relatedGuides.map((guide) => (
                        <a
                          key={guide.slug}
                          href={buildGuidePath(guide.slug)}
                          className="rounded-2xl border border-[var(--border)] bg-[var(--pale-blue)] p-5 transition hover:-translate-y-1 hover:border-[var(--mid-blue)] hover:bg-white hover:shadow-[0_18px_45px_rgba(7,24,39,0.1)]"
                        >
                          <p className="text-xs font-extrabold uppercase text-[var(--gold)]">
                            {guide.category}
                          </p>
                          <h3 className="mt-2 text-lg font-extrabold leading-6 text-[var(--navy)]">
                            {guide.h1}
                          </h3>
                          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                            {guide.metaDescription}
                          </p>
                        </a>
                      ))}
                    </div>
                  </section>
                ) : null}

                {moreGuidesInTopic.length ? (
                  <section className="mt-12 border-t border-[var(--border)] pt-10">
                    <h2 className="text-3xl font-extrabold text-[var(--navy)]">
                      More guides in this topic
                    </h2>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      {moreGuidesInTopic.map((guide) => (
                        <a
                          key={guide.slug}
                          href={buildGuidePath(guide.slug)}
                          className="rounded-2xl border border-[var(--border)] bg-white p-5 transition hover:-translate-y-1 hover:border-[var(--mid-blue)] hover:bg-[var(--pale-blue)] hover:shadow-[0_18px_45px_rgba(7,24,39,0.1)]"
                        >
                          <p className="text-xs font-extrabold uppercase text-[var(--gold)]">
                            {guide.category}
                          </p>
                          <h3 className="mt-2 text-lg font-extrabold leading-6 text-[var(--navy)]">
                            {guide.h1}
                          </h3>
                          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                            {guide.metaDescription}
                          </p>
                        </a>
                      ))}
                    </div>
                  </section>
                ) : null}

                {page.faq?.length ? (
                  <section className="mt-12 border-t border-[var(--border)] pt-10">
                    <h2 className="text-3xl font-extrabold text-[var(--navy)]">
                      Common questions
                    </h2>
                    <div className="mt-6 grid gap-4">
                      {page.faq.map((item) => (
                        <details
                          key={item.question}
                          className="rounded-2xl border border-[var(--border)] bg-[var(--cream)] p-5"
                        >
                          <summary className="cursor-pointer text-lg font-semibold text-[var(--navy)]">
                            {item.question}
                          </summary>
                          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                            {item.answer}
                          </p>
                        </details>
                      ))}
                    </div>
                  </section>
                ) : null}
              </article>
            </div>
          </section>

          {page.faq?.length ? (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  mainEntity: page.faq.map((item) => ({
                    "@type": "Question",
                    name: item.question,
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: item.answer,
                    },
                  })),
                }),
              }}
            />
          ) : null}
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
