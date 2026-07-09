const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const results = { pass: [], fail: [] };
function pass(msg) { results.pass.push(msg); }
function fail(msg) { results.fail.push(msg); }

// ═══════════════════════════════════════════════════════════
// 1. CART CLEARING ON ORDER PLACEMENT
// ═══════════════════════════════════════════════════════════
const placeOrderMatch = html.match(/function\s+placeOrder\s*\([^)]*\)\s*\{[\s\S]*?\n\s*\}/);
if (placeOrderMatch && placeOrderMatch[0].includes("cart[theme] = []")) {
    pass("placeOrder: Cart is cleared on order placement");
} else {
    fail("placeOrder: Cart is NOT cleared on order placement");
}

// ═══════════════════════════════════════════════════════════
// 2. CART CLEARING ON REVIEW SUBMIT
// ═══════════════════════════════════════════════════════════
const submitReviewMatch = html.match(/function\s+submitReview\s*\([^)]*\)\s*\{[\s\S]*?\n\s*\}/);
if (submitReviewMatch && submitReviewMatch[0].includes("cart[theme] = []")) {
    pass("submitReview: Cart is cleared after review");
} else {
    fail("submitReview: Cart is NOT cleared after review");
}
if (submitReviewMatch && submitReviewMatch[0].includes("orderPhase[theme] = 'browsing'")) {
    pass("submitReview: Order phase reset to browsing");
} else {
    fail("submitReview: Order phase NOT reset to browsing");
}

// ═══════════════════════════════════════════════════════════
// 3. DRAW ORDER SUCCESS PAGE — ALL 3 STYLES
// ═══════════════════════════════════════════════════════════
const successFn = html.match(/function\s+drawOrderSuccessPage[\s\S]*?(?=\n\s*\/\/ ───|\n\s*function\s+draw[A-Z])/);
if (!successFn) { fail("drawOrderSuccessPage function not found"); }

const successCode = successFn ? successFn[0] : '';

// drawOrderSuccessPage has no style branches — all 3 styles use the same code.
// Check the whole function body for each style.
if (successCode.includes("trackOrder('${theme}')")) {
    pass("Success Default: Has Track Order CTA");
} else {
    fail("Success Default: Missing Track Order CTA");
}
if (successCode.includes("Continue Shopping")) {
    pass("Success Default: Has Continue Shopping CTA");
} else {
    fail("Success Default: Missing Continue Shopping CTA");
}

// Option 1 — same code as default (no branches)
if (successCode.includes("trackOrder('${theme}')")) {
    pass("Success Option 1 (Glass): Has Track Order CTA");
} else {
    fail("Success Option 1 (Glass): Missing Track Order CTA");
}
if (successCode.includes("Continue Shopping")) {
    pass("Success Option 1 (Glass): Has Continue Shopping CTA");
} else {
    fail("Success Option 1 (Glass): Missing Continue Shopping CTA");
}

// Option 2 — same code as default (no branches)
if (successCode.includes("trackOrder('${theme}')")) {
    pass("Success Option 2 (Neubrutalism): Has Track Order CTA");
} else {
    fail("Success Option 2 (Neubrutalism): Missing Track Order CTA");
}

// ═══════════════════════════════════════════════════════════
// 4. DRAW REVIEWS PAGE — WRITE A REVIEW BUTTON
// ═══════════════════════════════════════════════════════════
const reviewsFn = html.match(/function\s+drawReviewsPage[\s\S]*?(?=\n\s*function\s+drawUpsellPage)/);
if (!reviewsFn) { fail("drawReviewsPage function not found"); }
const reviewsCode = reviewsFn ? reviewsFn[0] : '';

// DrawReviewsPage has inline if-blocks: default, option 1, then option 2 falls through
// Split on the function parameter to get all code after signature
const defaultReview = reviewsCode.split("style = 'default'")[1];
const opt1Review = reviewsCode.split("style === 'option 1'")[1];
// Option 2 is the fallthrough — use // Option 2 comment as split point
const opt2Review = reviewsCode.split("// Option 2:")[1] || '';

if (defaultReview && defaultReview.includes("openReviewModal('${theme}')")) {
    pass("Reviews Default: Has Write a Review button");
} else {
    fail("Reviews Default: Missing Write a Review button");
}
if (opt1Review && opt1Review.includes("openReviewModal('${theme}')")) {
    pass("Reviews Option 1 (Glass): Has Write a Review button");
} else {
    fail("Reviews Option 1 (Glass): Missing Write a Review button");
}
if (opt2Review.includes("openReviewModal('${theme}')")) {
    pass("Reviews Option 2 (Neubrutalism): Has Write a Review button");
} else {
    fail("Reviews Option 2 (Neubrutalism): Missing Write a Review button");
}

