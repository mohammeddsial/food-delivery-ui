# designread.md — AI Design Agent Brief

> **Purpose of this file:** Hand this file to any AI design agent (or human designer) who needs to design a **new screen** for this app **without reading the rest of the repo**. It contains the full context, the locked design system rules, the exact code conventions to stay compatible with, and the specific task brief at the bottom.

---

## 1. Project Snapshot

- **Name:** Food Delivery UI Playground
- **What it is:** A single-file, high-fidelity design engine (`index.html`, ~10,500 lines) that renders **3 mobile phone viewports side-by-side**, each showing the same food-delivery app in a different visual theme. It proves every component/page is theme-agnostic (same markup logic, different tokens).
- **Stack:** Tailwind CDN + custom CSS + vanilla JS. No build step, no framework, no bundler.
- **Deployment:** Vercel, auto-deploys `main`. Live: https://food-delivery-ui-mu.vercel.app/
- **Viewport width:** 375px (standard mobile), phone frame with rounded corners + notch.
- **Repo layout relevant to design work:**
  ```
  index.html                          # the app + all 3 themes (source of truth)
  designs/                            # design references, pattern docs, rendered screenshots
    designread.md                     # ← this file
    rendered/                         # PNG screenshots of the live Home screen per theme
    category-navigation-grid-patterns.md  # example of a "pattern research" doc format
  birthday-reward-patterns.md         # another example of a "pattern research" doc format
  cards-data/
    cards.json                        # structured text/image data for 28+ existing component cards
    screenshots/{theme}/{module}.png  # screenshot of each existing card per theme
    images/{theme}/{module}/          # source images used per card per theme
  FLOW-DOCUMENTATION.md               # full page-by-page navigation/CTA map
  SESSION-RULES.md / OPEN-CODE-RULES.md.txt  # mandatory dev rules (styling law, summarized in §3 below)
  ```

---

## 2. The 3 Locked Theme Views (DO NOT change this mapping)

| Viewport | Theme | Style key | Icon Library | Visual Character |
|---|---|---|---|---|
| **View 1 (Left)** | **Neumorphism** — "Light" | `default` | Lucide | Soft/clean whites, inset+outset soft shadows, fully rounded corners, low contrast, calm |
| **View 2 (Middle)** | **Glassmorphism** — "Dark" | `option 1` | Remix | Dark background, frosted/blurred glass panels, neon/gradient accents, backdrop-blur |
| **View 3 (Right)** | **Neubrutalism** — "Modern" | `option 2` | Tabler | Bold flat colors, crisp 2px black/dark borders, hard offset shadows (`4px 4px 0 #000`), no blur, high contrast |

Every screen/component must be designed **3 times** — once per theme — using the SAME content and layout skeleton, but each theme's own visual language (shadows, borders, radii, colors) applied via tokens, never hand-picked per design.

Reference screenshots of the current Home/Feed screen in each theme (for visual tone only): `designs/rendered/view1-light-neumorphism.png`, `view2-dark-glassmorphism.png`, `view3-modern-neubrutalism.png`.

---

## 3. Non-Negotiable Styling Rules ("Parent-Driven Styling")

**All visual styling must come from CSS variables set by the parent `.phone-viewport.theme-{name}` element — never hardcode colors/radii/shadows.** This is the #1 rule of the codebase (see `SESSION-RULES.md`).

### Required CSS variables

| Category | Variable | Example |
|---|---|---|
| Corners | `--card-radius` | `border-radius: var(--card-radius);` |
| Image corners | `--card-img-radius` | `border-radius: var(--card-img-radius);` |
| Borders | `--card-border` | `border: var(--card-border);` |
| Shadows | `--card-shadow` | `box-shadow: var(--card-shadow);` |
| Spacing | `--card-padding`, `--card-gap` | `padding: var(--card-padding); gap: var(--card-gap);` |
| Typography | `--card-font-size`, `--card-line-height` | |
| Hero height | `--card-hero-height` | |
| Surface color | `--card-bg` | `background: var(--card-bg);` |
| Text color | `--text-primary`, `--text-secondary` | |
| Brand color | `--accent`, `--accent-rgb`, `--accent-light` | |
| Text-on-accent | `--text-on-accent` (usually `#fff`) | |
| Pill/chip surfaces | `--pill-bg`, `--chip-bg`, `--chip-border`, `--chip-shadow` | |
| Dividers | `--border-color` | `border-bottom: 1px solid var(--border-color);` |
| Buttons | `--btn-radius` | |

