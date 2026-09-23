# KineWorld website verification

Date: 2026-09-23 (Asia/Shanghai). Environment: local Windows, Node.js 24, Chrome headless, Astro 7 static preview.

## Passed

- `npm run build`: 35 HTML pages plus sitemap and static assets generated.
- `npm run check`: 0 errors, 0 warnings, 0 hints.
- `npm audit --omit=dev`: 0 vulnerabilities after updating Astro to 7.3.4.
- `node scripts/verify.mjs`: 31 routes and assets returned 200; a missing path returned the branded 404 with HTTP 404; homepage internal links returned 200.
- Chinese `/` and independent English `/en/` were rendered. Switching language from a project detail preserved the project path.
- Mobile menu opened by button and closed with Escape. Navigation and hero remained visible with JavaScript disabled. Reduced-motion setting disabled hero animation.
- No horizontal overflow at widths 375, 390, 430, 768, 1024, 1280 or 1440 in the checked pages.
- Seven full-page screenshots captured from real Chrome. Desktop and phone home screenshots were visually opened; the phone portal crop and desktop heading were corrected, then screenshots were regenerated. Research, projects, about and contact screenshot viewports were also visually opened; research heading size was corrected and recaptured.

## Limits

- No physical phone or non-Chromium browser was used. Real-user LCP, CLS and INP were not measured against production hosting.
- The production Tencent Cloud product, DNS, certificate and exact ICP filing number were not verified. The site was **not deployed**. No production DNS, hosting or repository main branch was changed.
- Company email, social channels beyond GitHub, legal name, team and address remain omitted pending verification, as listed in `MISSING_INFO.md`.
- The optimized portal file is derived from the user-supplied image. The site's motion is intentionally subtle and does not alter the original scene.
