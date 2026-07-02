# Category Navigation Grid — Design Pattern Research

**Project:** Food Delivery UI Playground  
**Component:** `#12 Category Tiles` — 3 Distinct Pattern Variants  
**Reference Search:** "category tiles food delivery app mobile UI", "food category grid icons mobile design"  
**Reference Assets:** `designs/12-category-tiles.html` (existing 3 variants)

---

## Pattern 1 — Default: Square Grid (8–12 Categories, 2–4 Columns)

### Layout
- **Grid:** CSS Grid, 2–4 equal columns (`grid-template-columns: repeat(auto-fill, minmax(72px, 1fr))`)
- **Count:** 8–12 categories (e.g., Pizza, Burgers, Sushi, Healthy, Desserts, Drinks, Breakfast, Asian, Italian, Mexican, Vegan, Offers)
- **Aspect Ratio:** Square tiles (1:1) — `aspect-ratio: 1 / 1`
- **Gap:** `var(--card-gap)` / `8–12px` (theme-driven)
- **Container Padding:** `var(--card-padding)` / `16px` horizontal
- **Scroll:** None — fits viewport height (max 3 rows on 375px)

### Icon Treatment
- **Container:** `72×72px` (2-col) → `64×64px` (3-col) → `56×56px` (4-col)
- **Shape:** Rounded square — `border-radius: var(--card-img-radius)` / `12–16px`
- **Fill:** `object-fit: cover` on food photography **OR** centered SVG icon (`32×32px`) on tinted background
- **Background Tint:** `var(--accent-light)` / `rgba(var(--accent-rgb), 0.12)` for icon-only tiles
- **Border:** `var(--card-border)` (theme-driven, 1px hairline)

### Active / Selected State
- **Ring:** `2px solid var(--accent)` inset/outset (theme-driven)
- **Background:** `var(--accent-light)` / `rgba(var(--accent-rgb), 0.08)`
- **Icon Tint:** `var(--accent)` (replaces default tint)
- **Label Weight:** `font-weight: 700` (`var(--font-weight-bold)`)
- **Scale:** `transform: scale(0.98)` on press (active), `scale(1.02)` on hover (desktop)

### Typography
- **Label:** `var(--card-font-size)` / `12px` (2-col) → `11px` (3-col) → `10px` (4-col)
- **Weight:** `500` medium (default) → `700` bold (active)
- **Color:** `var(--text-primary)` (default) → `var(--accent)` (active)
- **Line Height:** `1.2`
- **Max Lines:** 1, `text-overflow: ellipsis`, `white-space: nowrap`
- **Alignment:** Centered, `padding-top: 6px`

### Theme Mapping (Parent-Driven)
| Token | Neumorphism | Glassmorphism | Neubrutalism |
|-------|-------------|---------------|--------------|
| `--card-radius` | `20px` | `16px` | `8px` |
| `--card-img-radius` | `16px` | `12px` | `6px` |
| `--card-shadow` | `inset 2px 2px 4px #bebebe, inset -2px -2px 4px #fff` | `0 8px 32px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.6)` | `4px 4px 0 #000` |
| `--card-border` | `none` | `1px solid rgba(255,255,255,0.3)` | `2px solid #000` |
| `--accent-light` | `rgba(var(--accent-rgb), 0.1)` | `rgba(var(--accent-rgb), 0.15)` | `var(--accent)` (solid) |

---

## Pattern 2 — Option 1: Horizontal Scroll — Rounded Pill Icons + Label Below

### Layout
- **Container:** Horizontal scroll (`overflow-x: auto`, `scroll-snap-type: x mandatory`)
- **Items:** `flex-shrink: 0`, `scroll-snap-align: start`
- **Item Width:** `72–80px` fixed (pill width = icon + horizontal padding)
- **Gap:** `12px` (`var(--card-gap)`)
- **Padding:** `16px` horizontal (`var(--card-padding)`), `8px` vertical
- **Scroll Indicators:** Fade mask gradient on right edge (`mask-image: linear-gradient(to right, black 80%, transparent)`)
- **Count:** 8–15+ categories (unbounded horizontal)

### Icon Treatment
- **Pill Container:** `48×48px` circle → `border-radius: 9999px` / `50%`
- **Background:** `var(--accent-light)` (theme-driven tint)
- **Icon:** `24×24px` centered SVG or emoji, tinted `var(--accent)`
- **Alternative (Photo):** `48×48px` circular crop (`border-radius: 50%`, `object-fit: cover`)
- **Shadow:** `var(--card-shadow)` (subtle depth)

