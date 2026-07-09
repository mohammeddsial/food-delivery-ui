# Canada Market Gap Analysis — Menu Page & PDP

**Product:** Single-brand restaurant ordering app  
**Stage:** Prototype (for demo to developers, clients, tech teams)  
**Benchmarked against:** Uber Eats, DoorDash, SkipTheDishes, Instacart (Canada) — filtered through single-brand lens  
**Prototype reference:** `index.html` — 3 theme variants (Neumorphism / Glassmorphism / Neubrutalism)  
**Date:** July 2026

---

## 1. What This Document Is (and Isn't)

**This is:** a gap analysis of what our menu page and PDP need to be convincing in a stakeholder demo — convincing enough that a client says "I want this" and a developer says "I can build on this."

**This is not:** a production backlog, a compliance checklist, or a feature parity exercise. We're not trying to match Uber Eats feature-for-feature. We're trying to make our prototype feel like a real product that someone would trust with their launch.

**Key framing:** single-brand app. There is one restaurant/brand. The menu IS the product. No multi-restaurant browsing, no restaurant discovery, no comparing eateries. Everything flows from: *"I know this brand, I want to order from it, help me do that fast."*

---

## 2. Audience & What Each Audience Sees

Three audiences look at this prototype. They notice different things.

| Audience | What they care about | What breaks their confidence |
|---|---|---|
| **Clients** (brand/business stakeholders) | Does it feel like a real app? Does it sell my food effectively? Does it handle the basics (customization, upselling, allergens)? | Missing features that even small competitors have. Ugly states. Broken interactions. |
| **Developers** (internal/agency tech team) | Is the code clean? Are the 3 themes consistent? Are CSS variables actually inheriting properly? Can I extend this? | Inconsistent behaviour across themes. Hardcoded values. Duplicated logic. Dead ends. |
| **Tech leads / architects** | Is the component architecture sound? Does the state model make sense? Will this scale from prototype to production? | Missing state transitions. No loading/error/empty states. Full-page navs that should be overlays. |

The gap analysis below maps each gap to which audience it most impacts.

---

## 3. What We Have That Works Well

Lead with these in demos. They're strong.

| Strength | Why it impresses |
|---|---|
| 3 fully-themed variants from one codebase | Tells developers this is a real design system, not 3 separate apps |
| Live price recalculation on PDP | Feels real — price updates as you toggle modifiers, sides, drinks |
| 360° view + video overlay on PDP | Clients love this; makes food feel tangible |
| In-place category filtering on Menu (no reload) | Smooth, fast, feels native |
| Cart fly animation | Tiny detail, massive "polished product" signal |
| Sticky bottom CTA bar on PDP (2 of 3 themes) | Correct UX pattern for mobile ordering |
| Complete order flow: Feed → Menu → PDP → Cart → Checkout → Tracking → Reviews | Shows the full vision, not just isolated screens |

---

## 4. What the Demo Needs to Do — The Job

A stakeholder demo succeeds when it answers these questions:

1. **"Can I find what I want?"** → Menu browsing, filtering, search
2. **"Do I know what I'm getting?"** → Item details, images, nutritional info, allergens, customizations
3. **"Do I trust this?"** → Reviews, ratings, sold-out honesty, ingredient transparency
4. **"Can I order it easily?"** → Modifier selection, quantity, CTA placement, upsell flow
5. **"Does this feel like a real app?"** → Consistency, states, transitions, polish

Each gap below is measured against these jobs.

---

## 5. Gap Analysis — By Demo Impact

Gaps are ranked by how badly they'd undermine a stakeholder demo. Priority reflects demo-readiness, not production-readiness.

---

### Tier 1 — Demo-killers (fix before showing anyone)

These gaps make the prototype look amateur or broken. A client or developer will notice them within 60 seconds.

#### G1: Calorie info missing in 2 of 3 themes

**Where:** PDP — Neumorphism (default) and Glassmorphism (option 1) variants show no calorie data. Only Neubrutalism (option 2) shows "430 cal per serving."  
**Who notices:** Clients (compliance), developers (inconsistency), tech leads (incomplete data model).  
**Why it kills the demo:** This is confirmed as a real compliance requirement for the Canadian market. When a business stakeholder sees calorie info on ONE theme and not the others, it looks like the product isn't serious about compliance — or worse, that the themes aren't actually sharing the same data model. Either interpretation damages confidence.  
**Competitor baseline:** All 4 benchmarked apps show calorie/nutrition info for qualifying items. Uber Eats and DoorDash display it prominently for chain restaurants; Instacart shows full nutrition facts panels.  
**Fix:** Standardize a calorie/nutrition row in the PDP info bar across all 3 theme variants. Use the same data source — if it's in the item model for Neubrutalism, it should render in all 3.

