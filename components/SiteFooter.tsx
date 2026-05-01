import Link from "next/link";
import { servicePages, trustPages } from "../lib/site";
import { CookieSettingsButton } from "./CookieSettingsButton";

export function SiteFooter() {
  return (
    <footer className="bg-[var(--navy)] px-5 py-12 text-white sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.25fr_0.75fr_0.75fr]">
        <div>
          <p className="text-sm font-semibold uppercase text-[var(--gold)]">
            Kidderminster Solicitors
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/68">
            Kidderminster Solicitors is an independent legal information and
            solicitor introduction website. We are not a law firm and do not
            provide legal advice. Solicitor firms and legal service providers
            are responsible for any advice they provide.
          </p>
          <p className="mt-5 text-sm text-white/70">Contact: use the quote or contact form.</p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase text-white">Services</p>
          <div className="mt-4 grid gap-3 text-sm text-white/68">
            {servicePages.slice(0, 5).map((page) => (
              <Link key={page.slug} href={`/${page.slug}/`}>
                {page.category}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase text-white">Trust</p>
          <div className="mt-4 grid gap-3 text-sm text-white/68">
            {trustPages.map((page) => (
              <Link key={page.slug} href={`/${page.slug}/`}>
                {page.h1}
              </Link>
            ))}
            <CookieSettingsButton />
          </div>
        </div>
      </div>
    </footer>
  );
}
