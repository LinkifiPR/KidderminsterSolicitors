import { QuoteForm } from "../components/QuoteForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--cream)]">
      <section className="relative isolate overflow-hidden bg-[var(--navy)] px-5 py-6 text-white sm:px-8">
        <div className="absolute inset-0 -z-20 bg-[url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=2200&q=80')] bg-cover bg-center opacity-40" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgba(7,24,39,0.94),rgba(7,24,39,0.74)_48%,rgba(7,24,39,0.48))]" />
        <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-7xl flex-col">
        <nav
          aria-label="Site"
          className="flex items-center justify-between gap-4 border-b border-white/15 pb-5"
        >
          <span className="text-sm font-semibold uppercase text-white">
            Kidderminster Solicitors
          </span>
          <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white">
            Independent local guide
          </span>
        </nav>

        <div className="grid flex-1 items-center gap-12 py-14 lg:grid-cols-[1.02fr_0.98fr] lg:py-20">
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

          <QuoteForm />
        </div>

        <footer className="flex flex-col gap-3 border-t border-white/15 pt-5 text-sm text-white/64 sm:flex-row sm:items-center sm:justify-between">
          <span>Serving Kidderminster and the wider Wyre Forest area.</span>
          <span>Featured firms may have a commercial relationship with us.</span>
        </footer>
        </div>
      </section>
    </main>
  );
}
