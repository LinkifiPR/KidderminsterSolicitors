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
      className="group overflow-hidden rounded-[1.5rem] border border-[rgba(216,226,234,0.9)] bg-white shadow-[0_18px_55px_rgba(7,24,39,0.08)] transition duration-200 hover:-translate-y-1.5 hover:border-[rgba(23,92,142,0.34)] hover:shadow-[0_26px_80px_rgba(7,24,39,0.12)]"
    >
      <div className="overflow-hidden">
        <div
          className="h-44 bg-cover bg-center transition duration-500 group-hover:scale-[1.03]"
          style={{
            backgroundImage: `linear-gradient(180deg,rgba(7,24,39,0.03),rgba(7,24,39,0.22)), url('${imageMap[service.category]}')`,
          }}
        />
      </div>
      <div className="relative z-10 bg-white p-6 pt-0">
        <span className="relative z-20 -mt-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-white bg-[var(--pale-blue)] text-[var(--mid-blue)] shadow-[0_12px_30px_rgba(7,24,39,0.12)]">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <h3 className="mt-5 text-xl font-extrabold text-[var(--navy)]">
          {service.category}
        </h3>
        <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
          {service.summary}
        </p>
        <span className="mt-6 inline-flex items-center text-sm font-extrabold text-[var(--trust-blue)]">
          Compare options
          <span
            className="ml-2 transition group-hover:translate-x-1"
            aria-hidden="true"
          >
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
