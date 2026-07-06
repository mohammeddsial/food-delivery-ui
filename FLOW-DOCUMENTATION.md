# Complete User Flow Documentation — All 3 Views

**File:** `index.html` (10,513 lines)  
**Views:** neumorphism (default) | glassmorphism (option 1) | neubrutalism (option 2)

---

## Architecture

- **Router:** `navigateToPage(theme, page, cat, itemId)` — line 3259
- **Back navigation:** `goBack(theme)` — line 3268
- **Per-theme state:** `currentPageByTheme`, `appState.cart[theme]`, `appState.orderPhase[theme]`, `appState.promoCode[theme]`
- **Cart popup:** `openCartPopup(theme)` / `closeCartPopup(theme)` — lines 3038/3044
- **Cart FAB sheet:** `toggleFabSheet(theme, 'cart')` / `openFabSheet()` / `closeFabSheet()` — lines 3054/3061/3074

---

## 1. HOME / FEED (`currentPage = 'feed'`)

### Top Bar CTAs
| CTA | onclick | Destination |
|-----|---------|-------------|
| Hamburger menu | `data-drawer-toggle="vp-{theme}"` | Side drawer opens |
| Heart icon | `toggleHeart('{theme}')` | Toggles heart fill in-place |
| Notification bell | `openNotifModal('{theme}')` | Notification bottom sheet |
| Cart icon (badge) | `toggleFabSheet('{theme}','cart')` | Cart FAB bottom sheet |

### Bottom Nav CTAs (5-6 tabs)
| Tab | onclick | Destination |
|-----|---------|-------------|
| Home | `goBack('{theme}')` | Feed (if on sub-page) |
| Menu | `navigateToPage('{theme}','menu-page')` | Menu page |
| Rewards | `navigateToPage('{theme}','rewards-page')` | Rewards page |
| Search/Mic | `navigateToPage('{theme}','search-page')` | Search page |
| Cart | `navigateToPage('{theme}','cart-page')` | Cart page |
| Profile | `navigateToPage('{theme}','profile-settings')` | Profile settings |

### Feed Content CTAs
| Element | onclick | Destination |
|---------|---------|-------------|
| Location selector | `openLocationSheet('{theme}')` | Location bottom sheet |
| Category tile | `navigateToPage('{theme}','menu-page','{catId}')` | Menu (filtered) |
| Food item card | `navigateToPage('{theme}','product-detail-page',null,'{itemId}')` | Product detail |
| "+Add" button | `addToCart('{theme}', item)` | Stays on feed (adds to cart) |
| Announce strip items | `navigateToPage('{theme}','{page}')` | Menu/rewards/deals |
| Video play button | `navigateToPage('{theme}','menu-page')` | Menu page |

### FAB Bottom Sheets
| FAB | onclick | Behavior |
|-----|---------|----------|
| Cart (bottom-left) | `toggleFabSheet('{theme}','cart')` | Opens cart summary; "Checkout" → `navigateToPage('{theme}','cart-page');closeFabSheet('{theme}')` |
| Tracker (bottom-right) | `toggleFabSheet('{theme}','tracker')` | Opens order tracker sheet; "View Full Tracking" → `navigateToPage('{theme}','order-tracking');closeFabSheet('{theme}')` |

---

## 2. MENU (`currentPage = 'menu-page'`)

### CTAs
| CTA | onclick | Destination |
|-----|---------|-------------|
| Back arrow | `goBack('{theme}')` | Feed |
| "View All" | `goBack('{theme}')` | Feed |
| Category list item (default) | Inline JS: hides category list, shows item grid | Filters in-place |
| Category nav pill (option 1) | Inline JS: swaps item list content | Filters in-place |
| Category chip (option 2) | Inline JS: swaps item grid content | Filters in-place |
| Food item card | `navigateToPage('{theme}','product-detail-page',null,'{itemId}')` | Product detail |
| "+Add" button | `addToCart('{theme}', item)` | Stays on menu |

---

## 3. PRODUCT DETAIL (`currentPage = 'product-detail-page'`)

