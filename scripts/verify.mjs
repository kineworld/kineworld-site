import { chromium } from 'playwright-core';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const browser=await chromium.launch({headless:true,executablePath:'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'});
const base='http://127.0.0.1:4321';
const output=path.resolve('../../outputs');
await mkdir(output,{recursive:true});
const shots=[
 ['/',1440,900,'desktop-home.png'],['/',390,844,'mobile-home.png'],
 ['/research/',1280,800,'research.png'],['/projects/',1280,800,'projects.png'],
 ['/about/',1280,800,'about.png'],['/contact/',1280,800,'contact.png'],
 ['/en/',1440,900,'en-home.png']
];
const issues=[];
for(const [route,width,height,file] of shots){
 const page=await browser.newPage({viewport:{width,height},deviceScaleFactor:1});
 const response=await page.goto(base+route,{waitUntil:'networkidle'});
 if(response.status()!==200)issues.push(`${route}: HTTP ${response.status()}`);
 await page.screenshot({path:path.join(output,file),fullPage:true});
 if(await page.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth+2))issues.push(`${route}: horizontal overflow ${width}px`);
 await page.close();
}
const page=await browser.newPage({viewport:{width:390,height:844}});
await page.goto(base+'/projects/kinejing/');
await page.getByRole('button',{name:'打开菜单'}).click();
if(!(await page.getByRole('navigation',{name:'移动导航'}).isVisible()))issues.push('mobile menu did not open');
await page.keyboard.press('Escape');
if(await page.getByRole('navigation',{name:'移动导航'}).isVisible())issues.push('mobile menu did not close');
await page.locator('.language a[lang="en"]').click();
if(new URL(page.url()).pathname!=='/en/projects/kinejing/')issues.push('language switch lost project path');
await page.close();
const routes=['/','/research/','/projects/','/projects/kinejing/','/updates/','/updates/kinejing-dynamics/','/about/','/contact/','/media/','/faq/','/privacy/','/terms/','/en/','/en/research/','/en/projects/','/en/projects/kinejing/','/en/updates/','/en/about/','/en/contact/','/en/media/','/en/faq/','/en/privacy/','/en/terms/','/sitemap.xml','/robots.txt','/404.html','/assets/portal-hero.webp','/assets/logo-mark.png','/assets/logo-white.png','/assets/logo-on-black.png','/assets/logo-on-white.png'];
for(const route of routes){const response=await fetch(base+route);if(response.status!==200)issues.push(`${route}: HTTP ${response.status}`);}
const missing=await fetch(base+'/this-page-does-not-exist/');if(missing.status!==404||!(await missing.text()).includes('这里不是我们要寻找的世界'))issues.push('custom 404 response is missing');
for(const width of [375,430,768,1024,1280]){const sizePage=await browser.newPage({viewport:{width,height:800}});await sizePage.goto(base+'/');if(await sizePage.evaluate(()=>document.documentElement.scrollWidth>innerWidth+2))issues.push(`home horizontal overflow ${width}px`);await sizePage.close();}
const linkPage=await browser.newPage();await linkPage.goto(base+'/');const hrefs=await linkPage.locator('a[href^="/"]').evaluateAll(els=>[...new Set(els.map(el=>el.getAttribute('href')))]);for(const href of hrefs){const response=await fetch(base+href);if(response.status!==200)issues.push(`broken internal link ${href}: ${response.status}`);}await linkPage.close();
const nojs=await browser.newPage({javaScriptEnabled:false,viewport:{width:390,height:844}});await nojs.goto(base+'/');
if(!(await nojs.getByRole('navigation',{name:'移动导航'}).isVisible()))issues.push('no-JS mobile navigation hidden');
if(!(await nojs.getByRole('heading',{level:1}).isVisible()))issues.push('no-JS hero hidden');
await nojs.close();
const reduced=await browser.newPage({reducedMotion:'reduce'});await reduced.goto(base+'/');
const animation=await reduced.locator('.hero-image').evaluate(el=>getComputedStyle(el).animationName);
if(animation!=='none')issues.push('reduced motion animation still active');await reduced.close();
await browser.close();
const report={testedAt:new Date().toISOString(),routesChecked:routes.length,screenshots:shots.map(x=>x[3]),issues};
await writeFile(path.join(output,'browser-report.json'),JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));
if(issues.length)process.exitCode=1;
