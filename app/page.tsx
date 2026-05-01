export default function Home() {
  return (
    <main className="min-h-screen px-5 py-6 sm:px-8">
      <section className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-6xl flex-col justify-between">
        <nav
          aria-label="Site"
          className="flex items-center justify-between gap-4 border-b border-[var(--line)] pb-5"
        >
          <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--green)]">
            Kidderminster Solicitors
          </span>
          <span className="rounded-full border border-[var(--line)] bg-white px-4 py-2 text-sm font-medium text-[var(--muted)]">
            Coming soon
          </span>
        </nav>

        <div className="grid flex-1 items-center gap-12 py-14 lg:grid-cols-[1.08fr_0.92fr] lg:py-20">
          <div className="max-w-3xl">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.22em] text-[var(--gold)]">
              Independent legal information for Wyre Forest
            </p>
            <h1 className="text-5xl font-semibold leading-[1.02] text-[var(--foreground)] sm:text-6xl lg:text-7xl">
              Kidderminster solicitors, made easier to compare.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[var(--muted)] sm:text-xl">
              We are building an independent information site for local people
              who want to understand their options and request a no-obligation
              legal quote from a suitable solicitor in Kidderminster.
            </p>
          </div>

          <aside className="border-l-4 border-[var(--green)] bg-[var(--panel)] p-7 shadow-[0_24px_80px_rgba(23,33,27,0.12)] sm:p-9">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--plum)]">
              Launch focus
            </p>
            <ul className="mt-8 space-y-6 text-base leading-7 text-[var(--muted)]">
              <li>
                Clear guides for common legal services in and around
                Kidderminster.
              </li>
              <li>
                A simple quote request route once the full site is ready.
              </li>
              <li>
                Built as an information resource, not presented as a law firm.
              </li>
            </ul>
          </aside>
        </div>

        <footer className="flex flex-col gap-3 border-t border-[var(--line)] pt-5 text-sm text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
          <span>Serving Kidderminster and the wider Wyre Forest area.</span>
          <span>Local legal guidance project in development.</span>
        </footer>
      </section>
    </main>
  );
}
