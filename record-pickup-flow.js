const { chromium } = require('playwright');
const path = require('path');
const http = require('http');
const fs = require('fs');
const { execSync } = require('child_process');

const PORT = 8765;
const URL = `http://127.0.0.1:${PORT}/index.html`;
const DIR = __dirname;
const VIEWS = ['neumorphism', 'glassmorphism', 'neubrutalism'];

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// Start a simple file server
function startServer() {
    return new Promise((resolve, reject) => {
        const server = http.createServer((req, res) => {
            const filePath = path.join(DIR, req.url === '/' ? 'index.html' : req.url);
            fs.readFile(filePath, (err, data) => {
                if (err) { res.writeHead(404); res.end('Not found'); return; }
                const ext = path.extname(filePath);
                const mime = {
                    '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
                    '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml',
                    '.webp': 'image/webp', '.json': 'application/json'
                };
                res.writeHead(200, { 'Content-Type': mime[ext] || 'text/plain' });
                res.end(data);
            });
        });
        server.listen(PORT, '127.0.0.1', () => {
            console.log(`Server started on port ${PORT}`);
            resolve(server);
        });
        server.on('error', reject);
    });
}

async function runPickupFlow(page, vi, theme) {
    const V = `V${vi + 1}`;
    console.log(`\n[${V} ${theme}] Running pickup flow...`);

    await page.evaluate(t => {
        const vp = document.querySelectorAll('.phone-viewport');
        return vp[t] && vp[t].textContent.length;
    }, vi);

    await page.evaluate(t => {
        const vp = document.querySelectorAll('.phone-viewport')[t];
        for (const el of vp.querySelectorAll('*')) {
            if ((el.getAttribute('onclick') || '').includes('addToCart(')) {
                el.click();
                break;
            }
        }
    }, vi);
    await sleep(500);

    await page.evaluate(t => {
        const theme = ['neumorphism', 'glassmorphism', 'neubrutalism'][t];
        if (window.addToCart) {
            window.addToCart(theme, { id: 'test-burger', name: 'Classic Burger', price: 12.99, img: '', desc: 'Juicy beef patty' });
        }
    }, vi);
    await sleep(400);
    console.log(`  ${V} Item added -> cart`);

    await page.evaluate(t => {
        const theme = ['neumorphism', 'glassmorphism', 'neubrutalism'][t];
        if (window.navigateToPage) window.navigateToPage(theme, 'cart-page');
    }, vi);
    await sleep(600);
    console.log(`  ${V} Cart page`);

    await page.evaluate(t => {
        const theme = ['neumorphism', 'glassmorphism', 'neubrutalism'][t];
        if (window.proceedToCheckout) window.proceedToCheckout(theme);
    }, vi);
    await sleep(600);
    console.log(`  ${V} Checkout page`);

    await page.evaluate(t => {
        const theme = ['neumorphism', 'glassmorphism', 'neubrutalism'][t];
        if (window.setDeliveryMode) window.setDeliveryMode(theme, 'pickup');
    }, vi);
    await sleep(400);

    await page.evaluate(t => {
        const theme = ['neumorphism', 'glassmorphism', 'neubrutalism'][t];
        if (window.selectBranch) window.selectBranch(theme, 'Downtown NYC');
    }, vi);
    await sleep(300);
    console.log(`  ${V} Pickup mode + branch`);

    await page.evaluate(t => {
        const theme = ['neumorphism', 'glassmorphism', 'neubrutalism'][t];
        if (window.placeOrder) window.placeOrder(theme);
    }, vi);
    await sleep(800);
    console.log(`  ${V} Order placed`);

    await page.evaluate(t => {
        const theme = ['neumorphism', 'glassmorphism', 'neubrutalism'][t];
        if (window.trackOrder) window.trackOrder(theme);
    }, vi);
    await sleep(600);
    console.log(`  ${V} Track order`);

    await page.evaluate(t => {
        const theme = ['neumorphism', 'glassmorphism', 'neubrutalism'][t];
        if (window.navigateToPage) window.navigateToPage(theme, 'tracking-map');
    }, vi);
    await sleep(600);
    console.log(`  ${V} Tracking map`);

    await page.evaluate(t => {
        const theme = ['neumorphism', 'glassmorphism', 'neubrutalism'][t];
        if (window.navigateToPage) window.navigateToPage(theme, 'reviews-page');
    }, vi);
    await sleep(600);
    console.log(`  ${V} Reviews page`);

    await page.evaluate(t => {
        const theme = ['neumorphism', 'glassmorphism', 'neubrutalism'][t];
        if (window.submitReview) window.submitReview(theme);
    }, vi);
    await sleep(600);
    console.log(`  ${V} Review submitted`);
}

async function main() {
    console.log('═══ PICKUP FLOW VIDEO RECORDING ═══\n');

    const server = await startServer();

    try {
        const browser = await chromium.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const outDir = path.resolve(__dirname, 'test-recordings');
        if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

        const context = await browser.newContext({
            viewport: { width: 1920, height: 1080 },
            recordVideo: { dir: outDir, size: { width: 1920, height: 1080 } }
        });

        const page = await context.newPage();
        await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
        await sleep(2000);

        const vpCount = await page.evaluate(() => document.querySelectorAll('.phone-viewport').length);
        console.log(`Found ${vpCount} viewports`);

        for (let vi = 0; vi < 3 && vi < vpCount; vi++) {
            await runPickupFlow(page, vi, VIEWS[vi]);
        }

        console.log('\n═══ Saving video... ═══');
        await context.close();
        await browser.close();

        console.log(`Video saved to: ${outDir}`);
        console.log('Done.');
    } finally {
        server.close();
    }
}

main().catch(e => { console.error('FATAL:', e); process.exit(1); });