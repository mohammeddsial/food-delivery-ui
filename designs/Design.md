# Design.md — Full Screen Catalog for AI Design Agent

> **Purpose:** This is a complete, standalone reference of **every screen** in the Food Delivery UI Playground app, as it exists today across **all 3 theme views**. Give this file to any AI design agent that needs to redesign, extend, or build new screens consistent with the current system — it should not need to read `index.html` directly.
>
> Companion file: `designs/designread.md` (a narrower brief scoped to designing one new screen — "Favorites/Saved Items" — plus the same core system rules). This file is broader: it catalogs everything that **already exists**.

---

## 1. Purpose & How to Use This Document

- Section 2 gives the shared design system (tokens, chrome conventions, brand identity) — read this first, it applies to every screen below.
- Section 3 is the screen-by-screen catalog. Each entry describes what's on screen **today**, broken out per theme, with function names + line numbers in `index.html` for traceability.
- Section 4 lists shared data shapes used across screens.
- Section 5 flags **known inconsistencies** in the current build — places where the "3 themes, 3 variants" promise isn't fully realized yet, or where CTAs are placeholders. Treat these as things to be aware of, not necessarily things to copy.

---

## 2. Shared Design System Reference

### 2.1 The 3 Locked Theme Views (never remap)

| Viewport | Theme | Style key | Icon Library | Brand shown | Visual Character |
|---|---|---|---|---|---|
| View 1 (Left) | **Neumorphism** — Light | `default` | Lucide | "Eaterny" | Soft whites, inset/outset soft shadows, fully rounded corners, calm |
| View 2 (Middle) | **Glassmorphism** — Dark | `option 1` | Remix | "NEXT_EATS" | Dark bg, frosted/blurred glass panels, neon/gradient accents |
| View 3 (Right) | **Neubrutalism** — Modern | `option 2` | Tabler | "Food Hub" | Bold flat colors, hard 1.5–2px borders, offset shadows (`3–4px 3–4px 0 #000`), no blur |

Brand identity per theme (`brandInfo`, ~lines 2186–2199): logo = brand initials on a colored badge (`colorPalettes[theme].colors.Primary`), used consistently on Splash + Login.

### 2.2 CSS Variable Tokens (all screens must use these, not hardcoded values)

| Category | Variable |
|---|---|
| Corners | `--card-radius`, `--card-img-radius`, `--btn-radius` |
| Borders | `--card-border`, `--border-color` |
| Shadows | `--card-shadow` |
| Spacing | `--card-padding`, `--card-gap` |
| Typography | `--card-font-size`, `--card-line-height` |
| Surfaces | `--card-bg`, `--pill-bg` |
| Text | `--text-primary`, `--text-secondary`, `--text-on-accent` |
| Brand | `--accent`, `--accent-rgb`, `--accent-light` |
| Chips | `--chip-bg`, `--chip-border`, `--chip-shadow` |

**Forbidden:** hardcoded hex colors, pixel border-radius, literal box-shadow values, or literal font-family on structural elements. **Exception:** small brand/utility accents (badges, logos) may be hardcoded.

### 2.3 Page Chrome Conventions

- **Overlay pattern:** every non-feed page is `position:absolute;inset:0;z-index:100;display:flex;flex-direction:column;` on top of the phone viewport.
- **Header:** `padding:16px` row with a 36×36 circular back button (`goBack(theme)`) + page title (16px/700).
- **Scroll body:** `flex:1;overflow-y:auto;padding:16px 16px 80px;` — 80px bottom padding is mandatory (reserves space for bottom nav).
- **Bottom nav:** 5–6 tabs (Home/Menu/Rewards/Cart/Profile, sometimes Search), rendered separately by `generateBottomBar(theme, style)`.
- **Empty state:** icon in `.empty-state-icon` circle + bold message + muted subtext + accent CTA button.
- **Navigation:** `navigateToPage(theme, page, cat?, itemId?)` to go forward; `goBack(theme)` to return (generic pages → Feed; checkout/order-flow pages have special-cased back logic tied to `orderPhase`).
- **Function signature convention:** nearly every page function is `drawXPage(theme, style)`, deriving local vars (`textColor`, `subColor`, `accent`, `pageBg`) from `theme`, then branching on `style` (`'default' | 'option 1' | 'option 2'`).

### 2.4 Order Flow State

