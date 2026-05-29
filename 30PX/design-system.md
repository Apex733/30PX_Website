# 30PX Design System

## Design Philosophy

Inspired by Apple's design principles: **Clarity. Deference. Depth.**

Our visual language is:
- **Clean** but not sterile
- **Bold** but not loud
- **Modern** but timeless
- **Professional** but approachable

Everything we create should feel premium—because great design shouldn't cost premium prices.

---

## Core Principles

### 1. Whitespace Is a Feature
Let elements breathe. Generous spacing signals confidence and premium quality. Cluttered layouts signal desperation.

**Rule**: When in doubt, add more space.

---

### 2. Typography Does the Heavy Lifting
Strong type hierarchy means users instantly know what matters. We don't need decorations when our words are well-set.

**Rule**: If you need to add visual elements to make something "pop," the typography isn't working hard enough.

---

### 3. Color With Purpose
Every color choice should mean something. Accent colors draw attention to actions. Neutrals let content shine.

**Rule**: No more than 3 colors on any single screen (excluding images).

---

### 4. Subtle Motion, Big Impact
Micro-animations add polish without distraction. Transitions should feel natural—like physics, not performance.

**Rule**: If a user notices the animation, it's too much.

---

### 5. Hierarchy Over Decoration
Visual hierarchy is the foundation. Size, weight, color, and position tell users where to look—not borders, shadows, or gradients.

**Rule**: Earn every visual element. If it doesn't guide the eye, remove it.

---

## Visual Identity

### Logo Usage
- Minimum clear space: Equal to the height of "30" in the logo
- Minimum size: 40px height for digital
- Preferred placement: Top left, centered, or bottom center
- Colors: Full color on light backgrounds, white on dark backgrounds

### Color Palette
See `design-tokens.css` for complete color definitions.

