# Iris Sukar Interior Designer - Complete Design Specifications

**Website**: https://www.irissukar.co.il/
**Type**: Interior Design Portfolio
**Platform**: Wix Thunderbolt Framework

---

## 1. COLOR PALETTE

### Primary Colors
```css
--color_11: Primary background (light/white)
--color_12: Secondary background
--color_15: Primary text color
--color_14: Secondary text color
--color_18: Accent/action color (CTAs, links)
```

### Extended Palette
```css
--color_36 through --color_47: UI elements, base fills, accents, status indicators
```

### Semantic Colors
```css
Error: #ff4040 (red for validation errors)
```

### Implementation Notes
- Uses CSS custom properties for runtime theming
- RGB format: `rgb(var(--color_11))`
- Supports light/dark mode through variable overrides

---

## 2. TYPOGRAPHY SYSTEM

### Font Families
```css
Primary: Arial, Helvetica, sans-serif
Forms: Helvetica-w01-roman
```

### Font Sizes
```css
Base: 10px (body element)
Buttons: 14px
Form Inputs: 16px
```

### Font Weights
```css
Normal: 400
Bold: 700
```

### Line Heights
```css
Standard: 1.4em
Lists: 1.3em
```

### Typography Scale
```
H1: --font_2 (largest)
H2: --font_3
H3: --font_4
H4: --font_5
H5: --font_6
Body Large: --font_7
Body Medium: --font_8
Body Small: --font_9
Extra Small: --font_10
```

---

## 3. LAYOUT STRUCTURE

### Grid System
```css
display: grid;
grid-template-columns: 1fr;
```

### Master Page Layout
```css
Grid Rows: 4 sections
- Header area
- Spacer
- Content area (main)
- Footer area

Site Width: var(--site-width)
Centered: margin calculation with site-width variable
```

### Responsive Breakpoints
```css
Mobile: 320px minimum width
Desktop: Full width with calculated margins
```

### Mobile Optimization
```css
.device-mobile-optimized {
  min-width: 320px;
  overflow-x: hidden;
}
```

---

## 4. KEY COMPONENTS

### Buttons (.StylableButton2545352419)
```css
/* Base Styles */
display: block;
cursor: pointer;
border: var(--button-border);
background-color: rgb(var(--bg-color));
color: rgb(var(--text-color));
text-overflow: ellipsis;
white-space: nowrap;
touch-action: manipulation;

/* States */
:hover {
  background-color: rgb(var(--bg-hover-color));
  transition: .2s ease;
}

:disabled {
  pointer-events: none;
  background-color: rgb(var(--bg-disabled-color));
}

:focused {
  outline: 2px solid rgb(var(--focus-color));
}
```

### Form Inputs
```css
/* Input Fields */
.input-field {
  height: var(--inputHeight);
  font: 16px/1.4em Helvetica-w01-roman;
  border: 1px solid rgb(var(--border-color));
  background-color: rgb(var(--bg-color));
  padding: var(--textPadding);
}

/* Placeholder */
::placeholder {
  color: rgb(var(--color_14));
}

/* Error State */
.error {
  border-color: #ff4040;
  color: #ff4040;
}
```

### Navigation
```css
.navigation {
  display: flex;
  flex-direction: var(--direction); /* Supports RTL */
  gap: var(--nav-gap);
}

/* Submenu */
.submenu {
  background: rgba(var(--color_11));
  box-shadow: 0 1px 4px rgba(0,0,0,.6);
  margin: 8px;
}
```

### Image Galleries (.mDzRgi)
```css
.gallery {
  display: grid;
  gap: var(--margin);
}

/* Navigation Dots */
.nav-dots {
  margin: var(--nav-dot-margin);
  display: flex;
  justify-content: center;
  gap: 10px;
}

/* Arrow Buttons */
.arrow-button {
  cursor: pointer;
  transition: opacity .2s ease;
}
```

---

## 5. SPACING SYSTEM

### Variables
```css
--textPadding: Internal text padding
--labelPadding_start: Label start padding
--labelPadding_end: Label end padding
--nav-dot-margin: Navigation dot spacing
--label-margin-bottom: Label bottom margin
--margin: General margin unit
--padding: General padding unit
```

### Grid Spacing
```css
column-gap: var(--column-gap);
row-gap: var(--row-gap);
```

### Consistent Spacing Scale
```
XS: 4px
S: 8px
M: 16px
L: 24px
XL: 32px
XXL: 48px
```

---

## 6. ANIMATIONS & TRANSITIONS

### Timing Functions
```css
Fast: .2s ease
Medium: .4s ease
Slow: .6s cubic-bezier(.37,0,.63,1)
```

