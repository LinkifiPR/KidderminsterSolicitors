# Kit Lead Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Connect the custom Kidderminster Solicitors quote form to Kit form `9391183` without using embedded Kit form UI.

**Architecture:** The browser submits to a Next.js API route. The API route validates the lead, creates or updates a Kit subscriber, adds the subscriber to the Kit form, creates or reuses semantic tags, applies those tags, and returns a safe success response. Kit automations can then send user, admin, and partner notifications from the form/tag entry points.

**Tech Stack:** Next.js App Router route handlers, React client form, TypeScript, Vitest, Kit API v4.

---

## File Structure

- `lib/leads.ts`: lead schema, validation, tag naming, Kit field mapping.
- `lib/kit.ts`: Kit API client for subscriber creation, form subscription, tag creation, and tag assignment.
- `app/api/leads/route.ts`: POST endpoint used by custom forms.
- `components/QuoteForm.tsx`: premium client-side quote form.
- `app/page.tsx`: homepage hero updated to render the custom quote form.
- `.env.example`: documents required server env vars without secrets.

## Tasks

### Task 1: Lead Model

- [ ] Write failing tests for lead validation and tag creation.
- [ ] Implement `lib/leads.ts` with required fields, GDPR/disclosure checks, source attribution, and Kit field mapping.
- [ ] Run focused tests until green.

### Task 2: Kit Client

- [ ] Write failing tests that mock `fetch` and verify calls to Kit API v4.
- [ ] Implement `lib/kit.ts` with `X-Kit-Api-Key` auth, subscriber upsert, form add, create/reuse tag, and tag subscriber calls.
- [ ] Run focused tests until green.

### Task 3: API Route

- [ ] Write failing route tests for invalid input, missing config, and successful lead submission.
- [ ] Implement `app/api/leads/route.ts`.
- [ ] Run focused tests until green.

### Task 4: Custom Form UI

- [ ] Replace the placeholder quote card with `components/QuoteForm.tsx`.
- [ ] Keep Kit embeds out of the frontend.
- [ ] Show consent and disclosure checkboxes with compliance-safe copy.
- [ ] Include hidden source metadata from the current page URL when available.

### Task 5: Verification

- [ ] Run `npm run lint`.
- [ ] Run `npm test`.
- [ ] Run `npm run build`.
- [ ] Commit and push when all checks pass.
