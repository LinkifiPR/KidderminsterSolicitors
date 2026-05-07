import Link from "next/link";
import { Scale } from "lucide-react";
import { coreServiceSlugs, servicePages, trustPages } from "../lib/site";
import { CookieSettingsButton } from "./CookieSettingsButton";

const footerServices = coreServiceSlugs
  .slice(0, 6)
  .map((slug) => servicePages.find((page) => page.slug === slug))
  .filter((page): page is (typeof servicePages)[number] => Boolean(page));

export function SiteFooter() {
  return (
    <footer className="bg-[var(--navy)] px-5 py-14 text-white sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 border-b border-white/10 pb-10 lg:grid-cols-[1.35fr_0.8fr_0.8fr_0.8fr]">
        <div>
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[var(--navy)]">
              <Scale className="h-5 w-5" aria-hidden />
            </span>
            <span className="brand-wordmark text-sm font-extrabold uppercase text-white">
              Kidderminster Solicitors
            </span>
          </Link>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/68">
            Kidderminster Solicitors is an independent legal information and
            solicitor introduction website. We are not a law firm and do not
            provide legal advice.
          </p>
          <p className="mt-5 text-sm text-white/70">
            Contact: use the quote or contact form.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase text-white">Services</p>
          <div className="mt-4 grid gap-3 text-sm text-white/68">
            {footerServices.map((page) => (
              <Link
                key={page.slug}
                href={`/${page.slug}/`}
                className="transition hover:text-white"
              >
                {page.category}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase text-white">Company</p>
          <div className="mt-4 grid gap-3 text-sm text-white/68">
            {trustPages.slice(0, 2).map((page) => (
              <Link
                key={page.slug}
                href={`/${page.slug}/`}
                className="transition hover:text-white"
              >
                {page.h1}
              </Link>
            ))}
            <Link href="/#quote" className="transition hover:text-white">
              Get a quote
            </Link>
            <Link href="/legal-guides/" className="transition hover:text-white">
              Legal guides
            </Link>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase text-white">Legal</p>
          <div className="mt-4 grid gap-3 text-sm text-white/68">
            {trustPages.slice(2).map((page) => (
              <Link
                key={page.slug}
                href={`/${page.slug}/`}
                className="transition hover:text-white"
              >
                {page.h1}
              </Link>
            ))}
            <CookieSettingsButton />
          </div>
        </div>
      </div>
      <div className="mx-auto mt-8 flex max-w-7xl flex-col gap-3 text-xs leading-6 text-white/55 sm:flex-row sm:items-center sm:justify-between">
        <p>
          Solicitor firms and legal service providers are responsible for any
          advice they provide.
        </p>
        <p>© 2026 Kidderminster Solicitors.</p>
      </div>
    </footer>
  );
}
