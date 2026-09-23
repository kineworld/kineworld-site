# Deployment: kineworld.com

## Build

Node.js 22 or newer. Run `npm ci`, `python scripts/prepare_assets.py` only if the source images change, then `npm run check` and `npm run build`. Upload **only** `dist/` to a static hosting origin. The build creates directory routes such as `dist/research/index.html` and `dist/en/research/index.html`.

## Current infrastructure boundary

The repository's older `DEPLOY.md` and `SITE_REMEDIATION.md` describe an Aliyun OSS Hong Kong bucket. They are historical and must not be treated as the current Tencent Cloud deployment configuration. On 2026-09-23, a read-only DNS lookup did not return a usable apex A record or `www` CNAME. Tencent Cloud's filing console screenshot supplied by the user shows `kineworld.com` with website service filing `皖ICP备2026032725号-1`, legal entity `合肥勘境智能科技有限公司`, and a cloud resource `212.64.29.248 (sh)`. TCP 22 responds on that resource; TCP 80 and 443 did not accept connections from this environment. No authenticated server access, Tencent Cloud API access, DNS access or certificate access is available locally.

Do not sync this build to the old Aliyun bucket or change DNS based on the old documents. For Tencent Cloud, first identify whether the actual origin is COS, EdgeOne, Lighthouse, CVM or another service and confirm who manages DNS and certificates.

## Static host requirements

- Serve `/` from `index.html` and `/research/` from `research/index.html`; apply the same rule to every nested route. Configure an explicit custom 404 response using `404.html` with HTTP 404 status.
- Redirect either `www.kineworld.com` to `kineworld.com` or the reverse with one canonical HTTPS hostname. This build uses the apex in canonical and sitemap URLs.
- Issue and renew a valid certificate for both hostnames before enabling HTTPS redirects.
- Cache hashed `/_astro/*` assets for one year with `immutable`; cache HTML briefly or revalidate it. Cache `/assets/*` only after reviewing the update and invalidation policy because their filenames are stable.
- Serve `sitemap.xml`, `robots.txt`, images and `favicon.png` with correct content types.
- The exact verified website service ICP number is already in `src/data/company.ts`, and the footer links it to MIIT. Add a police record only after it is approved and verified.
- Upload a new version to a staging origin first. Test direct navigation and refresh for `/`, `/research/`, `/projects/kinejing/`, `/en/`, `/en/projects/kinejing/`, and `/404.html`, then verify assets and TLS.

## Rollback

Keep the previous complete `dist/` release. With versioned object prefixes or a hosting release system, switch the origin back to the previous release. Purge HTML and stable asset paths after a rollback; avoid replacing individual files in place.

No `kineworld.com` DNS, hosting or certificate change is included in this delivery.

## Public interim host

With the user's later explicit request to publish, the site was deployed to `https://kineworld.github.io/` on 2026-09-23. GitHub Pages build `899bdb3` completed successfully. The home page, English home page, research page, project page, new image assets and `robots.txt` all returned HTTP 200. The deployed build used `PUBLIC_SITE_URL=https://kineworld.github.io` so canonical and sitemap URLs describe that host. The generated `.nojekyll` file is included. This interim host is separate from the requested `kineworld.com` production domain; the latter still requires verified DNS, TLS and filing details.