### CTAs
| CTA | onclick | Destination |
|-----|---------|-------------|
| Back arrow | `goBack('{theme}')` | Menu |
| Heart icon | `toggleHeart('{theme}')` | Toggles favorite in-place |
| 360 View | `togglePano('{theme}');initPanoDrag('{theme}')` | Opens panoramic overlay |
| Watch Video | `toggleProductVideo('{theme}')` | Opens video overlay |
| "Make it a Meal" link | `navigateToPage('{theme}','upsell-page')` | Upsell page |
| Size selector (Small/Med/Large) | Inline JS: updates visual selection | Stays on page |
| Variant selector | `window.pdpState['{theme}'].variant='{id}';updatePDPPrice('{theme}')` | Updates price |
| Side selector | `window.pdpState['{theme}'].sides.push/splice('{id}');updatePDPPrice('{theme}')` | Updates price |
| Drink selector | `window.pdpState['{theme}'].drink='{id}';updatePDPPrice('{theme}')` | Updates price |
| **"Add to Cart" button** | `var _t=updatePDPPrice('{theme}');animateFlyToCart('{theme}',this);addToCart('{theme}',{...});setActiveNav(3);navigateToPage('{theme}','cart-page')` | **Cart page** |

---

## 4. CART (`currentPage = 'cart-page'`)

### Promo Codes
| Code | Type | Value |
|------|------|-------|
| SAVE10 | percent | 10% off |
| FREEDEL | free_delivery | Free delivery |
| WELCOME5 | fixed | $5 off |

### CTAs
| CTA | onclick | Destination |
|-----|---------|-------------|
| Back arrow | `goBack('{theme}')` | Feed |
| Remove item (✕) | `removeFromCart('{theme}','{itemId}')` | Re-renders cart |
| Qty minus (-) | `updateCartQty('{theme}','{itemId}',-1)` | Re-renders cart |
| Qty plus (+) | `updateCartQty('{theme}','{itemId}',1)` | Re-renders cart |
| Apply promo | `applyPromoCode('{theme}')` | Re-renders cart with discount |
| Remove promo badge | `window.appState.promoCode['{theme}']=null;navigateToPage('{theme}','cart-page')` | Re-renders cart without discount |
| "Browse Menu" (empty cart) | `navigateToPage('{theme}','menu-page')` | Menu page |
| **"Checkout - {total}" button** | `proceedToCheckout('{theme}')` | **Checkout page** (phase → 'checkout') |

---

## 5. CHECKOUT (`currentPage = 'checkout-page'`)

### CTAs
| CTA | onclick | Destination |
|-----|---------|-------------|
| Back arrow | `goBack('{theme}')` | Cart (phase → 'carted') |
| "+ Change" address | `navigateToPage('{theme}','add-location')` | Add location page |
| **"Place Order - {total}" button** | `placeOrder('{theme}')` | **Order success page** (clears cart, phase → 'placed') |

### View Differences
- **default:** Step indicator (Cart→Pay→Done), card-based layout
- **option 1:** Accordion-style collapsible sections, glass panels, gradient CTA
- **option 2:** Step indicator, bordered cards with hard shadows, bold CTA

---

## 6. UPSELL (`currentPage = 'upsell-page'`)

### CTAs
| CTA | onclick | Destination |
|-----|---------|-------------|
| Back arrow | `goBack('{theme}')` | Previous page |
| "Add" on item | `animateFlyToCart('{theme}',this);showToast('{name} added to cart!')` | Stays on page |
| "Add Bundle" | `addToCart('{theme}',bundle);showToast('Meal bundle added to cart!')` | Stays on page |
| "Add Selected (2)" (option 1) | `addToCart('{theme}',bundle);showToast('2 items added to cart!')` | Stays on page |
| "Add for $3.50" (option 2) | `addToCart('{theme}',item);showToast('{name} added to cart!')` | Stays on page |
| **"No thanks, skip add-ons"** | `navigateToPage('{theme}','order-success-page')` | **Order success page** |
| **"Skip" button (option 2)** | `navigateToPage('{theme}','order-success-page')` | **Order success page** |

---

## 7. ORDER SUCCESS (`currentPage = 'order-success-page'`)

### CTAs
| CTA | onclick | Destination |
|-----|---------|-------------|
| **"Track Order" button** | `trackOrder('{theme}')` | **Order tracking page** (phase → 'tracking', starts ETA timer) |
| "Continue Shopping" | `goBack('{theme}')` | Feed (phase → 'browsing') |
| "Download Receipt" (option 2) | `showToast('Receipt downloaded!')` | Toast, stays on page |

---

## 8. ORDER TRACKING (`currentPage = 'order-tracking'`)

### CTAs
| CTA | onclick | Destination |
|-----|---------|-------------|
| Back arrow | `goBack('{theme}')` | Order success page |
| **"GO TO TRACK" button** | `navigateToPage('{theme}','tracking-map')` | Live map page |

