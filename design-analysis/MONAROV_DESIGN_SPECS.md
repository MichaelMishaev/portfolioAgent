# Monarov Accounting Firm - Complete Design Specifications

**Website**: https://www.monarov.co.il/
**Type**: Luxury Accounting Firm / Professional Services
**Platform**: Wix Thunderbolt Framework

---

## 1. COLOR PALETTE

### Primary Colors
```css
--color_11: Primary background (light/white)
--color_12: Secondary background
--color_15: Primary text color
--color_14: Secondary text color
--color_13: Tertiary accent
```

### Extended Professional Palette
```css
--color_13 through --color_35: Extended color system for UI elements
```

### State Colors
```css
Button Primary: rgb(var(--color_11))
Button Secondary: rgb(var(--color_12))
Button Hover: Distinct hover state colors
Button Disabled: rgb(var(--color_39))
Error: #ff4040 (validation errors)
```

### Recommended Implementation (Based on Luxury Accounting Theme)
```css
/* Professional luxury palette */
--primary: #1A1A2E (deep navy/charcoal)
--secondary: #16213E (rich dark blue)
--accent-gold: #D4AF37 (luxury gold)
--accent-light: #E8E8E8 (light gray)
--background: #FFFFFF (clean white)
--background-alt: #F8F8F8 (off-white sections)
--text-primary: #1A1A1A (near black)
--text-secondary: #555555 (medium gray)
--text-tertiary: #888888 (light gray)
--border: #E0E0E0 (subtle dividers)
--success: #28A745 (trust green)
```

---

## 2. TYPOGRAPHY SYSTEM

### Font Families
```css
/* Primary Serif/Sans Stack */
body: Arial, Helvetica, sans-serif (10px base)

/* Custom Premium Fonts */
--heading-bold: 'lulo-clean-w01-one-bold'
--heading-light: 'din-next-w01-light'
--body-heavy: 'avenir-lt-w01_85-heavy'
--body-light: 'avenir-lt-w01_35-light'
--accent: 'assistant-semibold'
--custom-1: 'wf_d449ffbac5c64d9ea158235a0'
--custom-2: 'wf_6a2fc04fa1434395838a11bae'
```

### Typography Variables
```css
--font_2: H2 headings
--font_3: H3 headings
--font_4: H4 headings
--font_5: H5 headings
--font_6: H6 headings
--font_7: Body large
--font_8: Body medium
--font_9: Body small
--font_10: Extra small text
```

### Recommended Implementation
```css
/* Professional typography scale */
h1 {
  font-family: 'Playfair Display', serif;
  font-size: 56px;
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.5px;
}

h2 {
  font-family: 'Playfair Display', serif;
  font-size: 40px;
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.3px;
}

h3 {
  font-family: 'Montserrat', sans-serif;
  font-size: 28px;
  font-weight: 600;
  line-height: 1.3;
}

h4 {
  font-family: 'Montserrat', sans-serif;
  font-size: 20px;
  font-weight: 600;
  line-height: 1.4;
}

body {
  font-family: 'Inter', 'Helvetica Neue', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.6;
}

.body-large {
  font-size: 18px;
  line-height: 1.7;
}

.body-small {
  font-size: 14px;
  line-height: 1.5;
}
```

---

## 3. LAYOUT STRUCTURE

### Grid System
```css
/* 12-column responsive grid */
.container {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 24px;
}

/* Full-width sections */
.section-full {
  grid-column: 1 / -1;
}

/* Content width (10 columns centered) */
.section-content {
  grid-column: 2 / 12;
}
```

### Master Page Layout
```css
.master-page {
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

/* Header */
header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
}

/* Main Content */
main {
  padding-top: 80px; /* Header offset */
}

/* Footer */
footer {
  margin-top: auto;
}
```

### Site Width
```css
--site-width: 1200px;
max-width: var(--site-width);
margin: 0 auto;
padding: 0 24px;
```

### Mobile Optimization
```css
.device-mobile-optimized {
  min-width: 320px;
  overflow-x: hidden;
  padding: 0 16px;
}
```

---

## 4. KEY COMPONENTS

### Buttons (.StylableButton2545352419__root)
```css
/* Primary Button */
.button-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 16px 32px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 4px;
  background-color: rgb(var(--accent-gold));
  color: #1A1A1A;
  cursor: pointer;
  transition: all .3s ease;
  touch-action: manipulation;
}

.button-primary:hover {
  background-color: rgb(var(--accent-gold-dark));
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
}

.button-primary:disabled {
  pointer-events: none;
  opacity: 0.5;
  background-color: rgb(var(--color_39));
}

/* Secondary Button */
.button-secondary {
  background-color: transparent;
  border: 2px solid rgb(var(--color_15));
  color: rgb(var(--color_15));
}

.button-secondary:hover {
  background-color: rgb(var(--color_15));
  color: #ffffff;
}

/* Icon Buttons */
.button-icon {
  width: 48px;
  height: 48px;
  padding: 0;
  border-radius: 50%;
}

.button-icon svg {
  width: 24px;
  height: 24px;
}
```

