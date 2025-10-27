# 🏗️ Architecture Documentation

## System Overview

This is a modern portfolio template platform built with a **component-driven architecture** using Next.js 15 App Router, designed for maximum performance, scalability, and developer experience.

## 🎯 Design Principles

### 1. **Template Isolation**
Each template is completely self-contained with its own:
- Page route (`/templates/[template-id]`)
- Component implementation
- Data structure
- Styling preferences

### 2. **Component Reusability**
Shared components are abstracted into:
- **UI primitives** (`/components/ui`) - shadcn/ui components
- **Animations** (`/components/animations`) - Reusable animation wrappers
- **Shared** (`/components/shared`) - Header, Footer, common elements

### 3. **Zero Runtime Dependencies (where possible)**
- shadcn/ui components are **copied into your project** (no npm package)
- Tailwind CSS generates only the classes you use
- Tree-shaking eliminates unused code

## 📂 Detailed Structure

```
portfolio-web/
│
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout (fonts, theme provider)
│   ├── page.tsx                 # Home page (template gallery)
│   ├── globals.css              # Global styles + Tailwind base
│   └── templates/               # Template routes
│       ├── minimalist/
│       │   └── page.tsx         # Route: /templates/minimalist
│       ├── dark-mode/
│       │   └── page.tsx         # Route: /templates/dark-mode
│       └── grid-masonry/
│           └── page.tsx         # Route: /templates/grid-masonry
│
├── components/
│   ├── ui/                      # shadcn/ui primitives
│   │   ├── button.tsx           # Reusable button component
│   │   ├── card.tsx             # Card layout component
│   │   └── badge.tsx            # Badge/tag component
│   │
│   ├── animations/              # Animation wrappers
│   │   ├── fade-in.tsx          # Entrance animation
│   │   ├── scroll-reveal.tsx    # Scroll-triggered reveal
│   │   └── parallax-section.tsx # Parallax scrolling
│   │
│   ├── shared/                  # Shared across templates
│   │   ├── header.tsx           # Main navigation
│   │   └── footer.tsx           # Site footer
│   │
│   ├── templates/               # Template implementations
│   │   ├── minimalist/
│   │   │   └── minimalist-template.tsx
│   │   ├── dark-mode/
│   │   │   └── dark-mode-template.tsx
│   │   └── grid-masonry/
│   │       └── grid-masonry-template.tsx
│   │
│   ├── template-gallery.tsx     # Gallery page component
│   ├── theme-provider.tsx       # Dark mode provider
│   └── theme-toggle.tsx         # Dark mode switch
│
├── lib/
│   ├── utils.ts                 # Utility functions (cn, etc.)
│   ├── fonts.ts                 # Google Fonts configuration
│   └── template-registry.ts     # Template metadata & registry
│
├── config/
│   └── themes/                  # (Future) Theme configurations
│
└── docs/
    └── templates.md             # Design documentation
```

## 🔄 Data Flow

### Template Registration Flow

```
1. Define template in lib/template-registry.ts
   ↓
2. Create route in app/templates/[id]/page.tsx
   ↓
3. Build component in components/templates/[id]/
   ↓
4. Template appears in gallery automatically
```

### Template Rendering Flow

```
User visits /templates/minimalist
   ↓
Next.js routes to app/templates/minimalist/page.tsx
   ↓
Page imports MinimalistTemplate component
   ↓
Component uses shared animations & UI primitives
   ↓
Server-side rendered on first load
   ↓
Client-side hydrated for interactivity
```

## 🎨 Styling Architecture

### Tailwind CSS + CSS Variables

```css
/* globals.css */
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  /* ... more variables */
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... dark mode overrides */
}
```

Benefits:
- **Theme switching** via CSS class toggle
- **Consistent colors** across components
- **Easy customization** per template

### Component Styling Pattern

```typescript
// Using cn() utility for conditional classes
<div className={cn(
  "base-classes",
  condition && "conditional-classes",
  className // Allow override
)} />
```

## 🎭 Animation System

### Three-Tier Approach

1. **FadeIn** - Initial page load animations
   - Use for hero sections
   - Stagger with `delay` prop

2. **ScrollReveal** - Scroll-triggered animations
   - Use for content sections
   - Automatically triggers once on scroll

