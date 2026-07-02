const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1920, height: 1080 });

  const filePath = path.resolve(__dirname, 'index.html');
  const fileUrl = 'file:///' + filePath.replace(/\\/g, '/');
  console.log('Loading:', fileUrl);

  await page.goto(fileUrl, { waitUntil: 'load' });
  // Wait 4 seconds for CDN resources (fonts, icons, Tailwind) to fully render
  await page.waitForTimeout(4000);

  const outputDir = path.join(__dirname, 'designs', 'rendered');

  const viewports = [
    { selector: '#viewport-neumorphism', filename: 'view1-light-scroll.png' },
    { selector: '#viewport-glassmorphism', filename: 'view2-dark-scroll.png' },
    { selector: '#viewport-neubrutalism', filename: 'view3-modern-scroll.png' },
  ];

  for (const { selector, filename } of viewports) {
    console.log(`\nProcessing ${selector} -> ${filename}`);

    const viewport = await page.$(selector);
    if (!viewport) {
      console.error(`  Could not find ${selector}`);
      continue;
    }

    // Find the .scrollable-content child inside this viewport
    const scrollable = await viewport.$('.scrollable-content');
    if (!scrollable) {
      console.error(`  Could not find .scrollable-content inside ${selector}`);
      continue;
    }

    // Step 1: Scroll the .scrollable-content to the very bottom to trigger lazy loading
    await scrollable.evaluate(el => {
      el.scrollTop = el.scrollHeight;
    });
    console.log('  Scrolled to bottom');
    await page.waitForTimeout(500);

    // Step 2: Scroll back to top
    await scrollable.evaluate(el => {
      el.scrollTop = 0;
    });
    console.log('  Scrolled back to top');
    await page.waitForTimeout(500);

    // Step 3: Temporarily expand the viewport and scrollable-content to full scroll height
    // so the element screenshot captures everything
    const dimensions = await scrollable.evaluate(el => {
      return {
        scrollHeight: el.scrollHeight,
        clientHeight: el.clientHeight,
        originalOverflow: el.style.overflow,
        originalHeight: el.style.height,
      };
    });
    console.log(`  scrollHeight=${dimensions.scrollHeight}, clientHeight=${dimensions.clientHeight}`);

    // Also get the parent viewport's original dimensions
    const vpDimensions = await viewport.evaluate(el => {
      return {
        originalHeight: el.style.height,
        originalOverflow: el.style.overflow,
        computedHeight: getComputedStyle(el).height,
      };
    });
    console.log(`  viewport computedHeight=${vpDimensions.computedHeight}`);

    // Temporarily remove overflow clipping and expand heights to full scroll height
    await viewport.evaluate((el, scrollH) => {
      el.style.height = scrollH + 'px';
      el.style.overflow = 'visible';
    }, dimensions.scrollHeight + 100); // extra padding for bottom nav etc

    await scrollable.evaluate((el, scrollH) => {
      el.style.height = scrollH + 'px';
      el.style.overflow = 'visible';
    }, dimensions.scrollHeight);

    await page.waitForTimeout(300);

    // Take full element screenshot of the viewport (now fully expanded)
    const outputPath = path.join(outputDir, filename);
    await viewport.screenshot({ path: outputPath });
    console.log(`  Saved: ${outputPath}`);

    // Restore original styles
    await viewport.evaluate((el, orig) => {
      el.style.height = orig.originalHeight || '';
      el.style.overflow = orig.originalOverflow || '';
    }, vpDimensions);

    await scrollable.evaluate((el, orig) => {
      el.style.height = orig.originalHeight || '';
      el.style.overflow = orig.originalOverflow || '';
    }, dimensions);

    await page.waitForTimeout(200);
  }

  // Step 5: Full workspace screenshot at 1920x1080
  console.log('\nTaking full workspace screenshot...');
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.waitForTimeout(500);
  const workspacePath = path.join(outputDir, 'full-workspace-latest.png');
  await page.screenshot({ path: workspacePath, fullPage: false });
  console.log(`Saved: ${workspacePath}`);

  await browser.close();
  console.log('\nDone!');
})();
