import Link from "next/link";
import { Phone, Scale } from "lucide-react";
import { servicePages, trustPages } from "../lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-white/95 shadow-[0_10px_35px_rgba(7,24,39,0.08)] backdrop-blur">
      <div className="border-b border-[var(--border)] bg-[var(--pale-blue)] px-5 py-2 text-xs text-[var(--muted)] sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
          <span>Independent local solicitor guide</span>
          <span>Serving Kidderminster and the Wyre Forest area</span>
          <Link href="/#quote" className="font-semibold text-[var(--trust-blue)]">
            Get a no obligation quote
          </Link>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 sm:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--navy)] text-[var(--gold)]">
            <Scale className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="text-sm font-semibold uppercase text-[var(--navy)]">
            Kidderminster Solicitors
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-5 text-sm font-medium text-[var(--charcoal)] xl:flex"
        >
          <Link href={`/${servicePages[0].slug}/`}>Conveyancing</Link>
          <Link href={`/${servicePages[1].slug}/`}>Probate</Link>
          <Link href={`/${servicePages[2].slug}/`}>Family law</Link>
          <Link href={`/${servicePages[4].slug}/`}>Wills</Link>
          <Link href={`/${servicePages[5].slug}/`}>Employment</Link>
          <Link href={`/${trustPages[0].slug}/`}>About</Link>
          <Link href={`/${trustPages[1].slug}/`}>Contact</Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact/"
            className="hidden items-center gap-2 text-sm font-semibold text-[var(--trust-blue)] lg:flex"
          >
            <Phone className="h-4 w-4" aria-hidden />
            Contact
          </Link>
          <Link
            href="/#quote"
            className="rounded-full bg-[var(--gold)] px-5 py-3 text-xs font-bold uppercase text-[var(--navy)] transition hover:bg-[#d9ba78]"
          >
            Get a quote
          </Link>
        </div>
      </div>
    </header>
  );
}
