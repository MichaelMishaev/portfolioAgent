# Unilink Software Company - Complete Design Specifications

**Website**: https://www.unilink.co.il/
**Type**: Tech/Software Company
**Platform**: Wix Thunderbolt Framework
**Language**: Hebrew (RTL Support)

---

## 1. COLOR PALETTE

### Primary Colors
```css
--color_11: Primary background (white/light)
--color_12: Secondary background
--color_15: Primary text color
--color_14: Secondary text color
--color_18: Accent/action color (interactive elements)
```

### Extended Palette
```css
--color_13 through --color_35: Extended UI color system
--color_36: Base fill color
--color_39: Disabled state color (grayish)
```

### Semantic Colors
```css
Link Color: #1a73e8 (Google-style blue)
Error: #ff4040 (validation errors)
Focus Ring: rgba(var(--color_18), 0.3)
```

### Recommended Tech Company Palette
```css
/* Modern tech aesthetic */
--primary: #0A2540 (deep tech blue)
--secondary: #1E3A8A (vibrant blue)
--accent: #3B82F6 (bright electric blue)
--accent-light: #60A5FA (light blue)
--success: #10B981 (emerald green)
--warning: #F59E0B (amber)
--error: #EF4444 (red)

--background: #FFFFFF (pure white)
--background-alt: #F9FAFB (light gray)
--background-dark: #111827 (dark sections)

--text-primary: #111827 (near black)
--text-secondary: #6B7280 (medium gray)
--text-tertiary: #9CA3AF (light gray)
--text-inverse: #FFFFFF (white on dark)

--border: #E5E7EB (subtle borders)
--border-dark: #D1D5DB (medium borders)

--gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
--gradient-tech: linear-gradient(to right, #0A2540 0%, #1E3A8A 100%);
```

---

## 2. TYPOGRAPHY SYSTEM

### Font Stack
```css
Primary: Arial, Helvetica, sans-serif
RTL Support: Includes Hebrew character optimization
```

### Typography Variables
```css
--font_1: Primary font configuration
--font_2 through --font_6: Heading hierarchy (H2-H6)
--font_7: Body large
--font_8: Body medium
--font_9: Body small
--font_10: Extra small (captions, labels)
```

### Base Size
```css
body { font-size: 10px; } /* Scaling base */
```

### Recommended Implementation
```css
/* Modern tech typography */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: #111827;
}

h1 {
  font-size: 64px;
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -1px;
}

h2 {
  font-size: 48px;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.5px;
}

h3 {
  font-size: 36px;
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: -0.3px;
}

h4 {
  font-size: 24px;
  font-weight: 600;
  line-height: 1.4;
}

h5 {
  font-size: 20px;
  font-weight: 600;
  line-height: 1.5;
}

h6 {
  font-size: 16px;
  font-weight: 600;
  line-height: 1.5;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.body-large {
  font-size: 18px;
  line-height: 1.7;
}

.body-small {
  font-size: 14px;
  line-height: 1.5;
}

.caption {
  font-size: 12px;
  line-height: 1.4;
  color: #6B7280;
}

/* Code/Technical Text */
.code, code, pre {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 14px;
}
```

---

## 3. LAYOUT STRUCTURE

### Responsive Grid
```css
.grid-system {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}

@media (min-width: 768px) {
  .grid-system {
    grid-template-columns: repeat(2, 1fr);
    gap: 32px;
  }
}

@media (min-width: 1024px) {
  .grid-system {
    grid-template-columns: repeat(12, 1fr);
    gap: 24px;
  }
}
```

### Master Page Layout
```css
.master-page {
  display: grid;
  grid-template-rows: max-content max-content min-content max-content;
  min-height: 100vh;
}

/* Areas */
.site-header { /* --SITE_HEADER_WRAPPER */ }
.spacer { /* Empty for spacing */ }
.pages-container { /* Main content area */ }
.site-footer { /* --SITE_FOOTER_WRAPPER */ }
```

