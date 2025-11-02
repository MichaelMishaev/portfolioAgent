# Portfolio Web - 20 Stunning Portfolio Templates

A modern, high-performance portfolio template platform built with Next.js 15, featuring 20 professionally designed templates for bloggers, creators, and professionals.

## 🎯 Project Overview

This project provides a comprehensive collection of portfolio website templates, each optimized for different use cases:
- **Non-technical users** (bloggers, creators, photographers)
- **Mobile-first design** (66% of traffic)
- **SEO optimized** for Google rankings
- **Performance-focused** (loads in <2 seconds)
- **Dark mode support** across all templates

## 🚀 Tech Stack

### Core Framework
- **Next.js 15** - Latest App Router with React Server Components
- **TypeScript** - Type-safe development
- **Tailwind CSS 4.0** - Utility-first styling with custom themes

### UI Components
- **shadcn/ui** - Accessible, customizable components built on Radix UI
- **Radix UI** - Headless, accessible primitives
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful icon library

### Additional Libraries
- **next-themes** - Dark mode support
- **react-icons** - Extended icon set
- **react-masonry-css** - Masonry grid layouts
- **embla-carousel-react** - Touch-friendly carousels
- **react-hook-form** + **zod** - Form handling and validation

## 📁 Project Structure

```
portfolio-web/
├── app/
│   ├── templates/
│   │   ├── minimalist/
│   │   ├── dark-mode/
│   │   ├── grid-masonry/
│   │   └── ... (17 more templates)
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── animations/      # Reusable animation components
│   ├── shared/          # Shared components (Header, Footer)
│   ├── templates/       # Template-specific components
│   └── template-gallery.tsx
├── lib/
│   ├── utils.ts         # Utility functions
│   ├── fonts.ts         # Font configurations
│   └── template-registry.ts  # Template metadata
├── config/
│   └── themes/          # Tailwind theme configs (20 variants)
└── docs/
    └── templates.md     # Design documentation
```

## 🎨 Available Templates (10 Built, 10 Planned)

### ✅ Currently Implemented

1. **Minimalist & Clean** - Professional, simple, whitespace-focused
2. **Dark Mode Cinematic** - Elegant dark theme with gradients
3. **Grid & Masonry** - Visual portfolio with lightbox

### 📋 Planned Templates

4. Bold Typography Hero
5. Full-Screen Immersive
6. Split-Screen Layout
7. Illustration Focus
8. Single-Page Scroll
9. Text-Heavy SEO (for bloggers)
10. Card-Based Modular
11. Video Background
12. Interactive Micro-Interactions
13. Storytelling/Scrollytelling
14. Retro/Y2K
15. Asymmetrical Broken Grid
16. Experimental Navigation
17. Retro-Futuristic Sci-Fi
18. Brutalist
19. Sustainable Eco-Inspired
20. Color Block Sections

## 🛠️ Installation

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup

1. **Clone or navigate to the project:**
```bash
cd portfolio-web
```

2. **Install dependencies:**
```bash
npm install
```

3. **Run development server:**
```bash
npm run dev
```

4. **Open in browser:**
```
http://localhost:3500
```

## 🎨 Adding a New Template

### 1. Create Template Page

```typescript
// app/templates/your-template/page.tsx
import { YourTemplate } from "@/components/templates/your-template/your-template";

export const metadata = {
  title: "Your Template - Portfolio Template",
  description: "Description of your template.",
};

export default function YourTemplatePage() {
  return <YourTemplate />;
}
```

### 2. Create Template Component

```typescript
// components/templates/your-template/your-template.tsx
"use client";

import { FadeIn } from "@/components/animations/fade-in";
// ... other imports

export function YourTemplate() {
  return (
    <div className="min-h-screen">
      {/* Your template content */}
    </div>
  );
}
```

### 3. Register in Template Registry

```typescript
// lib/template-registry.ts
export const templates: TemplateConfig[] = [
  // ... existing templates
  {
    id: "your-template",
    name: "Your Template Name",
    description: "Template description",
    category: "Creative",
    difficulty: "intermediate",
    features: ["Feature 1", "Feature 2"],
    colors: {
      primary: "#000000",
      secondary: "#FFFFFF",
      accent: "#3B82F6",
    },
    fonts: {
      heading: "Inter",
      body: "Inter",
    },
    thumbnail: "/templates/your-template/thumbnail.jpg",
    demoPath: "/templates/your-template",
    tags: ["modern", "clean"],
    bestFor: ["Designers", "Developers"],
  },
];
```

## 🎯 Key Features

### Performance Optimizations
- **Automatic code splitting** per template
- **Image optimization** with Next.js Image
- **Lazy loading** for below-the-fold content
- **Tree-shaking** to minimize bundle size

### Accessibility
- **WCAG compliant** components via Radix UI
- **Keyboard navigation** throughout
- **Screen reader support**
- **Focus management**

### SEO
- **Metadata API** for proper meta tags
- **Semantic HTML** structure
- **Fast loading times** (<2 seconds)
- **Mobile-first** responsive design

## 🎨 Customization

### Tailwind Themes

Each template can have its own theme configuration:

```typescript
// config/themes/minimalist.ts
export const minimalistTheme = {
  colors: {
    primary: "#000000",
    secondary: "#FFFFFF",
    accent: "#3B82F6",
  },
  fonts: {
    sans: ["Inter", "sans-serif"],
  },
  // ... more config
};
```

### Animation Presets

Reusable animation components for consistency:

```typescript
import { FadeIn } from "@/components/animations/fade-in";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { ParallaxSection } from "@/components/animations/parallax-section";
```

## 📦 Build & Deploy

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

The project is optimized for Vercel deployment with zero configuration.

## 🔧 Environment Variables

Create a `.env.local` file for environment-specific configs:

```env
# Optional: Analytics
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id

# Optional: CMS Integration
NEXT_PUBLIC_CMS_API_URL=your_cms_url
```

## 📊 Performance Metrics

Target metrics for all templates:
- **First Contentful Paint**: <1.5s
- **Largest Contentful Paint**: <2.5s
- **Time to Interactive**: <3.5s
- **Cumulative Layout Shift**: <0.1
- **Lighthouse Score**: 95+

## 🤝 Contributing

To add a new template:

1. Follow the "Adding a New Template" guide above
2. Ensure accessibility compliance
3. Test on mobile devices
4. Optimize images and assets
5. Document in template registry

## 📝 License

MIT License - feel free to use for personal or commercial projects.

## 🙏 Credits

- **Design Inspiration**: Templates based on 2025 portfolio trends
- **UI Components**: shadcn/ui by [@shadcn](https://ui.shadcn.com/)
- **Icons**: Lucide React & React Icons
- **Fonts**: Google Fonts

## 🚀 Future Roadmap

- [ ] Complete remaining 10 templates
- [ ] Add CMS integration (Sanity.io)
- [ ] Template customization UI
- [ ] Export to HTML/CSS
- [ ] One-click deployment
- [ ] Template marketplace
- [ ] User authentication
- [ ] Analytics dashboard

## 📞 Support

For questions or issues:
- Open an issue on GitHub
- Check documentation in `/docs`
- Review template examples in `/app/templates`

---

Built with ❤️ using Next.js 15, TypeScript, and Tailwind CSS
