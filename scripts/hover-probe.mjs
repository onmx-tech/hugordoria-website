// Sonda do hover dos cards de especialidades: conta mouseenter/mouseleave
// com o cursor parado em pontos críticos do card (centro x borda inferior).
import puppeteer from 'puppeteer-core';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--hide-scrollbars'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });
await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2', timeout: 60000 });
await sleep(1800);

const sectionTop = await page.evaluate(() => {
  const s = document.querySelector('[data-component="especialidades"]');
  return s.getBoundingClientRect().top + window.scrollY;
});
await page.evaluate((y) => window.scrollTo(0, y + 600), sectionTop);
await sleep(1200);

// Instrumenta todos os cards
await page.evaluate(() => {
  window.__hoverLog = [];
  document
    .querySelectorAll('[data-component="especialidades"] [data-card]')
    .forEach((c, i) => {
      c.addEventListener('mouseenter', () =>
        window.__hoverLog.push(`enter#${i}@${performance.now().toFixed(0)}`));
      c.addEventListener('mouseleave', () =>
        window.__hoverLog.push(`leave#${i}@${performance.now().toFixed(0)}`));
    });
});

const box = await page.evaluate(() => {
  const cards = [...document.querySelectorAll('[data-component="especialidades"] [data-card]')];
  const r = cards
    .map((c) => c.getBoundingClientRect())
    .filter((r) => r.left > 0 && r.right < window.innerWidth && r.top >= 0)[0];
  return { x: r.left, y: r.top, w: r.width, h: r.height };
});

async function probe(label, px, py) {
  await page.evaluate(() => (window.__hoverLog.length = 0));
  await page.mouse.move(px, py, { steps: 6 });
  await sleep(1500);
  // mexe 1px para forçar o Chrome a reavaliar o hit-test com o card já assentado
  await page.mouse.move(px + 1, py);
  await sleep(1000);
  const log = await page.evaluate(() => window.__hoverLog.slice());
  const hovered = await page.evaluate(() => {
    const el = document.elementFromPoint(...window.__pt);
    return !!el?.closest('[data-card]')?.style.transform.includes('-10px');
  }).catch(() => null);
  console.log(`\n[${label}] eventos (${log.length}):`, log.join(' '));
  return log;
}

await page.evaluate((b) => (window.__pt = [b.x + b.w / 2, b.y + b.h / 2]), box);
await probe('centro', box.x + box.w / 2, box.y + box.h / 2);
await page.mouse.move(10, 800); await sleep(800);
await probe('borda inferior -4px', box.x + box.w / 2, box.y + box.h - 4);
await page.mouse.move(10, 800); await sleep(800);
await probe('borda inferior -12px', box.x + box.w / 2, box.y + box.h - 12);

await browser.close();