### Auto-navigation
- Map carousel cycles through 5 frames (2.5s each)
- After frame 5, auto-navigates to `reviews-page`

---

## 9. LIVE MAP (`currentPage = 'tracking-map'`)

### CTAs
| CTA | onclick | Destination |
|-----|---------|-------------|
| Back arrow | `goBack('{theme}')` | Order tracking page |
| "Call Driver" (default) | No action (placeholder) | Stays on page |
| "Cancel" (default) | `goBack('{theme}')` | Previous page |
| "Track Order" (option 1) | No action (placeholder) | Stays on page |
| "Cancel" (option 2) | `goBack('{theme}')` | Previous page |
| "SOS" (option 2) | No action (placeholder) | Stays on page |

---

## 10. REVIEWS (`currentPage = 'reviews-page'`)

### CTAs
| CTA | onclick | Destination |
|-----|---------|-------------|
| Back arrow | `goBack('{theme}')` | Previous page |
| **"Write a Review" button** | `openReviewModal('{theme}')` | Opens review modal overlay |
| Star rating (1-5) | `setReviewRating('{theme}',{n})` | Updates star display |
| **"Submit Review"** | `submitReview('{theme}')` | Toast + navigates to feed (phase → 'browsing', clears cart) |
| Overlay click | `closeReviewModal('{theme}')` | Closes modal |

---

## 11. BOTTOM NAV — CART BADGE

### Top Nav Cart Icon
```javascript
const cartCountNav = getCartCount(theme);
const cartBadgeNav = cartCountNav > 0 ? cartCountNav : null;
```

### Bottom Nav Cart Tab
```javascript
{ icon: 'cart', label: 'Cart', badge: getCartCount(theme) || null }
```

### Floating Cart FAB
```javascript
<span id="fabCartBadge-{theme}" style="display:${cartCount > 0 ? 'flex' : 'none'}">
    ${cartCount}
</span>
```

### FAB Visibility Logic (`updateFabVisibility` — line 2084)
| Phase | Cart FAB | Tracker FAB |
|-------|----------|-------------|
| `browsing` | Hidden | Hidden |
| `carted` | Visible | Hidden |
| `checkout` | Visible | Hidden |
| `placed` | Hidden | Visible |
| `tracking` | Hidden | Visible |

---

## Complete Order Flow

```
Feed → Menu → Product Detail → Cart → Checkout → Order Success → Order Tracking → Live Map → Reviews → Feed
```

### Key Functions in Flow
1. `addToCart(theme, item)` — Adds item, sets phase='carted', shows toast, bounces badge
2. `proceedToCheckout(theme)` — Sets phase='checkout', navigates to checkout
3. `placeOrder(theme)` — Clears cart, sets phase='placed', navigates to success
4. `trackOrder(theme)` — Sets phase='tracking', starts ETA timer, navigates to tracking
5. `goBack(theme)` — Context-dependent back navigation
6. `submitReview(theme)` — Clears cart, resets phase='browsing', navigates to feed

### Order Phases
| Phase | Cart FAB | Tracker FAB | Description |
|-------|----------|-------------|-------------|
| `browsing` | Hidden | Hidden | Initial state |
| `carted` | Visible | Hidden | Items in cart |
| `checkout` | Visible | Hidden | On checkout page |
| `placed` | Hidden | Visible | Order placed |
| `tracking` | Hidden | Visible | Order being tracked |

---

## Additional Pages

### Rewards Page (`rewards-page`)
- Points balance, reward cards, earn rate, referral code
- "Copy" button → `navigator.clipboard.writeText('EAT820')`

### Profile Settings (`profile-settings`)
- Account, Notifications, Preferences, Support sections
- Toggles for Push/SMS/Email notifications
- "Logout" → `alert('Logged out')`

### Splash Screen (`splash-page`)
- Auto-navigates to `login-page` after 2 seconds (default)
- "Get Started" button (option 1) → `navigateToPage('{theme}','login-page')`

### Login Page (`login-page`)
- Social login: Google, Apple, Phone
- `simulateSocialLogin('{theme}', '{provider}')` → Spinner animation → Navigates to feed
- `openVoiceSearch('{theme}')` → Voice search modal

### Search Page (`search-page`)
- Voice search, search input
- `openVoiceSearch('{theme}')` → `startVoiceTyping('{theme}')` → Auto-navigates to menu