### Forbidden

- `border-radius: 16px;` → use `var(--card-radius)`
- `box-shadow: 0 4px 20px rgba(...)`; → use `var(--card-shadow)`
- `font-family: 'Inter', sans-serif;` on children → let the parent viewport control font (only override for a deliberate branded heading font)
- `color: #1A1A1A;` → use `var(--text-primary)`
- `background: #FFFFFF;` → use `var(--card-bg)`

### Exception

Small **brand/utility accents** (a gold "FREE DELIVERY" label, a green "Vegan" tag, a logo mark) may be hardcoded. The **main structure** of any screen must remain variable-driven so it automatically re-skins across all 3 themes.

### Observed per-theme derivation pattern (copy this style)

Every existing page-render function derives a small set of local variables at the top, then branches into 3 style blocks:

```js
function drawXPage(theme, style = 'default') {
    const textColor = theme === 'glassmorphism' ? '#fff' : 'var(--text-primary)';
    const subColor  = theme === 'glassmorphism' ? 'rgba(255,255,255,0.5)' : 'var(--text-secondary)';
    const accent    = theme === 'neubrutalism' ? '#FF6B35' : 'var(--accent)';
    const pageBg    = theme === 'glassmorphism' ? 'rgba(20,20,20,0.98)' : 'var(--card-bg)';
    const backBtn   = `<div onclick="goBack('${theme}')" style="width:36px;height:36px;border-radius:50%;
        background:${theme === 'glassmorphism' ? 'rgba(255,255,255,0.1)' : 'var(--pill-bg)'};
        display:flex;align-items:center;justify-content:center;cursor:pointer;">
        ${'/* back-arrow icon */'}</div>`;

    if (style === 'default')  return /* Neumorphism markup */ ``;
    if (style === 'option 1') return /* Glassmorphism markup */ ``;
    return /* option 2 — Neubrutalism markup */ ``;
}
```

---

## 4. App Chrome Conventions (so a new screen fits without breaking anything)

- **Full-page overlay pattern** — every page (not the base feed) is an absolutely-positioned overlay on top of the phone viewport:
  ```html
  <div style="position:absolute;inset:0;background:${pageBg};z-index:100;display:flex;flex-direction:column;">
  ```
- **Header** — `padding:16px; display:flex; align-items:center; gap:12px;` (optionally `border-bottom:1px solid var(--border-color);`), containing the circular `backBtn` (36×36px, `goBack('{theme}')`) + page title (`font-size:16px; font-weight:700; color:${textColor};`).
- **Scrollable body** — `flex:1; overflow-y:auto; padding:16px 16px 80px;` — the **80px bottom padding is mandatory**, it reserves space for the bottom nav bar that renders separately underneath.
- **Bottom nav** — 5–6 tabs (Home / Menu / Rewards / Cart / Profile, sometimes Search), rendered by `generateBottomBar(theme, style)`, NOT part of the page function itself.
- **Navigation:**
  - Go to a page: `navigateToPage(theme, pageId, category?, itemId?)`
  - Go back: `goBack(theme)` — generic pages fall back to the Home feed; only checkout/order-flow pages have special back logic.
- **Empty-state pattern** (reuse verbatim for any "list can be empty" screen):
  ```html
  <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:60px 20px;text-align:center;">
      <div class="empty-state-icon">/* icon */</div>
      <div style="font-size:16px;font-weight:700;color:${textColor};margin-bottom:8px;">No favorites yet</div>
      <div style="font-size:12px;color:${subColor};margin-bottom:20px;">Tap the heart on any item to save it here</div>
      <div onclick="navigateToPage('${theme}','menu-page')" style="padding:12px 24px;background:${accent};color:#fff;border-radius:var(--btn-radius);font-size:13px;font-weight:700;cursor:pointer;">Browse Menu</div>
  </div>
  ```
  `.empty-state-icon` is theme-aware via CSS already (64×64 circle, soft-shadow / glass-blur / hard-border per theme).

