import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'node:fs';
const out = '/workspace/scrolltide-free-prompts'; mkdirSync(out, { recursive: true });
const b = await chromium.launch();
for (const s of ['naiade', 'glacier', 'fluxora', 'visor-hq', 'monsoon', 'aurora']) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  await ctx.grantPermissions(['clipboard-read', 'clipboard-write'], { origin: 'https://www.scrolltide.co' });
  const p = await ctx.newPage();
  await p.goto(`https://www.scrolltide.co/templates/${s}`, { waitUntil: 'networkidle' }).catch(() => {});
  await p.waitForTimeout(1200);
  await p.evaluate(() => navigator.clipboard.writeText(''));
  await p.locator('button', { hasText: /copy the prompt/i }).first().click({ timeout: 8000 }).catch(e => console.log(s, 'no button', e.message.slice(0, 60)));
  let clip = '';
  for (let i = 0; i < 16 && !clip; i++) { await p.waitForTimeout(500); clip = await p.evaluate(() => navigator.clipboard.readText().catch(() => '')); }
  if (clip) writeFileSync(`${out}/${s}.md`, clip);
  console.log(s, clip.length, p.url());
  await ctx.close();
}
await b.close();