### Site Width & Centering
```css
.container {
  width: 100%;
  max-width: var(--site-width);
  margin-left: auto;
  margin-right: auto;
  padding: 0 24px;
}

@media (min-width: 1440px) {
  .container {
    max-width: 1320px;
  }
}
```

### Mobile Optimization
```css
.device-mobile-optimized {
  min-width: 320px;
  overflow-x: hidden;
}

.mobile-header {
  padding: 10px;
}
```

---

## 4. KEY COMPONENTS

### Buttons (.StylableButton2545352419__root)
```css
/* Base Button Styles */
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  touch-action: manipulation;
  transition: all .2s ease;
  white-space: nowrap;
  text-overflow: ellipsis;
}

/* Primary Button */
.button-primary {
  background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
  color: #ffffff;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
}

.button-primary:hover {
  background: linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
  transform: translateY(-2px);
}

.button-primary:active {
  transform: translateY(0);
}

/* Secondary Button */
.button-secondary {
  background: transparent;
  border: 2px solid #3B82F6;
  color: #3B82F6;
}

.button-secondary:hover {
  background: #3B82F6;
  color: #ffffff;
}

/* Disabled State */
.button:disabled {
  pointer-events: none;
  opacity: 0.5;
  background-color: rgb(var(--color_39));
}

/* Icon Button */
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

/* Button Sizes */
.button-sm {
  padding: 8px 16px;
  font-size: 14px;
}

.button-lg {
  padding: 16px 32px;
  font-size: 18px;
}
```

### Navigation Menu
```css
/* Base Navigation */
.nav-menu {
  display: flex;
  align-items: center;
  gap: 32px;
  font: var(--font_1);
}

/* Menu Items */
.nav-item {
  position: relative;
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  font-size: 16px;
  font-weight: 500;
  color: rgb(var(--color_15));
  text-decoration: none;
  transition: color .2s ease;
}

.nav-item:hover {
  color: rgb(var(--color_18));
}

/* Active State */
.nav-item.active {
  color: rgb(var(--color_18));
  font-weight: 600;
}

.nav-item.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background-color: rgb(var(--color_18));
}

/* Submenu */
.nav-submenu {
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 200px;
  margin-top: 8px;
  padding: 8px 0;
  background: rgba(var(--color_11));
  box-shadow: 0 1px 4px rgba(0, 0, 0, .6);
  border-radius: 6px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all .2s ease;
}

.nav-item:hover .nav-submenu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.nav-submenu-item {
  display: block;
  padding: 10px 16px;
  color: rgb(var(--color_15));
  transition: background-color .2s ease;
}

.nav-submenu-item:hover {
  background-color: rgba(var(--color_18), 0.1);
}
```

### Input Fields
```css
/* Input Container */
.input-wrapper {
  position: relative;
  width: 100%;
}

/* Input Field */
.input {
  width: 100%;
  height: var(--inputHeight, 48px);
  padding: 12px 16px;
  font: 16px/1.4em Helvetica, Arial, sans-serif;
  border: 2px solid #E5E7EB;
  border-radius: 6px;
  background-color: #ffffff;
  transition: all .2s ease;
  direction: var(--direction, ltr); /* RTL support */
}

.input:focus {
  outline: none;
  border-color: #3B82F6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.input::placeholder {
  color: #9CA3AF;
}

/* Input with Prefix Icon */
.input-with-prefix {
  padding-left: 50px;
}

.input-prefix-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  color: #6B7280;
}

/* Error State */
.input.error {
  border-color: #EF4444;
}

.input-error-message {
  display: block;
  margin-top: 8px;
  font-size: 14px;
  color: #EF4444;
}
```

