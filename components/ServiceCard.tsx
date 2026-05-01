import Link from "next/link";
import {
  BriefcaseBusiness,
  FileSignature,
  HeartHandshake,
  Home,
  KeyRound,
  Landmark,
  ScrollText,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { ServicePage } from "../lib/site";

const iconMap: Record<string, LucideIcon> = {
  Conveyancing: Home,
  Probate: Landmark,
  "Family Law": HeartHandshake,
  Divorce: Users,
  Wills: FileSignature,
  Employment: ShieldCheck,
  "Personal Injury": ScrollText,
  "Commercial Law": BriefcaseBusiness,
  "Landlord Tenant": KeyRound,
};

const imageMap: Record<string, string> = {
  Conveyancing:
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=900&q=80",
  Probate:
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=900&q=80",
  "Family Law":
    "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=900&q=80",
  Divorce:
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80",
  Wills:
    "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=900&q=80",
  Employment:
    "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80",
  "Personal Injury":
    "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80",
  "Commercial Law":
    "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=900&q=80",
  "Landlord Tenant":
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
};

export function ServiceCard({ service }: { service: ServicePage }) {
  const Icon = iconMap[service.category] || ScrollText;

  return (
    <Link
      href={`/${service.slug}/`}
      className="group overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-[0_18px_55px_rgba(7,24,39,0.08)] transition hover:-translate-y-1 hover:border-[var(--mid-blue)]"
    >
      <div
        className="h-40 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(7,24,39,0.08), rgba(7,24,39,0.08)), url('${imageMap[service.category]}')`,
        }}
      />
      <div className="p-6">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--pale-blue)] text-[var(--mid-blue)]">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <h3 className="mt-5 text-xl font-semibold text-[var(--navy)]">
          {service.category}
        </h3>
        <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
          {service.summary}
        </p>
        <span className="mt-6 inline-flex text-sm font-semibold text-[var(--trust-blue)]">
          Compare options
          <span
            className="ml-2 transition group-hover:translate-x-1"
            aria-hidden="true"
          >
            -&gt;
          </span>
        </span>
      </div>
    </Link>
  );
}