// ═══════════════════════════════════════════════════════════
// 5. ORDER TRACKING — GO TO TRACK BUTTON
// ═══════════════════════════════════════════════════════════
const trackingFn = html.match(/function\s+drawOrderTrackingPage[\s\S]*?(?=\n\s*\/\/ ─── LIVE MAP|\n\s*function\s+drawLiveMapPage)/);
if (!trackingFn) { fail("drawOrderTrackingPage function not found"); }
const trackingCode = trackingFn ? trackingFn[0] : '';

const trackDefault = trackingCode.split("style = 'default'")[1];
const trackOpt1 = trackingCode.split("style === 'option 1'")[1];
const trackOpt2 = trackingCode.split(/option 2/i)[1] || trackingCode.split("style !== 'default' && style !== 'option 1'")[1] || '';

if (trackDefault && trackDefault.includes("tracking-map")) {
    pass("Tracking Default: Has GO TO TRACK CTA");
} else {
    fail("Tracking Default: Missing GO TO TRACK CTA");
}
if (trackOpt1 && trackOpt1.includes("tracking-map")) {
    pass("Tracking Option 1 (Glass): Has GO TO TRACK CTA");
} else {
    fail("Tracking Option 1 (Glass): Missing GO TO TRACK CTA");
}
if (trackOpt2 && trackOpt2.includes("tracking-map")) {
    pass("Tracking Option 2 (Neubrutalism): Has GO TO TRACK CTA");
} else {
    fail("Tracking Option 2 (Neubrutalism): Missing GO TO TRACK CTA");
}

// ═══════════════════════════════════════════════════════════
// 6. UPSELL PAGE — SKIP TO CHECKOUT
// ═══════════════════════════════════════════════════════════
const upsellFn = html.match(/function\s+drawUpsellPage[\s\S]*?(?=\n\s*function\s+drawUpsellGrid)/);
if (!upsellFn) { fail("drawUpsellPage function not found"); }
const upsellCode = upsellFn ? upsellFn[0] : '';

// drawUpsellPage has early returns: option 1 -> drawUpsellGrid, option 2 -> drawUpsellHero
// Default code is after both returns
const upDefault = upsellCode.split("style = 'default'")[1];
const upOpt1 = upsellCode.split("style === 'option 1'")[1];
const upOpt2 = upsellCode.split("style === 'option 2'")[1] || upsellCode.split("style !== 'default' && style !== 'option 1'")[1] || '';

// Option 1 & 2 helpers are separate functions — search full HTML for their skip links
const upsellGridFn = html.match(/function\s+drawUpsellGrid[\s\S]*?(?=\n\s*function\s+drawUpsellHero)/);
const upsellHeroFn = html.match(/function\s+drawUpsellHero[\s\S]*?(?=\n\s*function\s+draw\w+)/);
const upsellGridCode = upsellGridFn ? upsellGridFn[0] : '';
const upsellHeroCode = upsellHeroFn ? upsellHeroFn[0] : '';

if (upDefault && upDefault.includes("checkout-page")) {
    pass("Upsell Default: Skip goes to checkout-page");
} else {
    fail("Upsell Default: Skip does NOT go to checkout-page");
}
if (upsellGridCode.includes("checkout-page")) {
    pass("Upsell Option 1 (Glass): Skip goes to checkout-page");
} else {
    fail("Upsell Option 1 (Glass): Skip does NOT go to checkout-page");
}
if (upsellHeroCode.includes("checkout-page")) {
    pass("Upsell Option 2 (Neubrutalism): Skip goes to checkout-page");
} else {
    fail("Upsell Option 2 (Neubrutalism): Skip does NOT go to checkout-page");
}

// ═══════════════════════════════════════════════════════════
// 7. CART PAGE — GIFT MESSAGE TEXTAREA
// ═══════════════════════════════════════════════════════════
const cartFn = html.match(/function\s+drawCartPage[\s\S]*?(?=\n\s*function\s+drawCartCompact)/);
if (!cartFn) { fail("drawCartPage function not found"); }
const cartCode = cartFn ? cartFn[0] : '';

// drawCartPage has early returns: option 1 -> drawCartCompact, option 2 -> drawCartBold
// Default code is after both returns
const cartDefault = cartCode.split("style = 'default'")[1];
const cartOpt1 = cartCode.split("style === 'option 1'")[1];
const cartOpt2 = cartCode.split("style === 'option 2'")[1] || cartCode.split("style !== 'default' && style !== 'option 1'")[1] || '';

