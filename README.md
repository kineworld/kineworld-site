# 勘境 KineWorld official site

Astro static site for kineworld.com. `/` is Chinese; `/en/` is English. Each language has complete page routes and project/update details. The interface does not redirect based on browser language or location.

## Local development

```bash
npm ci
npm run dev
```

For release validation: `npm run check`, `npm run build`, `npm run preview`, then `node scripts/verify.mjs`. The browser verification script uses an installed local Chrome path on Windows; adjust the executable path for another machine. Source images are already committed; use `python scripts/prepare_assets.py` if they are replaced.

## Structure

`src/data/` contains the editorial source; `src/pages/[...path].astro` generates bilingual routes; `src/layouts/Site.astro` contains global metadata, navigation and footer; `src/styles/site.css` contains the design system. `public/assets/` includes user-supplied originals and optimized derivatives. Older HTML files at repository root are historical material and are not included in the new static build.

Read [BRAND.md](BRAND.md), [CONTENT_GUIDE.md](CONTENT_GUIDE.md), [MISSING_INFO.md](MISSING_INFO.md) and [DEPLOYMENT.md](DEPLOYMENT.md) before publishing. No DNS or production hosting changes are part of this branch.

## Evidence boundaries

Project data links to public code and documentation. Forks are labeled as adaptations. The site does not claim a commercial product, official benchmark score, customer, funding, academic partnership or trained foundation model without supporting evidence.
