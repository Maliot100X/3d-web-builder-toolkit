// node study.mjs <outdir> <url...>  — desktop shots at scroll fractions + mobile hero + page facts
import { chromium } from 'playwright';
import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'node:fs';
const [out, ...urls] = process.argv.slice(2);
mkdirSync(out, { recursive: true });
const b = await chromium.launch({ args: ['--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist'] });
const UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36';
const factsPath = `${out}/facts.json`;
const facts = existsSync(factsPath) ? JSON.parse(readFileSync(factsPath, 'utf8')) : {};
for (const url of urls) {
  const name = url.replace(/^https?:\/\//, '').replace(/[^a-z0-9]+/gi, '_').replace(/_+$/, '');
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, userAgent: UA });
  const p = await ctx.newPage();
  try {
    await p.goto(url, { waitUntil: 'networkidle', timeout: 40000 }).catch(() => {});
    await p.waitForTimeout(2500);
    const h = await p.evaluate(() => document.documentElement.scrollHeight - innerHeight);
    const fr = h > 200 ? [0, 0.2, 0.4, 0.6, 0.8, 1] : [0];
    for (const [i, f] of fr.entries()) {
      const target = Math.round(h * f); let cur = await p.evaluate(() => scrollY), guard = 0;
      await p.mouse.move(720, 450);
      while (Math.abs(target - cur) > 50 && guard++ < 60) { await p.mouse.wheel(0, Math.min(600, target - cur)); await p.waitForTimeout(40); const n = await p.evaluate(() => scrollY); if (n === cur) { await p.evaluate(y => scrollTo(0, y), target); break; } cur = n; }
      await p.waitForTimeout(1000);
      await p.screenshot({ path: `${out}/${name}-d${i}.jpg`, type: 'jpeg', quality: 70 });
    }
    facts[url] = await p.evaluate(() => ({
      title: document.title, scrollH: document.documentElement.scrollHeight,
      iframes: [...document.querySelectorAll('iframe')].map(f => f.src),
      videos: [...document.querySelectorAll('video')].map(v => v.currentSrc || v.querySelector('source')?.src).filter(Boolean).slice(0, 8),
      canvases: document.querySelectorAll('canvas').length,
      links: [...new Set([...document.querySelectorAll('a[href]')].map(a => a.href))].filter(h => !h.includes('/templates/') && !h.includes('/components/') && !h.includes('/shaders/')).slice(0, 60),
      fonts: [...new Set([...document.querySelectorAll('h1,h2,h3,p,a,span')].slice(0, 300).map(e => getComputedStyle(e).fontFamily))],
      text: document.body.innerText.slice(0, 3000),
    }));
  } catch (e) { facts[url] = { error: e.message }; }
  await ctx.close();
  const m = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2, userAgent: UA });
  const mp = await m.newPage();
  await mp.goto(url, { waitUntil: 'networkidle', timeout: 40000 }).catch(() => {});
  await mp.waitForTimeout(2000);
  await mp.screenshot({ path: `${out}/${name}-m0.jpg`, type: 'jpeg', quality: 70 }).catch(() => {});
  await m.close();
  writeFileSync(factsPath, JSON.stringify(facts, null, 2));
  console.log('done', url, facts[url]?.scrollH, 'iframes', facts[url]?.iframes?.length, 'videos', facts[url]?.videos?.length);
}
await b.close();
