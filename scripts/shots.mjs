/**
 * Capture full-page screenshots of every route for visual review.
 * Usage: node scripts/shots.mjs [width] [outdir]
 */
import { chromium } from '@playwright/test';
import { mkdirSync } from 'node:fs';

const WIDTH = Number(process.argv[2] ?? 1440);
const OUT = process.argv[3] ?? 'tests/.shots';
const BASE = process.env.BASE ?? 'http://localhost:3100';

const routes = [
  ['home', '/'],
  ['about', '/about'],
  ['services', '/services'],
  ['esg', '/esg'],
  ['approach', '/approach'],
  ['resources', '/resources'],
  ['contact', '/contact'],
  ['notfound', '/definitely-not-a-page'],
];

mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: WIDTH, height: 900 },
  deviceScaleFactor: 1,
  ignoreHTTPSErrors: true,
});

for (const [name, path] of routes) {
  await page.goto(BASE + path, { waitUntil: 'networkidle' });
  // let fonts settle and reveal-animations resolve
  await page.evaluate(() => document.fonts.ready);

  // Scroll the whole page to trigger lazy-loaded images, then return to the top.
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.8;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });

  // force any reveal elements visible so screenshots show final state
  await page.evaluate(() =>
    document.querySelectorAll('.reveal').forEach((n) => n.classList.add('is-visible')),
  );

  // wait until every image has actually decoded
  await page
    .waitForFunction(
      () => Array.from(document.images).every((i) => i.complete && i.naturalWidth > 0),
      null,
      { timeout: 15000 },
    )
    .catch(() => console.warn(`  ! ${name}: some images did not finish loading`));

  await page.waitForTimeout(350);

  const file = `${OUT}/${name}-${WIDTH}.png`;
  await page.screenshot({ path: file, fullPage: true });

  const stats = await page.evaluate(() => {
    const de = document.documentElement;
    const imgs = Array.from(document.images);
    return {
      overflow: de.scrollWidth - de.clientWidth,
      images: imgs.length,
      broken: imgs.filter((i) => !i.complete || i.naturalWidth === 0).length,
    };
  });
  console.log(
    `${name.padEnd(10)} ${String(path).padEnd(28)} -> ${file}   overflowX=${stats.overflow}px  images=${stats.images} broken=${stats.broken}`,
  );
}

await browser.close();
console.log('\ndone');