```js
window.appState = {
  cart: { neumorphism: [], glassmorphism: [], neubrutalism: [] },
  orderPhase: { neumorphism: 'browsing', ... },   // browsing → carted → checkout → placed → tracking
  promoCode: { neumorphism: null, ... }
};
```

---

## 3. Full Screen Catalog (16 screens × 3 themes)

---

### 3.1 Splash Screen — `drawSplashScreen(theme, style)` — lines 7225–7279

**Purpose:** App launch/branding moment before login. **Exit:** auto or manual → `login-page`.

| Variant | Layout | Distinctive treatment |
|---|---|---|
| **default** (Neumorphism) | Centered column: logo badge → brand name → tagline "Fresh · Fast · Delicious" → spinner ring | Auto-navigates via `setTimeout(2000ms)` |
| **option 1** (Glassmorphism) | Full-bleed diagonal gradient bg, faint rotated food-emoji grid texture behind content, circular translucent logo badge, white pill "Get Started" button | **No auto-timer** — only manual CTA click navigates; only variant with decorative background texture |
| **option 2** (Neubrutalism) | Same centered layout as default, pulsing scale animation on logo, **progress bar** at bottom instead of spinner | Auto-navigates via `setTimeout(2000ms)` |

---

### 3.2 Login Page — `drawLoginPage(theme, style)` — lines 7282–7408

**Purpose:** Authentication. **Exit:** all paths → `feed`.

| Variant | Login methods | Layout notes |
|---|---|---|
| **default** | Email + Password fields, "Forgot Password?", Sign In button, OR divider, Google, Apple, "Sign Up" link | Light bg, square (16px) logo badge, "Welcome Back" heading, form-style with pre-filled demo creds |
| **option 1** | Google, Apple, "Continue with Phone", OR divider, Email field, Continue with Email button | Vertical gradient bg, **circular** logo badge, brand name as heading, social-first ordering, Terms/Privacy footer |
| **option 2** | Single phone-or-email field, Continue button, OR divider, 3 icon-only social buttons, "Create Account" link | **Most distinct:** full dark/black bg, content bottom-anchored, large editorial headline "Order food you love." instead of logo block — no logo badge at all |

---

### 3.3 Feed / Home — assembled dynamically, no single draw function (rendered in `renderAllViewports()`, ~line 3714+)

**Purpose:** Main landing page; a stack of modular cards rendered per theme from `modulesConfigByTheme[theme]`.

Module order (enabled-by-default, `defaultModulesConfig` ~lines 1843–1878): announcement-strip → location-header → video-reel-hero → loyalty-card → category-tiles → limited-time-deal → order-again → recommended-for-you → deals-promos → featured-items → popular-rail → offers-carousel → offers-feed → image-mosaic → stories → ai-personalize. (`active-order-tracker`, `finish-your-order`, `birthday-reward-banner`, `meal-deal-combo` exist but are **off by default**.)

Each module has its own 3-variant `draw*` function (documented separately per component in `cards-data/` and pattern docs like `birthday-reward-patterns.md`) — not expanded here since Feed is a composition, not a single screen design.

Entry points into other screens from Feed: category tile → `menu-page` (filtered), food card → `product-detail-page`, location selector → location bottom sheet, cart FAB → `cart-page`, tracker FAB → `order-tracking`.

---

### 3.4 Menu Page — `drawMenuPage(theme, style, cat)` — lines 5607–5878

**Purpose:** Browse categories + items. **Exit:** item card → `product-detail-page`.

| Variant | Layout | Distinctive treatment |
|---|---|---|
| **default** | Header + search bar → category **list** (image-left rows, count, chevron) → tapping swaps to 2-col item grid (image/name/price/+button) | Classic list-then-grid drill-down |
| **option 1** | Dark gradient bg; **split-screen**: 72px fixed left icon-rail of category pills (active = amber glow) + scrollable right pane of glass item rows (blur 20px) | Only variant with a persistent side-nav rail instead of full-width sections |
| **option 2** | Header/search with hard borders + shadows; **Featured hero card** (first item, "FEATURED" badge, heart icon) → horizontal category **chips** → "POPULAR ITEMS" grid (8 items, heart icons, hard shadows) | Only variant with a featured-hero + heart-icon-on-every-card treatment |

---

### 3.5 Product Detail Page — `drawProductDetailPage(theme, style)` — lines 5937–6254

**Purpose:** Item customization + add to cart. **Exit:** Add to Cart → `cart-page` (all variants, via `addToCart` + `animateFlyToCart` + `navigateToPage`).