### Cards
```css
/* Feature Card */
.card-feature {
  padding: 32px;
  background: #ffffff;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  transition: all .3s ease;
}

.card-feature:hover {
  border-color: #3B82F6;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  transform: translateY(-4px);
}

.card-icon {
  width: 48px;
  height: 48px;
  margin-bottom: 20px;
  padding: 12px;
  background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
  border-radius: 8px;
  color: #ffffff;
}

.card-title {
  margin-bottom: 12px;
  font-size: 20px;
  font-weight: 600;
  color: #111827;
}

.card-description {
  color: #6B7280;
  line-height: 1.6;
}

/* Tech Stack Card */
.card-tech {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  background: #F9FAFB;
  border-radius: 8px;
  text-align: center;
  transition: background-color .2s ease;
}

.card-tech:hover {
  background: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.card-tech-logo {
  width: 64px;
  height: 64px;
  margin-bottom: 16px;
}

.card-tech-name {
  font-size: 16px;
  font-weight: 600;
  color: #111827;
}
```

### Scroll-to-Top Button
```css
.scroll-to-top {
  position: fixed;
  bottom: 12px;
  right: 12px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(var(--color_11));
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  opacity: 0;
  visibility: hidden;
  transition: all .3s ease;
  cursor: pointer;
  z-index: 999;
}

.scroll-to-top.visible {
  opacity: 1;
  visibility: visible;
}

.scroll-to-top:hover {
  background: rgb(var(--color_18));
  transform: translateY(-2px);
}

.scroll-to-top:focus {
  opacity: 1;
}

.scroll-to-top svg {
  fill: rgb(var(--color_15));
}
```

---

## 5. SPACING SYSTEM

### Spacing Scale
```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
--space-20: 80px;
--space-24: 96px;
--space-32: 128px;
```

### Component Spacing
```css
--inputHeight: 48px;
--textPadding: 12px 16px;
--margin: 24px;
--padding: 24px;
```

### List Spacing
```css
ul, ol {
  margin-bottom: 12px;
}

li {
  margin-bottom: 12px;
}
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

  .section-small {
    padding: 32px 0;
  }
}
```

---

## 6. ANIMATIONS & TRANSITIONS

### Timing Functions
```css
--ease-standard: cubic-bezier(.37, 0, .63, 1);
--ease-smooth: cubic-bezier(.87, 0, .13, 1);
--ease-in: cubic-bezier(.64, 0, .78, 0);
--ease-out: cubic-bezier(.22, 1, .36, 1);
```

### Standard Duration
```css
--duration-fast: .2s (200ms);
--duration-medium: .4s (400ms);
--duration-slow: .6s (600ms);
--duration-extra-slow: .8s (800ms);
```

### View Transitions
```css
/* Horizontal Slide */
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
  animation: slideHorizontal 600ms cubic-bezier(.87, 0, .13, 1);
}

/* Vertical Slide */
@keyframes slideVertical {
  from {
    transform: translateY(40px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.slide-vertical {
  animation: slideVertical 600ms cubic-bezier(.64, 0, .78, 0);
}

/* Out-In Fade */
@keyframes fadeOutIn {
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
}

.fade-out-in {
  animation: fadeOutIn 350ms cubic-bezier(.22, 1, .36, 1);
}
```

### Image Lazy Load
```css
.image-lazy {
  filter: blur(10px);
  opacity: 0;
  transition: filter .8s ease, opacity .8s ease;
}

.image-lazy.loaded {
  filter: blur(0);
  opacity: 1;
}
```

### Reduced Motion Support
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### GPU Acceleration
```css
.gpu-accelerated {
  backface-visibility: hidden;
  transform: translateZ(0);
  will-change: transform;
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
  background: linear-gradient(135deg, #0A2540 0%, #1E3A8A 100%);
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('/grid-pattern.svg') repeat;
  opacity: 0.05;
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 700px;
}

.hero-title {
  font-size: 64px;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 24px;
  line-height: 1.1;
}

.hero-subtitle {
  font-size: 20px;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 32px;
  line-height: 1.6;
}

.hero-cta {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

/* Animated particles background */
.hero-particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
```

### Feature Grid
```css
.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 32px;
  margin: 64px 0;
}

@media (min-width: 1024px) {
  .feature-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### Tech Stack Section
```css
.tech-stack {
  padding: 80px 0;
  background: #F9FAFB;
}

