# Competitive Analysis: Global Food Delivery App UX Patterns

**Purpose:** UX/UI competitive benchmark for a single-brand restaurant ordering app prototype.
**Date:** July 2026
**Scope:** 8 major global food delivery platforms

---

## Table of Contents

1. [Uber Eats](#1-uber-eats)
2. [DoorDash](#2-doordash)
3. [SkipTheDishes (Skip)](#3-skipthedishes-skip)
4. [Zomato](#4-zomato)
5. [Deliveroo](#5-deliveroo)
6. [Instacart](#6-instacart)
7. [Swiggy](#7-swiggy)
8. [Meituan](#8-meituan)
9. [Cross-Cutting UX Patterns & Recommendations](#9-cross-cutting-ux-patterns--recommendations)

---

## 1. Uber Eats

### Complete Order Flow

**Home Screen:**
- Carousel of promoted restaurants / deals at top
- Horizontal scroll categories: "Pick up," "Convenience," "Grocery," "Alcohol," "Offers," "Fastest"
- "Order again" section with previously ordered restaurants (1-tap reorder)
- Personalized "For you" feed based on order history, time of day, location
- Feed-based vertical scroll of restaurant cards: hero image, name, rating (star), delivery time estimate, delivery fee (or "Free" badge)
- Bottom tab bar: Home, Search/Grocery, Orders, Account

**Search:**
- Persistent search bar at top of Home
- Search shows: recent searches, trending searches, suggested cuisines
- Type-ahead with restaurant names, dishes, cuisines, grocery items
- Filter chips: Rating, Price ($-$$$$), Dietary (Vegetarian, Gluten-free, etc.), Delivery time, Distance, Offers
- Sort by: Recommended, Rating, Delivery time, Delivery fee
- Map view toggle (map + bottom sheet card list)
- "Search by dish" indexes menu items across all restaurants

**Restaurant Listing / Browse:**
- Infinite scroll feed with large hero imagery
- Each card shows: cover photo, restaurant name, rating + review count, delivery time range, delivery fee, distance, cuisine tags, "DashPass" or "Uber One" badge if applicable
- Swipe-left on cards for quick-add to favorites (some markets)
- "Top Picks" collection based on ML personalization

**PDP (Product/Restaurant Detail Page):**
- Sticky header with restaurant name, rating, delivery time; collapses on scroll
- Hero image carousel
- Quick-info bar: rating, distance, delivery time, delivery fee, price level
- Expandable "About" section with hours, address, dietary tags
- Menu organized by categories (Appetizers, Mains, Desserts, etc.) in sticky anchor tabs
- Each menu item card: image (optional), name, description, price
- Tap item opens a modal/add-to-cart sheet:
  - Item photo, name, description
  - Modifier groups: size, protein choice, sides, extras (radio/checkbox patterns)
  - Quantity stepper (+/-)
  - "Special instructions" text field
  - "Add to order" CTA button with running subtotal
- Sticky bottom bar: "View cart (X items) - $XX.XX" button, always visible
- Restaurant-level "Group order" link to invite others via share sheet

**Cart:**
- Slide-up panel or full page
- Items grouped by restaurant
- Each line: item name, modifiers listed, quantity stepper, price; swipe to delete
- Section for "Add more items" link back to menu
- "Special instructions for restaurant" text area
- Tip selector: percentage chips (10%, 15%, 18%, 20%, Custom)
- Promo code entry with inline validation
- Fee breakdown: Subtotal, Delivery fee, Service fee, Taxes, Tip
- "Uber One" membership benefit callout (e.g., "$0 delivery fee")
- CTA: "Go to checkout"

**Checkout:**
- Delivery address selector with map preview
- "Meet at door" / "Leave at door" toggle
- Delivery instructions text field
- Payment method selector (credit card, Apple Pay, Google Pay, Uber Cash, gift card)
- Estimated delivery time prominently displayed
- Allergy/dietary info link
- Order summary with all fees
- "Place order" button with final total
- Group order: each participant sees a shared cart, adds items, checkout collects payment from host or splits
- Post-order: animations (confetti), ETA countdown timer

**Order Tracking:**
- Real-time map view with:
  - Restaurant pin → courier icon (animated car/bike) → destination pin
  - Courier name, photo, rating, vehicle type
  - Step statuses: "Order received" → "Preparing" → "Courier on the way" → "Delivered"
  - ETA countdown ("Arriving in 12-18 min")
  - "Track on map" button zooms to live position
- Push notifications on status changes
- In-app chat with courier (text + quick replies like "Okay, thanks!")
- "Call courier" button
- "Share status" link to send tracking URL to friends/family
- PIN verification for certain orders (courier must enter PIN to complete)

**Post-Order:**
- Rating prompt: thumbs up/down for restaurant, then detailed star rating (food, delivery)
- Tip adjustment (add/edit tip for a limited window post-delivery)
- Rate courier: thumbs up/down + reason tags (friendly, on time, careful handling, etc.)
- "Order again" prominent CTA
- Receipt view with full fee breakdown
- Issue reporting: missing items, incorrect items, damaged items, food quality
- Photo upload for issue reports

### Unique Features

1. **Uber One membership** ($9.99/mo): $0 delivery fee on eligible orders, 5% discount on orders $15+, member-exclusive offers, applies across Uber and Uber Eats
2. **Group Ordering**: Share a link, each person adds items from same restaurant, host places order, bill splitting options
3. **Dine-in option**: Order ahead for dine-in at restaurant (COVID-era innovation that persisted)
4. **Pickup integration**: Order and pay ahead, skip the line, no delivery fee
5. **Uber ecosystem integration**: Cross-promotion with Uber Rides, shared wallet/cash, single account
6. **Autonomous delivery pilots**: Serve Robotics (sidewalk bots in LA), Motional (autonomous vehicles), Cartken (Miami), drones in select markets
7. **Alcohol delivery**: Age verification via ID scan at delivery, certified couriers
8. **Virtual restaurants**: Delivery-only brands operating from existing kitchens, surfaced algorithmically
9. **Space delivery**: Marketing stunt - delivered food to ISS in 2021 (brand halo)

### Loyalty/Rewards

- **Uber One**: Primary membership program, $9.99/month or $99.99/year
- Uber Rewards program was sunset; now focused on Uber One + partner benefits (e.g., Marriott Bonvoy points earn)
- **Uber Cash**: Preloaded credit with bonus (e.g., buy $100 get $5 bonus), usable across Uber ecosystem
- **Promo codes**: Heavy reliance on referral codes, email campaigns, push notification offers
- **Apple Card**: 3% cash back on Uber and Uber Eats purchases
- **Credit card partnerships**: Amex Platinum gives monthly Uber Cash credits

### Cart & Checkout UX Patterns

- Persistent floating cart button on PDP (never hides)
- Slide-up cart panel rather than full page navigation (keeps context)
- Tip selection pre-checkout (not forced post-order)
- Promo code validation inline (real-time feedback, green checkmark / red error)
- Fee transparency: line-item breakdown of every charge before placing order
- Address map preview with pin accuracy check
- Payment method stored with visual card representation (issuer logo, last 4 digits)

### Order Tracking UX

- Best-in-class live map with animated courier icon
- Clear step-by-step progress indicators
- Color-coded status (green = active, blue = preparing, orange = en route)
- Courier profile visibility (name, photo, vehicle) builds trust
- Inline chat without leaving tracking screen
- PIN verification adds security layer

### Post-Order Experience

- Two-stage rating: quick sentiment (thumbs) then detailed
- "Order again" is immediate and prominent
- Problem resolution flow: pick issue type → select affected items → describe → upload photo → get resolution (refund/credit)
- Receipt PDF download

### Accessibility & Localization

- Dynamic Type support for iOS font scaling
- VoiceOver-compatible menus
- High contrast mode support
- Multi-language support across 45+ countries
- Localized payment methods per market
- RTL language support for Arabic markets

### Innovative/Unusual Features

- **"Order with a Rides trip"**: Select restaurant while in Uber, food arrives when you do
- **"Leave at door" with photo**: Courier snaps photo of delivered food
- **PIN verification**: Reduces wrong-address deliveries
- **Tipping during checkout** rather than only post-delivery (vs. DoorDash)

---

## 2. DoorDash

### Complete Order Flow

**Home Screen:**
- Address bar at top with delivery/pickup toggle
- Horizontal scroll filter chips: "DashPass," "Rating 4.5+," "Under 30 min," "Offers," cuisines
- "Order again" carousel with last 5-10 restaurants
- Promotional banner/carousel (seasonal campaigns, new features like "DoubleDash")
- Feed of restaurant cards: large hero image, name, rating (star + count), delivery time, delivery fee, distance, "DashPass" badge
- Bottom tab: Home, Browse, Orders, Account
- "Browse" tab shows category-based navigation with icons (Pizza, Chinese, Mexican, Sushi, etc.)

**Search:**
- Unified search bar
- "Top search results" showing restaurants + individual dishes
- Filter by: Cuisine, Rating, Price, Distance, Dietary, DashPass eligible
- Sort: Recommended, Rating, Delivery Time, Delivery Fee
- Search history + trending searches
- Voice search support

**PDP:**
- Hero image carousel
- Info bar: rating, delivery time, delivery fee, distance, price range
- "DashPass" banner if free delivery applies
- Menu with category tabs (sticky on scroll)
- "Most popular" section with photo-labeled items
- Each item: photo, name, description, price, dietary tags
- Tap item → bottom sheet modal:
  - Item photo, description
  - Modifier groups with required/optional indicators
  - Quantity control
  - "Special instructions" field
  - "Add to order" button with price
- "Group Order" button
- Sticky "View Cart" bar at bottom

**Cart:**
- Full-page cart view
- Items grouped with modifier details
- Swipe to remove items
- "Add more" link
- Tip selection prominently displayed (pre-set percentages + Custom)
- Promo code entry
- Fee breakdown
- DashPass benefit callout
- "Continue to checkout" CTA

**Checkout:**
- Delivery address with map integration
- "Hand it to me" / "Leave at my door" toggle with photo instruction option
- Delivery instructions text area
- Payment method selection
- Stored payment methods with visual icons
- Apple Pay / Google Pay express checkout
- Final order summary
- ETA shown prominently
- "Place order" with total

**Order Tracking:**
- Real-time map with restaurant → dasher → destination
- Step tracker: "Confirmed" → "Being prepared" → "Picked up" → "On the way" → "Delivered"
- Dasher: name, photo, rating, vehicle description
- Live ETA countdown
- Push notification at each stage transition
- In-app messaging with dasher
- "Call dasher" option
- Map zooms to show precise dasher location
- "DoubleDash" upsell: add items from nearby convenience stores while order is in progress (pre-delivery)

**Post-Order:**
- Star rating for restaurant (1-5) + optional detailed review
- Thumbs up/down for dasher
- Tip adjustment (can increase for limited time post-delivery)
- "Order again" button
- Receipt with full breakdown
- Issue reporting flow

### Unique Features

1. **DashPass** ($9.99/mo): $0 delivery fee on eligible orders $12+, reduced service fees, member-exclusive offers, exclusive restaurant deals
2. **DoubleDash**: Add items from nearby stores (convenience, liquor, grocery) to your order with no extra delivery fee while your original order is being prepared/delivered
3. **DoorDash Drive**: White-label delivery API for restaurants who want to use DoorDash logistics on their own website/app
4. **Grocery & Retail expansion**: Partnerships with major grocery chains, convenience stores, pet stores, florists, hardware (Ace Hardware 2025)
5. **Alcohol delivery**: Available in 20+ states/DC/Canada/Australia with age verification
6. **Caviar**: Premium sub-brand acquired from Square; focuses on high-end/fine dining restaurants; separate branding
7. **Wolt acquisition**: Finnish company operating in Europe, Japan, Israel; different UX with more modern/Material Design aesthetic
8. **DoorDash Kitchens**: Ghost kitchen infrastructure (Redwood City pilot to full deployment)
9. **Project DASH**: Non-profit arm delivering food donations; builds brand goodwill
10. **Klarna partnership (2025)**: Buy Now Pay Later for food delivery (controversial but innovative)
11. **SevenRooms acquisition (2025)**: Restaurant reservation platform; builds full dining ecosystem

### Loyalty/Rewards

- **DashPass**: Core subscription, stacks with promotional offers
- **DashPass for Students**: Discounted student pricing
- **Rewards points**: Earn points on eligible orders, redeem for discounts on future orders; tiered with spending milestones
- **Chase partnership**: Chase Sapphire cardholders get free DashPass
- **Mastercard partnership**: Select World/World Elite Mastercard holders get DashPass benefits

### Cart & Checkout UX Patterns

- DoubleDash cross-sell during cart/checkout (add convenience items)
- Tip prominently in cart, not buried in checkout
- Promo code entry with auto-apply for applicable offers
- Same-store comparison pricing (some markets show if item prices match in-store)
- Address geolocation validation (won't let you order from restaurants outside delivery zone)

### Order Tracking UX

- Dasher profile with name, photo, rating, number of deliveries completed
- Vehicle type + color for curbside identification
- "SafeDash" safety toolkit for dashers (emergency button, ADT integration)
- Live map with accurate position polling
- Proactive notifications if order is delayed with automatic compensation (credits)
- "Leave at door" photo confirmation visible to customer

### Post-Order Experience

- Detailed rating system (5-star for food, separate for delivery)
- Photo review optional
- "Order again" directly from order history
- Favorite restaurants saved automatically based on order frequency
- Reorder from order history with "Add all to cart"

### Accessibility & Localization

- Strong accessibility team; high-contrast mode, screen reader support
- Multi-language in-app (English, Spanish, French, etc.)
- Localized UIs for Wolt markets (Nordic design language)
- Delivery instructions support multi-language notes

### Innovative/Unusual Features

- **DoubleDash**: Multi-merchant orders in single delivery (industry first at scale)
- **Earn by Time**: Dashers can opt for hourly pay instead of per-delivery (worker-facing innovation)
- **Klarna BNPL**: Financing for food orders
- **Retail expansion beyond food**: Ace Hardware partnership shows ambition to be "last-mile for everything"
- **DoorDash Commerce**: Full API suite for retailers to integrate delivery

---

## 3. SkipTheDishes (Skip)

### Complete Order Flow

**Home Screen:**
- Address bar at top with "Delivery" / "Pickup" toggle
- "Skip Express Lane" grocery shortcut
- Horizontal scroll: cuisine categories (pictorial icons + labels)
- Promotional banner for loyalty program ("les Recompenses SKIP" in Quebec)
- "Skip Rewards" progress indicator
- Restaurant cards: photo, name, rating, delivery time, delivery fee, "Skip Rewards" badge
- Bottom tab: Home, Search, Orders, Account

**Search:**
- Search bar with placeholder like "Restaurants, cuisines, dishes"
- Filter by: Cuisine, Dietary, Price, Rating, Delivery fee
- Sort options
- Search history

**PDP:**
- Restaurant hero image
- Restaurant info: rating, cuisine type, delivery time, fee, hours
- Menu categories in anchor tabs
- Item cards: name, description, price, photo (if available)
- Tap item → modal with modifiers, quantity, special instructions
- "Add to order" with price
- Persistent cart button at bottom

**Cart:**
- Full cart view
- Item list with modifiers
- "Add items" link back to menu
- Tip selector (percentage options + custom)
- Promo code entry
- Fee breakdown
- Skip Rewards points earned on this order
- "Proceed to checkout"

**Checkout:**
- Address confirmation with map
- Delivery instructions
- Payment method
- Order summary
- "Place order" with total

**Order Tracking:**
- Map view with courier tracking
- Status steps: Confirmed → Preparing → On the way → Delivered
- Courier name + photo
- ETA display
- Contact courier option
- Push notifications

**Post-Order:**
- Rating prompt
- Order again button
- Receipt view
- Issue reporting

### Canadian Market Specifics

- Available across all Canadian provinces and territories
- Strong presence in mid-sized cities (Saskatoon, Winnipeg, Red Deer, etc.) - wasn't just Toronto/Vancouver first
- Bilingual (EN/FR) by law and design; Quebec-specific marketing with Patrick Groulx
- **Skip Rewards (les Recompenses SKIP)**: Points-based loyalty program; earn points on every order, redeem for credits
- **Skip Express Lane**: Grocery/convenience delivery from dark stores (launched 2021, competing with Instacart in Canada)
- Partnership with Loblaw (PC Express integration)
- Alcohol delivery tested in Winnipeg, expanded to other provinces
- Canadian Olympic Committee partnership (Official Food Delivery App for Tokyo 2020/Beijing 2022)
- Jon Hamm as brand ambassador ("honorary Canadian")

### Unique Features

1. **Skip Rewards**: Native points-based loyalty (unlike most competitors that use subscription model); earn and redeem within ecosystem
2. **Skip Express Lane**: Dark store grocery delivery
3. **Rebrand to "Skip" (2024)**: Shortened name reflects expansion beyond just food delivery to groceries, convenience, retail
4. **French-first Quebec marketing**: Truly bilingual product (not just translated)
5. **Esports partnerships**: Toronto Defiant (Overwatch League) sponsorship

### Loyalty/Rewards

- **Skip Rewards**: Earn points per dollar; redeem for cash off future orders; tiered based on order frequency
- No subscription membership (unlike DashPass/Uber One); differentiator in Canadian market
- Seasonal promotions tied to Canadian holidays/culture

### Accessibility & Localization

- Full French + English across entire platform
- Accessibility compliance with Canadian standards (AODA)
- Regional pricing and offers by province

---

## 4. Zomato

### Complete Order Flow

**Home Screen:**
- Location selector at top
- Search bar ("Search for restaurant, cuisine or a dish")
- Horizontal scroll: cuisine categories with icons (Fast Food, Chinese, North Indian, Pizza, Biryani, etc.)
- **Collections** section: curated lists ("Best Burgers," "Healthy Meals," "Late Night Cravings," "Budget-friendly")
- **Offers** section: restaurant-specific deals
- "Order again" from previous orders
- Restaurant feed: large photos, name, rating (color-coded green/yellow/red), cuisine tags, delivery time, cost for two, offers badge
- **Veg Mode** toggle (India-specific): Filters out all non-vegetarian items and restaurants; major cultural feature
- **Healthy** filter
- Bottom tab: Home, Search, Orders, Profile

**Search:**
- Unified search with dish-level results
- Search by restaurant, dish, cuisine
- Filters: Veg Mode, Non-veg, Rating, Cost for two, Cuisine, Offers
- Sort: Relevance, Rating, Delivery time, Cost (low to high)
- Trending searches
- "Popular dishes near you" aggregation

**PDP:**
- Restaurant header with cover photo
- Rating badge (color-coded: green >4.0, yellow 3.0-4.0, red <3.0)
- Info: cuisine, location, hours, cost for two
- **Safety+ badge**: hygiene certification
- Menu tabs/categories
- **Bestseller tags** on popular items
- Dietary labels: Veg (green dot), Non-veg (red dot per Indian regulation), Egg (yellow dot)
- Item card: photo, name, description, price
- Tap item → modal with modifiers, quantity, cooking instructions
- "Add" button (not multi-tap; one-tap add for simple items)
- Sticky cart button at bottom

**Cart:**
- Cart slide-up or full page
- Item list with names + prices
- Quantity controls per item
- "Add more items"
- Coupon/promo code entry
- Fee breakdown: Item total, Delivery fee, GST, Restaurant charges, Platform fee
- Tip option (some markets)
- "Zomato Gold" benefit if applicable
- "Place order" CTA

**Checkout:**
- Delivery address with map
- Delivery instructions
- Payment method (Credit/Debit, UPI, Net Banking, Wallets, Cash on Delivery)
- Cash on Delivery (COD) specifically important in India
- Order summary

**Order Tracking:**
- Real-time tracking map
- Status tracker: Order placed → Confirmed → Preparing → Out for delivery → Delivered
- Delivery partner name, photo, vehicle
- ETA timer
- "Call delivery partner"
- Push notifications
- Live order status updates

**Post-Order:**
- Star rating for food + delivery
- Detailed review: taste, packaging, value for money
- Photo upload for reviews (Zomato is also a restaurant discovery platform; photos are a key feature)
- "Order again" button
- Issue reporting: missing items, wrong order, quality issues, delivery issues
- Refund flow with photo evidence

### Unique Features

1. **Restaurant discovery + delivery hybrid**: Zomato started as a restaurant review/discovery platform (Yelp equivalent); rich photo reviews, detailed menus, and community content
2. **Veg Mode toggle**: Fundamental feature for Indian market; filters entire experience by vegetarian preference; green/red dot mandatory on every dish
3. **Collections**: Curated thematic lists (best for dates, best biryani, budget eats, etc.)
4. **Zomato Gold**: Dining + delivery membership (free delivery within 7km, up to 30% off at 20,000+ partner restaurants)
5. **Food on Train**: Order food for delivery at upcoming railway stations! Classic Indian-jugaad innovation
6. **Plan a Party**: Bulk ordering tool for events
7. **Gourmet**: Premium curation section
8. **Photos/Reviews social layer**: Rich UGC - food photos from dining (10+ years of photo accumulation); social following of reviewers; restaurant photo galleries; this predates delivery and remains core identity
9. **Safety+**: Hygiene certification badge (post-COVID)
10. **Blinkit integration**: Quick commerce grocery (owned by same parent, Zomato Ltd)
11. **District**: Events and movie ticketing (Zomato ecosystem expansion)
12. **Hyperpure**: B2B supply chain for restaurants (not consumer-facing but notable)

### Loyalty/Rewards

- **Zomato Gold**: Core membership; free delivery + dining discounts
- **Zomato Credits**: Cashback on certain orders
- **Gift Cards**: Digital gift cards for others

### Cart & Checkout UX Patterns

- **Cash on Delivery** support with minimal friction
- **UPI integration** (Google Pay, PhonePe, Paytm) for one-tap payment
- Veg/Non-veg labels at every stage including cart and checkout (prevents ordering mistakes)
- Cost-for-two reference on PDP helps with budget anchoring
- Promo code auto-apply for Gold members

### Order Tracking UX

- Indian-market adapted: SMS notifications alongside push
- Multiple language support for courier communication
- OTP-based delivery confirmation in some scenarios

### Post-Order Experience

- Photo review culture is significant; food styling/staging in review UX
- Detailed breakdown (taste, packaging, value) incentivizes quality reviews
- Review content enriches the restaurant discovery side of the platform (symbiotic loop)

### Accessibility & Localization

- Available in 11+ Indian languages (Hindi, Tamil, Telugu, Kannada, Malayalam, Bengali, Marathi, Gujarati, Punjabi, etc.)
- Veg/Non-veg color coding per FSSAI regulation is inherently an accessibility feature
- Voice search in Indian languages
- Support for low-bandwidth modes and lite versions of the app

### Innovative/Unusual Features

- **Food on Train**: IRCTC partnership; order food for station delivery at upcoming stops
- **Veg Mode as a core feature** (not filter): Fundamental product decision reflecting cultural reality
- **Dual identity**: Restaurant discovery platform AND delivery app
- **Hyperpure**: Vertical integration into restaurant supply chain

---

## 5. Deliveroo

### Complete Order Flow

**Home Screen:**
- Address bar at top
- "Deliveroo Plus" membership promotion
- Hero promotional banner (seasonal)
- Horizontal scroll categories: Grocery, Takeaway, Offers, cuisines with icon+label
- "Popular restaurants" section
- "Your frequent orders"
- Restaurant cards: photo, name, rating, delivery time, delivery fee, "Plus" badge if free delivery
- Bottom tab: Browse, Search, Orders, Account

**Search:**
- Search by restaurant, cuisine, dish
- Filters: Cuisine, Dietary, Rating, Offers, Plus-eligible
- Sort: Recommended, Rating, Delivery Time, Delivery Fee

**PDP:**
- Cover image with restaurant name overlay
- Rating + review count
- Info strip: delivery time, delivery fee, minimum order, distance
- Special badges: "New," "Popular," "Exclusive"
- Menu category tabs
- Item cards: photo, name, description, price
- Dietary/allergen icons
- Tap item → modal with:
  - Full photo
  - Description
  - Modifiers (sizes, extras, dietary options)
  - Quantity
  - "Add to order"
- Sticky "View order" bar at bottom

**Cart:**
- Full cart view
- Items with price and quantity controls
- "Add more items"
- "Order for a group" option
- Tip selector
- Promo code
- Fee breakdown
- "Deliveroo Plus" benefit
- "Go to checkout"

**Checkout:**
- Address with map
- Delivery instructions
- "Leave at door" option
- Payment method
- Order summary
- ETA prominently shown
- "Place order"

**Order Tracking:**
- Live map tracking
- Status bar: Accepted → Preparing → Ready → On the way → Delivered
- Rider name, photo, vehicle type
- ETA countdown
- "Call rider" / "Message rider"
- Push notifications at each stage
- "Track your order" screen with animated rider icon

**Post-Order:**
- Rating for food + delivery
- Thumbs up/down for rider
- Tip adjustment
- "Order again" button
- Receipt view
- Issue reporting

### UK/Europe Features

1. **Deliveroo Plus**: Subscription for free delivery (£7.99/mo UK); Silver/Gold tiers in some markets (Silver = free delivery over £25, Gold = free delivery on all orders)
2. **Deliveroo Editions**: Dark kitchen network; branded as "Deliveroo Editions" locations in the app; enables restaurant expansion without physical locations
3. **Marketplace+**: Restaurants with their own delivery fleets can integrate, using Deliveroo as order platform + overflow delivery capacity
4. **Pick-Up**: Click & collect service for collection from restaurants (launched 2019, bypasses delivery fee)
5. **Grocery partnerships**: M&S, Waitrose, Sainsbury's, Co-op, Aldi, Morrisons, Asda - major UK grocery integration
6. **Deliveroo HOP**: Rapid grocery (10-min promise) from dark stores; first opened in Vauxhall (Central London 2021); now has brick-and-mortar store on New Oxford Street
7. **Amazon Prime partnership (2019-2023)**: Free Deliveroo delivery for Amazon Prime members (UK only, ended)
8. **NSPCC training**: Couriers trained to spot child abuse signs; "Rider safety" initiatives including helmet cameras
9. **Cyclist-first logistics**: Heavy reliance on bicycle/e-bike couriers in dense European cities; environmentally positioned
10. **2025 DoorDash acquisition**: Now a DoorDash subsidiary; brand operates independently; combined company in 40 countries

### Loyalty/Rewards

- **Deliveroo Plus**: Core subscription, two-tier structure
- Regular promotional campaigns with partner restaurants
- Gift cards
- **Advertising platform** (2022 launch): Brands can promote products within the app; restaurant discovery influenced by ad placements

### Cart & Checkout UX Patterns

- Clean, minimal European design aesthetic
- Strong emphasis on delivery time estimates
- Quick reorder from order history
- "Order for a group" link generation before checkout
- Dietary/allergen information throughout flow (UK allergen labeling regulations)

### Order Tracking UX

- Map integration with animated rider
- Push notifications for status changes
- In-app messaging with rider
- ETA prominently displayed with countdown

### Post-Order Experience

- Standard two-axis rating (food + delivery)
- Tip adjustment window
- Quick issue resolution flow

### Accessibility & Localization

- Multi-language across EU markets (English, French, Italian, Dutch, etc.)
- EU WCAG compliance
- Allergen information per UK/France/Italy regulations displayed prominently
- GDPR-compliant data practices

### Innovative/Unusual Features

- **Editions (dark kitchens)**: First major platform to brand and scale delivery-only kitchen hubs
- **HOP rapid grocery**: Physical and dark store hybrid; 10-minute delivery promise
- **Hybrid grocery + restaurant marketplace**: Stronger grocery integration than most food delivery apps
- **Cyclist-first**: Eco positioning with bike/rider safety culture in UK/EU
- **NSPCC child safety partnership**: Unique CSR integration with delivery workforce

---

## 6. Instacart

> *Note: Instacart is primarily a grocery delivery platform, not restaurant delivery. Included for PDP patterns, substitution UX, and personal shopper interaction models.*

### Complete Order Flow

**Home Screen:**
- Store selector at top (browse by store)
- "Your stores" horizontal scroll with store logos
- Filter chips: All, EBT, Fastest, Offers, Low prices, Grocery, Pickup, No markups, Convenience, etc.
- Deals/offers carousel
- Department browse: Food, Pantry, Beverages, Household, etc.
- "Buy it again" section
- Promotional banners for Instacart+
- Store cards with delivery time estimates, delivery fee info, "Instacart+" badge

**Search / Browse Within Store:**
- Search within selected store
- Department-based browsing (Produce, Dairy, Meat, Bakery, etc.)
- Category tree navigation
- "Deals" tab within each store
- Barcode scanning for in-store research
- Search results show: product image, name, size, unit price, "per oz/lb" comparison pricing
- Dietary filters: Organic, Gluten-free, Vegan, etc.

**PDP (Product Detail Page):**
- Product image gallery
- Product name, brand, size/weight
- Price + unit price (price per oz/lb/etc.)
- "Instacart+" member pricing (if lower)
- Nutritional info link
- Ingredients list
- "You might also like" recommendations
- Quantity stepper
- "Add to cart" button
- **Substitution preferences** (per item):
  - "Find Best Match" (default - shopper chooses)
  - "Pick Specific Replacement" (user chooses from suggestions)
  - "Don't Replace" (refund if out of stock)
- Store availability indicator ("Usually in stock" / "Low stock")

**Cart:**
- Full cart view organized by store department
- Each item shows: image, name, size, price, quantity stepper
- **Substitution indicators**: Items where substitution is set show green checkmark
- "Add note" per item (e.g., "green bananas please")
- Delivery tip selector
- Promo code entry
- Fee breakdown
- Instacart+ fee savings callout
- EBT SNAP eligibility indicator
- "Go to checkout"

**Checkout:**
- Delivery address with map
- Delivery time selection (scheduled slots, "Fastest" / "Within 2 hours" / "Within 5 hours")
- "Leave at my door" toggle (default ON since COVID)
- Shopper instructions (general + per-item notes persist)
- Replacement handling preference summary
- Payment method
- EBT card option where applicable
- Order summary
- "Place order"

**Shopping (Real-time):**
- **Shopper chat**: In-app messaging with the personal shopper
- **Real-time substitution approval**: When an item is out of stock, push notification + in-app alert; shopper suggests replacement; customer approves/rejects/requests alternative in real-time
- **Shopper add items**: Shopper can add customer-requested items mid-shop
- "Shopper is shopping" status screen
- Progress bar: items found vs. total
- ETA updates

**Order Tracking:**
- Map view with shopper location
- "Shopper is on the way" notification
- ETA countdown
- Shopper name + photo
- "Leave at door" photo confirmation

**Post-Order:**
- Rating for shopper (5-star)
- Rating for product quality
- Issue reporting: Missing items, incorrect items, damaged items, poor replacements, early/late orders
- Refund/credit flow
- "Buy it again" for reordering

### Substitution Flow (Key UX Differentiator)

This is Instacart's most unique UX pattern:

1. **Pre-order**: Set per-item substitution preferences
2. **During shopping**: Real-time push when shopper encounters out-of-stock
   - Shopper scans shelf → app shows customer's preference
   - Shopper suggests alternative based on: customer pref, AI recommendation, store availability
   - Customer approves/rejects in real-time
   - Suggested alternatives shown with price comparison
3. **Post-delivery**: If substitution was poor, customer can report and get refund
4. **Learning**: Platform learns substitution preferences over time

### Unique Features

1. **Personal shopper model**: Not just delivery; shopper picks items from store shelves with customer interaction
2. **Substitution engine**: Real-time, AI-assisted replacement suggestions during shopping
3. **Multi-store orders**: Can order from multiple stores in single session (separate carts/deliveries)
4. **EBT SNAP acceptance**: Integrated EBT card processing for SNAP-eligible items; reaches ~98% of SNAP households
5. **Instacart+**: $9.99/mo for free delivery on orders $35+, reduced service fees, family sharing
6. **Shoppable Recipes**: TikTok, NYT Cooking, Tasty partnerships - recipe → ingredients → one-click to Instacart cart
7. **Caper Carts**: AI-powered smart shopping carts in physical stores (acquired Caper AI)
8. **Retail Media Network**: Advertising platform for CPG brands within the shopping flow
9. **Instacart Platform**: Enterprise tools for retailers (ecommerce, fulfillment, ads, insights)
10. **Alcohol delivery**: Major alcohol delivery platform with 17,000+ store locations
11. **High contrast color mode**: Accessibility feature prominently placed in footer

### Cart & Checkout UX Patterns

- Per-item notes field (critical for grocery: "ripe avocados," "thin-sliced turkey," etc.)
- Unit pricing (price per oz/lb) shown throughout for comparison
- Scheduled delivery slots with clear time windows
- "Leave at door" photo confirmation
- Multi-payment support (split EBT + credit card)

### Innovative/Unusual Features

- **Substitution UX**: The entire real-time substitution flow is best-in-class for any e-commerce platform
- **Shopper chat**: Real human interaction during fulfillment
- **Shoppable recipes**: Content-to-commerce pipeline
- **Caper Carts**: Physical retail technology (blurring lines between digital and physical grocery)
- **AI-powered "Ask Instacart"**: Natural language food search (e.g., "What should I make for a dinner party?")
- **Health/Nutrition tools**: Dietary filtering, GLP-1 friendly grocery lists, Fresh Funds for nutritious food

---

## 7. Swiggy

### Complete Order Flow

**Home Screen:**
- Location bar at top
- Search bar
- Promotional banners/carousels (seasonal, festival offers: Diwali, Holi, etc.)
- Horizontal scroll: cuisine categories with icons (North Indian, Chinese, Biryani, Pizza, South Indian, etc.)
- **"Swiggy One" membership promotion** card
- "Offers near you" section
- Restaurant feed: photo, name, rating, delivery time, delivery fee, "Swiggy One" free delivery badge, cuisine tags
- "Eat what makes you happy" / personalized recommendations
- **Instamart** (grocery) toggle access
- **Dineout** (table reservations) access
- **Scenes** (events/ticketing, launched Dec 2024)
- Bottom tab: Home, Instamart, Food, Dineout, Genie (shut down May 2025)

**Search:**
- Search bar with "Search for restaurants and food"
- Voice search
- Dish-level search across restaurants
- Filter: Veg/Non-veg, Cuisine, Rating, Cost for two, Offers, Swiggy One-eligible
- Sort: Relevance, Rating, Delivery time, Cost (low to high)
- Trending searches

**PDP:**
- Cover image
- Rating + delivery time + cost for two
- Cuisine tags
- "Swiggy One" free delivery indicator
- Menu with category tabs
- **Bestseller badges** on popular items
- Veg/Non-veg indicators (green/red per Indian regulation)
- Item cards: photo, name, description, price
- Tap item → modal:
  - Photo
  - Description
  - Customization: add-ons, cooking preference, spice level
  - Quantity
  - "Add item"
- Sticky cart button

**Cart:**
- Full cart view
- Items with quantity controls
- Coupon entry (auto-suggest available coupons)
- Fee breakdown: Item total, Delivery, GST, Restaurant charges, Platform fee
- Swiggy One discount
- "Place order"

**Checkout:**
- Delivery address with map
- Payment method (UPI, cards, wallets, COD)
- Delivery instructions
- "Place order"

**Order Tracking:**
- Live map with delivery partner tracking
- Status steps: Placed → Confirmed → Preparing → Picked up → On the way → Delivered
- Delivery partner: name, photo, vehicle
- ETA timer
- "Call" / "Chat"
- Push notifications
- "Share live location" with others

**Post-Order:**
- Rating for food + delivery
- Tip option
- "Order again"
- Issue reporting
- Photo upload for quality complaints

### India Market Features

1. **Swiggy One**: Membership program (competing with Zomato Gold); free delivery + discounts; ~INR 99-149/month
2. **Instamart**: Quick-commerce grocery (15-30 min delivery from dark stores); 127 cities, 100+ dark stores; second to Blinkit in QC market share
3. **Swiggy Genie** (2019-2025): Package/pickup-drop service; ANYTHING delivery (documents, keys, laundry, forgot-your-phone-at-office); shut down May 2025
4. **Dineout**: Table reservation platform (acquired 2022 from Times Internet for $120M); integrated into app
5. **Scenes**: Live events/movie ticketing (launched Dec 2024 to compete with Zomato District)
6. **Swiggy Access**: Cloud kitchen network (sold to Kitchens@ in 2023 share-swap)
7. **Swiggy Stores**: Local delivery from neighborhood shops (evolved into Instamart)
8. **Swiggy Super**: Membership program (predecessor to Swiggy One)
9. **Alcohol delivery**: In select states (Jharkhand, West Bengal, Odisha) during COVID; regulatory complexity

### Loyalty/Rewards

- **Swiggy One**: Core membership with free delivery + partner restaurant discounts
- **Coupons**: Heavy coupon culture in India; Swiggy auto-suggests best applicable coupons at checkout
- **Swiggy Money**: Digital wallet integration
- **Festival offers**: Significant seasonal promotions (Diwali, Holi, New Year, Cricket season - IPL tie-ins)

### Cart & Checkout UX Patterns

- **Auto-coupon application**: Suggests best available coupon at checkout (Indian consumers are coupon-maximizers)
- **UPI-first payments**: Google Pay, PhonePe, Paytm integration; one-tap payment
- **Cash on Delivery** still offered in many areas
- **Cost-for-two** anchoring on PDP
- Veg/Non-veg markers throughout the entire flow

### Order Tracking UX

- Live tracking with map
- SMS backup notifications (for areas with poor data connectivity)
- OTP confirmation in some scenarios
- Multi-language courier communication

### Post-Order Experience

- Rating system
- Photo-based complaint resolution
- Chat-based customer support
- "Order again" from history
- Reorder from favorites

### Accessibility & Localization

- Multi-language (Hindi, Tamil, Telugu, Kannada, Malayalam, Bengali, Marathi, Gujarati, etc.)
- Voice search in regional languages
- Lite app versions for low-end devices / poor connectivity areas
- Veg/Non-veg color coding

### Innovative/Unusual Features

- **Instamart + Food ordering in single app**: Ecosystem play combining food delivery with quick-commerce
- **Genie** (when active): "Deliver anything" - truly unique; documents, forgotten items, etc.
- **Dineout/Scenes**: Expansion beyond delivery into experiences (dining out, events, movies)
- **Voice search in 8+ Indian languages**: Accessibility for non-English/non-literate users
- **Dark store network** (Instamart): Distributed fulfillment enabling 15-30 min delivery
- **Coupon optimization**: ML-driven coupon recommendation at checkout (maximizes value for Indian consumers)

---

## 8. Meituan (美团)

### Complete Order Flow

**Home Screen (Super App - Not Just Food):**
- **THIS IS A SUPER APP** - Food delivery is just one tile among many
- Top section: location, search, notification, scan
- **Service tiles grid**: Food Delivery (美团外卖), Instashopping, Grocery (小象超市), Hotel, Travel, Movie Tickets, Bike Sharing (美团单车), Group Buying (美团优选), Dianping (Restaurant Reviews), Ride-hailing, etc.
- Promotional banners
- Personalized recommendations
- "Nearby food" section
- "Top picks" restaurants
- Bottom tab: Home, Search, Orders, Messages, Profile

**Food Delivery Section (美团外卖):**
- Delivery address bar at top
- Search bar ("Search for dishes, restaurants")
- Horizontal scroll: cuisine categories with icons
- "Offers & Coupons" section (coupon culture is massive in China)
- "Popular in your area"
- Restaurant feed: photo, name, monthly sales volume, rating (5-star), delivery time, delivery fee, minimum order, distance
- "美团会员" (membership) badge on eligible restaurants
- Live streaming restaurant promotions (integrated livestream shopping)

**Search:**
- Unified search across restaurants, dishes
- Filter by: Cuisine, Rating, Sales volume, Delivery time, Offers
- Sort by: Comprehensive (recommended), Sales, Rating, Distance
- Dish-level search results
- "People also searched"

**PDP:**
- Restaurant header with photos
- Rating score, monthly sales count, delivery time, delivery fee
- **Announcement bar**: Restaurant announcements (e.g., "Free delivery over ¥30")
- **Coupon section**: Available coupons to claim before ordering
- **Dianping review integration**: Dazhong Dianping scores and reviews visible
- Menu with category tabs
- Each item: photo (high quality, crucially), name, monthly sales count, description, price
- **"Bestseller" badges** (based on sales data)
- Tap item → modal:
  - Item photo
  - Description
  - Specification options (size, flavor, temperature, etc.)
  - Quantity
  - "Add to cart"
- **Upsells in PDP**: "You might also like," "Popular combos"
- Sticky "Cart" button with item count + total
- **Group Order** button: Share link, each person orders, host or split bill

**Cart:**
- Full-page cart
- Items with specs and prices
- Quantity controls
- "Add more items"
- **Deductible coupon selection** (multiple coupons may apply)
- **"Reduce delivery fee" tools**: Membership, coupons, merchant subsidies
- Fee breakdown: Item subtotal, Packaging fee, Delivery fee, Membership discount, Coupon discount
- Total prominently displayed
- Tip culture is minimal in China (not prompted)

**Checkout:**
- Address confirmation with map pin (precise Chinese address format: province → city → district → street → building → unit)
- **Delivery time selection**: "Deliver now" or "Schedule" (specific time window)
- Contact phone number
- **Invoice (发票) request**: Fapiao invoice for business expense reporting (culturally important in China)
- Payment method:
  - WeChat Pay (微信支付)
  - Alipay (支付宝)
  - Meituan Pay (美团支付)
  - Bank cards
  - **Huabei (花呗)** - Alibaba's BNPL
  - **Meituan Monthly Pay (美团月付)** - Meituan's own BNPL
- **Note to merchant**: Free text
- Tableware request: Request disposable utensils (筷子/kuaizi) or decline (environmentalism push)
- "Submit order" with final price

**Order Tracking:**
- Meituan's tracking is known for being exceptionally detailed:
  - Live map with courier position (GPS)
  - **Courier info**: Name, photo, rating, number of deliveries
  - Status steps: "Merchant accepted" → "Preparing" → "Waiting for pickup" → "Courier picked up" → "On the way" → "Almost there" → "Delivered"
  - ETA with countdown
  - **"Courier distance"** shown in meters
  - **Courier's current temperature zone**: Hot/cold item handling status
  - "Call courier" / "Message courier"
  - **Real-time route path** on map (not just dots but actual route line)
  - **"Buy delivery insurance"**: Optional delivery delay insurance for compensation
- Push notifications at each stage
- **AI customer service**: Meituan's LongCat AI (Xiaomei agent) can handle common inquiries

**Post-Order:**
- Star rating for food + delivery
- Detailed review with photo upload (Chinese review culture is extremely rich; long-form, photo-heavy reviews on Dianping)
- **"Tip courier" (打赏骑手)** option: Voluntary tip/reward for courier
- "Order again" button
- Receipt view
- Invoice download (fapiao)
- Issue reporting: Wrong items, missing items, quality, late delivery
- **Refund flow**: AI-powered first response, then human escalation
- "Add to favorites" for restaurant

### Super App Features

Meituan is fundamentally different from Western food delivery apps. Food delivery is **one module** within a super app:

1. **Dianping (大众点评)**: Yelp-like restaurant reviews & discovery; rich UGC content; integrated into food delivery PDPs
2. **Hotel & Travel**: Hotel booking, train tickets, flights
3. **Movie Tickets**: Cinema seat selection + ticket purchase
4. **Bike Sharing (美团单车)**: Former Mobike; dockless bike and e-bike
5. **Meituan Select (美团优选)**: Community group buying; next-day grocery pickup
6. **Xiaoxiang Supermarket (小象超市)**: Instant grocery delivery
7. **Meituan Instashopping**: On-demand retail from local stores
8. **Ride-hailing**: Competing with Didi
9. **Meituan Pay / Monthly Pay**: Financial services, BNPL
10. **Kuaishou/Livestream**: Restaurant livestreaming promotions

### Unique Features

1. **Super App architecture**: Not a standalone delivery app; 770M+ annual transacting users across all services
2. **AI Agent (Xiaomei / 小美)**: AI-powered food ordering assistant using Meituan's LongCat LLM; conversational ordering, recommendations
3. **Autonomous delivery**: UAV drones (5km range, operates in rain); self-driving delivery vehicles (partnership with Li Auto + Pony.ai)
4. **Group ordering (拼单)**: Native group order feature; each person adds items; shared cart; can split bill or one person pays
5. **Coupon and Red Packet (红包) culture**: Deeply integrated; users collect/share red packets (digital money gifts) for discounts; gamified
6. **Live streaming + food delivery**: Restaurants do live streams; viewers order directly from stream
7. **Membership (美团会员)**: Tiered membership with monthly coupon packs, member pricing
8. **Delivery insurance**: Optional insurance against late delivery; automated compensation
9. **Fapiao (invoice) integration**: Business expense reporting built into food delivery checkout (uniquely Chinese requirement)
10. **Tableware toggle**: Opt-out of single-use utensils (environmental regulation compliance)
11. **Community group buying (美团优选)**: Bulk purchase + next-day pickup model for lower-tier cities
12. **International brand Keeta**: Launched in Hong Kong (2023), Saudi Arabia (2024), Qatar (2025), UAE (2025), Brazil (2025)

### Loyalty/Rewards

- **Meituan Membership**: Paid monthly subscription; coupon packs (e.g., 6x ¥5 vouchers for ¥15/month)
- **Red Packets**: Shareable digital red envelopes with random discounts; gamified social sharing
- **Meituan Points**: Earn on spending; redeem for coupons, partner benefits
- **Membership Day**: Monthly/quarterly promotions with extra discounts
- Gamification through mini-programs (games, check-ins for points)

### Cart & Checkout UX Patterns

- **Address precision**: Chinese address format demands province/city/district/street/building/unit - Meituan's address UX handles this beautifully with cascading selectors + map pin
- **Coupon optimization**: Auto-selects best combination of applicable coupons, membership benefits, and red packets
- **Invoice request**: Optional fapiao request at checkout for business expenses
- **Packaging fee** as separate line item (common in Chinese delivery)
- **Tableware selection** (environmental feature)
- **BNPL options**: Huabei and Meituan Monthly Pay
- **Minimal tipping**: Not culturally expected; "tip courier" is a post-delivery gratitude option, not compensation

### Order Tracking UX

- Industry-leading detail: route lines, courier metrics, temperature zone info
- Delivery insurance opt-in
- Courier profile rich display
- Real-time GPS with meter-level accuracy

### Post-Order Experience

- Rich review culture: long-form reviews with photos (Dianping heritage)
- Fapiao download
- AI customer service first contact
- Courier tipping (voluntary appreciation)
- Issue resolution with photo/video evidence

### Accessibility & Localization

- Chinese-first, with Keeta international expansion adding Arabic, Portuguese, etc.
- AI-powered customer support in multiple dialects
- Voice ordering for elderly/non-tech-savvy users
- Simplified interface options for older demographics

### Innovative/Unusual Features

- **Super App**: This is THE defining differentiator. Food delivery is a wedge into a full lifestyle platform
- **AI ordering agent**: Conversational food ordering via LLM
- **Drone + autonomous vehicle delivery**: Operational at scale in Chinese cities
- **Live streaming commerce**: Ordering food through live streams
- **Community group buying**: Wholesale pricing model; social commerce
- **Built-in BNPL**: Financial services integration
- **Tableware opt-out**: Environmental UX pattern
- **Fapiao/invoice at checkout**: Business integration

---

## 9. Cross-Cutting UX Patterns & Recommendations

### Patterns Every Top App Uses

| Pattern | Details | Implement In Prototype? |
|---------|---------|------------------------|
| **Persistent floating cart button** on PDP | Always visible; never lost | YES - essential |
| **Real-time order tracking with live map** | Map with animated courier, ETA countdown, step indicators | YES - expected baseline |
| **Hero imagery on restaurant cards** | Large photos drive engagement; food is visual | YES |
| **Horizontal scroll category chips** | Quick cuisine/dietary filters at top of home | YES |
| **"Order again" section** | Reduces friction for repeat orders; most-used feature | YES |
| **Item modal with modifiers** | Tap item → bottom sheet with options, quantity, add to cart | YES |
| **Fee transparency at checkout** | Line-item breakdown of all charges before placing order | YES |
| **Push notification status updates** | Order confirmed → preparing → en route → delivered | YES |
| **Dietary and allergen indicators** | Veg/Non-veg, gluten-free, dairy-free tags throughout | YES |
| **Two-stage post-order rating** | Quick sentiment then detailed (food + delivery separate) | YES |

### Differentiated Features Worth Borrowing

| Feature | Source App | Why Borrow |
|---------|-----------|------------|
| **Group ordering** | Uber Eats, Meituan, Deliveroo | Social ordering increases basket size; share a link, everyone adds items |
| **DoubleDash-style add-ons** | DoorDash | Cross-sell during tracking phase; "add drink/dessert while you wait" |
| **Substitution approval flow** | Instacart | For any multi-item order; real-time out-of-stock handling |
| **Veg Mode toggle** | Zomato, Swiggy | For markets with significant vegetarian populations; binary preference at app level |
| **Coupon optimization** | Swiggy, Meituan | Auto-apply best available coupon; consumers expect this |
| **Shoppable recipes** | Instacart | Content-to-commerce; recipe → ingredients → cart |
| **Delivery insurance** | Meituan | Optional insurance against late/mishandled delivery |
| **AI ordering assistant** | Meituan (Xiaomei) | Conversational ordering for discovery/new users |
| **Rich review integration** | Zomato/Dianping | Photo reviews + taste/packaging/value criteria enriches PDP content |
| **Pickup option** | All major apps | Self-service collection; no delivery fee; faster |
| **Schedule ordering** | All major apps | Pre-order for later time/date; essential for lunch meetings |

### Anti-Patterns to Avoid

- **Hiding fees until final checkout**: Trust-eroding; users abandon carts
- **No cart persistence on back navigation**: Frustrating when browsing
- **Forcing tip selection before service**: Controversial (DoorDash history)
- **No real-time tracking**: Table stakes now; text-only status is unacceptable
- **One-size-fits-all design**: Must accommodate dietary, religious, and cultural preferences
- **Poor address UX**: Single text field for address; should use map pin + smart autocomplete
- **No photo on items**: Food is visual; text-only menus reduce conversion
- **Requiring account creation before browsing**: Friction; let users browse first

### Accessibility Checklist

1. Screen reader (VoiceOver/TalkBack) support for all interactive elements
2. Color is never the sole differentiator for status/rating (add icons/text)
3. Sufficient color contrast on all text (WCAG AA minimum)
4. Touch targets minimum 44x44pt
5. Support for Dynamic Type / font scaling
6. Keyboard navigation for power users
7. Alternative text for all food imagery
8. High contrast mode option
9. Reduced motion option for animations
10. Multi-language support with true localization (not just translation)

### Key Takeaways for a Single-Brand Restaurant App

1. **Focus on the core loop**: Browse → PDP → Cart → Checkout → Track → Reorder. Make this flawless.
2. **Hero imagery is currency**: Invest in professional food photography for every menu item.
3. **Personalization from first order**: "Order again," "Based on your taste," reorder previous customizations.
4. **Social features drive engagement**: Group ordering, share tracking, photo reviews.
5. **Rewards are retention**: Whether points-based (Skip Rewards) or subscription (DashPass/Uber One), give users a reason to return.
6. **Tracking builds trust**: Real-time map tracking, courier identity, accurate ETAs reduce post-order anxiety.
7. **Post-order is an opportunity**: Reorder, rate, share = more orders. Don't treat it as the end of the flow.
8. **Transparency = trust**: Show all fees upfront, explain what each charge is, make cancellation/refund easy.
9. **Localize deeply**: Not just language - payment methods, dietary preferences, cultural norms, address formats.
10. **Start simple, iterate**: Meituan and Zomato didn't become super-apps overnight. Start with core delivery excellence.

---

*End of Report*
