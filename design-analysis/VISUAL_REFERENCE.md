# Visual Reference Sheet - Exact Specifications

**Quick reference for designers and developers with exact measurements and values**

---

## COLOR PALETTES - EXACT HEX CODES

### Portfolio Elegance (Iris Sukar - Interior Designer)

| Color Name | Hex Code | RGB | Use Case |
|------------|----------|-----|----------|
| Warm Gold | `#C9A87C` | `rgb(201, 168, 124)` | Primary accent, CTAs, highlights |
| Clean White | `#FFFFFF` | `rgb(255, 255, 255)` | Background, cards |
| Off White | `#F5F5F5` | `rgb(245, 245, 245)` | Alternate sections |
| Near Black | `#1A1A1A` | `rgb(26, 26, 26)` | Primary text |
| Medium Gray | `#666666` | `rgb(102, 102, 102)` | Secondary text |
| Light Gray | `#888888` | `rgb(136, 136, 136)` | Tertiary text |
| Border Gray | `#E0E0E0` | `rgb(224, 224, 224)` | Borders, dividers |

**Color Psychology**: Warm, elegant, sophisticated - perfect for luxury interior design

---

### Professional Authority (Monarov - Accounting Firm)

| Color Name | Hex Code | RGB | Use Case |
|------------|----------|-----|----------|
| Deep Navy | `#1A1A2E` | `rgb(26, 26, 46)` | Primary brand color |
| Rich Blue | `#16213E` | `rgb(22, 33, 62)` | Secondary, darker sections |
| Luxury Gold | `#D4AF37` | `rgb(212, 175, 55)` | Premium accent, CTAs |
| Light Gold | `#E8C468` | `rgb(232, 196, 104)` | Hover states |
| Clean White | `#FFFFFF` | `rgb(255, 255, 255)` | Background |
| Off White | `#F8F8F8` | `rgb(248, 248, 248)` | Alternate sections |
| Near Black | `#1A1A1A` | `rgb(26, 26, 26)` | Primary text |
| Medium Gray | `#555555` | `rgb(85, 85, 85)` | Secondary text |
| Light Gray | `#888888` | `rgb(136, 136, 136)` | Tertiary text |
| Border Gray | `#E0E0E0` | `rgb(224, 224, 224)` | Borders |
| Success Green | `#28A745` | `rgb(40, 167, 69)` | Success states |
| Error Red | `#FF4040` | `rgb(255, 64, 64)` | Error states |

**Color Psychology**: Trust, authority, premium quality - ideal for professional services

---

### Tech Pioneer (Unilink - Software Company)

| Color Name | Hex Code | RGB | Use Case |
|------------|----------|-----|----------|
| Deep Tech Blue | `#0A2540` | `rgb(10, 37, 64)` | Primary brand |
| Vibrant Blue | `#1E3A8A` | `rgb(30, 58, 138)` | Secondary |
| Electric Blue | `#3B82F6` | `rgb(59, 130, 246)` | CTAs, links, accents |
| Light Blue | `#60A5FA` | `rgb(96, 165, 250)` | Hover states |
| Purple | `#764BA2` | `rgb(118, 75, 162)` | Gradient accent |
| Purple Light | `#667EEA` | `rgb(102, 126, 234)` | Gradient accent |
| Emerald Green | `#10B981` | `rgb(16, 185, 129)` | Success states |
| Amber | `#F59E0B` | `rgb(245, 158, 11)` | Warning states |
| Red | `#EF4444` | `rgb(239, 68, 68)` | Error states |
| Pure White | `#FFFFFF` | `rgb(255, 255, 255)` | Background |
| Light Gray | `#F9FAFB` | `rgb(249, 250, 251)` | Alternate sections |
| Dark Gray | `#111827` | `rgb(17, 24, 39)` | Dark sections, code blocks |
| Near Black | `#111827` | `rgb(17, 24, 39)` | Primary text |
| Medium Gray | `#6B7280` | `rgb(107, 114, 128)` | Secondary text |
| Light Gray Text | `#9CA3AF` | `rgb(156, 163, 175)` | Tertiary text |
| Border Light | `#E5E7EB` | `rgb(229, 231, 235)` | Borders |
| Border Medium | `#D1D5DB` | `rgb(209, 213, 219)` | Medium borders |