| Variant | Layout | Distinctive treatment |
|---|---|---|
| **default** | 250px hero + 360° pano overlay + "Watch Video" overlay; body: price/cal/rating pill → Size pills → Variant pills → Sides chips → Drink chips → "Make it a Meal" banner (→ `upsell-page`); sticky footer Add to Cart | **Only variant** with 360° pano viewer + product video overlay + explicit upsell banner link |
| **option 1** | 220px hero; glass bottom-sheet overlaps hero (-24px margin, drag handle); body: 3 stat chips → emoji-based Size cards (🍔) → Add-ons chips (Extra Cheese/Bacon/Avocado) → Variant/Sides/Drink chips; footer has **qty stepper** + glowing Add to Cart | Only variant with drag-handle bottom-sheet, emoji size selector, and quantity stepper |
| **option 2** | 270px darkened hero with name/desc overlaid directly on image; stat card (price\|cal\|rating divided by lines) with hard shadow; **checkbox-style "Customize Your Order"** list (Extra Cheese/No Onions/Add Bacon/Gluten-Free Bun) with press-down animation; footer button flattens shadow on mousedown | Only variant with checkbox-style customization list + brutalist "pressed" button animation |

---

### 3.6 Cart Page — `drawCartPage(theme, style)` — lines 6272–6448

**Purpose:** Review/edit cart. **Exit:** Checkout button → `checkout-page` (`proceedToCheckout`).

| Variant | Layout | Distinctive treatment |
|---|---|---|
| **default** | Header (title + item count) → full-size item cards → notes textarea → promo code row → order summary → sticky "Checkout - $total" footer | Baseline pattern; empty state = bag icon + "Browse Menu" CTA |
| **option 1** | Header ("Your Items" + "Swipe to delete" hint, no count badge) → same item cards → "Order Summary" card with heading + **"Estimated delivery: 25–35 min"** line | Only variant showing an ETA estimate inline in cart |
| **option 2** | Header (title + pill count badge) → **compact single-row items** (40px thumb, inline qty/remove/price, denser) → footer split into left price block + right "Checkout" button (side-by-side, not stacked) | Only variant with a compact row list + side-by-side footer layout |

Promo codes (identical across themes): `SAVE10` (10% off), `FREEDEL` (free delivery), `WELCOME5` ($5 off).

---

### 3.7 Checkout Page — `drawCheckoutPage(theme, style)` — lines 6451–6659

**Purpose:** Address/time/payment selection. **Exit:** "Place Order" → `order-success-page` (`placeOrder`).

| Variant | Layout | Distinctive treatment |
|---|---|---|
| **default** | 3-step progress indicator (Cart✓→Pay→Done) → Address card (+Change → `add-location`) → Delivery Time (tabs + slot grid) → Payment (3-tile picker) → Order summary → "Place Order" footer | Baseline: always-expanded cards + step indicator |
| **option 1** | Same header, but **Address/Time/Payment are collapsible accordions** (Address open by default, others closed); Order Summary always visible with a "Tip: 15%" line | **Only variant using accordion UI** — no step indicator here |
| **option 2** | Same step-indicator + always-expanded cards as default, but every card gets hard 1.5px borders + `3px 3px 0` offset shadows and 4px corner radius | Sharper/harder visual weight, same structure as default |

---

### 3.8 Upsell Page — `drawUpsellPage(theme, style)` — lines 6976–7089

**Purpose:** Add-on cross-sell before order success. **Reached from:** PDP's "Make it a Meal" banner (default theme only). **Exit:** "No thanks, skip" → `order-success-page`.

| Variant | Layout | Distinctive treatment |
|---|---|---|
| **default** | Horizontal scroll of 4 add-on cards (img/name/price/Add button, toast-only) → "Meal Bundle" promo card ($6.99, was $8.99) → "No thanks, skip add-ons" link | Baseline horizontal scroller |
| **option 1** | "Bundle Discount" banner → **2×2 grid** of same 4 items with checkbox overlays (multi-select) → footer "Add Selected (2) - $7.49" (hardcoded, not dynamic to selection) | Only variant with multi-select checkboxes + grid layout |
| **option 2** | **Full dark bg regardless of theme**, content bottom-anchored; floating "Skip" pill (no header/back button); single hero feature card (Craft Latte, "Add for $3.50") → "More to love" row of 2 **non-interactive** cards | Most divergent structurally; secondary cards are visual-only (no onclick) |

