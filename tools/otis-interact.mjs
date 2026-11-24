import { chromium } from 'playwright';
const b = await chromium.launch({ args: ['--use-angle=swiftshader','--enable-unsafe-swiftshader'] });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto('http://localhost:4101/', { waitUntil: 'networkidle' }); await p.waitForTimeout(1500);
await p.mouse.move(720, 520); await p.mouse.down();
for (let i = 0; i < 20; i++) { await p.mouse.move(720 + i * 18, 520 + i * 6); await p.waitForTimeout(16); }
await p.waitForTimeout(100);
await p.screenshot({ path: '../zip-sites/screenshots/otis-interaction-drag.png' });
await p.mouse.up();
await p.click('button[aria-label="Dark mode"]'); await p.waitForTimeout(600);
await p.screenshot({ path: '../zip-sites/screenshots/otis-dark.png' });
await p.setViewportSize({ width: 390, height: 844 }); await p.waitForTimeout(800);
await p.screenshot({ path: '../zip-sites/screenshots/otis-mobile.png', fullPage: true });
await b.close();