### Active / Selected State
- **Pill Ring:** `3px solid var(--accent)` (replaces shadow)
- **Background:** `var(--accent)` (solid) → icon becomes `white` / `var(--text-on-accent)`
- **Label:** `font-weight: 700`, `color: var(--accent)`
- **Pill Expansion:** `width: auto`, `padding: 0 16px` (grows to fit label inline) — **optional "expanded pill" variant**
- **Scroll Snap:** Active item snaps to center (`scroll-snap-align: center` on active)

### Typography
- **Label:** `11px` / `var(--card-font-size-sm)`, `font-weight: 500`
- **Color:** `var(--text-secondary)` (default) → `var(--accent)` (active)
- **Position:** `absolute` below pill, `top: 100% + 6px`, `white-space: nowrap`
- **Max Width:** `72px` (truncates with ellipsis)

### Theme Mapping
| Token | Neumorphism | Glassmorphism | Neubrutalism |
|-------|-------------|---------------|--------------|
| Pill BG (default) | `var(--card-bg)` + inner shadow | `rgba(255,255,255,0.7)` + blur | `var(--card-bg)` |
| Pill BG (active) | `var(--accent)` | `var(--accent)` | `var(--accent)` |
| Pill Shadow | `inset 2px 2px 4px #bebebe, inset -2px -2px 4px #fff` | `0 4px 16px rgba(var(--accent-rgb), 0.2)` | `3px 3px 0 #000` |
| Label Color | `var(--text-secondary)` | `var(--text-secondary)` | `var(--text-secondary)` |

---

## Pattern 3 — Option 2: Minimal Chips / Pills — Wrapping Flow Layout

### Layout
- **Container:** `display: flex`, `flex-wrap: wrap`, `gap: 8px` (`var(--chip-gap)`)
- **Alignment:** `justify-content: flex-start` (left) OR `center` (centered)
- **Padding:** `12px 16px` (`var(--card-padding)`)
- **Max Width:** Viewport width (`375px` mobile)
- **Row Count:** Dynamic (wraps naturally)
- **Item Count:** 6–20+ tags (scannable, dense)

### Chip / Pill Treatment
- **Shape:** Stadium / fully rounded — `border-radius: 9999px` / `50px`
- **Height:** `32px` (compact) / `36px` (comfortable)
- **Horizontal Padding:** `12px` (icon + label) / `16px` (label only)
- **Background:** `var(--chip-bg)` → `var(--card-bg)` (theme-driven)
- **Border:** `var(--chip-border)` → `1px solid var(--card-border-color)`
- **Icon:** `16×16px` leading, `margin-right: 6px`, tinted `var(--text-secondary)`
- **Label:** `13px` / `var(--chip-font-size)`, `font-weight: 500`
- **Gap (icon→label):** `6px`

### Active / Selected State
- **Background:** `var(--accent)` (solid)
- **Border:** `1px solid var(--accent)` (matches bg)
- **Icon Tint:** `var(--text-on-accent)` / `white`
- **Label Color:** `var(--text-on-accent)` / `white`, `font-weight: 600`
- **Shadow:** `var(--chip-shadow-active)` → `0 2px 8px rgba(var(--accent-rgb), 0.3)`
- **Multi-Select:** Checkmark icon (`16×16px`) trailing, replaces category icon

### Typography
- **Font Size:** `13px` / `var(--chip-font-size)` (compact)
- **Weight:** `500` medium (default) → `600` semibold (active)
- **Line Height:** `1` (exact, for vertical centering)
- **Letter Spacing:** `0.01em` (tight)
- **Transform:** None (preserves readability at small size)

### Theme Mapping
| Token | Neumorphism | Glassmorphism | Neubrutalism |
|-------|-------------|---------------|--------------|
| `--chip-bg` | `var(--card-bg)` | `rgba(255,255,255,0.5)` | `var(--card-bg)` |
| `--chip-border` | `none` | `1px solid rgba(255,255,255,0.3)` | `2px solid #000` |
| `--chip-shadow` | `inset 1px 1px 2px #bebebe, inset -1px -1px 2px #fff` | `0 2px 8px rgba(0,0,0,0.05)` | `2px 2px 0 #000` |
| `--chip-shadow-active` | `inset 2px 2px 4px rgba(0,0,0,0.2)` | `0 4px 16px rgba(var(--accent-rgb), 0.3)` | `3px 3px 0 #000` |
| `--text-on-accent` | `#fff` | `#fff` | `#fff` |

---

## Comparison Matrix

