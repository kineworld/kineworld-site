import { company } from '../data/company';
export function GET(){return new Response(`User-agent: *\nAllow: /\nSitemap: ${company.domain}/sitemap.xml\n`,{headers:{'Content-Type':'text/plain; charset=utf-8'}})}
