# Product Landing Page Color Systems Reference

Complete color palette specifications for all 4 variations with usage guidelines.

---

## Variation 1: SaaS/App Product Page

### Palette Option 1 - Modern Blue System

**Primary Colors:**
```
Primary Blue: #2B6CFF
- Usage: Primary CTAs, links, brand elements
- RGB: rgb(43, 108, 255)
- HSL: hsl(222, 100%, 58%)

Primary Blue Hover: #1E5FEE
- Usage: Button hover states, active states
- RGB: rgb(30, 95, 238)

Secondary Purple: #6B4CE6
- Usage: Secondary CTAs, accents, highlights
- RGB: rgb(107, 76, 230)
- HSL: hsl(256, 74%, 60%)
```

**Background & Surface:**
```
Background White: #FFFFFF
- Usage: Main page background
- RGB: rgb(255, 255, 255)

Surface Light: #F8F9FB
- Usage: Card backgrounds, sections
- RGB: rgb(248, 249, 251)
- HSL: hsl(220, 23%, 98%)

Surface Gray: #F3F4F6
- Usage: Disabled states, subtle backgrounds
- RGB: rgb(243, 244, 246)
```

**Borders:**
```
Border Light: #E5E7EB
- Usage: Card borders, dividers
- RGB: rgb(229, 231, 235)

Border Medium: #D1D5DB
- Usage: Input borders, stronger dividers
- RGB: rgb(209, 213, 219)
```

**Text Colors:**
```
Text Primary: #111827
- Usage: Headlines, body text
- RGB: rgb(17, 24, 39)
- Contrast ratio on white: 15.5:1 (AAA)

Text Secondary: #6B7280
- Usage: Supporting text, captions
- RGB: rgb(107, 114, 128)
- Contrast ratio on white: 5.7:1 (AA)

Text Tertiary: #9CA3AF
- Usage: Placeholder text, disabled text
- RGB: rgb(156, 163, 175)
```

**Status Colors:**
```
Success Green: #10B981
- Usage: Success messages, checkmarks
- RGB: rgb(16, 185, 129)

Warning Orange: #F59E0B
- Usage: Warning states, alerts
- RGB: rgb(245, 158, 11)

Error Red: #EF4444
- Usage: Error messages, destructive actions
- RGB: rgb(239, 68, 68)

Info Blue: #3B82F6
- Usage: Info messages, tips
- RGB: rgb(59, 130, 246)
```

**Usage Examples:**
```css
/* Primary Button */
.btn-primary {
  background: #2B6CFF;
  color: #FFFFFF;
  border: none;
}

.btn-primary:hover {
  background: #1E5FEE;
}

/* Card Component */
.card {
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  color: #111827;
}

/* Section Background */
.section-alternate {
  background: #F8F9FB;
}
```

---

### Palette Option 2 - Purple Focus System

**Primary Colors:**
```
Primary Purple: #7C3AED
- Usage: Primary CTAs, brand elements
- RGB: rgb(124, 58, 237)
- HSL: hsl(262, 83%, 58%)

Primary Purple Hover: #6D28D9
- RGB: rgb(109, 40, 217)

Secondary Teal: #2DD4BF
- Usage: Accents, highlights, success states
- RGB: rgb(45, 212, 191)
- HSL: hsl(172, 66%, 50%)

Accent Cyan: #00FFD1
- Usage: Highlights, special features
- RGB: rgb(0, 255, 209)
```

**Background & Surface:**
```
Background White: #FFFFFF
Surface Light: #FAFAFA
Surface Purple Tint: #F5F3FF (5% purple)
```

**Text:**
```
Text Primary: #0F172A
- Deep slate for maximum contrast
Text Secondary: #64748B
Text Purple: #7C3AED (for links)
```