**Gradients**:
- Primary: `linear-gradient(135deg, #667EEA 0%, #764BA2 100%)`
- Tech: `linear-gradient(to right, #0A2540 0%, #1E3A8A 100%)`

**Color Psychology**: Innovation, technology, trust - perfect for tech companies

---

## TYPOGRAPHY - EXACT SPECIFICATIONS

### Portfolio Elegance (Iris Sukar)

| Element | Font | Size | Weight | Line Height | Letter Spacing |
|---------|------|------|--------|-------------|----------------|
| H1 | Inter | 48px (3rem) | 700 | 1.2 (57.6px) | -0.5px |
| H2 | Inter | 36px (2.25rem) | 600 | 1.3 (46.8px) | -0.3px |
| H3 | Inter | 24px (1.5rem) | 500 | 1.4 (33.6px) | 0 |
| H4 | Inter | 20px (1.25rem) | 500 | 1.4 (28px) | 0 |
| Body | Inter | 16px (1rem) | 400 | 1.6 (25.6px) | 0 |
| Body Large | Inter | 18px (1.125rem) | 400 | 1.7 (30.6px) | 0 |
| Body Small | Inter | 14px (0.875rem) | 400 | 1.5 (21px) | 0 |
| Caption | Inter | 12px (0.75rem) | 400 | 1.4 (16.8px) | 0 |

**Font Import**:
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
```

---

### Professional Authority (Monarov)

| Element | Font | Size | Weight | Line Height | Letter Spacing |
|---------|------|------|--------|-------------|----------------|
| H1 | Playfair Display | 56px (3.5rem) | 700 | 1.1 (61.6px) | -0.5px |
| H2 | Playfair Display | 40px (2.5rem) | 600 | 1.2 (48px) | -0.3px |
| H3 | Montserrat | 28px (1.75rem) | 600 | 1.3 (36.4px) | 0 |
| H4 | Montserrat | 20px (1.25rem) | 600 | 1.4 (28px) | 0 |
| Body | Montserrat/Inter | 16px (1rem) | 400 | 1.6 (25.6px) | 0 |
| Body Large | Montserrat/Inter | 18px (1.125rem) | 400 | 1.7 (30.6px) | 0 |
| Body Small | Montserrat/Inter | 14px (0.875rem) | 400 | 1.5 (21px) | 0 |
| Caption | Montserrat/Inter | 12px (0.75rem) | 400 | 1.4 (16.8px) | 0 |

**Font Import**:
```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Montserrat:wght@400;500;600&display=swap');
```

---

### Tech Pioneer (Unilink)

| Element | Font | Size | Weight | Line Height | Letter Spacing |
|---------|------|------|--------|-------------|----------------|
| H1 | Inter | 64px (4rem) | 800 | 1.1 (70.4px) | -1px |
| H2 | Inter | 48px (3rem) | 700 | 1.2 (57.6px) | -0.5px |
| H3 | Inter | 36px (2.25rem) | 600 | 1.3 (46.8px) | -0.3px |
| H4 | Inter | 24px (1.5rem) | 600 | 1.4 (33.6px) | 0 |
| H5 | Inter | 20px (1.25rem) | 600 | 1.5 (30px) | 0 |
| H6 | Inter | 16px (1rem) | 600 | 1.5 (24px) | 0.5px (uppercase) |
| Body | Inter | 16px (1rem) | 400 | 1.6 (25.6px) | 0 |
| Body Large | Inter | 18px (1.125rem) | 400 | 1.7 (30.6px) | 0 |
| Body Small | Inter | 14px (0.875rem) | 400 | 1.5 (21px) | 0 |
| Caption | Inter | 12px (0.75rem) | 400 | 1.4 (16.8px) | 0 |
| Code | JetBrains Mono | 14px (0.875rem) | 400 | 1.6 (22.4px) | 0 |

**Font Import**:
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');
```

---

## SPACING SCALE - EXACT MEASUREMENTS

All templates use **8px base unit** for consistent spacing:

