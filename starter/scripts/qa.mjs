/**
 * QA gate: builds are served with `vite preview`, then three profiles
 * (desktop 1440, mobile 390 touch, desktop reduced-motion) visit both pages,
 * scroll to fixed stops, screenshot, and FAIL on any console error, page error,
 * failed request, or sideways scroll. Also checks the film canvas actually drew.
 */
import { spawn } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { chromium } from 'playwright';

// `npm run qa` = local preview build; `npm run qa -- --url https://prod.example` = test a live deployment
const urlArg = process.argv.indexOf('--url');
const LIVE = urlArg > -1 ? process.argv[urlArg + 1].replace(/\/$/, '') : null;
const PORT = 4173;
const BASE = LIVE ?? `http://localhost:${PORT}`;
const OUT = LIVE ? 'qa-screenshots-live' : 'qa-screenshots';
mkdirSync(OUT, { recursive: true });

const server = LIVE ? null : spawn('node_modules/.bin/vite', ['preview', '--port', String(PORT), '--strictPort'], { stdio: 'pipe' });
for (let i = 0; !LIVE; i++) {
  try { if ((await fetch(BASE + '/')).ok) break; } catch { /* not up yet */ }
  if (i > 80) throw new Error('preview did not start');
  await new Promise((r) => setTimeout(r, 250));
}

const profiles = [
  { name: 'desktop', viewport: { width: 1440, height: 900 }, stops: [0, 0.06, 0.13, 0.2, 0.3, 0.45, 0.6, 0.75, 0.88, 1] },
  { name: 'mobile', viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2, stops: [0, 0.1, 0.2, 0.4, 0.6, 0.8, 1] },
  { name: 'reduced', viewport: { width: 1280, height: 800 }, reducedMotion: 'reduce', stops: [0, 0.3, 0.7, 1] },
];

const browser = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const failures = [];

