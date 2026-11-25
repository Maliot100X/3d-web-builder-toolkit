import { chromium } from 'playwright';
import { writeFileSync } from 'node:fs';
const b = await chromium.launch({ args: ['--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist'] });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36' });
const p = await ctx.newPage();
await p.goto('https://www.scrolltide.co/', { waitUntil: 'networkidle', timeout: 60000 }).catch(e=>console.log('goto',e.message));
await p.waitForTimeout(3000);
const info = await p.evaluate(() => ({
  title: document.title,
  h: document.documentElement.scrollHeight,
  links: [...new Set([...document.querySelectorAll('a[href]')].map(a => a.href))],
  text: document.body.innerText.slice(0, 6000),
  fonts: [...new Set([...document.querySelectorAll('*')].slice(0, 400).map(e => getComputedStyle(e).fontFamily))].slice(0, 12),
  canvases: document.querySelectorAll('canvas').length, videos: document.querySelectorAll('video').length,
  scripts: [...document.scripts].map(s => s.src).filter(Boolean).slice(0, 30),
}));
writeFileSync('../scrolltide/home.json', JSON.stringify(info, null, 2));
console.log(info.title, info.h, info.links.length, info.canvases, info.videos);
await b.close();
