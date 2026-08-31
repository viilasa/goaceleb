# Goa Celebrations

Premium destination wedding website built with React + Vite.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## SEO & GEO

Set your live domains in `.env` (see `.env.example`):

```bash
VITE_SITE_URL=https://goacelebrations.com
VITE_PREVIEW_URL=https://goaceleb.vercel.app
```

- **Canonical:** [https://goacelebrations.com](https://goacelebrations.com/) — sitemap, Open Graph, JSON-LD
- **Preview:** [https://goaceleb.vercel.app](https://goaceleb.vercel.app/) — trail / Vercel deployment

Then run `npm run seo` (also runs automatically on `dev` / `build`) to refresh:

| File | Purpose |
|------|---------|
| `/sitemap.xml` | Search engine URL index |
| `/robots.txt` | Crawler rules + AI bot allow list |
| `/llms.txt` | GEO map for AI assistants |
| `/llms-full.txt` | Extended brand facts for citations |
| `/ai.txt` | AI discovery pointers |
| `/humans.txt` | Human-readable credits |

Per-route titles, descriptions, Open Graph, Twitter cards, canonical URLs, and JSON-LD (Organization, WebSite, BreadcrumbList, FAQ, Article) are applied in `src/components/seo/`.

## Content updates

| What | Where |
|------|--------|
| Site URL & brand SEO defaults | `src/config/site.ts` |
| Page meta copy | `src/seo/pageMeta.ts` |
| Weddings | `src/data/weddings.ts` |
| Services | `src/data/services.ts` |
| Packages & prices | `src/data/packages.ts` |
| Blog articles | `src/data/journal.ts` |
| Calculator options & pricing | `src/data/calculatorConfig.ts` |
| Consultation types & hours | `src/data/consultation.ts` |
| Logo | `src/assets/logo.svg` |

Leads are stored in `localStorage` (`gc_leads`) ready for a future admin dashboard or API.