**Primary**: Deep black, electric white—classic, confident, timeless
**Accent**: Vibrant violet (#7C3AED)—modern, creative, energetic
**Semantic**: Success (green), Warning (amber), Error (red)

### Typography
**Primary Font**: Inter (clean, geometric, highly legible)
**Fallback**: SF Pro Display, system-ui

| Use Case | Size | Weight | Tracking |
|----------|------|--------|----------|
| Display (Hero) | 64-80px | 700 | -0.02em |
| H1 | 48px | 700 | -0.01em |
| H2 | 36px | 600 | 0 |
| H3 | 24px | 600 | 0 |
| Body Large | 20px | 400 | 0.01em |
| Body | 16px | 400 | 0 |
| Caption | 14px | 400 | 0.02em |
| Micro | 12px | 500 | 0.04em |

---

## Component Guidelines

### Buttons

**Primary Button**
- Background: Accent color (--color-accent)
- Text: White
- Padding: 16px 32px
- Border-radius: 12px
- Hover: Slightly lighter, subtle scale (1.02)
- Active: Slightly darker

**Secondary Button**
- Background: Transparent
- Border: 1px solid current color
- Text: Primary text color
- Same padding and radius as primary

**Ghost Button**
- No border, no background
- Underline on hover
- Used for tertiary actions

**Liquid Ripple Effect (All Buttons)**
- Every button (except `ghost` and `link` variants) includes a liquid ripple effect on click/tap
- A circular ripple expands from the exact pointer position using `currentColor` at 12% opacity
- Animation: `btn-ripple-expand` — scales from 0 to full size over 600ms with `cubic-bezier(0.4, 0, 0.2, 1)` easing
- Ripple auto-removes from DOM after animation completes
- Buttons must have `position: relative` and `overflow: hidden` for the effect to work
- Can be disabled per-button via the `ripple={false}` prop

---

### Cards

**Default Card**
- Background: White (light) or --neutral-900 (dark)
- Border-radius: 16px
- Padding: 32px
- Shadow: Subtle, layered (see tokens)
- Hover: Slight lift (translateY -2px), increased shadow

**Feature Card**
- Same as default
- Accent border-left: 4px solid accent
- Icon at top

---

### Forms

**Input Fields**
- Height: 48px
- Border: 1px solid --neutral-300
- Focus: Accent border, subtle glow
- Border-radius: 8px
- Label: Above input, 14px, medium weight

**Validation**
- Error: Red border, error message below
- Success: Green border (optional checkmark)

---

### Navigation

**Header**
- Height: 72px
- Sticky with blur backdrop
- Logo left, links center, CTA right
- Mobile: Hamburger menu to full-screen overlay

**Footer**
- Dark background
- 4-column grid on desktop
- Links, social, copyright

---

## Layout System

### Grid
- **Container max-width**: 1200px
- **Columns**: 12-column grid
- **Gutter**: 24px (desktop), 16px (mobile)
- **Margin**: 64px (desktop), 24px (mobile)

### Spacing Scale
Based on 8px unit system:

| Token | Value | Use Case |
|-------|-------|----------|
| --space-1 | 4px | Inline spacing, tiny gaps |
| --space-2 | 8px | Tight spacing |
| --space-3 | 16px | Default spacing |
| --space-4 | 24px | Component padding |
| --space-5 | 32px | Card padding |
| --space-6 | 48px | Section gaps |
| --space-7 | 64px | Section padding |
| --space-8 | 96px | Hero spacing |
| --space-9 | 128px | Major sections |

---

## Section Templates

### Hero Section
- Full viewport height (min 100vh)
- Centered content or left-aligned with right visual
- One headline, one subheadline, one CTA
- Optional: Background gradient or subtle pattern

### Feature Grid
- 3-column on desktop, 1-column on mobile
- Icon + Headline + Short description
- Consistent card heights

### Comparison Table
- Horizontal scroll on mobile
- Sticky first column (competitor names)
- Checkmarks for included features
- X marks for excluded
- Highlight our column

### Testimonials
- Carousel or stacked cards
- Quote, name, title, star rating
- Optional: Avatar

### Pricing
- Side-by-side cards
- Highlight "Most Popular"
- Feature comparison below
- CTA on each card

---

## Imagery Guidelines

### Photography Style
- Authentic, not stock-feeling
- Good lighting, natural shadows
- People: Diverse, genuine expressions
- Workspaces: Clean, creative, aspirational

### Illustrations (If Used)
- Flat, geometric style
- Limited color palette (2-3 colors)
- Consistent stroke weight
- No overly detailed or "cute" illustrations

### Icons
- Line icons (1.5-2px stroke)
- Consistent size (24px default)
- Single color, match text or accent
- Source: Heroicons, Phosphor, or custom

---

## Animation Principles

### Timing
- Quick interactions: 150-200ms
- Transitions: 300-400ms
- Complex animations: 500-800ms

### Easing
- **Enter**: ease-out (elements appearing)
- **Exit**: ease-in (elements leaving)
- **Movement**: ease-in-out (shifting position)

### What to Animate
✅ Hover states (buttons, cards, links)
✅ Page transitions
✅ Scroll reveals (subtle fade-up)
✅ Loading states
✅ Success/error feedback

### What NOT to Animate
❌ Body text
❌ Background colors (unless dark mode toggle)
❌ Complex SVG paths
❌ Anything that loops infinitely

---

## Accessibility Standards

- **Contrast**: 4.5:1 minimum for text
- **Focus states**: Visible keyboard focus indicators
- **Alt text**: All images must have descriptive alt text
- **Semantic HTML**: Proper heading hierarchy, landmark regions
- **Touch targets**: Minimum 44px × 44px

---

## Don'ts

- ❌ Don't use light gray text on white backgrounds
- ❌ Don't center-align long paragraphs
- ❌ Don't use more than 2 fonts
- ❌ Don't use thin font weights for body text
- ❌ Don't use purely decorative animations
- ❌ Don't use stock photos with watermarks
- ❌ Don't use multiple CTAs competing for attention
- ❌ Don't use rainbow gradients or neon colors
