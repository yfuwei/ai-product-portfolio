/* Screenshot updates use an existing Playwright runtime; no dependency install or server startup. */
const path = require('path');
const fs = require('fs');
const { chromium } = require(process.env.P2_BROWSER_MODULES
  ? path.join(process.env.P2_BROWSER_MODULES, 'playwright')
  : 'playwright');

const base = process.env.P2_PREVIEW_URL ||
  'http://127.0.0.1:4206/ai-product-portfolio/docs/module2-ai-business-requirement-flow/assets/prototype/index.html';
const out = process.env.P2_SCREENSHOT_DIR || path.resolve(__dirname, '../screenshots');
const views = [
  ['case', 'b04-customer-case-workbench.png'],
  ['handoff', 'b04-human-handoff-workbench.png'],
  ['voc', 'b04-voc-improvement-workbench.png']
];

(async () => {
  fs.mkdirSync(out, { recursive: true });
  const localChrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  const executablePath = process.env.P2_CHROME_PATH ||
    (fs.existsSync(localChrome) ? localChrome : undefined);
  const browser = await chromium.launch({ headless: true, executablePath });
  const screenshots = [];
  try {
    for (const [view, file] of views) {
      const page = await browser.newPage({
        viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 1
      });
      const url = new URL(base);
      url.searchParams.set('view', view);
      await page.goto(url.href);
      await page.waitForFunction(() => document.querySelector('#workspace h1'));
      await page.evaluate(() => document.fonts.ready);
      const size = await page.evaluate(() => ({
        width: document.documentElement.scrollWidth,
        height: document.documentElement.scrollHeight
      }));
      if (size.width > 1600 || size.height > 1000) {
        throw Error(`${view} exceeds 1600 × 1000 screenshot canvas: ${size.width} × ${size.height}`);
      }
      await page.screenshot({ path: path.join(out, file), animations: 'disabled' });
      screenshots.push({ view, file, viewport: '1600 × 1000', ...size });
      await page.close();
    }
    fs.writeFileSync(path.join(out, 'b04-render-manifest.json'), JSON.stringify({
      source: 'DOM HTML/CSS/JavaScript rendered in Chromium', mock: true, screenshots
    }, null, 2));
    console.log(JSON.stringify(screenshots, null, 2));
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
