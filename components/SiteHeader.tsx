import Link from "next/link";
import { Phone, Scale } from "lucide-react";
import { servicePages, trustPages } from "../lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[rgba(7,24,39,0.1)] bg-white/95 shadow-[0_14px_42px_rgba(7,24,39,0.08)] backdrop-blur">
      <div className="bg-[linear-gradient(90deg,var(--navy),var(--trust-blue))] px-5 py-2 text-[0.74rem] text-white/82 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
          <span className="font-semibold text-white">Independent local solicitor guide</span>
          <span className="hidden md:inline">Serving Kidderminster and the Wyre Forest area</span>
          <Link href="/#quote" className="font-bold text-[var(--gold)] transition hover:text-white">
            Get a no obligation quote
          </Link>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:py-5">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--navy)] text-[var(--gold)] shadow-[0_10px_26px_rgba(7,24,39,0.18)]">
            <Scale className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="brand-wordmark max-w-[10rem] text-sm font-extrabold uppercase leading-tight text-[var(--navy)] sm:max-w-none">
            Kidderminster Solicitors
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--pale-blue)]/60 p-1 text-sm font-semibold text-[var(--charcoal)] xl:flex"
        >
          {[
            ["Conveyancing", `/${servicePages[0].slug}/`],
            ["Probate", `/${servicePages[1].slug}/`],
            ["Family law", `/${servicePages[2].slug}/`],
            ["Wills", `/${servicePages[4].slug}/`],
            ["Employment", `/${servicePages[5].slug}/`],
            ["Guides", "/legal-guides/"],
            ["About", `/${trustPages[0].slug}/`],
            ["Contact", `/${trustPages[1].slug}/`],
          ].map(([label, href]) => (
            <Link
              key={label}
              href={href}
              className="whitespace-nowrap rounded-full px-4 py-2 transition hover:bg-white hover:text-[var(--trust-blue)] hover:shadow-sm"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <Link
            href="/contact/"
            className="hidden items-center gap-2 whitespace-nowrap text-sm font-bold text-[var(--trust-blue)] transition hover:text-[var(--navy)] lg:flex"
          >
            <Phone className="h-4 w-4" aria-hidden />
            Need help?
          </Link>
          <Link
            href="/#quote"
            className="whitespace-nowrap rounded-full bg-[var(--gold)] px-6 py-3 text-xs font-extrabold uppercase text-[var(--navy)] shadow-[0_12px_26px_rgba(198,161,91,0.28)] transition hover:-translate-y-0.5 hover:bg-[#d9ba78] hover:shadow-[0_16px_32px_rgba(198,161,91,0.36)]"
          >
            Get a quote
          </Link>
        </div>
      </div>
    </header>
  );
}