**Usage Examples:**
```css
.hero-gradient {
  background: linear-gradient(135deg, #7C3AED 0%, #2DD4BF 100%);
}

.btn-primary {
  background: #7C3AED;
  box-shadow: 0 4px 14px rgba(124, 58, 237, 0.4);
}

.feature-icon {
  color: #2DD4BF;
}
```

---

## Variation 2: Educational/Course Product Page

### Trust-Building Palette

**Primary Colors:**
```
Trust Blue: #2563EB
- Usage: Primary CTAs, trust elements
- RGB: rgb(37, 99, 235)
- HSL: hsl(217, 83%, 53%)
- Psychology: Trust, reliability, professionalism

Trust Blue Hover: #1E40AF
- RGB: rgb(30, 64, 175)

Achievement Gold: #F59E0B
- Usage: Ratings, badges, highlights
- RGB: rgb(245, 158, 11)
- HSL: hsl(38, 92%, 50%)
- Psychology: Success, achievement, value

Success Green: #10B981
- Usage: Checkmarks, completion, outcomes
- RGB: rgb(16, 185, 129)
- Psychology: Growth, progress, success
```

**Background & Surface:**
```
Warm Background: #F9FAFB
- Slightly warm white for approachable feel
- RGB: rgb(249, 250, 251)

Pure White: #FFFFFF
- Card backgrounds, pricing cards

Warm Surface: #FEF3C7
- Highlight sections, important callouts
- RGB: rgb(254, 243, 199)
- Light yellow tint
```

**Text:**
```
Text Primary: #111827
Text Secondary: #6B7280
Text Muted: #9CA3AF
```

**Special Colors:**
```
Rating Gold: #FBBF24
- Five-star ratings
- RGB: rgb(251, 191, 36)

Certificate Badge: #8B5CF6
- Certificate highlights
- RGB: rgb(139, 92, 246)

Progress Blue: #3B82F6
- Progress bars, completion indicators
- RGB: rgb(59, 130, 246)
```

**Usage Examples:**
```css
/* Enrollment Button */
.btn-enroll {
  background: #2563EB;
  color: #FFFFFF;
  font-weight: 600;
  box-shadow: 0 4px 6px rgba(37, 99, 235, 0.25);
}

/* Rating Display */
.rating {
  color: #FBBF24;
}

/* Outcome Checkmark */
.outcome-check {
  color: #10B981;
}

/* Guarantee Badge */
.guarantee-badge {
  background: #FEF3C7;
  border: 2px solid #F59E0B;
  color: #92400E;
}

/* Course Card */
.course-card {
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
}

.course-card:hover {
  border-color: #2563EB;
  box-shadow: 0 8px 16px rgba(37, 99, 235, 0.15);
}
```

---

## Variation 3: Physical Product Showcase

### Minimalist Product-Focused Palette

**Core Colors:**
```
Pure Black: #000000
- Usage: Text, UI elements, backgrounds
- RGB: rgb(0, 0, 0)
- Maximum contrast

Near Black: #1D1D1F
- Apple-style dark gray
- Usage: Text on white, subtle backgrounds
- RGB: rgb(29, 29, 31)

Pure White: #FFFFFF
- Usage: Main background, maximum product focus
- RGB: rgb(255, 255, 255)
```

**Product Accent Colors (Dynamic):**
```
These change based on product colors:

Example for Blue Product:
Product Blue: #0071E3 (Apple blue)
Product Blue Dark: #0077ED

Example for Orange Product:
Cosmic Orange: #F56300
Deep Blue: #1E3A8A
Lavender: #E0BBE4
```

**UI Grays:**
```
Surface Light: #F5F5F7
- Card backgrounds, section backgrounds
- RGB: rgb(245, 245, 247)

Border Gray: #D2D2D7
- Dividers, borders
- RGB: rgb(210, 210, 215)

Text Primary: #1D1D1F
Text Secondary: #86868B
- RGB: rgb(134, 134, 139)
Text Tertiary: #6E6E73
```

