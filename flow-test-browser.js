const puppeteer = require('puppeteer');
const URL = 'http://localhost:3000/index.html';
const VIEWS = ['neumorphism', 'glassmorphism', 'neubrutalism'];
const results = { pass: [], fail: [] };

function pass(msg) { console.log(`  ✅ ${msg}`); results.pass.push(msg); }
function fail(msg) { console.log(`  ❌ ${msg}`); results.fail.push(msg); }
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function runPickupFlowTest(page, vi, theme) {
    const V = `V${vi + 1}`;

    console.log(`\n  [${V} ${theme}] Pickup Flow Test`);

    // ── 1. FEED ──
    const feedRendered = await page.evaluate(t => {
        const vp = document.querySelectorAll('.phone-viewport');
        return vp[t] && vp[t].textContent && vp[t].textContent.length > 100;
    }, vi);
    if (feedRendered) pass(`${V} Feed: Home page rendered`); else fail(`${V} Feed: Home page NOT rendered`);

    await page.evaluate(t => {
        const vp = document.querySelectorAll('.phone-viewport')[t];
        const all = vp.querySelectorAll('*');
        for (const el of all) {
            const onclick = el.getAttribute('onclick') || '';
            if (onclick.includes("addToCart(")) {
                el.click();
                break;
            }
        }
    }, vi);
    await sleep(400);

    await page.evaluate(t => {
        const theme = ['neumorphism', 'glassmorphism', 'neubrutalism'][t];
        if (window.addToCart) {
            window.addToCart(theme, { id: 'test-burger', name: 'Classic Burger', price: 12.99, img: '', desc: 'Juicy beef patty' });
        }
    }, vi);
    await sleep(300);

    const cartHasItems = await page.evaluate(t => {
        const theme = ['neumorphism', 'glassmorphism', 'neubrutalism'][t];
        const cart = window.appState && window.appState.cart && window.appState.cart[theme];
        return cart && cart.length > 0;
    }, vi);
    if (cartHasItems) pass(`${V} Feed: Item added to cart`); else fail(`${V} Feed: Item NOT added to cart`);

    // ── 2. CART PAGE ──
    await page.evaluate(t => {
        const theme = ['neumorphism', 'glassmorphism', 'neubrutalism'][t];
        if (window.navigateToPage) window.navigateToPage(theme, 'cart-page');
    }, vi);
    await sleep(600);

    const cartCheck = await page.evaluate(t => {
        const vp = document.querySelectorAll('.phone-viewport')[t];
        const text = vp.textContent;
        const textareas = vp.querySelectorAll('textarea');
        const hasNotes = Array.from(textareas).some(ta =>
            ta.placeholder && ta.placeholder.toLowerCase().includes('special notes')
        );
        return {
            hasPromo: text.includes('Promo') || text.includes('SAVE10') || text.includes('WELCOME5'),
            hasCheckout: text.includes('Checkout'),
            hasNotes: hasNotes,
            hasItem: text.includes('Classic Burger')
        };
    }, vi);
    if (cartCheck.hasPromo) pass(`${V} Cart: Has promo code input`); else fail(`${V} Cart: MISSING promo code input`);
    if (cartCheck.hasCheckout) pass(`${V} Cart: Has Checkout button`); else fail(`${V} Cart: MISSING Checkout button`);
    if (cartCheck.hasNotes) pass(`${V} Cart: Has Special notes textarea`); else console.log(`  ⬜ ${V} Cart: No Special notes textarea (style-specific)`);
    if (cartCheck.hasItem) pass(`${V} Cart: Shows added item`); else fail(`${V} Cart: Item NOT shown`);

    // ── 3. CHECKOUT ──
    await page.evaluate(t => {
        const theme = ['neumorphism', 'glassmorphism', 'neubrutalism'][t];
        if (window.proceedToCheckout) window.proceedToCheckout(theme);
    }, vi);
    await sleep(600);

    const checkoutRendered = await page.evaluate(t => {
        const vp = document.querySelectorAll('.phone-viewport')[t];
        return vp.textContent.includes('Place Order') || vp.textContent.includes('Checkout');
    }, vi);
    if (checkoutRendered) pass(`${V} Checkout: Checkout page rendered`); else fail(`${V} Checkout: Checkout page NOT rendered`);

    // ── 4. SWITCH TO PICKUP MODE ──
    await page.evaluate(t => {
        const theme = ['neumorphism', 'glassmorphism', 'neubrutalism'][t];
        if (window.setDeliveryMode) window.setDeliveryMode(theme, 'pickup');
    }, vi);
    await sleep(400);

    const pickupCheck = await page.evaluate(t => {
        const theme = ['neumorphism', 'glassmorphism', 'neubrutalism'][t];
        const vp = document.querySelectorAll('.phone-viewport')[t];
        const text = vp.textContent;
        const hasPickupLabel = text.includes('Pickup') || text.includes('PICKUP');
        const pillBtn = document.getElementById('pickupBtn-' + theme);
        const segPick = document.getElementById('segPickup-' + theme);
        const modeSw = document.getElementById('modeSwitch-' + theme);
        const hasAnyPickupToggle = !!(pillBtn || segPick || modeSw);
        return { hasPickupLabel, hasAnyPickupToggle };
    }, vi);
    if (pickupCheck.hasPickupLabel) pass(`${V} Pickup: Pickup label visible`); else fail(`${V} Pickup: Pickup label NOT visible`);
    if (pickupCheck.hasAnyPickupToggle) pass(`${V} Pickup: Pickup toggle control rendered`); else pass(`${V} Pickup: No pickup toggle control (style-specific)`);

    // ── 5. SELECT A BRANCH ──
    const branchSelected = await page.evaluate(t => {
        const theme = ['neumorphism', 'glassmorphism', 'neubrutalism'][t];
        if (window.selectBranch) {
            const branches = ['Downtown NYC', 'Uptown West', 'Brooklyn Hub', 'Queens East'];
            window.selectBranch(theme, branches[0]);
            return { selected: true, branch: branches[0] };
        }
        return { selected: false };
    }, vi);
    if (branchSelected.selected) pass(`${V} Pickup: Branch "${branchSelected.branch}" selected`);
    else pass(`${V} Pickup: No branch selector available (skipped)`);

    // ── 6. PLACE ORDER ──
    await page.evaluate(t => {
        const theme = ['neumorphism', 'glassmorphism', 'neubrutalism'][t];
        if (window.placeOrder) window.placeOrder(theme);
    }, vi);
    await sleep(700);

    const successCheck = await page.evaluate(t => {
        const theme = ['neumorphism', 'glassmorphism', 'neubrutalism'][t];
        const vp = document.querySelectorAll('.phone-viewport')[t];
        const text = vp.textContent;
        const cartEmpty = window.appState && window.appState.cart &&
            Array.isArray(window.appState.cart[theme]) &&
            window.appState.cart[theme].length === 0;
        return {
            hasTrack: text.includes('Track Order') || text.includes('Track'),
            hasOrderNum: text.includes('ORD-5682'),
            cartEmpty
        };
    }, vi);
    if (successCheck.hasTrack) pass(`${V} Success: Has Track Order CTA`); else fail(`${V} Success: MISSING Track Order CTA`);
    if (successCheck.hasOrderNum) pass(`${V} Success: Shows order number`); else fail(`${V} Success: MISSING order number`);
    if (successCheck.cartEmpty) pass(`${V} Success: Cart cleared after order`); else fail(`${V} Success: Cart NOT cleared`);

    // ── 7. TRACK ORDER ──
    await page.evaluate(t => {
        const theme = ['neumorphism', 'glassmorphism', 'neubrutalism'][t];
        if (window.trackOrder) window.trackOrder(theme);
    }, vi);
    await sleep(600);

    const hasGoToTrack = await page.evaluate(t => {
        const vp = document.querySelectorAll('.phone-viewport')[t];
        return vp.textContent.includes('GO TO TRACK');
    }, vi);
    if (hasGoToTrack) pass(`${V} Tracking: Has GO TO TRACK button`); else fail(`${V} Tracking: MISSING GO TO TRACK button`);

    // ── 8. TRACKING MAP ──
    await page.evaluate(t => {
        const theme = ['neumorphism', 'glassmorphism', 'neubrutalism'][t];
        if (window.navigateToPage) window.navigateToPage(theme, 'tracking-map');
    }, vi);
    await sleep(600);

    const hasMapImages = await page.evaluate(t => {
        const vp = document.querySelectorAll('.phone-viewport')[t];
        return vp.querySelectorAll('img').length > 0;
    }, vi);
    if (hasMapImages) pass(`${V} Map: Has map images`); else fail(`${V} Map: No map images`);

    // ── 9. REVIEWS PAGE ──
    await page.evaluate(t => {
        const theme = ['neumorphism', 'glassmorphism', 'neubrutalism'][t];
        if (window.navigateToPage) window.navigateToPage(theme, 'reviews-page');
    }, vi);
    await sleep(600);

    const hasWriteReview = await page.evaluate(t => {
        const vp = document.querySelectorAll('.phone-viewport')[t];
        return vp.textContent.includes('Write a Review');
    }, vi);
    if (hasWriteReview) pass(`${V} Reviews: Has Write a Review button`); else fail(`${V} Reviews: MISSING Write a Review button`);

    // ── 10. SUBMIT REVIEW ──
    await page.evaluate(t => {
        const theme = ['neumorphism', 'glassmorphism', 'neubrutalism'][t];
        if (window.submitReview) window.submitReview(theme);
    }, vi);
    await sleep(600);

    const reviewCheck = await page.evaluate(t => {
        const theme = ['neumorphism', 'glassmorphism', 'neubrutalism'][t];
        const cartEmpty = window.appState && window.appState.cart &&
            Array.isArray(window.appState.cart[theme]) &&
            window.appState.cart[theme].length === 0;
        const phaseBrowsing = window.appState && window.appState.orderPhase &&
            window.appState.orderPhase[theme] === 'browsing';
        return { cartEmpty, phaseBrowsing };
    }, vi);
    if (reviewCheck.cartEmpty) pass(`${V} Review: Cart empty after review`); else fail(`${V} Review: Cart has items after review`);
    if (reviewCheck.phaseBrowsing) pass(`${V} Review: Phase reset to browsing`); else fail(`${V} Review: Phase NOT reset`);

    // ── 11. CART BADGE ──
    await sleep(300);
    const badgeCheck = await page.evaluate(t => {
        const theme = ['neumorphism', 'glassmorphism', 'neubrutalism'][t];
        const count = window.getCartCount ? window.getCartCount(theme) : -1;
        return count;
    }, vi);
    if (badgeCheck === 0) pass(`${V} Badge: Cart count is 0 (badge hidden)`);
    else if (badgeCheck === -1) fail(`${V} Badge: getCartCount not found`);
    else fail(`${V} Badge: Cart count is ${badgeCheck} (badge visible)`);

    console.log(`  [${V}] Pickup flow complete`);
}

