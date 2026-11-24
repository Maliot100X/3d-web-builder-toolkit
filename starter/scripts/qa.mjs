// Phase 8 QA: build must already exist (npm run build). Serves dist via `vite preview`,
// screenshots desktop + mobile at scroll positions, exits 1 on any console/page error.
// Usage: npm run qa  [-- --url http://localhost:4173/]
import { spawn } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { chromium } from 'playwright';

const urlArg = process.argv.indexOf('--url');
const external = urlArg > -1 ? process.argv[urlArg + 1] : null;
const url = external || 'http://localhost:4173/';
let server;
if (!external) {
  server = spawn('npx', ['vite', 'preview', '--port', '4173', '--strictPort'], { stdio: 'ignore' });
  await new Promise((r) => setTimeout(r, 2500));
}
mkdirSync('qa-screenshots', { recursive: true });
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const errors = [];
const profiles = [
  { name: 'desktop', viewport: { width: 1440, height: 900 } },
  { name: 'mobile', viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 },
  { name: 'reduced', viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' },
];
for (const p of profiles) {
  const ctx = await browser.newContext({ viewport: p.viewport, isMobile: p.isMobile, hasTouch: p.hasTouch, deviceScaleFactor: p.deviceScaleFactor, reducedMotion: p.reducedMotion });
  const page = await ctx.newPage();
  page.on('console', (m) => { if (m.type() === 'error') errors.push(`[${p.name}] console: ${m.text()}`); });
  page.on('pageerror', (e) => errors.push(`[${p.name}] pageerror: ${e.message}`));
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2500);
  const max = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
  const stops = p.name === 'desktop' ? [0, 0.15, 0.3, 0.45, 0.65, 1] : [0, 0.35, 1];
  for (const [i, f] of stops.entries()) {
    // incremental wheel scrolling so Lenis + ScrollTrigger behave like a user
    const target = Math.round(max * f);
    let cur = await page.evaluate(() => scrollY);
    while (Math.abs(target - cur) > 40) {
      await page.mouse.wheel(0, Math.sign(target - cur) * Math.min(600, Math.abs(target - cur)));
      await page.waitForTimeout(60);
      const next = await page.evaluate(() => scrollY);
      if (next === cur) { await page.evaluate((y) => window.scrollTo(0, y), target); break; }
      cur = next;
    }
    await page.waitForTimeout(1500);
    await page.screenshot({ path: `qa-screenshots/${p.name}-${i}-${Math.round(f * 100)}.png` });
  }
  await ctx.close();
}
await browser.close();
server?.kill();
if (errors.length) { console.error('QA FAILED\n' + errors.join('\n')); process.exit(1); }
console.log('QA PASSED — 0 console errors. Screenshots in qa-screenshots/');