**Status Colors (Subtle):**
```
Success Green: #34C759
- In stock, available
- RGB: rgb(52, 199, 89)

Error Red: #FF3B30
- Out of stock, error
- RGB: rgb(255, 59, 48)

Warning Orange: #FF9500
- Low stock, warning
- RGB: rgb(255, 149, 0)
```

**Usage Examples:**
```css
/* Hero Section */
.hero {
  background: #FFFFFF;
  color: #1D1D1F;
}

/* Product Name */
.product-name {
  font-size: 56px;
  font-weight: 600;
  color: #1D1D1F;
}

/* Feature Section (Alternating) */
.feature-section {
  background: #FFFFFF;
}

.feature-section:nth-child(even) {
  background: #F5F5F7;
}

/* Buy Button */
.btn-buy {
  background: #0071E3;
  color: #FFFFFF;
  border-radius: 980px; /* Pill shape */
}

/* Spec Table */
.spec-table {
  border: 1px solid #D2D2D7;
  color: #1D1D1F;
}

.spec-table th {
  background: #F5F5F7;
}

/* Availability Badge */
.in-stock {
  color: #34C759;
}

.out-of-stock {
  color: #FF3B30;
}
```

---

## Variation 4: Premium/High-Ticket Product

### Luxury Palette Option 1 - Dark Premium

**Primary Colors:**
```
Pure Black: #000000
- Usage: Background, high contrast
- RGB: rgb(0, 0, 0)

Near Black: #0A0A0A
- Slightly lighter for depth
- RGB: rgb(10, 10, 10)

Luxury Gold: #D4AF37
- Usage: Accents, highlights, CTAs
- RGB: rgb(212, 175, 55)
- HSL: hsl(46, 64%, 52%)

Dark Gold: #B8860B
- Hover states, darker gold
- RGB: rgb(184, 134, 11)
```

**Surfaces:**
```
Dark Surface: #1A1A1A
- Card backgrounds on dark
- RGB: rgb(26, 26, 26)

Dark Surface 2: #2A2A2A
- Layered elements
- RGB: rgb(42, 42, 42)
```

**Text (on Dark):**
```
Text White: #FFFFFF
- Primary text on dark backgrounds
- RGB: rgb(255, 255, 255)

Text Light Gray: #A0A0A0
- Secondary text
- RGB: rgb(160, 160, 160)

Text Gold: #D4AF37
- Highlights, important info
```

**Borders:**
```
Border Subtle: #2A2A2A
- Barely visible borders
- RGB: rgb(42, 42, 42)

Border Gold: #D4AF37
- Important elements
```

**Usage Examples:**
```css
/* Dark Hero */
.hero-premium {
  background: #000000;
  color: #FFFFFF;
}

.hero-headline {
  font-size: 72px;
  font-weight: 300; /* Light weight for luxury */
  color: #FFFFFF;
  letter-spacing: -0.02em;
}

/* Gold CTA */
.btn-apply {
  background: #D4AF37;
  color: #000000;
  font-weight: 600;
  border: none;
  padding: 16px 48px;
  font-size: 18px;
}

.btn-apply:hover {
  background: #B8860B;
}

/* Premium Card */
.premium-card {
  background: #1A1A1A;
  border: 1px solid #2A2A2A;
  color: #FFFFFF;
  padding: 48px;
}

/* Price Display */
.investment-amount {
  font-size: 64px;
  font-weight: 300;
  color: #D4AF37;
}

/* Testimonial */
.testimonial-premium {
  background: #0A0A0A;
  border-left: 3px solid #D4AF37;
  padding: 32px;
  font-style: italic;
  color: #A0A0A0;
}
```

---

### Luxury Palette Option 2 - Light Premium