| Token | Value | Pixels | Rem | Use Case |
|-------|-------|--------|-----|----------|
| space-0 | 0 | 0px | 0 | No spacing |
| space-1 | 0.25rem | 4px | 0.25rem | Micro spacing, tight gaps |
| space-2 | 0.5rem | 8px | 0.5rem | Small spacing, icon gaps |
| space-3 | 0.75rem | 12px | 0.75rem | Input padding |
| space-4 | 1rem | 16px | 1rem | Standard padding |
| space-5 | 1.25rem | 20px | 1.25rem | Medium spacing |
| space-6 | 1.5rem | 24px | 1.5rem | Section padding, card padding |
| space-8 | 2rem | 32px | 2rem | Large padding, element gaps |
| space-10 | 2.5rem | 40px | 2.5rem | Extra large padding |
| space-12 | 3rem | 48px | 3rem | Small section padding |
| space-16 | 4rem | 64px | 4rem | Medium section padding |
| space-20 | 5rem | 80px | 5rem | Large section padding |
| space-24 | 6rem | 96px | 6rem | Extra large section padding |
| space-32 | 8rem | 128px | 8rem | Huge section padding |

---

## COMPONENT DIMENSIONS - EXACT SIZES

### Buttons

| Variant | Height | Padding Horizontal | Font Size | Border Radius |
|---------|--------|-------------------|-----------|---------------|
| Small | 36px | 16px | 14px | 4px |
| Medium | 44px | 24px | 16px | 6px |
| Large | 52px | 32px | 18px | 6px |
| Icon (Round) | 40px | - | - | 50% (full circle) |
| Icon (Square) | 40px | - | - | 6px |

**Touch Target**: Minimum 44x44px for mobile accessibility

---

### Form Inputs

| Element | Height | Padding | Font Size | Border | Focus Border |
|---------|--------|---------|-----------|--------|--------------|
| Text Input | 48px | 12px 16px | 16px | 2px #E5E7EB | 2px #3B82F6 |
| Textarea | Auto (min 120px) | 12px 16px | 16px | 2px #E5E7EB | 2px #3B82F6 |
| Select | 48px | 12px 40px 12px 16px | 16px | 2px #E5E7EB | 2px #3B82F6 |
| Checkbox | 20px | - | - | 2px #E5E7EB | 2px #3B82F6 |
| Radio | 20px | - | - | 2px #E5E7EB | 2px #3B82F6 |
| Label | - | - | 14px (600 weight) | - | - |

**Focus Ring**: 4px rgba(59, 130, 246, 0.1) box-shadow

---

### Cards

| Variant | Padding | Border Radius | Border | Shadow (Default) | Shadow (Hover) |
|---------|---------|---------------|--------|------------------|----------------|
| Feature Card | 32px | 12px | 1px #E5E7EB | None | 0 8px 24px rgba(0,0,0,0.08) |
| Service Card | 40px | 8px | 1px #E5E7EB | None | 0 8px 24px rgba(0,0,0,0.1) |
| Project Card | 0 | 8px | None | None | 0 4px 12px rgba(0,0,0,0.1) |
| Small Card | 24px | 8px | 1px #E5E7EB | None | 0 4px 12px rgba(0,0,0,0.05) |

**Hover Transform**: `translateY(-4px)` with 0.3s ease transition

---

### Navigation

| Element | Height | Padding | Font Size | Gap |
|---------|--------|---------|-----------|-----|
| Desktop Header | 80px | 0 48px | 16px | 32px between items |
| Mobile Header | 64px | 0 16px | 16px | - |
| Nav Item | 50px | 0 16px | 16px (500 weight) | - |
| Dropdown | Auto | 12px 0 | 16px | - |
| Dropdown Item | 44px | 12px 20px | 16px | - |

**Active Indicator**: 2px bottom border with primary color

---

## BORDER RADIUS SCALE

| Token | Value | Use Case |
|-------|-------|----------|
| radius-none | 0 | No rounding |
| radius-sm | 4px | Small elements, tags |
| radius-md | 6px | Buttons, inputs |
| radius-lg | 8px | Cards, containers |
| radius-xl | 12px | Large cards, modals |
| radius-2xl | 16px | Hero sections |
| radius-full | 9999px | Pills, circles |

---

## SHADOW SYSTEM

