# Mobile-First Template Checklist

Use this checklist when creating or auditing portfolio templates.

## Quick Test (5 minutes)

### 1. Open Dev Tools
- Set viewport to **346px x 878px** (user's reported size)
- Enable device toolbar
- Set DPR to 2

### 2. Visual Check
```
□ Hamburger menu is clearly visible
□ Hamburger icon is 28px or larger
□ Menu button has border or background
□ No horizontal scroll
□ Text is readable
□ Buttons don't overflow
```

### 3. Interaction Check
```
□ Tap hamburger menu - opens smoothly
□ Tap menu item - closes menu and scrolls
□ Tap buttons - proper touch target (44px+)
□ Scroll page - no layout shift
```

### 4. Resize Test
```
□ At 320px - still usable
□ At 375px - looks polished
□ At 768px - switches to desktop nav
□ At 1920px - max-width respected
```

## Detailed Audit (15 minutes)

### Navigation (CRITICAL)

```
□ useState for mobile menu imported and used
□ FiMenu and FiX icons imported
□ Desktop nav wrapped in "hidden md:flex"
□ Mobile button has "md:hidden"
□ Icon size is 28px
□ Button padding is p-3 (12px)
□ Button has border: border-border or border-white/20
□ Button has hover state: hover:bg-accent or hover:bg-white/10
□ Mobile menu dropdown present
□ Mobile menu has border-t
□ Menu items close menu on click: onClick={() => setMobileMenuOpen(false)}
□ Nav has z-50 or higher
□ aria-label="Toggle menu" present
```

### Typography

```
□ Hero h1: text-3xl sm:text-4xl md:text-5xl lg:text-7xl
□ Section h2: text-2xl sm:text-3xl md:text-4xl lg:text-5xl
□ Subheadings: text-xl sm:text-2xl md:text-3xl
□ Body text: text-base sm:text-lg
□ No text overflow at 320px width
□ Line height appropriate (leading-normal or leading-relaxed)
□ Font weight appropriate for size
```

### Spacing

```
□ All containers: px-4 sm:px-6 (minimum)
□ Sections: py-12 sm:py-16 md:py-20
□ Grids: gap-4 sm:gap-6 md:gap-8
□ Button containers: gap-4
□ Proper breathing room on mobile
□ Not cramped at 346px
```

### Buttons

```
□ Container: flex flex-col gap-4 sm:flex-row
□ Buttons: w-full sm:w-auto
□ Minimum height: min-h-[44px]
□ Proper size: size="lg"
□ Icons have proper spacing: mr-2 or ml-2
□ Touch-friendly spacing
□ No buttons side-by-side on mobile < 640px
```

### Layout

```
□ Grids adapt: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
□ Stats/numbers: grid-cols-2 md:grid-cols-4
□ Images responsive: w-full h-auto
□ No fixed widths that break mobile
□ Flexbox wraps properly: flex-wrap
□ Max width on large screens: max-w-7xl mx-auto
```

### Images

```
□ All images have width and height attributes
□ Images use responsive patterns
□ Object-fit set appropriately
□ Loading="lazy" for below-fold images
□ Alt text present
```

### Accessibility

```
□ Touch targets ≥ 44px
□ Color contrast ≥ 4.5:1
□ Keyboard navigation works
□ Focus states visible
□ ARIA labels on icon buttons
□ Semantic HTML (h1, h2, nav, section)
```

### Performance

```
□ No layout shift on load (CLS < 0.1)
□ Animations don't block interaction
□ Images optimized
□ No unnecessary re-renders
□ Fast First Contentful Paint
```

## Viewport Test Matrix

Test each template at these widths:

```
Width  | Device         | Check
-------|----------------|---------------------------
320px  | iPhone 5/SE    | Usable, no h-scroll
346px  | User reported  | Hamburger visible, perfect
375px  | iPhone 12      | Polished, good spacing
414px  | iPhone Plus    | Buttons well-spaced
768px  | iPad Portrait  | Desktop nav appears
1024px | iPad Landscape | Full layout
1920px | Desktop        | Max-width respected
```

## Common Issues & Fixes

### Issue: Hamburger menu not visible
```tsx
// ❌ Bad
<button className="md:hidden p-2">
  <FiMenu size={24} />
</button>

// ✅ Good
<button className="md:hidden p-3 text-foreground hover:bg-accent rounded-md border border-border">
  <FiMenu size={28} />
</button>
```

### Issue: Text too large on mobile
```tsx
// ❌ Bad
<h1 className="text-7xl font-bold">

// ✅ Good
<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold">
```

### Issue: Buttons don't stack
```tsx
// ❌ Bad
<div className="flex gap-4">
  <Button className="flex-1">Get in Touch</Button>
  <Button className="flex-1">View Projects</Button>
</div>

// ✅ Good
<div className="flex flex-col gap-4 sm:flex-row">
  <Button className="w-full sm:w-auto">Get in Touch</Button>
  <Button className="w-full sm:w-auto">View Projects</Button>
</div>
```

### Issue: Horizontal scroll on mobile
```tsx
// ❌ Bad
<div className="container px-6">
<div className="grid grid-cols-4">

// ✅ Good
<div className="container px-4 sm:px-6">
<div className="grid grid-cols-2 md:grid-cols-4">
```

## Sign-Off

Template: ________________
Developer: ________________
Date: ________________

```
□ All checkboxes above are checked
□ Tested at all required viewports
□ No console errors
□ Mobile navigation works perfectly
□ Ready for production
```

---

**Mobile-first is not optional. Every template must pass this checklist.**