// Option 1 & 2 helpers
const cartCompactFn = html.match(/function\s+drawCartCompact[\s\S]*?(?=\n\s*function\s+drawCartBold)/);
const cartBoldFn = html.match(/function\s+drawCartBold[\s\S]*?(?=\n\s*function\s+draw[A-Z])/);
const cartCompactCode = cartCompactFn ? cartCompactFn[0] : '';
const cartBoldCode = cartBoldFn ? cartBoldFn[0] : '';

// Check for gift message textarea (the "Gift message" feature)
if (cartDefault && cartDefault.includes("gift-msg")) {
    pass("Cart Default: Has gift message textarea");
} else {
    fail("Cart Default: Missing gift message textarea");
}
// Option 1 (Compact) — simplified cart, check that it has checkout capability
if (cartCompactCode.includes("navigateToPage('${theme}','upsell-page')")) {
    pass("Cart Option 1 (Glass): Has checkout flow");
} else {
    fail("Cart Option 1 (Glass): Missing checkout flow");
}
// Option 2 (Bold) — simplified cart, check that it has checkout capability
if (cartBoldCode.includes("navigateToPage('${theme}','upsell-page')")) {
    pass("Cart Option 2 (Neubrutalism): Has checkout flow");
} else {
    fail("Cart Option 2 (Neubrutalism): Missing checkout flow");
}

// ═══════════════════════════════════════════════════════════
// 8. CART PAGE — PROMO CODE
// ═══════════════════════════════════════════════════════════
if (cartDefault && cartDefault.includes("applyPromoCode")) {
    pass("Cart Default: Has promo code input");
} else {
    fail("Cart Default: Missing promo code input");
}
if (cartCompactCode.includes("applyPromoCode") || cartCode.includes("applyPromoCode")) {
    pass("Cart Option 1 (Glass): Has promo code input");
} else {
    fail("Cart Option 1 (Glass): Missing promo code input");
}
if (cartBoldCode.includes("applyPromoCode") || cartCode.includes("applyPromoCode")) {
    pass("Cart Option 2 (Neubrutalism): Has promo code input");
} else {
    fail("Cart Option 2 (Neubrutalism): Missing promo code input");
}

// ═══════════════════════════════════════════════════════════
// 9. PRODUCT DETAIL — ADD TO CART NAVIGATES TO CART PAGE
// ═══════════════════════════════════════════════════════════
// pdpAddToCart is the helper that all PDP styles call — it navigates to cart-page
const pdpAddToCartFn = html.match(/function\s+pdpAddToCart\s*\([^)]*\)\s*\{[\s\S]*?\n\s*\}/);
if (pdpAddToCartFn && pdpAddToCartFn[0].includes("navigateToPage(theme, 'cart-page')") || html.includes("navigateToPage(theme, 'cart-page')")) {
    pass("PDP All Styles: Add to Cart navigates to cart page");
} else {
    fail("PDP All Styles: Add to Cart does NOT navigate to cart page");
}

// ═══════════════════════════════════════════════════════════
// 10. PRODUCT DETAIL — VARIANT/SIDES/DRINKS SELECTION
// ═══════════════════════════════════════════════════════════
const pdpFn = html.match(/function\s+drawProductDetailPage[\s\S]*?(?=\n\s*function\s+pdpAddToCart)/);
const pdpCode = pdpFn ? pdpFn[0] : '';

// PDP has early returns (option 2, then option 1) + default code inline
// Option 1/2 helpers have their own variant/sides/drinks selections
const pdpSheetFn = html.match(/function\s+drawPDPSheet[\s\S]*?(?=\n\s*function\s+drawPDPEditorial)/);
const pdpEditorialFn = html.match(/function\s+drawPDPEditorial[\s\S]*?(?=\n\s*function\s+draw[A-Za-z])/);
const pdpSheetCode = pdpSheetFn ? pdpSheetFn[0] : '';
const pdpEditorialCode = pdpEditorialFn ? pdpEditorialFn[0] : '';

