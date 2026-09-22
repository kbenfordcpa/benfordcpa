# SEO & GEO improvements vs Squarespace

Short changelog of what this Next.js site improves relative to the live Squarespace site (benfordcpa.com / www.benfordcpa.com), scraped/verified Sep 2026.

## Information architecture

- Clean `/services` URL (Squarespace used `/services-content`).
- Consistent primary nav: Services, About, Contact + consultation CTA.
- Footer with real firm name, email, service area, and internal links — no Squarespace placeholder chrome or fake social URLs.

## On-page SEO

- Unique `<title>` and meta description per page (drafts from brief).
- `metadataBase` → `https://www.benfordcpa.com`; canonical URLs on every page.
- Open Graph + Twitter cards with HTTPS image paths (`/og-default.svg`).
- Homepage now includes natural local keywords: Florence, Tuscumbia, Shoals, Alabama CPA (Squarespace homepage largely lacked this).
- Semantic HTML: one H1 per page, section headings, skip link, focus states.

## Technical SEO

- App Router `sitemap.ts` → `/sitemap.xml`.
- App Router `robots.ts` → `/robots.txt` with sitemap reference.
- Crawlable Server Components for primary content (not client-only walls).
- Internal links between services ↔ about ↔ contact.

## Structured data (JSON-LD)

- `WebSite` + `AccountingService` / `ProfessionalService` / `LocalBusiness`-style entity (email, areaServed cities; **no** invented phone/street).
- `Person` schema on `/about` for Kolby Benford, CPA.
- `FAQPage` schema on home and services.
- BreadcrumbList on About, Services, Contact.

## Generative Engine Optimization (GEO)

- Entity clarity block on homepage: who / what / for whom / where.
- Plain-language service definitions: what it is, who it’s for, outcome.
- 7 FAQ answers written for accurate AI citation.
- Author/expertise signals on About (CPA license year, public accounting, Controller role, USAF/USAFA).
- `/llms.txt` factual summary for AI crawlers.
- Contact microcopy covers full service breadth (tax, bookkeeping, CFO, etc.) — not bookkeeping-only like several Squarespace form intros.

## Forms

- Client-side `mailto:` consultation form; explicitly notes server wiring comes later.
- Does **not** send email or post to third parties in this release.

## Intentionally not invented

- Phone number and street address remain unpublished until real NAP is confirmed.

## Analytics (GA4 + Microsoft Clarity)

Set on Vercel (Production + Preview) and locally in `.env.local`:

- `NEXT_PUBLIC_GA_MEASUREMENT_ID` — GA4 Measurement ID (`G-…`)
- `NEXT_PUBLIC_CLARITY_PROJECT_ID` — Clarity project ID

Scripts load from `src/components/Analytics.tsx` only when IDs are present.
Clarity records session replays; mention analytics/session tools in the privacy policy when that page is published.
