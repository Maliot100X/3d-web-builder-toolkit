// Usage: node shoot.mjs <url> <outPrefix> [scrollFractions=0,0.25,0.5,0.75,1] [width=1440] [height=900]
// Takes viewport screenshots at scroll positions and reports console errors / page errors.
import { chromium } from 'playwright';
const [url, out, fr = '0,0.25,0.5,0.75,1', w = '1440', h = '900'] = process.argv.slice(2);
const browser = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: +w, height: +h } });
const errors = [];
page.on('console', m => { if (m.type() === 'error') errors.push('console: ' + m.text()); });
page.on('pageerror', e => errors.push('pageerror: ' + e.message));
page.on('requestfailed', r => errors.push('requestfailed: ' + r.url() + ' ' + (r.failure()?.errorText || '')));
await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 }).catch(e => errors.push('goto: ' + e.message));
await page.waitForTimeout(2500);
const total = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
const fracs = fr.split(',').map(Number);
for (const [i, f] of fracs.entries()) {
  const y = Math.round(total * f);
  // wheel-scroll so Lenis / ScrollTrigger react like a real user
  await page.evaluate(y => window.scrollTo(0, y), y);
  await page.mouse.move(+w / 2, +h / 2);
  await page.mouse.wheel(0, 1); await page.waitForTimeout(1600);
  await page.screenshot({ path: `${out}-${String(i).padStart(2, '0')}-${Math.round(f * 100)}pct.png` });
}
console.log(JSON.stringify({ url, scrollHeight: total, shots: fracs.length, errors }, null, 2));
await browser.close();
