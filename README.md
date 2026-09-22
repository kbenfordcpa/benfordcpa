# Benford Consulting — Marketing Site

Production-ready Next.js (App Router) marketing site for **Benford Consulting, LLC** (`benfordcpa.com`), replacing the current Squarespace site with stronger SEO and Generative Engine Optimization (GEO).

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4
- `next/font` — Libre Baskerville (serif) + Source Sans 3 (sans)
- Server Components for crawlable HTML; client components only for header mobile nav and contact form

## Pages

| URL | Purpose |
|-----|---------|
| `/` | Homepage (local keywords, services preview, FAQ + FAQPage schema) |
| `/about` | About Kolby Benford, CPA (+ Person schema) |
| `/services` | Full services (clean URL; not `/services-content`) |
| `/contact` | Consultation request (mailto form; no backend email yet) |
| `/llms.txt` | Concise firm summary for AI crawlers |
| `/sitemap.xml` | App Router `sitemap.ts` |
| `/robots.txt` | App Router `robots.ts` |

## Local development

```bash
cd /workspace/benfordcpa-site
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |

## Environment

No required environment variables for the current build.

- Contact form uses **client-side `mailto:`** to `kbenfordcpa@gmail.com`. It does **not** send email from the server.
- When you wire a real form backend (Resend, Formspree, etc.), add secrets via Vercel env vars — do **not** commit API keys.

Optional future vars (not used yet):

```bash
# CONTACT_TO_EMAIL=kbenfordcpa@gmail.com
# RESEND_API_KEY=
```

## NAP / content policy

- **Email (public):** `kbenfordcpa@gmail.com`
- **Phone / street address:** not on the live Squarespace site — **do not invent**. Placeholders are commented in `src/lib/site.ts` and omitted from displayed NAP and JSON-LD `telephone` / `streetAddress`.
- Service area wording only: Florence–Tuscumbia / Shoals, Alabama.

## Deploy to Vercel

1. Push this repo to GitHub (when auth is ready — not part of this scaffold’s deliverables).
2. In [Vercel](https://vercel.com): **Add New Project** → import the repo.
3. Framework preset: Next.js (auto-detected). Root directory: project root.
4. Build command: `npm run build` · Output: default `.next`.
5. Deploy. Confirm `https://<project>.vercel.app` loads all four routes, `/sitemap.xml`, `/robots.txt`, and `/llms.txt`.
6. Set Production domain to `www.benfordcpa.com` (and apex redirect) when DNS cutover is scheduled.

### Domain cutover notes (DNS later)

1. In Vercel → Project → Domains: add `www.benfordcpa.com` and `benfordcpa.com`.
2. Prefer **www as primary**; redirect apex → www (matches `metadataBase`).
3. At the DNS host (currently Squarespace DNS or registrar):
   - Point `www` CNAME to `cname.vercel-dns.com` (or the target Vercel shows).
   - Point apex with A/ALIAS records per Vercel’s domain instructions.
4. Keep Squarespace live until SSL + redirects verify on Vercel.
5. After cutover: submit the new sitemap in Google Search Console; spot-check canonicals and Open Graph.
6. Update any Squarespace email/forms forwarding if still in use.

## Project layout

```
src/app/           # Routes, layout, sitemap, robots
src/components/    # Header, Footer, forms, FAQ, JSON-LD
src/lib/site.ts    # Brand, services, FAQs (single source of truth)
src/lib/schema.ts  # JSON-LD builders
public/            # logo.svg, og-default.svg, llms.txt
NOTES.md           # SEO/GEO improvements vs Squarespace
```

## License

Private site for Benford Consulting, LLC. All rights reserved.