---

### 3.9 Order Success Page — `drawOrderSuccessPage(theme, style)` — lines 6662–6726

**Purpose:** Order confirmation. **Exit:** "Track Order" → `order-tracking` (`trackOrder`); "Continue Shopping" → `goBack` (Feed).

| Variant | Layout | Distinctive treatment |
|---|---|---|
| **default** | Check icon → "Order Placed!" → Order # → live countdown timer (36px) → 120px map image w/ pin → Track Order CTA → Continue Shopping link | Only variant with a live countdown display |
| **option 1** | 🎉 icon → "Order Confirmed!" → itemized **Order Summary card** (line items + total) → separate ETA pill card (25–35 min) | Only variant showing itemized line items on this screen |
| **option 2** | Pulsing check circle (custom `@keyframes pulse`) → "Success!" → Order # → order summary card → **"Download Receipt" link** → Track Order CTA | Only variant with a receipt-download affordance |

---

### 3.10 Order Tracking Page — `drawOrderTrackingPage(theme, style)` — lines 5224–5394

**Purpose:** Track order progress with a map carousel. **Exit:** "GO TO TRACK" → `tracking-map`.

| Variant | Layout | Distinctive treatment |
|---|---|---|
| **default** | Header → Order # + big countdown → 3-step dot tracker (Received→On the way→Delivered) → map-carousel (300×120) → status text → "GO TO TRACK" (outlined) | Baseline step-tracker-above-map layout |
| **option 1** | Map-carousel fills top 45% (full-bleed) → bottom sheet overlaps map (-20px), drag handle, item/address details, richer vertical timeline w/ timestamps → "GO TO TRACK" (filled) | Only variant showing item + full delivery address inline |
| **option 2** | Forced dark map (`brightness(0.6)`) regardless of theme; route dot further along path; "Driver" label (vs "Restaurant"); bottom sheet's active step gets a **highlighted accent pill** ("Driver is arriving") | Only variant with a highlighted current-step callout |

**Shared mechanic:** `MAP_FRAMES` (5 frames) auto-cycle every 2.5s (`startMapCarousel`); after frame 5, auto-navigates to `reviews-page` after a 2s delay — same for all 3 themes.

---

### 3.11 Live Map / "tracking-map" — ⚠️ see inconsistency note in §5

**Purpose (intended):** Real-time driver map with Call Driver / Track / Cancel / SOS actions.

**As actually routed today:** `currentPage = 'tracking-map'` renders `drawOrderTrackingPage(theme, 'option 1')` for **all 3 themes** (hardcoded) — i.e., it looks identical to §3.10's option-1 layout regardless of theme, just recolored.

**The theme-aware version that matches the intended design** — `drawLiveMapPage(theme, style)`, lines 5397–5519 — exists but is wired to a different, currently-unreachable-in-normal-flow page id (`'live-map'`, only reachable via a bottom-nav map icon in some variants):

| Variant | Layout | Buttons |
|---|---|---|
| **default** | Full-bleed map + truck-icon pin w/ glow ring; bottom rounded card (driver photo/name/car/rating + phone-icon button); "Arriving in 12–15 min" pill | **Call Driver** (accent, placeholder `onclick=""`) + **Cancel** (→ `goBack`) |
| **option 1** | Full-bleed dark map; glass bottom sheet (no card box); driver row w/ pulsing dot; 4-stage horizontal progress labels (Prep→Quality Check→**On the Way**→Delivered) | **Track Order** (single button, placeholder) — **no Cancel/SOS at all** |
| **option 2** | Shorter map (40%) w/ diagonal accent-line decoration; two stacked hard-bordered cards (Live Status + Driver info) | **Cancel** (→ `goBack`) + **SOS** (red `#E53935`, placeholder) |

---

### 3.12 Reviews Page — `drawReviewsPage(theme, style)` — lines 6729–6852

**Purpose:** Post-delivery ratings/reviews. **Exit:** "Write a Review" → review modal → `submitReview` → Feed (clears cart).

| Variant | Layout | Distinctive treatment |
|---|---|---|
| **default** | Rating card ("4.5" + stars + 128 reviews) with **per-star % breakdown bars** (5★68%...1★1%) → 3 reviews (w/ photo thumbnails on one) → "Write a Review" footer | Only variant with star-percentage breakdown bars |
| **option 1** | Larger centered rating (40px) → **"Rate Your Experience" tag cloud** (7 pills: Fast Delivery, Fresh Food, etc.) → only 2 reviews shown, simpler | Only variant with a rate-tag cloud |
| **option 2** | Compact inline rating strip → **sort filter chips** (Most Recent/Highest/Lowest) → boxed review cards with a decorative "← swipe" hint | Only variant with sort chips + swipe hint (both decorative, not wired) |

