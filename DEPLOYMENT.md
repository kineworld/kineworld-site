# Production deployment: kineworld.com

## Live state (2026-09-23)

The bilingual static site is live at `https://kineworld.com/` and `https://www.kineworld.com/`. The apex is the canonical hostname. Both names resolve through Aliyun DNS (`dns17.hichina.com` / `dns18.hichina.com`) to Tencent Cloud Lighthouse instance `lhins-f0sfoxuw`, public IP `212.64.29.248`, Shanghai, Ubuntu 24.04. The apex has an enabled A record and `www` has an enabled CNAME to the apex. Existing mail, SPF and verification DNS records were retained.

Nginx serves `/var/www/kineworld/current`, a symlink to a timestamped release under `/var/www/kineworld/releases/`. HTTP redirects to HTTPS. Let's Encrypt issued one certificate for both hostnames, expiring 2026-12-22; `certbot.timer` is enabled and a renewal dry run passed. Tencent Cloud's instance firewall allows TCP 80 and 443. The verified ICP website service number `皖ICP备2026032725号-1` is shown in the footer with a link to MIIT.

External checks returned HTTP 200 with valid TLS for both hostnames and for the home, English, research, project, about, contact, privacy, sitemap, robots and logo paths. The privacy page describes current Nginx access logs, which rotate daily with 14 retained rotations (`/etc/logrotate.d/nginx`). No analytics or contact form is enabled.

## Build and release

Use Node.js 22 or newer. Run `npm ci`, `npm run check`, then `npm run build`. If source images change, run `python scripts/prepare_assets.py` before the build. Package the contents of `dist/` and upload them to the instance. Unpack into a new timestamped directory in `/var/www/kineworld/releases/`, verify `index.html`, set ownership to `www-data`, then atomically change `/var/www/kineworld/current` to the new directory. Test `nginx -t` and reload Nginx. Preserve `/etc/nginx/sites-available/kineworld` because Certbot added HTTPS configuration there.

To roll back, point `/var/www/kineworld/current` to the prior release and reload Nginx. Keep the certificate and firewall rules in place. Check the main pages, ICP footer, sitemap, both hostnames, HTTP redirect and certificate after each release. The `kineworld.github.io` site is an older interim copy; update or retire it deliberately rather than treating it as the production origin.

## Legal follow-up

The public-security internet filing has not been submitted or approved. The official filing form requests the responsible person's identity documents and contact details, so an authorized person must supply and verify them. Tencent Cloud's [filing guide](https://cloud.tencent.com/document/product/243/19142) says to submit within 30 days after opening the site. Add the public-security filing number and link to the footer only after approval. Company email and other official channels remain unpublished until verified.

The repository's older `DEPLOY.md` and `SITE_REMEDIATION.md` describe a former Aliyun OSS Hong Kong setup; they are historical records, not the current origin.