| Aspect | Pattern 1: Square Grid | Pattern 2: Horizontal Pills | Pattern 3: Wrapping Chips |
|--------|------------------------|----------------------------|---------------------------|
| **Best For** | 8–12 primary categories | 10+ categories, discoverability | 6–20+ tags, filtering, multi-select |
| **Density** | Low–Medium | Low (horizontal) | High (dense) |
| **Scannability** | Excellent (grid) | Good (horizontal scroll) | Excellent (dense list) |
| **Thumb Reach** | Full grid accessible | Horizontal swipe | All visible, tap-friendly |
| **Icon Emphasis** | High (large square) | High (prominent pill) | Low (small leading icon) |
| **Label Visibility** | Full label always visible | Truncated below pill | Full label inline |
| **Active State** | Ring + bg tint | Pill fill + label color | Full pill fill invert |
| **Theme Adaptability** | High (grid tokens) | High (pill tokens) | High (chip tokens) |
| **RTL Support** | Native (grid) | Scroll direction flip | Native (flex wrap) |
| **A11y** | Grid role, roving tabindex | Scroll region, ARIA label | Button group, ARIA pressed |

---

## Implementation Notes (Parent-Driven Styling)

### Required CSS Variables (Defined in Parent `index.html`)
```css
/* Grid Tokens */
--card-gap: 12px;
--card-padding: 16px;
--card-radius: 16px;
--card-img-radius: 12px;
--card-shadow: 0 2px 12px rgba(0,0,0,0.06);
--card-border: 1px solid rgba(0,0,0,0.06);
--card-bg: #ffffff;
--text-primary: #1a1a1a;
--text-secondary: #888;
--accent: #00615f;
--accent-rgb: 0, 97, 95;
--accent-light: rgba(var(--accent-rgb), 0.12);
--font-weight-medium: 500;
--font-weight-bold: 700;
--card-font-size: 12px;
--card-font-size-sm: 11px;

/* Chip Tokens (Pattern 3) */
--chip-gap: 8px;
--chip-bg: var(--card-bg);
--chip-border: 1px solid rgba(0,0,0,0.06);
--chip-shadow: 0 1px 3px rgba(0,0,0,0.04);
--chip-shadow-active: 0 2px 8px rgba(var(--accent-rgb), 0.3);
--chip-font-size: 13px;
--text-on-accent: #fff;
```

### Variant Switching (in `12-category-tiles.html`)
```html
<!-- Tab buttons -->
<div class="tabs" role="tablist">
  <button role="tab" aria-selected="true" data-variant="grid">Grid</button>
  <button role="tab" aria-selected="false" data-variant="pills">Pills</button>
  <button role="tab" aria-selected="false" data-variant="chips">Chips</button>
</div>

<!-- Variant Panels -->
<div role="tabpanel" data-variant="grid" class="active">...</div>
<div role="tabpanel" data-variant="pills" hidden>...</div>
<div role="tabpanel" data-variant="chips" hidden>...</div>
```

### Accessibility Checklist
- [ ] `role="tablist"` / `role="tab"` / `role="tabpanel"` for variant switcher
- [ ] `aria-selected` on active tab
- [ ] Grid: `role="grid"`, `role="gridcell"`, roving tabindex
- [ ] Horizontal scroll: `aria-label="Categories"`, scrollable region
- [ ] Chips: `role="group"`, `aria-label="Category filters"`, `aria-pressed` on each
- [ ] Focus visible: `outline: 2px solid var(--accent)`, `outline-offset: 2px`
- [ ] Reduced motion: disable scroll-snap animation, scale transitions

---

## Reference Screenshots (from `designs/` folder)
- `designs/12-category-tiles.html` — Current 3 variants (horizontal scroll, 2×2 grid, vertical list)
- `designs/popular-foods.png` — Reference for food photography style
- `designs/Cards_WhiteFoodCards.png` — White card treatment reference
- `designs/dark-food-cards.png` — Dark theme reference

---

## Next Steps
1. **Validate tokens** — Ensure all `--card-*`, `--chip-*` variables exist in parent `index.html` theme definitions
2. **Implement Pattern 1** — Replace V2 (2×2 grid) with full 8–12 category square grid
3. **Implement Pattern 2** — Replace V1 (horizontal scroll) with pill icons + labels
4. **Implement Pattern 3** — New V3: wrapping chip flow (replaces vertical list)
5. **Test all 3 themes** — Neumorphism, Glassmorphism, Neubrutalism
6. **A11y audit** — Keyboard nav, screen reader, reduced motion

---

*Research compiled from food delivery app patterns (Uber Eats, DoorDash, Talabat, Zomato, Deliveroo) and Awwwards-winning mobile UI patterns.*