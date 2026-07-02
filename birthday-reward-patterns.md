# Birthday Reward Banner — 3 Design Patterns

---

## 1. Default: Festive Hero Banner
**Layout**: Full-width horizontal card (320–375px), 180–220px height, rounded corners (16–24px), subtle drop shadow
**Visual Elements**:
- Background: Gradient (warm coral → peach → cream) or deep navy with subtle confetti particles
- Left: Large illustrated cake (3D/illustrated) + floating gift box with ribbon
- Right: "Happy Birthday [Name]!" (28–32px, bold, rounded type) + "Your gift is waiting" (16px, medium)
- CTA: Pill button "Claim Gift" (48px height, coral/gradient fill, white text, 16px weight 600)
- Confetti burst animation on mount (CSS/JS, reduced-motion respected)
**Urgency/Festive Indicators**:
- Subtle pulse on CTA (2s loop)
- "Today only" badge (top-right, 12px, red accent)
- Confetti falls away after 5s

---

## 2. Option 1: Vertical Tiered Rewards Card
**Layout**: Vertical stack (full-width, ~360px tall), 3 equal-height tiers (100px each), 12px gap
**Visual Elements**:
- Tier 1 (Free Dessert): 🍰 icon (48px) + "Free Dessert" (18px bold) + "Up to $12 value" (14px muted)
- Tier 2 (Discount): 🎁 icon + "25% Off Order" + "Max $15 off"
- Tier 3 (Bonus Points): ⭐ icon + "500 Bonus Points" + "Redeem anytime"
- Each tier: White card, 12px radius, left accent bar (coral/teal/gold), right chevron
- Bottom: "Claim All" full-width button (gradient, 52px)
**Urgency/Festive Indicators**:
- Tier unlock animation (staggered 150ms)
- "Birthday week only" banner across top (12px, gradient text)
- Progress ring (top-right) showing 0/3 claimed → fills on tap

---

## 3. Option 2: Compact Horizontal Banner
**Layout**: Slim horizontal bar (full-width, 88–100px height), fixed bottom or top of feed
**Visual Elements**:
- Left: Small cake emoji/icon (28px) + "Birthday Treat" (16px semibold)
- Center: Countdown timer "04:23:15" (monospace 20px, tabular nums, coral)
- Right: "Claim Now" button (compact, 80×36px, coral fill, 14px)
- Background: Dark navy with subtle radial gradient glow behind timer
**Urgency/Festive Indicators**:
- Live countdown (hours:minutes:seconds) — resets at midnight
- Timer pulses red at <1hr, flashes at <5min
- Confetti micro-burst on claim (canvas, 300ms)
- Haptic feedback on button press (iOS/Android)