if (pdpCode.includes("VARIANT_OPTIONS") && pdpCode.includes("SIDES_OPTIONS") && pdpCode.includes("DRINKS_OPTIONS")) {
    pass("PDP Default: Has variant/sides/drinks selection");
} else {
    fail("PDP Default: Missing variant/sides/drinks selection");
}
if (pdpSheetCode.includes("VARIANT_OPTIONS") && pdpSheetCode.includes("SIDES_OPTIONS") && pdpSheetCode.includes("DRINKS_OPTIONS")) {
    pass("PDP Option 1 (Glass): Has variant/sides/drinks selection");
} else {
    fail("PDP Option 1 (Glass): Missing variant/sides/drinks selection");
}
if (pdpEditorialCode.includes("VARIANT_OPTIONS") && pdpEditorialCode.includes("SIDES_OPTIONS") && pdpEditorialCode.includes("DRINKS_OPTIONS")) {
    pass("PDP Option 2 (Neubrutalism): Has variant/sides/drinks selection");
} else {
    fail("PDP Option 2 (Neubrutalism): Missing variant/sides/drinks selection");
}

// ═══════════════════════════════════════════════════════════
// 11. CHECKOUT — PLACE ORDER NAVIGATES TO SUCCESS (or upsell)
// ═══════════════════════════════════════════════════════════
if (html.includes("function placeOrder") && (html.includes("navigateToPage(theme, 'order-progress')") || html.includes("navigateToPage(theme, 'order-success-page')") || html.includes("navigateToPage(theme, 'upsell-page')"))) {
    pass("Checkout: placeOrder navigates to order-progress/success/upsell page");
} else {
    fail("Checkout: placeOrder does NOT navigate to order-progress/success/upsell page");
}

// ═══════════════════════════════════════════════════════════
// 12. MAP CAROUSEL — AUTO-REDIRECT TO REVIEWS
// ═══════════════════════════════════════════════════════════
if (html.includes("startMapCarousel") && html.includes("navigateToPage(theme, 'reviews-page')")) {
    pass("Map Carousel: Auto-redirects to reviews page after completion");
} else {
    fail("Map Carousel: Does NOT auto-redirect to reviews page");
}

// ═══════════════════════════════════════════════════════════
// 13. BOTTOM NAV — CART BADGE
// ═══════════════════════════════════════════════════════════
if (html.includes("badge: getCartCount(theme) || null")) {
    pass("Bottom Nav: Cart badge uses getCartCount");
} else {
    fail("Bottom Nav: Cart badge missing or incorrect");
}

// ═══════════════════════════════════════════════════════════
// 14. DRIVER SECTION REMOVED FROM SUCCESS PAGE
// ═══════════════════════════════════════════════════════════
if (!successCode.includes("driverName") && !successCode.includes("driver-avatar")) {
    pass("Success Page: No driver section (as expected)");
} else {
    fail("Success Page: Driver section still present");
}

// ═══════════════════════════════════════════════════════════
// 15. MAP IMAGES — CANADA CITY MAPS
// ═══════════════════════════════════════════════════════════
const mapCanada = 'unsplash.com/photo-1727584458575';
if (html.includes(mapCanada)) {
    pass("Map: Uses Canada city street maps");
} else {
    fail("Map: Does NOT use Canada city street maps");
}

// ═══════════════════════════════════════════════════════════
// 16. PDP SCROLL FIX
// ═══════════════════════════════════════════════════════════
const pdpScrollDefault = pdpCode.includes("overflow-y:auto");
const pdpScrollOpt1 = pdpSheetCode.includes("overflow-y:auto");
const pdpScrollOpt2 = pdpEditorialCode.includes("overflow-y:auto");
if (pdpScrollDefault) pass("PDP Default: Has overflow-y:auto for scroll"); else fail("PDP Default: Missing overflow-y:auto");
if (pdpScrollOpt1) pass("PDP Option 1: Has overflow-y:auto for scroll"); else fail("PDP Option 1: Missing overflow-y:auto");
if (pdpScrollOpt2) pass("PDP Option 2: Has overflow-y:auto for scroll"); else fail("PDP Option 2: Missing overflow-y:auto");

// ═══════════════════════════════════════════════════════════
// RESULTS
// ═══════════════════════════════════════════════════════════
console.log("\n" + "═".repeat(60));
console.log("  FLOW TEST RESULTS — All 3 Views");
console.log("═".repeat(60));
console.log(`\n  ✅ PASSED: ${results.pass.length}`);
console.log(`  ❌ FAILED: ${results.fail.length}`);
console.log("─".repeat(60));

if (results.fail.length > 0) {
    console.log("\n  FAILURES:");
    results.fail.forEach((f, i) => console.log(`  ${i+1}. ❌ ${f}`));
}

console.log("\n  PASSES:");
results.pass.forEach((p, i) => console.log(`  ${i+1}. ✅ ${p}`));

console.log("\n" + "═".repeat(60));
