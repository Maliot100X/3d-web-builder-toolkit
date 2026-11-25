import { chromium } from 'playwright';
import { writeFileSync } from 'node:fs';
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
await ctx.grantPermissions(['clipboard-read', 'clipboard-write'], { origin: 'https://www.scrolltide.co' });
const p = await ctx.newPage();
await p.goto('https://www.scrolltide.co/templates/otis', { waitUntil: 'networkidle' });
await p.waitForTimeout(1500);
const btn = p.getByText('Copy the prompt').first();
await btn.click().catch(e => console.log('click err', e.message));
await p.waitForTimeout(2500);
console.log('after copy url:', p.url());
const clip = await p.evaluate(() => navigator.clipboard.readText().catch(() => '')).catch(() => '');
console.log('clipboard len', clip.length, clip.slice(0, 300));
// full template catalogue (public)
await p.goto('https://www.scrolltide.co/templates', { waitUntil: 'networkidle' });
for (let i = 0; i < 40; i++) { await p.mouse.wheel(0, 2500); await p.waitForTimeout(150); }
await p.waitForTimeout(1500);
const cat = await p.evaluate(() => document.body.innerText);
writeFileSync('../scrolltide/templates-catalog.txt', cat);
console.log('catalog chars', cat.length);
await b.close();