### Forms (.MpKiNN, .ZXdXNL)
```css
/* Input Container */
.form-group {
  margin-bottom: 24px;
}

/* Label */
.form-label {
  display: block;
  margin-bottom: var(--labelMarginBottom);
  padding: var(--labelPadding_start) var(--labelPadding_end);
  font-size: 14px;
  font-weight: 600;
  color: rgb(var(--color_15));
}

.form-label.required::after {
  content: ' *';
  color: #ff4040;
}

/* Input Field */
.form-input {
  width: 100%;
  height: var(--inputHeight);
  padding: var(--textPadding);
  font-size: 16px;
  border: 1px solid rgb(var(--border-color));
  border-radius: 4px;
  background-color: #ffffff;
  transition: border-color .3s ease, box-shadow .3s ease;
}

.form-input:focus {
  outline: none;
  border-color: rgb(var(--accent-gold));
  box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.1);
}

.form-input::placeholder {
  color: rgb(var(--color_14));
  opacity: 0.7;
}

/* Error State */
.form-input.error {
  border-color: #ff4040;
}

.form-error-message {
  display: block;
  margin-top: 8px;
  font-size: 14px;
  color: #ff4040;
}

/* Disabled State */
.form-input:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
  opacity: 0.6;
}
```

### Navigation (.xTjc1A)
```css
/* Main Navigation */
.nav-main {
  display: flex;
  align-items: center;
  gap: 32px;
}

.nav-item {
  position: relative;
  font-size: 16px;
  font-weight: 500;
  color: rgb(var(--color_15));
  text-decoration: none;
  transition: color .4s ease;
}

.nav-item:hover {
  color: rgb(var(--accent-gold));
}

/* Dropdown Menu */
.nav-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 200px;
  padding: 12px 0;
  background: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all .3s ease;
}

.nav-item:hover .nav-dropdown {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.nav-dropdown-item {
  display: block;
  padding: 12px 20px;
  color: rgb(var(--color_15));
  transition: background-color .2s ease;
}

.nav-dropdown-item:hover {
  background-color: #f8f8f8;
}
```

### Cards
```css
/* Service Card */
.card-service {
  padding: 40px;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  transition: all .3s ease;
}

.card-service:hover {
  border-color: rgb(var(--accent-gold));
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  transform: translateY(-4px);
}

.card-icon {
  width: 64px;
  height: 64px;
  margin-bottom: 24px;
  color: rgb(var(--accent-gold));
}

.card-title {
  margin-bottom: 16px;
  font-size: 24px;
  font-weight: 600;
}

.card-description {
  color: rgb(var(--text-secondary));
  line-height: 1.6;
}
```

---

## 5. SPACING SYSTEM

### Spacing Scale
```css
--space-xs: 4px;
--space-s: 8px;
--space-m: 16px;
--space-l: 24px;
--space-xl: 32px;
--space-xxl: 48px;
--space-xxxl: 64px;
--space-huge: 96px;
```

### Component Spacing
```css
--inputHeight: 48px;
--textPadding: 12px 16px;
--labelMarginBottom: 8px;
--labelPadding_start: 0;
--labelPadding_end: 0;
```

### Section Spacing
```css
.section {
  padding: 80px 0;
}

.section-large {
  padding: 120px 0;
}

.section-small {
  padding: 48px 0;
}

@media (max-width: 768px) {
  .section {
    padding: 48px 0;
  }

  .section-large {
    padding: 64px 0;
  }
}
```

---

## 6. ANIMATIONS & TRANSITIONS

### Timing Functions
```css
--ease-standard: .35s cubic-bezier(0.4, 0, 0.2, 1);
--ease-in: .2s cubic-bezier(0.4, 0, 1, 1);
--ease-out: .2s cubic-bezier(0, 0, 0.2, 1);
--ease-smooth: .6s cubic-bezier(0.37, 0, 0.63, 1);
```

### View Transitions
```css
/* Slide Horizontal */
@keyframes slideHorizontal {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.slide-horizontal {
  animation: slideHorizontal 600ms cubic-bezier(0.87, 0, 0.13, 1);
}

/* Slide Vertical */
@keyframes slideVertical {
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.slide-vertical {
  animation: slideVertical 600ms cubic-bezier(0.64, 0, 0.78, 0);
}

/* Fade In/Out */
@keyframes fadeInOut {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fade-in {
  animation: fadeInOut 350ms ease;
}
```

### Hover Effects
```css
/* Smooth lift on hover */
.lift-hover {
  transition: transform .3s ease, box-shadow .3s ease;
}

.lift-hover:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

/* Color transition */
.color-transition {
  transition: color .4s ease, background-color .4s ease;
}
```

---

## 7. SPECIAL FEATURES

### Hero Section
```css
.hero {
  position: relative;
  min-height: 600px;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #1A1A2E 0%, #16213E 100%);
  color: #ffffff;
}

.hero-content {
  max-width: 600px;
}

.hero-title {
  font-size: 56px;
  font-weight: 700;
  margin-bottom: 24px;
  line-height: 1.1;
}

.hero-subtitle {
  font-size: 20px;
  margin-bottom: 32px;
  opacity: 0.9;
}

.hero-cta {
  display: flex;
  gap: 16px;
}
```