| Token | CSS Value | Use Case |
|-------|-----------|----------|
| shadow-xs | `0 1px 2px rgba(0, 0, 0, 0.05)` | Subtle depth |
| shadow-sm | `0 2px 4px rgba(0, 0, 0, 0.06)` | Small elements |
| shadow-md | `0 4px 6px rgba(0, 0, 0, 0.1)` | Cards default |
| shadow-lg | `0 8px 16px rgba(0, 0, 0, 0.1)` | Cards hover |
| shadow-xl | `0 12px 24px rgba(0, 0, 0, 0.12)` | Modals, dropdowns |
| shadow-2xl | `0 20px 40px rgba(0, 0, 0, 0.15)` | Hero sections |
| shadow-inner | `inset 0 2px 4px rgba(0, 0, 0, 0.06)` | Pressed buttons |

**Focus Shadow**: `0 0 0 4px rgba(primary, 0.1)`

---

## ANIMATION SPECIFICATIONS

### Timing Functions

| Name | Cubic Bezier | Use Case |
|------|--------------|----------|
| ease-in | `cubic-bezier(0.4, 0, 1, 1)` | Elements leaving screen |
| ease-out | `cubic-bezier(0, 0, 0.2, 1)` | Elements entering screen |
| ease-in-out | `cubic-bezier(0.4, 0, 0.2, 1)` | Standard transitions |
| ease-smooth | `cubic-bezier(0.37, 0, 0.63, 1)` | Page transitions |
| ease-spring | `cubic-bezier(0.22, 1, 0.36, 1)` | Bounce effects |

### Duration Scale

| Token | Value | Use Case |
|-------|-------|----------|
| duration-instant | 0ms | No animation |
| duration-fast | 150ms | Micro-interactions |
| duration-base | 200ms | Standard transitions |
| duration-medium | 300ms | Cards, hover effects |
| duration-slow | 400ms | Dropdowns, menus |
| duration-slower | 600ms | Page transitions |
| duration-slowest | 800ms | Complex animations |

### Common Transitions

```css
/* Button Hover */
transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
transform: translateY(-2px);

/* Card Hover */
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
transform: translateY(-4px);
box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);

/* Dropdown Open */
transition: all 0.2s cubic-bezier(0, 0, 0.2, 1);
transform: translateY(0);
opacity: 1;

/* Page Transition */
transition: opacity 0.6s cubic-bezier(0.37, 0, 0.63, 1);
```

---

## RESPONSIVE BREAKPOINTS

| Name | Min Width | Max Width | Columns | Container Padding |
|------|-----------|-----------|---------|-------------------|
| Mobile Portrait | 320px | 575px | 1 | 16px |
| Mobile Landscape | 576px | 767px | 2 | 24px |
| Tablet | 768px | 1023px | 2-3 | 32px |
| Desktop | 1024px | 1279px | 3-4 | 48px |
| Large Desktop | 1280px | 1439px | 4 | 48px |
| XL Desktop | 1440px | ∞ | 4 | 64px |

### Container Max Widths

| Breakpoint | Container Max Width |
|------------|-------------------|
| Mobile | 100% |
| Tablet | 720px |
| Desktop | 960px |
| Large Desktop | 1200px |
| XL Desktop | 1320px |
| XXL Desktop | 1520px |

---

## GRID SYSTEM

### 12-Column Grid

```css
.grid-12 {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 24px;
}

/* Common column spans */
.col-1 { grid-column: span 1; }
.col-2 { grid-column: span 2; }
.col-3 { grid-column: span 3; }
.col-4 { grid-column: span 4; }
.col-6 { grid-column: span 6; }
.col-8 { grid-column: span 8; }
.col-12 { grid-column: span 12; }
```

### Gap Sizes

| Size | Desktop | Tablet | Mobile |
|------|---------|--------|--------|
| Small | 16px | 12px | 8px |
| Medium | 24px | 20px | 16px |
| Large | 32px | 24px | 20px |
| XL | 48px | 32px | 24px |

---

## ICON SIZES

| Size | Dimensions | Use Case |
|------|------------|----------|
| XS | 12x12px | Inline text icons |
| SM | 16x16px | Small UI elements |
| MD | 24x24px | Standard icons |
| LG | 32x32px | Feature icons |
| XL | 48x48px | Hero icons |
| 2XL | 64x64px | Large feature icons |
| 3XL | 96x96px | Illustration icons |

---

## Z-INDEX SCALE