.tech-stack-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 24px;
  margin-top: 48px;
}

.tech-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  background: #ffffff;
  border-radius: 8px;
  transition: transform .2s ease;
}

.tech-item:hover {
  transform: scale(1.05);
}

.tech-logo {
  width: 64px;
  height: 64px;
  margin-bottom: 16px;
  filter: grayscale(100%);
  transition: filter .2s ease;
}

.tech-item:hover .tech-logo {
  filter: grayscale(0%);
}
```

### Code Block Component
```css
.code-block {
  position: relative;
  margin: 32px 0;
  background: #1E293B;
  border-radius: 8px;
  overflow: hidden;
}

.code-block-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: #0F172A;
  border-bottom: 1px solid #334155;
}

.code-block-title {
  font-size: 14px;
  color: #94A3B8;
}

.code-block-copy {
  padding: 4px 8px;
  font-size: 12px;
  background: transparent;
  border: 1px solid #475569;
  border-radius: 4px;
  color: #94A3B8;
  cursor: pointer;
  transition: all .2s ease;
}

.code-block-copy:hover {
  background: #475569;
  color: #ffffff;
}

.code-block-content {
  padding: 16px;
  overflow-x: auto;
}

.code-block pre {
  margin: 0;
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  line-height: 1.6;
  color: #E2E8F0;
}
```

### CTA Banner
```css
.cta-banner {
  position: relative;
  padding: 80px 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #ffffff;
  text-align: center;
  overflow: hidden;
}

.cta-banner::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('/pattern.svg') repeat;
  opacity: 0.1;
}

.cta-content {
  position: relative;
  z-index: 1;
  max-width: 700px;
  margin: 0 auto;
}

.cta-title {
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 16px;
}

.cta-description {
  font-size: 18px;
  margin-bottom: 32px;
  opacity: 0.95;
}

.cta-button {
  background: #ffffff;
  color: #667eea;
  padding: 16px 32px;
  font-size: 18px;
  font-weight: 600;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: all .3s ease;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}
```

---

## 8. DESIGN PHILOSOPHY

### Overall Approach
**Modern Tech Company** with emphasis on:

1. **Innovation & Technology**
   - Modern, cutting-edge design
   - Tech-forward color palette (blues, purples, gradients)
   - Clean, minimal interface
   - Emphasis on products and capabilities

2. **Trust & Reliability**
   - Professional presentation
   - Clear value propositions
   - Case studies and social proof
   - Security and compliance badges

3. **User Experience**
   - Fast, responsive interface
   - Smooth animations and transitions
   - Intuitive navigation
   - Mobile-first approach

4. **Scalability**
   - Modular component system
   - Consistent design tokens
   - Reusable patterns
   - Easy customization

5. **Accessibility**
   - WCAG 2.1 AA compliance
   - Keyboard navigation
   - Screen reader optimization
   - Reduced motion support
   - RTL language support (Hebrew)

### Visual Hierarchy
```
1. Hero with strong value proposition
2. Key product features (3-4 highlights)
3. Tech stack/integrations
4. Use cases or case studies
5. Testimonials/social proof
6. CTA banner (demo, trial, contact)
7. Footer (resources, links, contact)
```

### Content Strategy
- Clear technical benefits
- Product feature showcases
- Integration capabilities
- Developer resources
- Customer success stories
- Easy demo/trial signup

---

## 9. IMPLEMENTATION RECOMMENDATIONS

### Header Component
```tsx
<header className="header">
  <div className="container">
    <div className="header-inner">
      <a href="/" className="logo">
        <img src="/logo.svg" alt="Unilink" />
      </a>

      <nav className="nav-menu">
        <a href="/products" className="nav-item">Products</a>
        <a href="/solutions" className="nav-item">Solutions</a>
        <a href="/developers" className="nav-item">Developers</a>
        <a href="/pricing" className="nav-item">Pricing</a>
        <a href="/about" className="nav-item">About</a>
      </nav>

      <div className="header-actions">
        <button className="button-secondary">Sign In</button>
        <button className="button-primary">Get Started</button>
      </div>

      <button className="mobile-menu-toggle">
        <MenuIcon />
      </button>
    </div>
  </div>
