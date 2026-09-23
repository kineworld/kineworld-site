import { projects } from '../data/projects';
import { updates } from '../data/updates';
import { company } from '../data/company';
import { localPath } from '../data/navigation';

const paths=['/','/research/','/projects/','/updates/','/about/','/contact/','/media/','/faq/','/privacy/','/terms/',...projects.map(p=>`/projects/${p.slug}/`),...updates.map(u=>`/updates/${u.slug}/`)];
export function GET(){
 const urls=paths.flatMap(path=>(['zh','en'] as const).map(lang=>`<url><loc>${company.domain}${localPath(path,lang)}</loc><xhtml:link rel="alternate" hreflang="zh-CN" href="${company.domain}${localPath(path,'zh')}"/><xhtml:link rel="alternate" hreflang="en" href="${company.domain}${localPath(path,'en')}"/></url>`)).join('');
 return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls}</urlset>`,{headers:{'Content-Type':'application/xml; charset=utf-8'}});
}
