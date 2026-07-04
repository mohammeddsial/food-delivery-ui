#!/usr/bin/env node
/**
 * Extract all card component data (text content + images + screenshots)
 * from the Food Delivery UI Playground.
 *
 * Usage:
 *   node extract-cards.js
 *
 * Output:
 *   cards-data/
 *     cards.json                          ← structured text + metadata for every card
 *     screenshots/{theme}/{moduleId}.png  ← visual screenshot of each card
 *     images/{theme}/{moduleId}/          ← downloaded <img> files per card
 */
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { chromium } = require('playwright');

const INDEX_PATH = path.resolve(__dirname, 'index.html');
const OUT_DIR = path.resolve(__dirname, 'cards-data');
const SCREENSHOTS_DIR = path.join(OUT_DIR, 'screenshots');
const IMAGES_DIR = path.join(OUT_DIR, 'images');

const THEMES = ['neumorphism', 'glassmorphism', 'neubrutalism'];
const THEME_LABELS = { neumorphism: 'Light', glassmorphism: 'Dark', neubrutalism: 'Modern' };

const CARD_NUMBERS = {
    'announcement-strip': '#01', 'location-header': '#02', 'video-reel-hero': '#03',
    'active-order-tracker': '#04', 'loyalty-card': '#05', 'finish-your-order': '#06',
    'limited-time-deal': '#07', 'order-again': '#08', 'recommended-for-you': '#09',
    'deals-promos': '#10', 'birthday-reward-banner': '#11', 'category-tiles': '#12',
    'meal-deal-combo': '#13', 'featured-items': '#14', 'popular-rail': '#15',
    'offers-carousel': '#16', 'offers-feed': '#17', 'image-mosaic': '#18', 'stories': '#19'
};

const MODULE_IDS = Object.keys(CARD_NUMBERS);

function ensureDir(dir) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function downloadFile(url, destPath) {
    return new Promise((resolve, reject) => {
        const protocol = url.startsWith('https') ? https : http;
        const req = protocol.get(url, { timeout: 15000 }, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                return downloadFile(res.headers.location, destPath).then(resolve).catch(reject);
            }
            if (res.statusCode !== 200) {
                res.resume();
                return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
            }
            const stream = fs.createWriteStream(destPath);
            res.pipe(stream);
            stream.on('finish', () => { stream.close(); resolve(); });
            stream.on('error', reject);
        });
        req.on('error', reject);
        req.on('timeout', () => { req.destroy(); reject(new Error('timeout')); });
    });
}