#### G2: Quantity stepper missing in Neubrutalism PDP bottom bar

**Where:** PDP — Neubrutalism (option 2) variant. The fixed bottom CTA shows only total + "Add to Cart" button. Neumorphism and Glassmorphism both have a quantity stepper (minus/quantity/plus) in their bottom bars.  
**Who notices:** Developers (inconsistency), tech leads (broken component contract).  
**Why it kills the demo:** This is the most visible inconsistency across themes. A developer looking at the code will immediately question whether the 3 themes share the same component architecture or are 3 separate code paths. It also means the Neubrutalism PDP can only add qty=1 per tap — a functional regression in one theme.  
**Competitor baseline:** All 4 apps have quantity controls on the PDP.  
**Fix:** Add `- 1 +` quantity stepper to the Neubrutalism bottom bar, matching the pattern from the other two variants.

#### G3: No sold-out / unavailable state anywhere

**Where:** Menu page (item cards) and PDP (modifier options). Nothing in the prototype communicates "this item isn't available right now" or "this modifier option is sold out."  
**Who notices:** Clients (it looks unrealistic — real menus have stockouts), developers (missing state in the component model).  
**Why it kills the demo:** A client who runs restaurants knows items sell out. If your prototype never shows a sold-out state, it looks like you haven't thought about real-world operations. It's one of the first questions a restaurant operator asks: "What happens when we run out of the special?"  
**Competitor baseline:** Uber Eats, DoorDash, and SkipTheDishes all grey out and label unavailable items with "Sold Out" or "Currently Unavailable." Instacart shows "Out of Stock" with substitution prompts.  
**Fix:** Add 1 sold-out item card on the Menu page and 1 sold-out modifier on the PDP (e.g., "Bacon — Sold Out"). Greyed-out treatment, not-interactable. This is purely a UI pattern — it demonstrates the state exists even if there's no backend inventory system.

---

### Tier 2 — Demo-weakeners (clients will ask about them)

These gaps won't kill the demo, but a client who's used any competitor app will notice and ask.

#### G4: No allergen or dietary badges

