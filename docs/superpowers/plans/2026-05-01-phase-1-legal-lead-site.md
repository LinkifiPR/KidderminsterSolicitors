# Phase 1 Legal Lead Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the Phase 1 KidderminsterSolicitors.co.uk MVP as a premium, compliance-conscious legal guide and lead generation website backed by Kit.

**Architecture:** Use static-first Next.js pages driven by local TypeScript content/config. The homepage, service pages, and trust pages share premium components, quote forms submit to the existing `/api/leads` Kit integration, and SEO output is generated from the same content data.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS, Vitest, React Testing Library, Kit API.

---

## File Structure

- `lib/site.ts`: site constants, service page data, trust page data, partner data, SEO URLs.
- `lib/site.test.ts`: coverage for Phase 1 routes, disclosures, and schema-safe positioning.
- `components/SiteHeader.tsx`: shared navigation.
- `components/SiteFooter.tsx`: shared footer and disclaimer links.
- `components/ServiceCard.tsx`: premium service cards for homepage.
- `components/FeaturedPartner.tsx`: reusable featured partner disclosure block.
- `components/HowItWorks.tsx`: three-step process section.
- `app/page.tsx`: premium homepage with hero, quote form, service cards, partner block, guides, FAQs, final CTA.
- `app/[slug]/page.tsx`: static service and trust pages.
- `app/sitemap.ts`: sitemap for homepage, service pages, and trust pages.
- `app/robots.ts`: robots policy with sitemap URL.

## Tasks

### Task 1: Content Model

- [ ] Write failing tests for service routes, trust routes, disclosure copy, and schema-safe organization type.
- [ ] Implement `lib/site.ts`.
- [ ] Run focused tests until green.

### Task 2: Shared Components

- [ ] Build shared header, footer, cards, partner block, and process components.
- [ ] Reuse existing `QuoteForm` without Kit embeds.
- [ ] Keep page language clear that the site is not a law firm.

### Task 3: Pages

- [ ] Rebuild homepage around the Phase 1 visual flow.
- [ ] Add dynamic static pages for conveyancing, probate, family law, about, contact, privacy, terms, advertising disclosure, and editorial policy.
- [ ] Place quote forms on service pages and contact page.

### Task 4: SEO

- [ ] Add per-page metadata and canonical alternates.
- [ ] Add safe JSON-LD: `WebSite`, `Organization` for the guide owner, `FAQPage` for service pages. Do not mark the guide site as `LegalService`.
- [ ] Add sitemap and robots.

### Task 5: Verification

- [ ] Run `npm run lint`.
- [ ] Run `npm test`.
- [ ] Run `npm run build`.
- [ ] Start dev server and inspect the homepage visually.
- [ ] Commit and push.