for (const p of profiles) {
  const ctx = await browser.newContext({ viewport: p.viewport, isMobile: p.isMobile, hasTouch: p.hasTouch, deviceScaleFactor: p.deviceScaleFactor ?? 1, reducedMotion: p.reducedMotion ?? 'no-preference' });
  let page = await ctx.newPage();
  const errs = [];
  page.on('console', (m) => { if (m.type() === 'error') errs.push(`console: ${m.text()}`); });
  page.on('pageerror', (e) => errs.push(`pageerror: ${e.message}`));
  page.on('requestfailed', (r) => errs.push(`requestfailed: ${r.url()} ${r.failure()?.errorText}`));

  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  await page.waitForFunction(() => !document.querySelector('.preloader'), null, { timeout: 8000 }).catch(() => errs.push('preloader never released'));
  await page.waitForTimeout(1600);

  const max = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
  for (const [i, f] of p.stops.entries()) {
    await page.evaluate((y) => window.scrollTo(0, y), Math.round(max * f));
    await page.waitForTimeout(p.reducedMotion ? 300 : 1400);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    if (overflow > 1) errs.push(`sideways scroll ${overflow}px at stop ${f}`);
    await page.screenshot({ path: `${OUT}/${p.name}-${String(i).padStart(2, '0')}.jpg`, type: 'jpeg', quality: 78 });
  }

  // the film drew real pixels (not the blank canvas) — sampled at the top
  await page.evaluate(() => window.scrollTo(0, innerHeight * 0.8));
  await page.waitForTimeout(900);
  const drew = await page.evaluate(() => {
    const c = document.querySelector('[data-film]');
    const g = c.getContext('2d');
    const d = g.getImageData(c.width / 2, c.height / 2, 1, 1).data;
    return d[0] + d[1] + d[2] > 0;
  });
  if (!drew) errs.push('film canvas is blank');

  if (p.name === 'desktop') {
    // film beats: u = progress through the sticky film section
    for (const [tag, u] of [['beat0', 0.24], ['beat1', 0.47], ['beat2', 0.74], ['close', 0.96]]) {
      await page.evaluate((uu) => { const f = document.querySelector('.film'); window.scrollTo(0, uu * (f.offsetHeight - innerHeight)); }, u);
      await page.waitForTimeout(1500);
      await page.screenshot({ path: `${OUT}/desktop-film-${tag}.jpg`, type: 'jpeg', quality: 80 });
    }
    // Hold it: three.js turntable must go live, glaze swatch must switch
    await page.evaluate(() => document.querySelector('#hold').scrollIntoView());
    await page.waitForFunction(() => document.querySelector('[data-vessel]')?.classList.contains('is-live'), null, { timeout: 15000 }).catch(() => errs.push('vessel never rendered'));
    await page.waitForTimeout(1200);
    await page.screenshot({ path: `${OUT}/desktop-hold.jpg`, type: 'jpeg', quality: 82 });
    const v = await page.locator('[data-vessel]').boundingBox();
    await page.mouse.move(v.x + v.width * 0.5, v.y + v.height * 0.5);
    await page.mouse.down(); await page.mouse.move(v.x + v.width * 0.8, v.y + v.height * 0.5, { steps: 10 }); await page.mouse.up();
    await page.locator('[data-glaze="tenmoku"]').click();
    await page.waitForTimeout(1400);
    await page.screenshot({ path: `${OUT}/desktop-hold-tenmoku.jpg`, type: 'jpeg', quality: 82 });
    await page.evaluate(() => document.querySelector('#pieces').scrollIntoView());
    await page.waitForTimeout(1600);
    const card = page.locator('[data-distort]').first();
    const box = await card.boundingBox();
    await page.mouse.move(box.x + box.width * 0.4, box.y + box.height * 0.45, { steps: 8 });
    await page.waitForTimeout(500);
    await page.mouse.move(box.x + box.width * 0.55, box.y + box.height * 0.5, { steps: 6 });
    await page.waitForTimeout(350);
    await page.screenshot({ path: `${OUT}/desktop-hover.jpg`, type: 'jpeg', quality: 80 });
    await page.locator('[data-add]').first().click();
    const bag = await page.locator('[data-bag-count]').first().textContent();
    if (bag !== '1') errs.push(`bag count ${bag}`);
  }

  if (p.name !== 'desktop') {
    await page.evaluate(() => document.querySelector('#hold').scrollIntoView());
    await page.waitForFunction(() => document.querySelector('[data-vessel]')?.classList.contains('is-live'), null, { timeout: 15000 }).catch(() => errs.push('vessel never rendered'));
    await page.waitForTimeout(900);
    await page.screenshot({ path: `${OUT}/${p.name}-hold.jpg`, type: 'jpeg', quality: 80 });
  }

  // detail page via the transition link
  if (p.name === 'desktop') {
    await page.evaluate(() => document.querySelector('#pieces').scrollIntoView());
    await page.waitForTimeout(1200);
    await page.locator('#pieces a[data-transition]').first().click({ noWaitAfter: true });
    await page.waitForURL('**/piece.html', { timeout: 30000, waitUntil: 'commit' }).catch(() => errs.push('transition link did not reach piece.html'));
    await page.waitForLoadState('load');
  } else {
    // headless software-GL mobile is CPU-starved after the WebGL section; check the link target, then open the detail page fresh
    const href = await page.locator('#pieces a[data-transition]').first().getAttribute('href');
    if (href !== '/piece.html') errs.push(`piece link href ${href}`);
    await page.close();
    page = await ctx.newPage();
    page.on('console', (m) => { if (m.type() === 'error') errs.push(`console: ${m.text()}`); });
    page.on('pageerror', (e) => errs.push(`pageerror: ${e.message}`));
    await page.goto(BASE + '/piece.html', { waitUntil: 'load' });
  }
  await page.waitForTimeout(2000);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  if (overflow > 1) errs.push(`piece sideways scroll ${overflow}px`);
  await page.screenshot({ path: `${OUT}/${p.name}-piece.jpg`, type: 'jpeg', quality: 78 });

  console.log(`${errs.length ? '✗' : '✓'} ${p.name}${errs.length ? '\n  ' + errs.join('\n  ') : ''}`);
  failures.push(...errs.map((e) => `${p.name}: ${e}`));
  await ctx.close();
}

await browser.close();
server?.kill();
if (failures.length) { console.error(`QA failed (${failures.length})`); process.exit(1); }
console.log(`QA passed — screenshots in ${OUT}/`);
