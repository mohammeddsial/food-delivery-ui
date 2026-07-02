const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const INDEX_PATH = path.resolve(__dirname, 'index.html');
const OUTPUT_DIR = path.resolve(__dirname, 'designs', 'rendered');

(async () => {
  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log('Created output directory:', OUTPUT_DIR);
  }

  const browser = await chromium.launch({ headless: true });

  // --- Full workspace screenshot (1920x1080) ---
  const fullPage = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  await fullPage.goto('file:///' + INDEX_PATH.replace(/\\/g, '/'), { waitUntil: 'load', timeout: 30000 });
  await fullPage.waitForTimeout(3000); // wait for images/renders

  const fullPath = path.join(OUTPUT_DIR, 'full-workspace.png');
  await fullPage.screenshot({ path: fullPath, fullPage: true });
  console.log('Saved:', fullPath);
  await fullPage.close();

  // --- Individual viewport screenshots ---
  // Use a wider viewport so all three phone mockups are visible side by side
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  await page.goto('file:///' + INDEX_PATH.replace(/\\/g, '/'), { waitUntil: 'load', timeout: 30000 });
  await page.waitForTimeout(3000);

  const viewports = [
    { selector: '#viewport-neumorphism', file: 'view1-light-neumorphism.png' },
    { selector: '#viewport-glassmorphism', file: 'view2-dark-glassmorphism.png' },
    { selector: '#viewport-neubrutalism', file: 'view3-modern-neubrutalism.png' },
  ];

  for (const { selector, file } of viewports) {
    const element = await page.$(selector);
    if (!element) {
      console.error(`ERROR: Element not found: ${selector}`);
      continue;
    }
    const outPath = path.join(OUTPUT_DIR, file);
    await element.screenshot({ path: outPath });
    console.log('Saved:', outPath);
  }

  await browser.close();
  console.log('\nAll screenshots complete.');
})();
