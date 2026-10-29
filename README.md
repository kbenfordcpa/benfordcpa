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
| `/contact` | Consultation request (sent by the server through Resend) |
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

The site builds with no environment variables. The consultation form cannot deliver email until the Resend variables below are set on the server (locally in `.env.local`, and on Vercel for Production). Do not commit API keys, and do not prefix these with `NEXT_PUBLIC_`.

| Variable | Required | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | Yes, to send | Resend API key. Store it as a Vercel Secret. |
| `CONTACT_FROM_EMAIL` | Yes, to send | From address on a domain verified in Resend, such as `Benford Consulting <consultations@benfordcpa.com>`. |
| `CONTACT_TO_EMAIL` | No | Inbox that receives requests. Defaults to `kolby@benfordcpa.com`. |

If those required values are missing, the visitor sees a normal failure with the public email address. The server logs the configuration problem and does not show setup instructions on the page.

See `.env.example`. Analytics IDs (`NEXT_PUBLIC_GA_MEASUREMENT_ID`, `NEXT_PUBLIC_CLARITY_PROJECT_ID`) stay optional.

## NAP / content policy

- **Email (public):** `kolby@benfordcpa.com`
- **Phone / street address:** not on the live Squarespace site — **do not invent**. Placeholders are commented in `src/lib/site.ts` and omitted from displayed NAP and JSON-LD `telephone` / `streetAddress`.
- Service area wording only: Florence, Alabama.

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
public/            # logo.png, og-default.svg, llms.txt
NOTES.md           # SEO/GEO improvements vs Squarespace
```

## License

Private site for Benford Consulting, LLC. All rights reserved.
