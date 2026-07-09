const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const results = { pass: [], fail: [] };
function pass(msg) { results.pass.push(msg); }
function fail(msg) { results.fail.push(msg); }

console.log('\n' + '='.repeat(60));
console.log('  LEFT PANEL MISSING PAGES TEST');
console.log('='.repeat(60));

// Extract PAGE_VIEW_OPTIONS
const pvoMatch = html.match(/PAGE_VIEW_OPTIONS\s*=\s*\[([\s\S]*?)\];/);
if (!pvoMatch) {
    fail('PAGE_VIEW_OPTIONS not found');
} else {
    const pageIds = [...pvoMatch[1].matchAll(/id:\s*'([^']+)'/g)].map(m => m[1]);
    console.log(`\n  Pages in left panel picker (${pageIds.length}):`);
    pageIds.forEach((id, i) => console.log(`    ${i+1}. ${id}`));

    // Find all draw functions
    const drawFns = [...new Set([...html.matchAll(/function\s+(draw\w+Page)\s*\(/g)].map(m => m[1]))];
    console.log(`\n  Draw functions found (${drawFns.length}):`);
    drawFns.forEach((fn, i) => console.log(`    ${i+1}. ${fn}`));

    // Known mapping: page-id → draw function
    const PAGE_TO_DRAW = {
        'feed': null,             // dashboard, no draw function
        'splash': null,           // rendered inline in renderAllViewports
        'menu-page': 'drawMenuPage',
        'product-detail-page': 'drawProductDetailPage',
        'cart-page': 'drawCartPage',
        'checkout-page': 'drawCheckoutPage',
        'order-success-page': 'drawOrderSuccessPage',
        'order-tracking': 'drawOrderTrackingPage',
        'tracking-map': 'drawLiveMapPage',
        'reviews-page': 'drawReviewsPage',
        'rewards-page': 'drawRewardsPage',
        'upsell-page': 'drawUpsellPage',
        'profile-settings': 'drawProfileSettingsPage',
        'login-page': 'drawLoginPage',
        'add-location': 'drawAddLocationPage',
        'deals-page': 'drawDealsPage',
        'search-page': 'drawSearchPage',
        'subscription-page': 'drawSubscriptionPage',
        'order-progress': 'drawOrderProgressPage',
    };

    console.log('\n  ─── Pages in picker → draw function ───');
    for (const pageId of pageIds) {
        const expectedFn = PAGE_TO_DRAW[pageId];
        if (expectedFn === null) {
            pass(`Page "${pageId}": no draw fn needed (dashboard)`);
        } else if (!expectedFn) {
            fail(`Page "${pageId}": UNKNOWN mapping!`);
        } else if (drawFns.includes(expectedFn)) {
            pass(`Page "${pageId}" → ${expectedFn} ✓`);
        } else {
            fail(`Page "${pageId}" → ${expectedFn} MISSING!`);
        }
    }

    // Reverse map
    const DRAW_TO_PAGE = {};
    for (const [k, v] of Object.entries(PAGE_TO_DRAW)) {
        if (v) DRAW_TO_PAGE[v] = k;
    }

    console.log('\n  ─── Draw functions → listed in picker ───');
    for (const fn of drawFns) {
        const pageId = DRAW_TO_PAGE[fn];
        if (pageId && pageIds.includes(pageId)) {
            pass(`Function ${fn} → page "${pageId}" is in picker ✓`);
        } else if (!pageId) {
            fail(`Function ${fn} → NOT IN PICKER (page missing from left panel!)`);
        }
    }
}

// ─── RESULTS ───
console.log('\n' + '─'.repeat(60));
console.log(`  \u2705 PASSED: ${results.pass.length}`);
console.log(`  \u274C FAILED: ${results.fail.length}`);
console.log('─'.repeat(60));

if (results.fail.length > 0) {
    console.log('\n  FAILURES:');
    results.fail.forEach((f, i) => console.log(`  ${i+1}. \u274C ${f}`));
}

if (results.pass.length > 0) {
    console.log('\n  PASSES:');
    results.pass.forEach((p, i) => console.log(`  ${i+1}. \u2705 ${p}`));
}

console.log('\n' + '='.repeat(60));
process.exit(results.fail.length > 0 ? 1 : 0);
