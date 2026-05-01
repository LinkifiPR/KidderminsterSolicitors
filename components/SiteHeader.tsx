import Link from "next/link";
import { Scale } from "lucide-react";
import { servicePages, trustPages } from "../lib/site";

export function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-20 border-b border-white/12 bg-[rgba(7,24,39,0.62)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 sm:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-[var(--gold)]">
            <Scale className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="text-sm font-semibold uppercase text-white">
            Kidderminster Solicitors
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-6 text-sm text-white/78 lg:flex"
        >
          <Link href={`/${servicePages[0].slug}/`}>Conveyancing</Link>
          <Link href={`/${servicePages[1].slug}/`}>Probate</Link>
          <Link href={`/${servicePages[2].slug}/`}>Family law</Link>
          <Link href={`/${trustPages[0].slug}/`}>About</Link>
        </nav>

        <Link
          href="/#quote"
          className="rounded-full bg-[var(--gold)] px-5 py-3 text-xs font-bold uppercase text-[var(--navy)] transition hover:bg-[#d9ba78]"
        >
          Get a quote
        </Link>
      </div>
    </header>
  );
}