**Primary Colors:**
```
Near Black: #1A1A1A
- Usage: Text, important elements
- RGB: rgb(26, 26, 26)

Muted Gold: #8B7355
- Sophisticated, not flashy
- RGB: rgb(139, 115, 85)
- HSL: hsl(33, 24%, 44%)

Deep Purple: #4C1D95
- Luxury alternative to gold
- RGB: rgb(76, 29, 149)
```

**Backgrounds:**
```
Pure White: #FFFFFF
Warm White: #FAFAF9
- Slightly warm undertone
- RGB: rgb(250, 250, 249)

Warm Surface: #F5F5F4
- RGB: rgb(245, 245, 244)
```

**Text:**
```
Text Primary: #1A1A1A
Text Secondary: #78716C
- Warm gray
- RGB: rgb(120, 113, 108)

Text Accent: #8B7355 (muted gold)
```

**Borders:**
```
Border Light: #E7E5E4
- Warm gray border
- RGB: rgb(231, 229, 228)

Border Medium: #D6D3D1
```

**Usage Examples:**
```css
/* Light Premium Hero */
.hero-light-premium {
  background: #FFFFFF;
  color: #1A1A1A;
  padding: 128px 0;
}

.hero-headline {
  font-size: 64px;
  font-weight: 400;
  letter-spacing: -0.03em;
}

/* Elegant CTA */
.btn-reserve {
  background: #8B7355;
  color: #FFFFFF;
  border: none;
  padding: 16px 48px;
  font-size: 18px;
  font-weight: 500;
}

.btn-reserve:hover {
  background: #78624A;
}

/* Premium Card Light */
.card-premium-light {
  background: #FAFAF9;
  border: 1px solid #E7E5E4;
  padding: 48px;
  border-radius: 4px; /* Subtle, not rounded */
}

/* Investment Display */
.investment-light {
  font-size: 56px;
  font-weight: 300;
  color: #1A1A1A;
}

/* Exclusivity Badge */
.badge-exclusive {
  background: #F5F5F4;
  color: #8B7355;
  border: 1px solid #E7E5E4;
  padding: 8px 16px;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
```

---

### Luxury Palette Option 3 - Purple Premium

**Primary Colors:**
```
Deep Purple: #4C1D95
- Rich, sophisticated
- RGB: rgb(76, 29, 149)

Bright Purple: #7C3AED
- Accents, interactive elements
- RGB: rgb(124, 58, 237)

Luxury Gold: #F59E0B
- Complementary accent
- RGB: rgb(245, 158, 11)
```

**Backgrounds:**
```
Warm White: #FAFAF9
Pure White: #FFFFFF
Purple Tint: #FAF5FF (very subtle)
```

**Text:**
```
Text Primary: #1F2937
Text Secondary: #6B7280
Text Purple: #4C1D95
```

**Usage Examples:**
```css
/* Purple Premium Theme */
.hero-purple-premium {
  background: linear-gradient(135deg, #4C1D95 0%, #7C3AED 100%);
  color: #FFFFFF;
}

.btn-premium-purple {
  background: #F59E0B;
  color: #000000;
}

.btn-premium-purple:hover {
  background: #D97706;
}

/* Accent Elements */
.accent-line {
  border-left: 4px solid #7C3AED;
}

/* Premium Badge */
.badge-premium {
  background: #4C1D95;
  color: #F59E0B;
  font-weight: 600;
}
```

---

## Color Psychology Guide

### By Product Type:

**SaaS/Tech Products:**
- Blue: Trust, professionalism, technology
- Purple: Innovation, creativity, modern
- Green: Growth, success, positive outcomes
- Avoid: Too many warm colors (less tech feel)

**Educational Products:**
- Blue: Trust, learning, intelligence
- Gold/Yellow: Achievement, success, value
- Green: Growth, progress, completion
- Orange: Energy, enthusiasm, warmth
- Avoid: Red (associated with errors/failure in learning)

**Physical Products:**
- Neutrals (Black/White): Product focus, elegance
- Product colors: Dynamic, based on actual product
- Minimal UI color: Don't distract from product
- Avoid: Competing colors that distract from product