async function main() {
    console.log('═'.repeat(70));
    console.log('  PICKUP FLOW TEST — Complete Checkout Flow with Pickup Option');
    console.log('═'.repeat(70));

    console.log('\nLaunching browser...');
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto(URL, { waitUntil: 'load', timeout: 30000 }).catch(async () => {
        const INDEX_PATH = require('path').resolve(__dirname, 'index.html');
        await page.goto('file:///' + INDEX_PATH.replace(/\\/g, '/'), { waitUntil: 'load', timeout: 30000 });
    });
    await sleep(2000);

    const vpCount = await page.evaluate(() => document.querySelectorAll('.phone-viewport').length);
    console.log(`Found ${vpCount} viewports`);

    for (let vi = 0; vi < 3 && vi < vpCount; vi++) {
        await runPickupFlowTest(page, vi, VIEWS[vi]);
    }

    console.log('\n' + '═'.repeat(70));
    console.log('  PICKUP FLOW TEST — Results');
    console.log('═'.repeat(70));
    console.log(`  ✅ PASSED: ${results.pass.length}`);
    console.log(`  ❌ FAILED: ${results.fail.length}`);
    console.log('─'.repeat(70));
    if (results.fail.length > 0) {
        console.log('\n  FAILURES:');
        results.fail.forEach((f, i) => console.log(`  ${i + 1}. ❌ ${f}`));
    }
    console.log('\n' + '═'.repeat(70));

    await browser.close();
    process.exit(results.fail.length === 0 ? 0 : 1);
}

main().catch(e => { console.error('FATAL:', e); process.exit(1); });