</header>
```

### Feature Card Component
```tsx
<div className="card-feature">
  <div className="card-icon">
    <CloudIcon />
  </div>
  <h3 className="card-title">Cloud Infrastructure</h3>
  <p className="card-description">
    Scalable cloud solutions built for enterprise performance
  </p>
  <a href="/features/cloud" className="card-link">
    Learn More →
  </a>
</div>
```

### Code Example Component
```tsx
<div className="code-block">
  <div className="code-block-header">
    <span className="code-block-title">example.js</span>
    <button className="code-block-copy">Copy</button>
  </div>
  <div className="code-block-content">
    <pre><code>{`import { Unilink } from '@unilink/sdk';

const client = new Unilink({
  apiKey: process.env.UNILINK_API_KEY
});

await client.connect();`}</code></pre>
  </div>
</div>
```

---

## 10. RESPONSIVE BREAKPOINTS

```css
/* Mobile First Approach */

/* Extra small devices (phones, portrait) */
@media (min-width: 320px) {
  .hero-title { font-size: 32px; }
  .container { padding: 0 16px; }
}

/* Small devices (phones, landscape) */
@media (min-width: 576px) {
  .hero-title { font-size: 40px; }
}

/* Medium devices (tablets) */
@media (min-width: 768px) {
  .hero-title { font-size: 48px; }
  .section { padding: 64px 0; }
  .container { padding: 0 24px; }
  .grid-2-col { grid-template-columns: repeat(2, 1fr); }
}

/* Large devices (desktops) */
@media (min-width: 1024px) {
  .hero-title { font-size: 64px; }
  .section { padding: 80px 0; }
  .grid-3-col { grid-template-columns: repeat(3, 1fr); }
  .grid-4-col { grid-template-columns: repeat(4, 1fr); }
}

/* Extra large devices */
@media (min-width: 1440px) {
  .container { max-width: 1320px; }
}

/* Ultra wide displays */
@media (min-width: 1920px) {
  .container { max-width: 1520px; }
}
```

---

## 11. RTL (HEBREW) SUPPORT

### Direction Handling
```css
/* Global RTL Support */
[dir="rtl"] {
  direction: rtl;
  text-align: right;
}

[dir="rtl"] .nav-menu {
  flex-direction: row-reverse;
}

[dir="rtl"] .card-feature {
  text-align: right;
}

[dir="rtl"] .button-icon {
  transform: scaleX(-1);
}

/* Logical Properties (Preferred) */
.element {
  margin-inline-start: 16px; /* LTR: margin-left, RTL: margin-right */
  margin-inline-end: 16px; /* LTR: margin-right, RTL: margin-left */
  padding-inline: 24px; /* Horizontal padding */
}
```

### Font Optimization for Hebrew
```css
@font-face {
  font-family: 'HebrewWeb';
  src: url('/fonts/hebrew-web.woff2') format('woff2');
  unicode-range: U+0590-05FF; /* Hebrew block */
}

[lang="he"] {
  font-family: 'HebrewWeb', 'Arial Hebrew', Arial, sans-serif;
}
```

---

## TEMPLATE CLASSIFICATION

**Template Name**: "Tech Pioneer"
**Best For**: Software companies, SaaS platforms, tech startups, IT services
**Complexity**: Medium-High
**Key Features**: Modern tech aesthetic, code examples, feature showcases, product demos, RTL support
**Mobile Optimization**: Excellent (320px base)
**Customization Level**: Very High (complete theming, RTL, dark mode ready)
**Developer Focus**: High (code blocks, API docs, SDK examples)
**Performance**: Optimized (lazy loading, GPU acceleration, reduced motion)
**Accessibility**: WCAG 2.1 AA compliant with RTL support
