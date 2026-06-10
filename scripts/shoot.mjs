import puppeteer from 'puppeteer-core';
import { mkdirSync } from 'node:fs';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const TARGET = 'http://localhost:5173/';
const OUT = new URL('../.shots/', import.meta.url).pathname;
mkdirSync(OUT, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const viewports = [
  { name: 'desktop', width: 1440, height: 900, dsf: 1.5, mobile: false },
  { name: 'mobile', width: 390, height: 844, dsf: 2, mobile: true },
];

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--hide-scrollbars'],
});

for (const vp of viewports) {
  const page = await browser.newPage();
  await page.setViewport({
    width: vp.width,
    height: vp.height,
    deviceScaleFactor: vp.dsf,
    isMobile: vp.mobile,
    hasTouch: vp.mobile,
  });
  await page.goto(TARGET, { waitUntil: 'networkidle2', timeout: 60000 });
  await sleep(1800);

  const totalHeight = await page.evaluate(() => document.body.scrollHeight);
  const frames = 14; // nº de frames ao longo da página
  for (let i = 0; i < frames; i++) {
    const y = Math.round((totalHeight - vp.height) * (i / (frames - 1)));
    await page.evaluate((_y) => window.scrollTo(0, _y), y);
    await sleep(900); // deixa a animação assentar
    const idx = String(i + 1).padStart(2, '0');
    await page.screenshot({ path: `${OUT}${vp.name}-${idx}.png` });
    console.log(`OK ${vp.name}-${idx}.png  (y=${y})`);
  }

  await page.close();
}

await browser.close();
console.log('DONE ->', OUT);
