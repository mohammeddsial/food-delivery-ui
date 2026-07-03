# PROJECT-BACKGROUND.md (Food Delivery UI Playground)

Optional reference for full project context. The mandatory rules are in [SESSION-RULES.md](SESSION-RULES.md).

---

## Project Overview

- **Name:** Food Delivery UI Playground
- **Description:** A high‑fidelity design workbench with 3 themed mobile viewports (Neumorphism, Glassmorphism, Neubrutalism) showing reusable UI components for a food delivery app.
- **Architecture:** Single self‑contained HTML files with Tailwind CDN + custom CSS + vanilla JS.
- **Deployment:** Hosted on **Vercel** – every push to `main` auto‑deploys.
- **Live URL:** https://food-delivery-ui-mu.vercel.app/

---

## File Structure

```
/
├── index.html              # Main design engine (3 viewports + controller)
├── OPEN-CODE-RULES.md      # Complete development rules
├── SESSION-RULES.md        # Mandatory rules for AI sessions
├── PROJECT-BACKGROUND.md   # This file – optional context
├── viewport-light.html     # Standalone Light viewport (screenshots)
├── viewport-dark.html      # Standalone Dark viewport (screenshots)
├── viewport-modern.html    # Standalone Modern viewport (screenshots)
├── birthday-reward-patterns.md # Design patterns reference
├── build-viewports.js      # Node script to generate standalone viewports
├── take-screenshots.js     # Playwright script to capture viewport screenshots
├── screenshot.js           # Simple Playwright screenshot script
├── smoke-test.js           # Playwright smoke test for index.html
└── upload-figma.js         # Node script to upload screenshots to Figma
```

---

## The 3 Themes (Viewports)

| Viewport | Theme | Icon Library | Visual Style |
|----------|-------|--------------|--------------|
| Left     | **Neumorphism** (Light) | Lucide | Soft shadows, clean whites, rounded corners |
| Middle   | **Glassmorphism** (Dark) | Remix | Frosted glass, blurred backgrounds, neon accents |
| Right    | **Neubrutalism** (Modern) | Tabler | Bold colours, crisp borders, flat shadows |

Each viewport applies its own colour palette, font family, and icon library to the same shared card layouts — proving the components are truly theme‑agnostic.

---

## Component Development Workflow

### Image‑to‑Code Process
1. **Analyze Layout** – Identify structure (Image Top, Image Left, or Minimal)
2. **Extract Content** – Text, prices, ratings, badges, icons
3. **Apply Parent‑Driven Styling** – Use CSS variables, NOT hardcoded values
4. **Test in All Three Themes** – Verify in main `index.html`

### Post‑Build Validation
1. Standalone Visual Test – Open HTML, click all 3 variant tabs
2. Variable Inheritance Test – DevTools → Computed → Verify `var(--card-*)` values
3. Responsive Quick‑Check – Resize to 375px, check for overflow
4. Accessibility Scan – Tab through interactive elements, check focus rings
5. Console Error Check – No red JavaScript errors

### Registration Steps
1. Add to `modulesConfig` in main `index.html`
2. Write `draw[ComponentName]` function using CSS variables
3. Test toggling, state simulation, card settings
4. Add to gallery (embedded in main `index.html`)

---

## Quick Commands

```bash
# Create new branch
git checkout -b feature/component-name

# Commit and push
git add .
git commit -m "feat(component): add New Component"
git push origin feature/component-name

# Merge to main
git checkout main
git merge feature/component-name
git push origin main

# Run smoke test (requires Playwright)
node smoke-test.js

# Take screenshots of all viewports (requires Playwright)
node take-screenshots.js

# Build standalone viewports (requires Node)
node build-viewports.js
```

---

## Category Navigation Grid — Design Patterns

The `category-tiles` module uses 3 distinct layout patterns mapped to each theme viewport:

| Viewport | Style | Pattern | Description |
|----------|-------|---------|-------------|
| View 1 (Light) | `default` | **Stacked Card Carousel** | Horizontal scroll cards (140px) with food images, category name, count, and icon badges (🔥cal + ⏱time). "What's your craving?" headline. Scroll-snap with peek-from-sides affordance. |
| View 2 (Dark) | `option 1` | **Full Masonry Grid** | 2-column staggered grid of 8 cards at 8 different heights (122–190px). Theme-aware glass cards with backdrop-blur. Each card: food image + name + count + icon badges. |
| View 3 (Modern) | `option 2` | **Single-Card Swipe Carousel** | One card shown at a time (280px). Horizontal swipe with scroll-snap + dot indicator navigation. Card: large food image (170px), name, count badge, icon badges. Interactive dot tracking via `initCategoryDots()`. |

**Categories (8):** Bakery (320cal/25min), Brew (150cal/5min), Sweets (450cal/30min), Bundles (600cal/15min), Pizza (850cal/20min), Salads (180cal/10min), Burgers (720cal/15min), Sushi (350cal/12min).

**Badge system:** Each card shows `🔥 {calories}` and `⏱ {prep time}` icon badges.

---

## Current Project State

- **Components:** 28 cards completed, each with 3 variants (Default, Option 1, Option 2)
- **Category Navigation Grid:** Redesigned with 3 distinct per-theme patterns + icon badge system
- **Main Engine:** Fully functional with 3 viewports, controller panel, card settings, colour palette editor, and module orchestrator
- **Gallery:** Complete with slide viewer and keyboard navigation (embedded in index.html)
- **Deployment:** Vercel connected to GitHub main branch
- **Testing:** Smoke test script (smoke-test.js) validates core functionality
- **Screenshot Automation:** Playwright scripts capture viewport renders

---

## Image‑to‑Code Quick Reference

- Skip the image's exact colours → use `var(--text-primary)`, `var(--card-bg)`, etc.
- Skip the image's exact border radius → use `var(--card-radius)`
- Skip the image's exact shadow → use `var(--card-shadow)`
- Keep the image's layout → grid, flex, spacing, and order of elements
- Keep the image's content → text, prices, icons, and badges

This ensures one card works in all 3 themes without rebuilding.