All variants share the same 4.5/128-review dataset and reviewer names (Alex K., Sarah M., James R.).

---

### 3.13 Rewards Page — `drawRewardsPage(theme, style)` — lines 6855–6973

**Purpose:** Loyalty points/perks. **Exit:** none (destination page; back → previous).

| Variant | Layout | Distinctive treatment |
|---|---|---|
| **default** | Gradient hero (820 pts, Silver→Gold→Platinum progress bar) → 2×2 Perks grid → Recent Activity list → refer-a-friend banner | Only variant with a tier-ladder progress bar |
| **option 1** | Centered trophy + "Gold Member" → **circular SVG progress ring** gauge → horizontal-scroll perk chips (2 locked) → streak card (🔥 5-week) → gradient birthday-bonus banner | Only variant with a circular ring gauge + streak gamification |
| **option 2** | Balance card (points + cash value side by side) → 3×2 "Quick Redeem" grid → Earn Rate strip → referral code row w/ **working clipboard copy** | Only variant with functional copy-to-clipboard |

---

### 3.14 Profile Settings Page — `drawProfileSettingsPage(theme, style)` — lines 7092–7222

**Purpose:** Account management. **Exit:** none (destination page).

| Variant | Layout | Distinctive treatment |
|---|---|---|
| **default** | Centered avatar/name/email → 4 grouped card sections (Account/Notifications/Preferences/Support incl. red Logout) | Classic iOS-style grouped settings |
| **option 1** | Tappable profile summary card (avatar+chevron) → uppercase-label groups w/ icon-led navigational rows (Personal Info/Payment/Addresses/Order History) → Logout as plain red text row | Only variant with chevron-nav rows suggesting sub-pages |
| **option 2** | Avatar with edit-pencil badge overlay → **single flat list** (no section grouping) → "Delete Account" (red, destructive) instead of Logout | Only variant with a flat unsectioned list + destructive delete action |

All actions besides `goBack` are non-functional placeholders (`alert()`/toggles) in every variant.

---

### 3.15 Add Location Page — `drawAddLocationPage(theme, style)` — lines 7411–7549

**Purpose:** Add/edit a delivery address. **Reached from:** Checkout's "+Change" link.

| Variant | Layout | Exit CTA |
|---|---|---|
| **default** | Green map placeholder w/ pin → stacked field rows (Address 1/2, City, ZIP) → label pills (Home/Work/Other) → Delivery Instructions textarea | "Save Address" → **`navigateToPage('checkout-page')`** (treats this as a forward step) |
| **option 1** | Inline "Save" text button in header; smaller map preview w/ "Tap to adjust pin" pill; card-grouped inline fields (label-left/value-right) | "Save Address" → **`goBack(theme)`** |
| **option 2** | Larger map preview w/ location chip caption; **floating/outlined-label** fields (Material-style); 2-col City/ZIP grid; strongest hard-border/shadow treatment | "Save Address" → **`goBack(theme)`** |

Address field values are identical across variants; only default's CTA destination differs from the other two.

---

### 3.16 Deals & Promotions Page — `drawDealsPage(theme, style)` — lines 7552–7671

**Purpose:** Browse promo codes/offers. Content (deal names/codes) differs **by style variant**, not by theme.

| Variant | Layout | Distinctive treatment |
|---|---|---|
| **default** | Gradient hero "30% OFF Today's Best" → horizontal filter pills (All/Delivery/Pickup/New User) → 3 stacked full-width gradient deal cards (Claim → alert) → promo-code entry row | List of stacked hero-style cards |
| **option 1** | "Offers" header + filter icon → **2×2 grid** of colorful gradient promo tiles → refer-a-friend card w/ Share button | Grid-of-tiles instead of stacked list |
| **option 2** | **Vertical timeline** layout (icon nodes + connector line), each linked to a card w/ colored left-border matching its icon, code badge + Apply | Only variant using a timeline/connector visual metaphor |

---

### 3.17 Search Page — `drawSearchPage(theme, style)` — lines 7673–7749 (+ `filterSearchResults` 7715–7749)

