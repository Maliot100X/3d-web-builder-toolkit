import { chromium } from 'playwright';
const SS='/workspace/3d-web-toolkit/references-screenshots/phase0';
const jobs=[
 {n:'bedimcode__responsive-pirate-website', url:'http://127.0.0.1:4501/', wait:12000},
 {n:'Live2D__CubismWebSamples', url:'http://127.0.0.1:4502/', wait:15000, click:[720,450]},
 {n:'yuri-os__YuriOS', url:'http://127.0.0.1:4503/', wait:5000, clickText:/enter/i, after:12000},
];
const browser = await chromium.launch({ args: ['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist'] });
for (const j of jobs) {
  const page = await browser.newPage({ viewport:{width:1440,height:900} }); const errs=[];
  page.on('pageerror', e=>errs.push(e.message.slice(0,120)));
  try {
    await page.goto(j.url,{waitUntil:'load',timeout:45000}); await page.waitForTimeout(j.wait);
    await page.screenshot({path:`${SS}/${j.n}-10-interact-a.png`, timeout:30000});
    if (j.click) { await page.mouse.click(...j.click); await page.waitForTimeout(3000); }
    if (j.clickText) { await page.getByText(j.clickText).first().click({timeout:8000}).catch(e=>errs.push('click '+e.message.slice(0,80))); await page.waitForTimeout(j.after); }
    await page.screenshot({path:`${SS}/${j.n}-11-interact-b.png`, timeout:30000});
  } catch(e){ errs.push(e.message.slice(0,120)); }
  console.log(j.n, JSON.stringify(errs)); await page.close();
}
await browser.close();