### Trust Badges
```css
.trust-section {
  padding: 64px 0;
  background: #f8f8f8;
}

.trust-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 32px;
  text-align: center;
}

.trust-badge {
  padding: 24px;
}

.trust-number {
  font-size: 48px;
  font-weight: 700;
  color: rgb(var(--accent-gold));
  margin-bottom: 8px;
}

.trust-label {
  font-size: 16px;
  color: rgb(var(--text-secondary));
}
```

### Parallax Effects
```css
.parallax-section {
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
```

### Sticky CTA
```css
.sticky-cta {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 999;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity .3s ease, transform .3s ease;
}

.sticky-cta.visible {
  opacity: 1;
  transform: translateY(0);
}
```

---

## 8. DESIGN PHILOSOPHY

### Overall Approach
**Luxury Professional Services** with emphasis on:

1. **Trust & Credibility**
   - Professional color palette (navy, gold, white)
   - Premium typography (serif headings, clean sans-serif body)
   - Spacious layouts with breathing room
   - High-quality imagery and iconography

2. **Sophistication**
   - Elegant animations and transitions
   - Subtle hover effects
   - Refined micro-interactions
   - Attention to detail

3. **Clarity & Transparency**
   - Clear value propositions
   - Straightforward navigation
   - Easy-to-find contact information
   - Service descriptions with no jargon

4. **Authority & Expertise**
   - Trust badges and certifications
   - Case studies or testimonials
   - Team member profiles
   - Industry affiliations

5. **User-Centric Design**
   - Mobile-first responsive approach
   - Accessible forms and interactions
   - Fast loading times
   - Clear calls-to-action

### Visual Hierarchy
```
1. Hero headline (immediate value proposition)
2. Primary CTA (consultation/contact)
3. Service offerings (clear categorization)
4. Trust indicators (numbers, logos, testimonials)
5. Secondary content (about, team, resources)
6. Footer (contact, legal, social)
```

### Content Strategy
- Highlight expertise and specializations
- Showcase client results/testimonials
- Provide clear service descriptions
- Easy contact/consultation booking
- Resources for potential clients

---

## 9. IMPLEMENTATION RECOMMENDATIONS

### Header Component
```tsx
<header className="header">
  <div className="header-container">
    <a href="/" className="logo">
      <img src="/logo.svg" alt="Monarov" />
    </a>

    <nav className="nav-main">
      <a href="/services" className="nav-item">Services</a>
      <a href="/about" className="nav-item">About</a>
      <a href="/resources" className="nav-item">Resources</a>
      <a href="/contact" className="nav-item">Contact</a>
    </nav>

    <button className="button-primary">
      Schedule Consultation
    </button>
  </div>
</header>
```

### Service Card Component
```tsx
<div className="card-service">
  <div className="card-icon">
    <TaxIcon />
  </div>
  <h3 className="card-title">Tax Planning</h3>
  <p className="card-description">
    Strategic tax optimization for businesses and individuals
  </p>
  <a href="/services/tax" className="card-link">
    Learn More →
  </a>
</div>
```

### Contact Form Component
```tsx
<form className="contact-form">
  <div className="form-group">
    <label className="form-label required">Full Name</label>
    <input
      type="text"
      className="form-input"
      placeholder="Enter your name"
      required
    />
  </div>

  <div className="form-group">
    <label className="form-label required">Email</label>
    <input
      type="email"
      className="form-input"
      placeholder="your@email.com"
      required
    />
  </div>

  <div className="form-group">
    <label className="form-label">Message</label>
    <textarea
      className="form-input"
      rows="4"
      placeholder="How can we help you?"
    ></textarea>
  </div>

  <button type="submit" className="button-primary">
    Send Message
  </button>
</form>
```

---

## 10. RESPONSIVE BREAKPOINTS

```css
/* Mobile First Approach */

/* Small devices (phones) */
@media (min-width: 320px) {
  /* Base styles */
}

/* Medium devices (tablets) */
@media (min-width: 768px) {
  .hero-title { font-size: 48px; }
  .section { padding: 64px 0; }
}

/* Large devices (desktops) */
@media (min-width: 1024px) {
  .hero-title { font-size: 56px; }
  .section { padding: 80px 0; }
  .grid-3-col { grid-template-columns: repeat(3, 1fr); }
}

/* Extra large devices */
@media (min-width: 1440px) {
  .container { max-width: 1320px; }
}
```

---

## TEMPLATE CLASSIFICATION

**Template Name**: "Professional Authority"
**Best For**: Accounting firms, law offices, consultancies, financial services
**Complexity**: Medium-High
**Key Features**: Premium feel, trust-building elements, professional forms, service showcases
**Mobile Optimization**: Excellent
**Customization Level**: High (complete color/typography theming)
**Conversion Focus**: High (multiple CTAs, consultation booking, contact forms)
