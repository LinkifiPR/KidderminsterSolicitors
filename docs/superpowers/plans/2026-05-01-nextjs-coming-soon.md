# Next.js Coming Soon Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a deployable Next.js coming-soon site for Kidderminster Solicitors and prepare it for GitHub plus Netlify.

**Architecture:** Use a static-first Next.js App Router project with TypeScript and Tailwind CSS. Keep the first page simple, SEO-friendly, and truthful: it is an informational solicitor comparison/quote site, not a law firm.

**Tech Stack:** Next.js, React, TypeScript, Tailwind CSS, Vitest, React Testing Library, Netlify.

---

## File Structure

- `package.json`: npm scripts and dependencies.
- `app/layout.tsx`: root HTML shell and metadata.
- `app/page.tsx`: coming-soon homepage.
- `app/globals.css`: Tailwind import and global visual styling.
- `app/page.test.tsx`: homepage render test.
- `vitest.config.ts`: test configuration.
- `netlify.toml`: Netlify build settings.
- `README.md`: local setup and deployment notes.

## Tasks

### Task 1: Project Scaffold

- [ ] Create the Next.js, TypeScript, Tailwind, ESLint, Vitest, and Netlify config files.
- [ ] Install dependencies with npm.
- [ ] Commit the scaffold once dependency installation succeeds.

### Task 2: Coming Soon Page

- [ ] Write a failing render test that expects the homepage to describe a coming-soon Kidderminster solicitors quote website.
- [ ] Run the test and confirm it fails because the page does not exist yet.
- [ ] Implement `app/layout.tsx`, `app/page.tsx`, and `app/globals.css`.
- [ ] Run the test and confirm it passes.

### Task 3: Verification and Publish

- [ ] Run `npm run lint`.
- [ ] Run `npm test`.
- [ ] Run `npm run build`.
- [ ] Commit the working baseline.
- [ ] Push `main` to GitHub.
- [ ] If Netlify CLI auth is available, link/create the Netlify site; otherwise provide the exact dashboard settings.