---

## 5. Existing Flow Map (condensed — full detail in `FLOW-DOCUMENTATION.md`)

```
Splash → Login → Feed(Home) → Menu → Product Detail → Cart → Checkout → Upsell → Order Success → Order Tracking → Live Map → Reviews → Feed
```

Also existing as standalone destinations: **Rewards**, **Profile Settings**, **Search**, **Add Location/Address**, **Deals & Promotions**.

Per-theme state is tracked with a "dictionary keyed by theme" convention everywhere, e.g.:
```js
window.appState = {
  cart: { neumorphism: [], glassmorphism: [], neubrutalism: [] },
  orderPhase: { neumorphism: 'browsing', glassmorphism: 'browsing', neubrutalism: 'browsing' },
  promoCode: { neumorphism: null, glassmorphism: null, neubrutalism: null }
};
```
`orderPhase` values: `browsing → carted → checkout → placed → tracking` (drives which floating action buttons show).

**Important:** There is currently **no working favorites/wishlist feature**. The heart icon in the top bar (`toggleHeart(theme)`) only toggles ONE decorative global icon — it is NOT wired to individual food items. Every heart icon shown on menu/product cards today is purely decorative (hardcoded gray, no click handler). A real per-item favorites system does not exist yet — see the task below.

---

## 6. Data Available for Sample Content

`MENU_DATA` is a shared array of 6 categories (`breakfast`, `burger`, `pizza`, `salad`, `dessert`, `drinks`), each with an `items[]` array. Item fields: `id`, `name`, `desc`, `price`, `img` (Unsplash URL). No `calories`/`rating` fields exist on this data.

```js
const MENU_DATA = [
  { id: 'breakfast', name: 'Breakfast', icon: 'coffee', count: 7, img: '...', items: [
      { id: 'bf1', name: 'Fluffy Pancakes', desc: 'Maple syrup & butter', price: 9.99, img: '...' },
      { id: 'bf2', name: 'Classic Omelette', desc: '3 eggs, cheese, herbs', price: 8.49, img: '...' },
      // ...
  ]},
  { id: 'burger', ... }, { id: 'pizza', ... }, { id: 'salad', ... }, { id: 'dessert', ... }, { id: 'drinks', ... }
];

function getThemedMenuItems(theme, count) {
  const categoryMap = { neumorphism: [0,1,2], glassmorphism: [3,4,5], neubrutalism: [5,1,0] };
  const cats = categoryMap[theme] || [0,1,2];
  let items = [];
  cats.forEach(idx => { if (MENU_DATA[idx]) items = items.concat(MENU_DATA[idx].items); });
  return count ? items.slice(0, count) : items;
}
```
Use `getThemedMenuItems(theme, N)` to sample 2–4 realistic "favorited" items per theme for mockup content.

---

## 7. State Model to Design Against (for wire-compatibility)

The real implementation will need a new per-theme favorites store, mirroring the existing `cart` pattern exactly:

```js
window.appState.favorites = { neumorphism: [], glassmorphism: [], neubrutalism: [] };

function toggleFavorite(theme, itemId) { /* push/splice itemId in appState.favorites[theme] */ }
function isFavorite(theme, itemId)     { /* return appState.favorites[theme].includes(itemId) */ }
```
Design the screen assuming each favorited entry is a full item object (`id, name, desc, price, img`) resolved from `MENU_DATA`, not just a bare id — i.e., the page renders item cards, not a raw id list.

---

## 8. Registration Checklist (for when the design gets implemented — informational only)

