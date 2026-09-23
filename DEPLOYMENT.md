# Deployment: kineworld.com

## Build

Node.js 22 or newer. Run `npm ci`, `python scripts/prepare_assets.py` only if the source images change, then `npm run check` and `npm run build`. Upload **only** `dist/` to a static hosting origin. The build creates directory routes such as `dist/research/index.html` and `dist/en/research/index.html`.

## Current infrastructure boundary

The repository's older `DEPLOY.md` and `SITE_REMEDIATION.md` describe an Aliyun OSS Hong Kong bucket. They are historical and must not be treated as the current Tencent Cloud deployment configuration. On 2026-09-23, a read-only DNS lookup did not return a usable apex A record and an HTTPS HEAD request failed TLS negotiation in this environment. The user reports Tencent Cloud ICP filing, but the filing number, active Tencent service, CDN, bucket and certificate have not been independently verified.

Do not sync this build to the old Aliyun bucket or change DNS based on the old documents. For Tencent Cloud, first identify whether the actual origin is COS, EdgeOne, Lighthouse, CVM or another service and confirm who manages DNS and certificates.

## Static host requirements

- Serve `/` from `index.html` and `/research/` from `research/index.html`; apply the same rule to every nested route. Configure an explicit custom 404 response using `404.html` with HTTP 404 status.
- Redirect either `www.kineworld.com` to `kineworld.com` or the reverse with one canonical HTTPS hostname. This build uses the apex in canonical and sitemap URLs.
- Issue and renew a valid certificate for both hostnames before enabling HTTPS redirects.
- Cache hashed `/_astro/*` assets for one year with `immutable`; cache HTML briefly or revalidate it. Cache `/assets/*` only after reviewing the update and invalidation policy because their filenames are stable.
- Serve `sitemap.xml`, `robots.txt`, images and `favicon.png` with correct content types.
- Add the exact verified ICP number to `src/data/company.ts` and rebuild before Mainland publication. Add a police record only if one actually exists.
- Upload a new version to a staging origin first. Test direct navigation and refresh for `/`, `/research/`, `/projects/kinejing/`, `/en/`, `/en/projects/kinejing/`, and `/404.html`, then verify assets and TLS.

## Rollback

Keep the previous complete `dist/` release. With versioned object prefixes or a hosting release system, switch the origin back to the previous release. Purge HTML and stable asset paths after a rollback; avoid replacing individual files in place.

No production DNS, hosting or certificate change is included in this delivery.