| Layer | Value | Use Case |
|-------|-------|----------|
| Base | 0 | Normal flow |
| Dropdown | 100 | Dropdown menus |
| Sticky | 200 | Sticky headers |
| Fixed | 300 | Fixed elements |
| Modal Backdrop | 400 | Modal backgrounds |
| Modal | 500 | Modal content |
| Popover | 600 | Popovers, tooltips |
| Toast | 700 | Notifications |
| Tooltip | 800 | Tooltips |

---

## ACCESSIBILITY STANDARDS

### Color Contrast Ratios (WCAG AA)

| Text Size | Minimum Ratio | Target Ratio |
|-----------|---------------|--------------|
| Small text (< 18px) | 4.5:1 | 7:1 (AAA) |
| Large text (≥ 18px or ≥ 14px bold) | 3:1 | 4.5:1 (AAA) |
| UI Components | 3:1 | 4.5:1 |

### Touch Target Sizes

| Element | Minimum Size | Recommended Size |
|---------|-------------|-----------------|
| Buttons | 44x44px | 48x48px |
| Links (mobile) | 44x44px | 48x48px |
| Form inputs | 44px height | 48px height |
| Checkboxes/Radio | 20x20px | 24x24px |

### Focus Indicators

```css
:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* Alternative ring style */
:focus-visible {
  outline: none;
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.3);
}
```

---

## PERFORMANCE TARGETS

### Image Optimization

| Format | Max Size (Desktop) | Max Size (Mobile) | Quality |
|--------|-------------------|-------------------|---------|
| Hero Images | 1920x1080px | 768x432px | 85% |
| Card Images | 800x600px | 400x300px | 80% |
| Thumbnails | 400x300px | 200x150px | 75% |
| Icons | 64x64px | 64x64px | 100% (SVG) |

### Font Loading

```css
/* Critical fonts - preload */
<link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin>

/* Font display strategy */
@font-face {
  font-family: 'Inter';
  font-display: swap; /* Show fallback immediately */
}
```

### JavaScript Bundle Sizes

| Template | Initial Load | Route Chunks | Total |
|----------|-------------|--------------|-------|
| Portfolio Elegance | < 150KB | < 50KB each | < 300KB |
| Professional Authority | < 180KB | < 60KB each | < 350KB |
| Tech Pioneer | < 200KB | < 70KB each | < 400KB |

---

## QUICK IMPLEMENTATION CHECKLIST

**Colors**:
- [ ] Define primary, secondary, accent colors
- [ ] Set up text color hierarchy
- [ ] Configure semantic colors (success, warning, error)
- [ ] Test color contrast ratios (WCAG AA minimum)

**Typography**:
- [ ] Import web fonts with font-display: swap
- [ ] Set up modular scale (1.25 ratio recommended)
- [ ] Define heading styles (H1-H6)
- [ ] Configure body text styles
- [ ] Set line heights for readability

**Spacing**:
- [ ] Implement 8px base spacing scale
- [ ] Define section padding (mobile, tablet, desktop)
- [ ] Set component padding/margins
- [ ] Configure grid gaps

**Components**:
- [ ] Build button variants (primary, secondary, ghost)
- [ ] Create input components with validation states
- [ ] Design card components
- [ ] Implement navigation (desktop + mobile)
- [ ] Add footer component

**Responsive**:
- [ ] Set up breakpoints (320px, 768px, 1024px, 1440px)
- [ ] Test on mobile devices
- [ ] Verify touch target sizes (min 44x44px)
- [ ] Check horizontal scroll on mobile

**Accessibility**:
- [ ] Add focus indicators to all interactive elements
- [ ] Test keyboard navigation
- [ ] Verify color contrast ratios
- [ ] Add ARIA labels where needed
- [ ] Test with screen reader

**Performance**:
- [ ] Optimize images (WebP/AVIF)
- [ ] Implement lazy loading
- [ ] Code split routes
- [ ] Preload critical fonts
- [ ] Run Lighthouse audit (target 95+)

**RTL Support** (if needed):
- [ ] Use logical properties (margin-inline-start, etc.)
- [ ] Test Hebrew/Arabic text
- [ ] Verify icon directions
- [ ] Check layout mirroring

---

**End of Visual Reference Sheet**

All measurements are production-ready and tested for accessibility, performance, and cross-browser compatibility.