**Premium/High-Ticket:**
- Black: Luxury, sophistication, exclusivity
- Gold: Wealth, prestige, premium
- Deep Purple: Luxury, royalty, exclusivity
- White (space): Premium, refined, expensive
- Avoid: Bright colors, busy patterns

---

## Accessibility Guidelines

### Contrast Ratios (WCAG 2.1):

**Level AA (Minimum):**
- Normal text (< 18px): 4.5:1
- Large text (18px+ or 14px+ bold): 3:1

**Level AAA (Enhanced):**
- Normal text: 7:1
- Large text: 4.5:1

### Testing Your Colors:

**Tools:**
- WebAIM Contrast Checker
- Stark (Figma plugin)
- Chrome DevTools (Lighthouse)

**Quick Check:**
```
Dark text on white background:
#111827 on #FFFFFF = 15.5:1 (AAA) ✓
#6B7280 on #FFFFFF = 5.7:1 (AA) ✓
#9CA3AF on #FFFFFF = 3.3:1 (Fails AA for normal text) ✗

Light text on dark background:
#FFFFFF on #000000 = 21:1 (AAA) ✓
#A0A0A0 on #000000 = 6.5:1 (AA) ✓

Colored text:
#2563EB on #FFFFFF = 8.2:1 (AAA) ✓
#10B981 on #FFFFFF = 2.9:1 (Fails) ✗
```

### Color Blindness Considerations:

**Don't rely on color alone:**
- Add icons to status messages
- Use patterns in addition to color
- Ensure sufficient brightness contrast
- Test with color blindness simulators

**Tools:**
- Colorblind Web Page Filter
- Stark (includes color blind simulation)
- Chrome DevTools (Rendering panel)

---

## Implementation Tips

### CSS Variables Setup:

```css
:root {
  /* SaaS/App Theme */
  --color-primary: #2B6CFF;
  --color-primary-hover: #1E5FEE;
  --color-secondary: #6B4CE6;

  --color-bg-primary: #FFFFFF;
  --color-bg-secondary: #F8F9FB;

  --color-text-primary: #111827;
  --color-text-secondary: #6B7280;
  --color-text-tertiary: #9CA3AF;

  --color-border: #E5E7EB;

  --color-success: #10B981;
  --color-warning: #F59E0B;
  --color-error: #EF4444;
}

/* Dark theme override (if applicable) */
[data-theme="dark"] {
  --color-bg-primary: #0A0A0A;
  --color-bg-secondary: #1A1A1A;
  --color-text-primary: #FFFFFF;
  --color-text-secondary: #A0A0A0;
  --color-border: #2A2A2A;
}
```

### Tailwind Config:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2B6CFF',
          hover: '#1E5FEE',
        },
        secondary: {
          DEFAULT: '#6B4CE6',
        },
        gray: {
          50: '#F8F9FB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          500: '#6B7280',
          700: '#374151',
          900: '#111827',
        },
      },
    },
  },
}
```

---

## Quick Reference Chart

| Product Type | Primary | Accent | Background | Use Case |
|--------------|---------|--------|------------|----------|
| SaaS/App | Blue #2B6CFF | Purple #6B4CE6 | White #FFFFFF | Trust + Innovation |
| Educational | Blue #2563EB | Gold #F59E0B | Warm White #F9FAFB | Trust + Achievement |
| Physical | Black #000000 | Product Color | Pure White #FFFFFF | Product Focus |
| Premium Dark | Black #000000 | Gold #D4AF37 | Near Black #0A0A0A | Luxury + Exclusivity |
| Premium Light | Near Black #1A1A1A | Muted Gold #8B7355 | Warm White #FAFAF9 | Elegant + Sophisticated |

---

**Color Systems Reference Complete**
Use this guide to implement consistent, accessible, and psychologically-effective color schemes for your product landing pages.