async function main() {
    ensureDir(OUT_DIR);
    ensureDir(SCREENSHOTS_DIR);
    ensureDir(IMAGES_DIR);

    console.log('Launching browser...');
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1400, height: 900 });

    console.log('Loading index.html...');
    await page.goto('file:///' + INDEX_PATH.replace(/\\/g, '/'), { waitUntil: 'load', timeout: 30000 });
    await page.waitForTimeout(2000);

    // Enable ALL 19 feed modules in all 3 themes
    console.log('Enabling all modules...');
    await page.evaluate(() => {
        const themes = ['neumorphism', 'glassmorphism', 'neubrutalism'];
        const feedModules = [
            'announcement-strip', 'location-header', 'video-reel-hero', 'active-order-tracker',
            'loyalty-card', 'finish-your-order', 'limited-time-deal', 'order-again',
            'recommended-for-you', 'deals-promos', 'birthday-reward-banner', 'category-tiles',
            'meal-deal-combo', 'featured-items', 'popular-rail', 'offers-carousel',
            'offers-feed', 'image-mosaic', 'stories'
        ];
        themes.forEach(theme => {
            if (typeof modulesConfigByTheme !== 'undefined') {
                modulesConfigByTheme[theme].forEach(mod => {
                    if (feedModules.includes(mod.id)) {
                        mod.enabled = true;
                    }
                });
            }
        });
        if (typeof renderAllViewports === 'function') renderAllViewports();
    });
    await page.waitForTimeout(2000);

    // Init lucide icons
    await page.evaluate(() => {
        if (typeof lucide !== 'undefined') lucide.createIcons();
    });
    await page.waitForTimeout(500);

    const results = [];

    for (const theme of THEMES) {
        console.log(`\n--- Theme: ${THEME_LABELS[theme]} (${theme}) ---`);
        const themeSsDir = path.join(SCREENSHOTS_DIR, theme);
        const themeImgDir = path.join(IMAGES_DIR, theme);
        ensureDir(themeSsDir);
        ensureDir(themeImgDir);

        // Get module config for this theme
        const moduleConfigs = await page.evaluate((t) => {
            return modulesConfigByTheme[t]
                .filter(m => m.enabled)
                .map(m => ({ id: m.id, name: m.name, style: m.style }));
        }, theme);

        for (const mod of moduleConfigs) {
            if (!CARD_NUMBERS[mod.id]) continue;

            const selector = `#viewport-${theme} .scrollable-content [data-module="${mod.id}"]`;
            const el = await page.$(selector);
            if (!el) {
                console.log(`  [SKIP] ${mod.id} - element not found`);
                continue;
            }

            // Scroll the card into view within the phone viewport
            await el.evaluate(e => e.scrollIntoView({ block: 'start', behavior: 'instant' }));
            await page.waitForTimeout(200);

            // Extract text content
            const extracted = await el.evaluate((elem) => {
                const fullText = (elem.innerText || '').trim();

                const headings = [...elem.querySelectorAll('h1,h2,h3,h4,h5,h6,[class*="heading"],[class*="title"],[class*="editorial"]')]
                    .map(h => h.textContent.trim())
                    .filter(t => t.length > 0 && t.length < 200);

                const buttons = [...elem.querySelectorAll('button,[role="button"],[class*="add-btn"],[class*="btn"]')]
                    .map(b => b.textContent.trim())
                    .filter(t => t.length > 0 && t.length < 100);

                const prices = [...elem.querySelectorAll('[class*="price"],[class*="Price"]')]
                    .map(p => p.textContent.trim())
                    .filter(t => t.length > 0);

                const badges = [...elem.querySelectorAll('[class*="badge"],[class*="Badge"],[class*="tag"],[class*="Tag"]')]
                    .map(b => b.textContent.trim())
                    .filter(t => t.length > 0 && t.length < 80);

                const images = [...elem.querySelectorAll('img')].map(img => ({
                    src: img.src || img.getAttribute('src') || '',
                    alt: img.alt || '',
                    width: img.naturalWidth || img.width || 0,
                    height: img.naturalHeight || img.height || 0
                }));

                return { fullText, headings, buttons, prices, badges, images };
            });

            // Screenshot the card element
            const ssPath = path.join(themeSsDir, `${mod.id}.png`);
            try {
                await el.screenshot({ path: ssPath, timeout: 10000 });
            } catch (e) {
                console.log(`  [WARN] Screenshot failed for ${mod.id}: ${e.message}`);
            }

            // Download referenced images
            const modImgDir = path.join(themeImgDir, mod.id);
            ensureDir(modImgDir);
            const downloadedImages = [];
            for (let i = 0; i < extracted.images.length; i++) {
                const img = extracted.images[i];
                if (!img.src || img.src.startsWith('data:')) {
                    downloadedImages.push({ ...img, localPath: null });
                    continue;
                }
                const ext = img.src.match(/\.(png|jpg|jpeg|webp|gif)/i) ? '.' + img.src.match(/\.(png|jpg|jpeg|webp|gif)/i)[1] : '.jpg';
                const filename = `img_${String(i + 1).padStart(2, '0')}${ext}`;
                const destPath = path.join(modImgDir, filename);
                try {
                    await downloadFile(img.src, destPath);
                    downloadedImages.push({ ...img, localPath: `images/${theme}/${mod.id}/${filename}` });
                } catch (e) {
                    downloadedImages.push({ ...img, localPath: null, downloadError: e.message });
                }
            }

            results.push({
                moduleId: mod.id,
                moduleName: mod.name,
                cardNumber: CARD_NUMBERS[mod.id] || '',
                theme,
                themeLabel: THEME_LABELS[theme],
                variant: mod.style,
                text: {
                    full: extracted.fullText,
                    headings: extracted.headings,
                    buttons: extracted.buttons,
                    prices: extracted.prices,
                    badges: extracted.badges
                },
                images: downloadedImages,
                screenshot: `screenshots/${theme}/${mod.id}.png`
            });

            console.log(`  [OK] ${CARD_NUMBERS[mod.id]} ${mod.id} (${mod.style}) - ${extracted.images.length} imgs, ${extracted.fullText.length} chars`);
        }
    }

    // Save JSON
    const jsonPath = path.join(OUT_DIR, 'cards.json');
    fs.writeFileSync(jsonPath, JSON.stringify(results, null, 2), 'utf8');
    console.log(`\nSaved ${results.length} card records to cards-data/cards.json`);

    // Summary
    const screenshots = [];
    const downloadedImgs = [];
    function walkDir(dir, base) {
        for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
            const full = path.join(dir, entry.name);
            const rel = path.relative(OUT_DIR, full).replace(/\\/g, '/');
            if (entry.isDirectory()) walkDir(full, base);
            else if (entry.name.endsWith('.png')) screenshots.push(rel);
            else if (/\.(jpg|jpeg|png|webp|gif)$/i.test(entry.name)) downloadedImgs.push(rel);
        }
    }
    walkDir(OUT_DIR, OUT_DIR);

    console.log(`Screenshots: ${screenshots.length}`);
    console.log(`Downloaded images: ${downloadedImgs.length}`);

    await browser.close();
    console.log('\nDone!');
}

main().catch(e => {
    console.error('Extraction failed:', e);
    process.exit(1);
});