A brand-new page id (e.g. `'favorites-page'`) must eventually be wired into 4 places to become real:
1. `defaultModulesConfig` array — add `{ id: 'favorites-page', name: 'Favorites Page', core: false, enabled: true, style: 'default', styles: ['default','option 1','option 2'] }`
2. `PAGE_VIEW_OPTIONS` array — so it appears in the controller's quick-jump picker
3. Router `switch(currentPage)` inside `renderAllViewports()` — add `case 'favorites-page': pageHtml = drawFavoritesPage(theme, pageStyle); break;`
4. An entry point — e.g. a "Favorites" row in Profile Settings, and/or make the top-bar heart icon and per-item heart icons call `toggleFavorite` + link here (optional stretch goal)

This section is for context only — the design agent's job is the visual/markup design, not this wiring.

---

## 9. THE TASK — Design Brief: "Favorites / Saved Items" Page

### Goal
Design a screen where a user reviews the food items they've hearted/favorited across the menu, and can quickly re-add them to their cart or remove them from favorites.

### Entry points (design for at least one)
- A "Favorites" row/link inside **Profile Settings**
- (Stretch) The top-bar heart icon becoming a real per-item favorites toggle, with the filled-heart icon on menu/product cards deep-linking here

### Required content per item card
- Item image (`img`, ~64–72px thumbnail or a larger hero depending on variant)
- Item name (`name`) and short description (`desc`)
- Price (`price`, formatted `$X.XX`)
- **Remove/unheart icon** (top-right of card or trailing) — removes from favorites in place, no navigation
- **"Add to Cart" button/icon** — calls the same `addToCart(theme, item)` convention used elsewhere, shows a toast, does NOT navigate away
- Optional: badge showing "Added" state briefly after tapping Add to Cart

### Empty state (mandatory)
Use the empty-state pattern from §4: icon + "No favorites yet" + "Tap the heart on any item to save it here" + "Browse Menu" button → `navigateToPage(theme, 'menu-page')`.

### Header
Standard header pattern from §4: back button (→ `goBack(theme)`, returns to Profile Settings or Feed) + title "Favorites" (or "Saved Items").

### Deliverable: 3 distinct variants, one per theme
Each variant should feel native to its theme, not just recolored — vary layout emphasis while keeping the same content set:

| Theme | Style key | Suggested layout direction |
|---|---|---|
| Neumorphism (Light) | `default` | Soft vertical list of rounded cards, inset/outset shadow depth on each row, calm whitespace |
| Glassmorphism (Dark) | `option 1` | Frosted glass cards over a dark background, maybe a 2-column grid with image-forward cards and blurred surfaces, neon accent on the Add-to-Cart button |
| Neubrutalism (Modern) | `option 2` | Bold-bordered list or grid, hard offset shadows, flat saturated accent color on buttons, strong typographic weight on names/prices |

All three MUST use only the CSS variables from §3 — no hardcoded hex colors, radii, or shadows in the structural markup (accent-only exceptions allowed per the exception rule).

### Sample content to design with
Use `getThemedMenuItems(theme, 3)` worth of items per theme (3–4 favorited items is a good default count) plus the empty state as a second state to design.

### Output format expected back
Either:
- Raw HTML/CSS (inline styles using the `var(--...)` tokens, matching the exact structural conventions in §3–4) for all 3 variants, sized to a 375px-wide phone viewport, **or**
- A written design spec in the same format as `birthday-reward-patterns.md` / `designs/category-navigation-grid-patterns.md` (Layout, Visual Elements, states, theme-mapping table) if HTML isn't being produced directly — this project's convention is to document new patterns this way before implementation.

---

## 10. Reference Assets

- `designs/rendered/view1-light-neumorphism.png`, `view2-dark-glassmorphism.png`, `view3-modern-neubrutalism.png` — current Home/Feed screen per theme, for overall visual tone/branding (app names shown are placeholders: "Eaterny" / "NEXT_EATS" / "Food Hub").
- `cards-data/screenshots/{theme}/*.png` — screenshots of all 28+ existing components per theme, useful for card/list visual language reference.
- `birthday-reward-patterns.md`, `designs/category-navigation-grid-patterns.md` — examples of this project's "3-pattern design research doc" format, useful as a template if producing a written spec instead of markup.
</content>
