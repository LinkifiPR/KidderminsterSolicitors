# Next.js Coming Soon Design

## Goal

Create the first deployable version of the Kidderminster Solicitors rank-and-rent website: a professional coming-soon page that can be pushed to GitHub and connected to Netlify.

## Architecture

The site will use Next.js with the App Router, TypeScript, and Tailwind CSS. The first milestone is static-first and database-free, with local files and components suitable for later expansion into service pages and blog content.

Netlify will build the app from GitHub using `npm run build`. Netlify's current Next.js support uses the automatic OpenNext adapter, so the project will not pin `@netlify/plugin-nextjs`.

## User-Facing Scope

- A single homepage at `/`.
- Clear "coming soon" messaging for an informational Kidderminster solicitors website.
- No claims that the site is a law firm.
- No quote form yet; that belongs in the next build phase.
- SEO metadata suitable for the temporary launch page.

## Technical Scope

- Initialize Git and connect `origin` to `https://github.com/LinkifiPR/KidderminsterSolicitors.git`.
- Add a minimal Next.js project.
- Add `netlify.toml` with build command and publish directory.
- Add a focused render test for the homepage.
- Verify with test, lint, and production build.

## Future Direction

Later phases can add local MDX or structured content files for service and blog pages, lead capture form handling, privacy/compliance pages, and SEO content architecture. No database is required for the expected 50 to 100 page scale.