**Where:** Menu page (item cards) and PDP. No icons or tags for: vegan, vegetarian, gluten-free, contains nuts, contains dairy, spicy, halal. One modifier is named "Gluten-Free Bun" but there's no badge system — it's just ad-hoc text in a modifier label.  
**Who notices:** Clients (dietary filtering is table stakes for restaurant menus in 2026), developers (no reusable badge component).  
**Why it weakens the demo:** A restaurant client will ask: "How do my customers know what's gluten-free?" If the answer is "they have to read the ingredients list on every item," the demo looks behind. Single-brand apps from major chains (McDonald's, Tim Hortons, Starbucks) all have dietary icons. This is not an aggregator feature — it's a menu feature.  
**Competitor baseline:** All 4 apps use consistent dietary badges. Uber Eats shows vegetarian/vegan/gluten-free/spicy icons on item cards. Instacart has allergen filters.  
**Fix:** Add a small badge row on item cards (spicy 🌶, vegan 🌱, GF, nuts ⚠) and repeat on PDP next to the item name. 2-3 badges per item is enough to sell the pattern.

#### G5: "Make it a Meal" jumps to a separate page — breaks PDP context

**Where:** PDP. The "Make it a Meal" link navigates away to a full `upsell-page`. This replaces the PDP entirely — the user loses their customization progress (size, modifiers, sides, drink selections).  
**Who notices:** Everyone. Clients see a broken flow. Developers see a UX anti-pattern.  
**Why it weakens the demo:** The user has spent time customizing their item — choosing a size, picking modifiers, adding sides and a drink. Then they tap "Make it a Meal" and everything resets. In a real app, this is a conversion killer. In a demo, it looks like the upsell was bolted on without thinking about the flow.  
**Competitor baseline:** Uber Eats and DoorDash show inline upsell suggestions directly on the PDP as a carousel or list below the item details — no navigation required. SkipTheDishes shows "Popular Add-ons." Instacart shows "Frequently Bought Together."  
**Fix:** Add a small "Popular Add-ons" or "Complete Your Meal" carousel inline on the PDP (before the bottom CTA). Keep the existing "Make it a Meal" as a secondary "Browse all add-ons" link. The inline version is the demo win.

#### G6: No per-item special instructions field on PDP

**Where:** PDP — missing entirely. A "special notes for the restaurant" textarea exists on the Cart page, but that's order-level, not per-item.  
**Who notices:** Clients (restaurant operators know customers want "sauce on the side" / "no onions" / "extra crispy"). Developers (data model: notes need to attach to cart line items, not the whole order).  
**Why it weakens the demo:** In single-brand apps, per-item customization is the primary interaction. A burger chain without "no pickles" is broken. Right now the only per-item customization is through structured modifiers — but customers often need free-text.  
**Competitor baseline:** Uber Eats, DoorDash, and SkipTheDishes all offer per-item "Special Instructions" fields. Instacart allows item-level substitution notes.  
**Fix:** Add a small collapsible "Add special instructions" text field on the PDP, above the bottom CTA. Store it on the cart line item.

---

### Tier 3 — Demo-differentiators (makes the prototype stand out)

These gaps aren't blockers, but fixing them turns a "nice prototype" into a "wow, this is production-ready" conversation.

#### G7: Item reviews not surfaced on PDP

**Where:** PDP shows a static star number (e.g., "4.6"). No review count, no snippets, no user photos. Reviews exist on a separate `reviews-page` but there's no path from PDP to them.  
**Who notices:** Clients (social proof drives conversions), developers (data model: reviews should be queryable per item).  
**Why it matters for the demo:** A single-brand PDP without reviews looks empty. Competitor PDPs show "4.6 (238 reviews)" with expandable snippets and user-uploaded photos. The static "4.6" number on our PDP looks like placeholder data.  
**Competitor baseline:** All 4 apps surface item-level rating + review count on PDP. DoorDash and Uber Eats show review snippets with photos inline.  
**Fix:** Add "(238 reviews)" next to the star rating and a "See reviews" link that jumps to the reviews page filtered for this item. 2-3 inline review snippets with thumbnail photos below the item description.

#### G8: PDP is full-page navigation, not a modal/bottom-sheet

**Where:** Tapping an item card on the Menu page replaces the entire viewport with the PDP. Going back reloads the menu. Scroll position is lost.  
**Who notices:** Developers (UX pattern), tech leads (navigation architecture).  
**Why it matters for the demo:** This pattern is fine for a static prototype with 8 items. But if a client imagines a menu with 50+ items, losing scroll position every time you view a detail page is painful. The demo should at least acknowledge this with scroll-position preservation, even if a full modal refactor is out of scope.  
**Competitor baseline:** Uber Eats, DoorDash, and SkipTheDishes all present the item detail as a bottom sheet or modal overlay. The menu remains visible underneath. The user can dismiss and resume browsing from where they left off.  
**Fix:** Short-term: preserve `scrollTop` on the menu container and restore it on `goBack()`. Long-term: convert PDP to a sheet/modal overlay.

#### G9: No inline search on the Menu page

**Where:** The Menu page has no search input. Search is a fully separate destination page (`search-page`).  
**Who notices:** Developers (navigation complexity), clients with large menus.  
**Why it matters for the demo:** For a single-brand app with 10-15 items, this isn't a big deal. But if the demo is for a chain with 50+ menu items, showing a separate search page rather than an inline filter looks like a content architecture problem.  
**Competitor baseline:** All 4 apps have search inline on the menu/shop page — either a persistent top bar or a tappable icon that expands.  
**Fix:** Add a search icon in the Menu page header that expands into an inline search input (filter-as-you-type within the current menu data, no navigation needed).

---

### Tier 4 — Demo-polish (not urgent, but noticeable)

#### G10: No swipeable image gallery on PDP

Currently: one hero image + separate 360° view + separate video overlay. No way to swipe between multiple still photos of the item.  
**Fix:** Embed 2-3 thumbnails below the hero that scroll horizontally. Low effort, high visual impact.

#### G11: No bilingual (EN/FR) support

All strings are hardcoded English in JS. For a Canadian product demo, this is noted but not a blocker — unless the client is Quebec-based.  
**Fix:** Not needed for a prototype demo unless the audience specifically requires it. Flag as architectural concern for production.

#### G12: No skeleton/loading states

Expected for a static prototype. The tab-to-tab instant rendering is fine for a demo; skeleton screens are a production concern.  
**Fix:** Out of scope for prototype stage.

---

## 6. Competitor Comparison — Filtered for Single-Brand Relevance

Removed aggregator-only features (restaurant discovery, multi-restaurant browsing, delivery ETA across vendors).

| Feature | Ours | Uber Eats | DoorDash | SkipTheDishes | Instacart |
|---|---|---|---|---|---|
| Item image + gallery | Hero only | Multi-photo + swipe | Multi-photo + swipe | Multi-photo | Multi-photo + zoom |
| Dietary badge system | ❌ | ✅ | ✅ | ✅ | ✅ |
| Calorie/nutrition info | ⚠️ 1/3 themes | ✅ | ✅ | ⚠️ Partial | ✅ Full panel |
| Per-item special instructions | ❌ (order-level only) | ✅ | ✅ | ✅ | ✅ (item notes) |
| Item reviews on PDP | Static number only | Rating + count + snippets + photos | Rating + count + snippets | Rating + count | Rating + count |
| Inline upsell carousel | ❌ (separate page) | ✅ | ✅ | ✅ | ✅ |
| Sold-out state | ❌ | ✅ | ✅ | ✅ | ✅ (with substitutions) |
| PDP as sheet/modal | ❌ | ✅ | ✅ | ✅ | ✅ |
| Quantity control on PDP | ⚠️ 2/3 themes | ✅ | ✅ | ✅ | ✅ |
| In-menu search | ❌ | ✅ | ✅ | ✅ | ✅ |
| Bilingual EN/FR | ❌ | ✅ | ✅ | ✅ | ✅ |

---

## 7. Recommended Fix Order — Maximizing Demo Impact

Ordered by: fix it THIS demo cycle vs. next cycle vs. production only.

### This cycle (before next stakeholder demo)

| Priority | Gap | Effort | Impact | Why first |
|---|---|---|---|---|
| 1 | G1 — Standardize calorie display across all 3 PDP themes | ~30 min | High | Compliance + consistency — kills two birds |
| 2 | G2 — Add qty stepper to Neubrutalism bottom bar | ~20 min | High | Fixes most visible theme inconsistency |
| 3 | G3 — Add 1 sold-out item + 1 sold-out modifier | ~30 min | High | Answers the #1 question restaurant operators ask |
| 4 | G4 — Add dietary badges (2-3 icons per item) | ~1 hr | High | Table stakes for 2026 menu UX; clients expect it |
| 5 | G6 — Add per-item special instructions field on PDP | ~45 min | Medium-High | Completes the "customize my item" story |

### Next cycle (before technical review with dev team)

| Priority | Gap | Effort | Impact |
|---|---|---|---|
| 6 | G5 — Inline upsell carousel on PDP (replace page-nav) | ~2 hr | High |
| 7 | G7 — Rating count + review snippets on PDP | ~1.5 hr | Medium-High |
| 8 | G8 — Preserve menu scroll position on back-navigation | ~1 hr | Medium |

### Production only

| Priority | Gap | Effort | Impact |
|---|---|---|---|
| 9 | G9 — Inline menu search | ~2 hr | Medium |
| 10 | G10 — Swipeable image gallery | ~1.5 hr | Medium |
| 11 | G8 (full) — Convert PDP to bottom-sheet modal | ~4-6 hr | High (architectural) |
| 12 | G11 — Bilingual EN/FR i18n | Days | High (compliance, but not needed for prototype) |
| 13 | G12 — Skeleton/loading states | ~2 hr | Low (production concern) |

---

## 8. What the Demo Story Should Be (after fixes)

With Tier 1+2 gaps fixed, here's the narrative the prototype should tell:

> *"This is a single-brand ordering experience. The customer lands on the menu — they see category tabs, dietary badges on each item, and a search bar up top. One item is sold out (greyed, honest). They tap a burger. The PDP slides up — hero image, calorie count, allergen tags. They choose size, add bacon, swap to a gluten-free bun, add fries and a drink. Price updates live. They type 'no pickles please' in the special instructions field. Below, 'Customers also added' shows a milkshake — they tap to add it inline. Quantity stepper says 2. Bottom bar: Total $18.47 — Add to Cart. Fly animation. Done."*

That's a demo story that closes.

---

## 9. Notes & Limitations

- **Competitor data:** Based on well-documented, stable UX patterns. Apps are login/geo-gated SPAs — no live screenshot teardown was possible. Item-level specifics (exact copy, spacing, icon style) are directional.
- **Single-brand filtering:** Instacart is a grocery platform, not restaurant delivery — included here as a reference for PDP patterns (nutrition facts, substitutions, item notes) but not as a direct competitor.
- **Prototype limitations:** No backend — states like "sold out" and "reviews" are simulated UI patterns, not real data flows. This is noted explicitly in each recommendation.
- **Theme variants:** The 3 themes (Neumorphism/Glassmorphism/Neubrutalism) are treated as one unified product. Where they diverge (calorie display, qty stepper), gaps are flagged as consistency defects, not missing features.