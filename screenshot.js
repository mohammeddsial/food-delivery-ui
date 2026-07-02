const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('https://food-delivery-ui-mu.vercel.app', { waitUntil: 'networkidle', timeout: 60000 });
  
  // Wait for content to load
  await page.waitForTimeout(5000);
  
  await page.screenshot({ 
    path: 'designs/full-screen-view.png', 
    fullPage: true 
  });
  
  console.log('Screenshot saved to designs/full-screen-view.png');
  
  await browser.close();
})();