### View Transitions
```css
/* Slide Horizontal */
duration: 600ms
easing: cubic-bezier(.87,0,.13,1)

/* Slide Vertical */
duration: 600ms
easing: cubic-bezier(.64,0,.78,0)

/* Out-In Fade */
duration: 350ms
easing: cubic-bezier(.22,1,.36,1)
```

### Common Effects
```css
/* Fade In/Out */
opacity: 0;
transition: opacity .4s ease;

/* Transform Effects */
transform: translateX(0);
transform: translateY(0);
transform: scaleX(1);
transform: rotate(0deg);
```

### Hover Transitions
```css
.interactive:hover {
  transition: all .2s ease;
  transform: translateY(-2px);
}
```

---

## 7. SPECIAL FEATURES

### RTL Support (Hebrew Language)
```css
direction: var(--direction); /* ltr or rtl */
text-align: var(--text-align); /* start or end */
```

### Focus Management
```css
.focus-ring {
  outline: 2px solid rgb(var(--focus-color));
  outline-offset: 2px;
}

/* Keyboard Navigation */
:focus-visible {
  outline: auto;
}
```

### Accessibility Features
- Semantic HTML structure
- ARIA attributes for complex components
- Keyboard navigation support
- Focus indicators on interactive elements
- Screen reader optimization

### Performance Optimizations
- Lazy loading for images
- GPU acceleration for animations
- CSS Grid for efficient layouts
- Custom property caching

---

## 8. DESIGN PHILOSOPHY

### Overall Approach
**Modern Portfolio Design** with emphasis on:

1. **Visual Excellence**
   - Image-first design showcasing interior work
   - Clean, minimal interface letting projects speak
   - Professional aesthetic with subtle elegance

2. **User Experience**
   - Smooth transitions and micro-interactions
   - Intuitive navigation patterns
   - Mobile-optimized from ground up

3. **Technical Excellence**
   - Modular component architecture
   - Runtime theming capabilities
   - Security-hardened (fetch/XHR interception)
   - Session management and cookie isolation

4. **Accessibility First**
   - WCAG compliant structure
   - Keyboard navigation support
   - Screen reader optimization
   - Focus management

5. **International Support**
   - Hebrew (RTL) primary language
   - Direction-aware layouts
   - Locale-specific formatting

### Visual Hierarchy
```
1. Hero images (full-bleed, high-impact)
2. Project titles (large, bold)
3. Category labels (subtle, refined)
4. Descriptive text (readable, well-spaced)
5. Navigation elements (present but unobtrusive)
```

### Content Strategy
- Portfolio grid as primary content
- Minimal text, maximum visual impact
- Clear project categorization
- Easy contact/inquiry flow

---

## 9. IMPLEMENTATION RECOMMENDATIONS

### Component Priority
1. Image gallery with grid layout
2. Project card component
3. Navigation with smooth transitions
4. Contact form with validation
5. Footer with social links

### Color Extraction (Estimated)
```css
/* Recommended palette based on interior design aesthetic */
--primary: #FFFFFF (clean white background)
--secondary: #F5F5F5 (light gray sections)
--text-primary: #1A1A1A (near black)
--text-secondary: #666666 (medium gray)
--accent: #C9A87C (warm gold/beige for luxury feel)
--border: #E0E0E0 (subtle borders)
```

### Typography Implementation
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

body {
  font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  line-height: 1.6;
}

h1 { font-size: 48px; font-weight: 700; line-height: 1.2; }
h2 { font-size: 36px; font-weight: 600; line-height: 1.3; }
h3 { font-size: 24px; font-weight: 500; line-height: 1.4; }
```

### Responsive Grid
```css
.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  padding: 48px 24px;
}

@media (min-width: 768px) {
  .portfolio-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 32px;
    padding: 64px 48px;
  }
}

@media (min-width: 1200px) {
  .portfolio-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 40px;
  }
}
```

---

## 10. ASSET REQUIREMENTS

### Images
- High-resolution project photos (1920x1080 minimum)
- Thumbnail variants (600x400)
- Optimized formats (WebP with fallbacks)
- Lazy loading implementation

### Icons
- SVG format for scalability
- Consistent 24x24px base size
- Monochrome with color variants

### Fonts
- Web font optimization
- Subset for Hebrew characters
- WOFF2 format with fallbacks

---

## TEMPLATE CLASSIFICATION

**Template Name**: "Portfolio Elegance"
**Best For**: Interior designers, architects, photographers, artists
**Complexity**: Medium
**Key Features**: Image-first, grid gallery, smooth transitions, RTL support
**Mobile Optimization**: Excellent
**Customization Level**: High (color theming, typography, layouts)
