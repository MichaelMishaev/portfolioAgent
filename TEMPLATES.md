# Portfolio Templates - Mobile-First Implementation Guide

## Overview

All 38 portfolio templates in this project are built with a **mobile-first approach**, ensuring exceptional user experience from 320px to 4K displays.

## Mobile-First Principles

### 1. **Navigation (Critical)**

All templates include responsive navigation with enhanced mobile visibility:

```tsx
// Enhanced hamburger menu button
<button
  className="md:hidden p-3 text-foreground hover:bg-accent rounded-md border border-border transition-colors"
  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
  aria-label="Toggle menu"
>
  {mobileMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
</button>
```

**Key Features:**
- Icon size: **28px** (highly visible on small screens)
- Padding: **p-3** (12px) for better touch targets
- Border: Provides visual feedback and contrast
- Hover state: Interactive feedback on tap/hover
- Hidden on desktop: `md:hidden` switches to full nav at 768px

**Special Cases:**
- Dark templates use: `text-white hover:bg-white/10 border-white/20`
- Light templates use: `text-foreground hover:bg-accent border-border`

### 2. **Typography Scaling**

Progressive text sizing from mobile to desktop:

```tsx
// Hero headlines
<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold">

// Section headings
<h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">

// Subheadings
<p className="text-xl sm:text-2xl md:text-3xl">

// Body text
<p className="text-base sm:text-lg">
```

**Breakpoint Strategy:**
- `text-3xl` (30px) @ 320px - 639px (mobile)
- `sm:text-4xl` (36px) @ 640px - 767px (large mobile)
- `md:text-5xl` (48px) @ 768px - 1023px (tablet)
- `lg:text-7xl` (72px) @ 1024px+ (desktop)

### 3. **Spacing & Layout**

Mobile-first spacing ensures readability on all screens:

```tsx
// Container padding
<div className="container mx-auto px-4 sm:px-6 lg:px-8">

// Section padding
<section className="py-12 sm:py-16 md:py-20">

// Grid gaps
<div className="grid gap-4 sm:gap-6 md:gap-8">
```

**Minimum Spacing:**
- Horizontal: `px-4` (16px minimum)
- Vertical: `py-12` (48px minimum)
- Grid gaps: `gap-4` (16px minimum)

### 4. **Button Layouts**

Buttons stack vertically on mobile, horizontally on desktop:

```tsx
// Button container
<div className="flex flex-col gap-4 sm:flex-row">
  <Button size="lg" className="w-full sm:w-auto min-h-[44px]">
    Get in Touch
  </Button>
  <Button variant="outline" size="lg" className="w-full sm:w-auto min-h-[44px]">
    View Projects
  </Button>
</div>
```

**Best Practices:**
- Default: `flex-col` (vertical stacking)
- Desktop: `sm:flex-row` (horizontal layout)
- Width: `w-full` on mobile, `sm:w-auto` on desktop
- Touch targets: Minimum `min-h-[44px]` (44px)

### 5. **Grid Layouts**

Responsive grid patterns:

```tsx
// 2 columns on mobile → 4 columns on desktop
<div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">

// 1 column on mobile → 2 on tablet → 3 on desktop
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

// 1 column on mobile → 2 on desktop
<div className="grid md:grid-cols-2 gap-12">
```

## Viewport Testing Requirements

Every template must be tested at these breakpoints:

| Viewport | Width | Device | Critical Checks |
|----------|-------|--------|-----------------|
| Mobile S | 320px | iPhone 5/SE | No horizontal scroll |
| Mobile M | 346px | User reported | Hamburger menu visible |
| Mobile L | 375px | iPhone 12/13 | Proper text sizing |
| Mobile XL | 414px | iPhone Plus | Button spacing |
| Tablet | 768px | iPad | Nav switches to desktop |
| Desktop | 1024px | Laptop | Full layout |
| Desktop L | 1920px | Monitor | Max content width |

## Template Checklist

Before marking a template as complete, verify:

### Navigation
- [ ] Hamburger menu visible at 346px
- [ ] Icon size 28px minimum
- [ ] Border/background for visibility
- [ ] Hover/active states work
- [ ] Menu closes on link click
- [ ] Switches to desktop nav at 768px

### Typography
- [ ] Hero text starts at text-3xl
- [ ] Progressive scaling with breakpoints
- [ ] No text overflow at 320px
- [ ] Line height appropriate for mobile reading

### Buttons
- [ ] Stack vertically by default
- [ ] Minimum 44px touch target
- [ ] Full width on mobile
- [ ] Proper spacing (gap-4 minimum)

### Layout
- [ ] px-4 minimum padding
- [ ] No horizontal scroll at any viewport
- [ ] Images responsive
- [ ] Grids adapt properly

### Performance
- [ ] Animations don't block interaction
- [ ] Fast load on slow connections
- [ ] No layout shift on load

## Template Status

All 38 templates have been audited and updated:

### Portfolio Templates (20)
- ✅ single-page
- ✅ minimalist
- ✅ dark-mode
- ✅ bold-typography
- ✅ bento-grid
- ✅ grid-masonry
- ✅ split-screen
- ✅ fullscreen-immersive
- ✅ card-modular
- ✅ 3d-immersive
- ✅ ar-spatial
- ✅ neo-brutalist
- ✅ illustration-focus
- ✅ y2k-retro
- ✅ collage-maximalist
- ✅ organic-liquid
- ✅ text-heavy
- ✅ kinetic-typography
- ✅ data-dashboard
- ✅ voice-first

### Product Page Templates (15)
- ✅ saas-product
- ✅ tech-product
- ✅ luxury-product
- ✅ physical-product
- ✅ audio-product
- ✅ vacuum-product
- ✅ fashion-product
- ✅ course-product
- ✅ premium-product
- ✅ agency-service
- ✅ b2b-service
- ✅ community-service
- ✅ consulting-service
- ✅ enterprise-service
- ✅ dfyou-service

### Blog Templates (3)
- ✅ personal-blog (already had responsive nav)
- ✅ tech-blog (already had responsive nav)
- ✅ magazine-blog

## Code Reference

### Example: Single-Page Template

Location: `components/templates/single-page/single-page-template.tsx`

**Navigation:** Line 100-169
**Hero Section:** Line 172-196
**Button Layout:** Line 185-193
**Section Headings:** Line 201, 229, 245, 273

### Common Patterns

All templates follow these patterns:

1. **Import mobile menu icons:**
   ```tsx
   import { FiMenu, FiX } from "react-icons/fi";
   ```

2. **Add state:**
   ```tsx
   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
   ```

3. **Desktop nav wrapped:**
   ```tsx
   <div className="hidden md:flex gap-6">
   ```

4. **Mobile menu dropdown:**
   ```tsx
   {mobileMenuOpen && (
     <div className="md:hidden bg-background/95 backdrop-blur-sm border-t">
   ```

## Accessibility

All templates meet WCAG 2.1 AA standards:

- Minimum touch targets: 44x44px
- Color contrast: 4.5:1 for normal text
- Keyboard navigation support
- ARIA labels on interactive elements
- Focus states visible
- Skip-to-content links

## Browser Support

Templates work on:
- Chrome/Edge 90+
- Safari 14+
- Firefox 88+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Metrics

Target metrics:
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1
- First Input Delay: < 100ms

## Documentation Updates

Last updated: January 2025
Next review: When adding new templates

## Contributing

When adding new templates:

1. Follow mobile-first patterns above
2. Test at all required viewports
3. Complete the checklist
4. Update this document
5. Submit PR with mobile screenshots

---

**Built with mobile-first principles. Tested from 320px to 4K displays.**
