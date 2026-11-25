// node shoot2.mjs <url> <outPrefix> [fracs=0,0.33,0.66,1] [w=1440] [h=900]
import { chromium } from 'playwright';
const [url, out, fr = '0,0.33,0.66,1', w = '1440', h = '900'] = process.argv.slice(2);
const browser = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--autoplay-policy=no-user-gesture-required'] });
const page = await browser.newPage({ viewport: { width: +w, height: +h } });
const errors = []; let reqFail = 0;
page.on('console', m => { if (m.type() === 'error') errors.push(m.text().slice(0, 200)); });
page.on('pageerror', e => errors.push('pageerror: ' + e.message.slice(0, 200)));
page.on('requestfailed', () => reqFail++);
let ok = true;
await page.goto(url, { waitUntil: 'load', timeout: 45000 }).catch(e => { ok = false; errors.push('goto: ' + e.message.slice(0, 150)); });
await page.waitForTimeout(4500);
const total = await page.evaluate(() => Math.max(0, document.documentElement.scrollHeight - innerHeight)).catch(() => 0);
const fracs = fr.split(',').map(Number); const shots = [];
try {
for (const [i, f] of fracs.entries()) {
  if (i > 0 && total < 50) break;
  const y = Math.round(total * f); const steps = 8;
  const cur = await page.evaluate(() => scrollY).catch(() => 0);
  await page.mouse.move(+w / 2, +h / 2);
  for (let s = 1; s <= steps; s++) { await page.mouse.wheel(0, (y - cur) / steps); await page.waitForTimeout(120); }
  await page.evaluate(y => window.scrollTo(0, y), y).catch(() => {});
  await page.waitForTimeout(1800);
  const p = `${out}-${String(i).padStart(2, '0')}-${Math.round(f * 100)}pct.png`;
  try { await page.screenshot({ path: p, timeout: 25000 }); shots.push(p); }
  catch (e) { try { await page.screenshot({ path: p, timeout: 25000, animations: 'disabled' }); shots.push(p); } catch (e2) { errors.push('screenshot: ' + e2.message.slice(0, 80)); } }
}
// pages whose scroll lives in a transformed container (Locomotive/Lenis wrapper, 100vh app): wheel-drive it
if (total < 50 && fracs.length > 1) {
  for (let i = 1; i < fracs.length; i++) {
    await page.mouse.move(+w / 2, +h / 2);
    for (let s = 0; s < 10; s++) { await page.mouse.wheel(0, 140); await page.waitForTimeout(90); }
    await page.waitForTimeout(1800);
    const p = `${out}-${String(i).padStart(2, '0')}-wheel${i * 1400}px.png`;
    try { await page.screenshot({ path: p, timeout: 25000 }); shots.push(p); } catch (e) { errors.push('screenshot: ' + e.message.slice(0, 80)); }
  }
}
} catch (e) { errors.push('crash: ' + e.message.slice(0, 120)); }
const title = await page.title().catch(() => '');
console.log(JSON.stringify({ url, ok, title, scrollHeight: total, shots, requestFailed: reqFail, errors: errors.slice(0, 8) }));
await browser.close().catch(() => {});