**Purpose:** Search/filter menu items. **Exit:** result row → `menu-page`.

⚠️ **This page has only one structural layout** — the `style` parameter is accepted but never branched on (`if (style === ...)` doesn't exist here). Only **theme colors/shapes** vary (search bar style, chip glow, corner radii), not layout structure, unlike every other page in this catalog.

Shared layout (all themes): header w/ back + live search input → brief skeleton-loader flash → horizontal category chips (Pizza/Burgers/Sushi/Drinks/Desserts/Salads) → "Popular Results" label → 5-item result list, each with inline "Add" button.

Theme-only differences: Neubrutalism = thick borders + hard shadows + yellow rating badge; Glassmorphism = frosted blur + glowing active chip; Neumorphism = soft inset/outset search bar + pill chips.

---

## 4. Shared Data Reference

```js
// Menu content — shared array, 6 categories, sampled per theme via getThemedMenuItems()
const MENU_DATA = [
  { id: 'breakfast', name: 'Breakfast', icon: 'coffee', count: 7, img: '...', items: [
      { id: 'bf1', name: 'Fluffy Pancakes', desc: 'Maple syrup & butter', price: 9.99, img: '...' },
      // ...
  ]},
  { id: 'burger', ... }, { id: 'pizza', ... }, { id: 'salad', ... }, { id: 'dessert', ... }, { id: 'drinks', ... }
];

function getThemedMenuItems(theme, count) {
  const categoryMap = { neumorphism: [0,1,2], glassmorphism: [3,4,5], neubrutalism: [5,1,0] };
  // returns `count` items sampled from the mapped categories for that theme
}

// Promo codes (identical across all themes)
SAVE10    → 10% off
FREEDEL   → free delivery
WELCOME5  → $5 off

// Brand identity per theme
brandInfo = {
  neumorphism:  { name: 'Eaterny' },
  glassmorphism:{ name: 'NEXT_EATS' },
  neubrutalism: { name: 'Food Hub' }
}
```

---

## 5. Known Inconsistencies (current-state notes — read before "fixing" anything)

1. **`tracking-map` page is not actually theme-aware.** The router hardcodes it to always render `drawOrderTrackingPage(theme, 'option 1')` regardless of theme — so View 1/2/3 look the same (just recolored) on this screen. The intended 3-variant design (Call Driver/Track Order/Cancel+SOS, described in `FLOW-DOCUMENTATION.md`) lives in a separate function, `drawLiveMapPage()`, wired to an unrelated/unreachable page id (`'live-map'`). If asked to "fix" tracking-map, the real 3-variant content already exists and just needs correct routing.
2. **`search-page` has no per-style variation.** Its `styles: ['default','option 1','option 2']` config entry is effectively decorative — only theme colors change, not layout. If asked to give Search 3 distinct variants (like every other page), that's new design work, not a bug fix.
3. **Several CTAs are non-functional placeholders** across pages (demo-only, `alert()` or empty `onclick=""`): Logout, Delete Account, Call Driver, SOS, Track Order (live-map), Claim/Apply on Rewards & Deals pages. These are intentionally stubbed for this design-only playground — don't assume they reflect real backend behavior.
4. **Upsell option 2's secondary cards are non-interactive** (no onclick) — visual-only, unlike the primary hero card on that same screen.
5. **`add-location` default variant navigates forward to `checkout-page`** on Save, while option 1 and option 2 navigate `goBack()` instead — an intentional-looking but inconsistent pattern (default treats the page as a forward step in checkout; the other two treat it as a modal-like detour).
6. **No real favorites/wishlist feature exists anywhere in this catalog.** Every heart icon shown on menu/product cards is decorative (hardcoded, no click handler) except the single global top-bar heart (`toggleHeart`), which toggles one icon and is unrelated to individual items. See `designs/designread.md` for the task brief to design this as a new screen.

---

## 6. Reference Assets

- `designs/rendered/view1-light-neumorphism.png`, `view2-dark-glassmorphism.png`, `view3-modern-neubrutalism.png` — current Home/Feed screen per theme (visual tone reference).
- `cards-data/screenshots/{theme}/*.png` — screenshots of all 28+ home-feed component cards per theme.
- `FLOW-DOCUMENTATION.md` — full original CTA/navigation map (note: §9 of that file is stale regarding `tracking-map` vs `live-map`, corrected in §5.1 above).
- `designs/designread.md` — system rules + the Favorites/Saved Items new-screen task brief.