3. **ParallaxSection** - Depth effect
   - Use sparingly for visual interest
   - Performance-optimized with transform

### Usage Example

```typescript
<FadeIn delay={0.2}>
  <h1>Hero Title</h1>
</FadeIn>

<ScrollReveal>
  <div>Content appears on scroll</div>
</ScrollReveal>
```

## 📊 Performance Optimizations

### 1. **Code Splitting**
Each template route is automatically code-split by Next.js:
```
/templates/minimalist → minimalist.js (120kb)
/templates/dark-mode  → dark-mode.js (115kb)
```

### 2. **Image Optimization**
```typescript
// next.config.ts
images: {
  formats: ['image/avif', 'image/webp'],
  deviceSizes: [640, 750, 828, 1080, 1200],
}
```

### 3. **Font Optimization**
```typescript
// lib/fonts.ts
export const inter = Inter({
  subsets: ["latin"],
  display: "swap", // Prevents FOUT
  variable: "--font-inter",
});
```

### 4. **CSS Purging**
Tailwind removes unused classes in production:
```
Development: ~3MB CSS
Production:  ~15KB CSS
```

## 🔐 Type Safety

### Template Configuration Type

```typescript
export interface TemplateConfig {
  id: string;
  name: string;
  description: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  features: string[];
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  thumbnail: string;
  demoPath: string;
  tags: string[];
  bestFor: string[];
}
```

All templates must conform to this interface, ensuring consistency.

## 🚀 Deployment Architecture

### Vercel (Recommended)

```
GitHub Push
   ↓
Automatic Build Trigger
   ↓
Next.js Build (Optimizations)
   ↓
Deploy to Edge Network
   ↓
CDN Distribution (Global)
```

Benefits:
- **Zero config** deployment
- **Automatic HTTPS**
- **Edge caching**
- **Instant rollbacks**

## 🎯 Scalability Plan

### Adding More Templates (10 → 20 → 50+)

Current architecture supports:
- **Lazy loading** - Only active template code loads
- **Route-based splitting** - Each template = separate bundle
- **Component reuse** - Shared primitives minimize duplication

### Future Enhancements

1. **CMS Integration**
```typescript
// Fetch template data from CMS
const data = await sanity.fetch(`*[_type == "portfolio"]`);
```

2. **Template Variants**
```typescript
// Allow color/font customization
<MinimalistTemplate
  theme="blue"
  font="poppins"
/>
```

3. **User Customization UI**
```typescript
// Visual template builder
<TemplateBuilder
  template="minimalist"
  onSave={(config) => saveToDatabase(config)}
/>
```

## 📈 Monitoring & Analytics

### Performance Metrics

Track Core Web Vitals:
- **LCP** (Largest Contentful Paint) < 2.5s
- **FID** (First Input Delay) < 100ms
- **CLS** (Cumulative Layout Shift) < 0.1

### Usage Analytics

Potential integrations:
- Vercel Analytics (built-in)
- Google Analytics
- Plausible (privacy-focused)

## 🔧 Development Workflow

### Adding a New Template

1. **Design** → Create in Figma/Sketch
2. **Register** → Add to `template-registry.ts`
3. **Build** → Create component in `components/templates/`
4. **Route** → Add page in `app/templates/`
5. **Test** → Check responsive, dark mode, accessibility
6. **Optimize** → Images, animations, bundle size

### Testing Checklist

- [ ] Desktop responsive (1920px, 1440px, 1280px)
- [ ] Tablet responsive (768px)
- [ ] Mobile responsive (375px, 390px)
- [ ] Dark mode toggle works
- [ ] Animations perform at 60fps
- [ ] Lighthouse score > 95
- [ ] Accessibility audit passes
- [ ] Cross-browser testing (Chrome, Firefox, Safari)

## 🎓 Learning Resources

### Key Technologies

- **Next.js 15**: https://nextjs.org/docs
- **shadcn/ui**: https://ui.shadcn.com
- **Framer Motion**: https://www.framer.com/motion
- **Tailwind CSS**: https://tailwindcss.com/docs

### Architecture Patterns

- **Component-Driven Development**
- **Atomic Design Methodology**
- **Server Components Best Practices**

---

This architecture is designed for **long-term maintainability** and **rapid template expansion** while maintaining **excellent performance** and **developer experience**.
