# Portfolio Web - Professional Template Marketplace

A modern, high-performance portfolio template marketplace built with Next.js 15, featuring 61 professionally designed templates. Choose your template, customize it visually, and get your professional website delivered fast.

## 🎯 What Is This?

**Portfolio Web** is a template marketplace that helps you create a professional portfolio website in minutes, not weeks:

1. **Browse 61+ Templates** - Find the perfect design for your industry and style
2. **Visual Customization** - Use our drag-and-drop builder to arrange sections
3. **Send via Telegram** - Share your design with us instantly
4. **Get Your Site** - We deliver your professional website, ready to launch

**Perfect for:** Designers, Photographers, Developers, Agencies, Coaches, SaaS Companies, Online Businesses, and Creative Professionals

## ✨ Key Features

- **61 Professional Templates** - Every industry and style covered
- **Visual Builder** - Drag & drop section reordering, no coding required
- **ThemeForest-Style Marketplace** - Browse, filter, sort, and preview templates
- **Mobile-First Design** - Optimized for all devices (66% of traffic is mobile)
- **Bilingual** - Full English and Russian support
- **Dark Mode** - Automatic theme switching
- **SEO Optimized** - Fast loading (<2 seconds), Google-friendly
- **Production Ready** - All templates fully functional and responsive

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

## 📊 Project Status

### ✅ Fully Operational Marketplace

**Current Statistics:**
- **61 Templates** - All complete and functional
- **9 Categories** - Blog, Portfolio, Business, Product, Service, etc.
- **100% Responsive** - Mobile, tablet, desktop optimized
- **Bilingual** - Full English and Russian support
- **Zero Errors** - All templates tested and working

### Template Categories (61 Total)

**Blog Templates (5)**
- Editorial, Magazine, Personal, Tech, Archetypes

**Portfolio Templates (15+)**
- Minimalist, Bold Typography, Grid Masonry, Fullscreen Immersive, Split Screen, Illustration Focus, Single Page, Text Heavy, Card Modular, Photography Immersive, Motion Designer, etc.

**Business Templates (10+)**
- Professional B2B, Creative Agency, Startup Pitch, SaaS Feature-Rich, Personal Brand, Service Agency, Service Consulting, Service Enterprise, etc.

**Product Templates (9)**
- SaaS, Physical, Fashion, Luxury, Premium, Tech, Audio, Course, Vacuum

**Service Templates (6)**
- Marketplace, B2B, Community, Consulting, DFY, Enterprise

**Special Effect Templates (8)**
- 3D Immersive, AR Spatial, Kinetic Typography, Neo-Brutalist, Organic Liquid, Y2K Retro, Collage Maximalist, Voice First

**Modern Styles (8)**
- Glassmorphism Modern, Experimental 3D, Interactive Agency, Luxury Minimal, Dark Mode, Bento Grid, Data Dashboard, Split Screen Editorial

### All Templates Include
- ✅ Hero Section
- ✅ About Section
- ✅ Projects/Portfolio
- ✅ Skills Section
- ✅ Pricing Plans
- ✅ Testimonials
- ✅ Gallery
- ✅ Timeline
- ✅ FAQ Section
- ✅ Contact/CTA
- ✅ Stats/Metrics
- ✅ Unique Special Features

## 🚀 Quick Start (For Users)

### How to Use This Platform

1. **Start the Website**
   ```bash
   npm run dev
   ```
   Open: http://localhost:3500

2. **Browse Templates**
   - View all 61 templates on the homepage
   - Use filters: Category (Blog, Portfolio, Business, etc.)
   - Use search: Find templates by name or features
   - Sort by: Newest, Name (A-Z), etc.

3. **Preview a Template**
   - Click "Preview" button to see the full template
   - Click "Customize" to open the visual builder

4. **Customize Your Template**
   - **Drag sections** up and down to reorder
   - **Add/Remove sections** (Hero, About, Pricing, FAQ, etc.)
   - **See live preview** of your changes
   - No coding required!

5. **Send Your Design**
   - Click "Send to Telegram" in the builder
   - We receive your design preferences
   - We build your professional site
   - You get your site delivered ready to launch

### User Flow

```
Homepage → Browse Templates →
  ├─→ Preview Template (see full design)
  └─→ Customize Template (visual builder) →
        Send to Telegram → Get Your Site
```

## 🎨 Features for Users

### Homepage Features
- **Search Bar** - Find templates by name, description, or tags
- **Category Filters** - Blog, Portfolio, Business, Product, Service, etc.
- **Sort Options** - Newest, Oldest, Name (A-Z), Name (Z-A)
- **Template Cards** - Preview thumbnails with descriptions
- **Live Preview** - Hover to see preview button
- **Two Actions**: Preview (see it) or Customize (build it)

### Visual Builder
- **Section Reordering** - Drag sections up/down
- **Add/Remove Sections** - Choose which sections to include
- **Live Preview** - See changes in real-time
- **Mobile Preview** - Test responsive design
- **Save Design** - Export your customization
- **Send to Telegram** - Share with us for delivery

### Template Variety
- **Blog Templates** - Editorial, Magazine, Personal, Tech
- **Portfolio Templates** - Minimalist, Bold, Immersive, Grid
- **Business Templates** - Agency, Consulting, B2B, Enterprise
- **Product Templates** - SaaS, Physical, Fashion, Luxury
- **Service Templates** - Marketplace, Community, DFY
- **Special Effects** - 3D, AR, Kinetic, Y2K, Brutalist

## 🛠️ Installation (For Developers)

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
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

### Build for Production
```bash
npm run build
npm start
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

### 🌐 Internationalization (i18n)

**⚠️ REQUIREMENT: All UI text MUST support both English (en) and Russian (ru) languages.**

#### Translation System

All user-facing text is managed through a centralized translation system:

**Location:** `/lib/translations.json`

**Structure:**
```json
{
  "en": {
    "common": { "backToGallery": "Back to Gallery" },
    "stylePreview": {
      "contentLibrary": {
        "button": "Content Library",
        "hint": "Browse 25+ pre-made examples"
      }
    }
  },
  "ru": {
    "common": { "backToGallery": "Назад в Галерею" },
    "stylePreview": {
      "contentLibrary": {
        "button": "Библиотека Контента",
        "hint": "Просмотрите 25+ готовых примеров"
      }
    }
  }
}
```

#### Usage in Components

Use the `useI18n` hook to access translations:

```typescript
import { useI18n } from "@/lib/i18n-context";

export function MyComponent() {
  const { t } = useI18n();

  return (
    <Button>
      {t.stylePreview.contentLibrary?.button || "Fallback Text"}
    </Button>
  );
}
```

#### Translation Guidelines

1. **Always provide both languages** - Every new UI string must have both `en` and `ru` translations
2. **Use optional chaining** - Access nested translations with `?.` to prevent errors
3. **Provide fallbacks** - Always include English fallback text using `||` operator
4. **Maintain structure** - Keep the same nested structure in both language objects
5. **Test both languages** - Switch language in the app to verify translations display correctly

#### Adding New Translations

When adding new UI text:

1. Open `/lib/translations.json`
2. Add your text to both `en` and `ru` objects in the same nested location
3. Use the translation in your component with optional chaining and fallback
4. Test that both languages display correctly

**Example:**
```typescript
// translations.json
{
  "en": { "myFeature": { "title": "My New Feature" } },
  "ru": { "myFeature": { "title": "Моя Новая Функция" } }
}

// Component
{t.myFeature?.title || "My New Feature"}
```

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

# Optional: Gemini API for image generation
GEMINI_API_KEY=your_gemini_api_key
```

### Gemini API Setup (Optional)

For generating template screenshot placeholders using Google's Gemini AI:

1. **Get API Key**: Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. **Install SDK**:
   ```bash
   npm install @google/genai
   ```
3. **Set Environment Variable**:
   ```bash
   echo "GEMINI_API_KEY=your_key_here" >> .env.local
   ```

**Note**: The Gemini API is primarily used for generating decorative placeholder images. For actual template screenshots, use Puppeteer (see below).

## 📸 Generating Template Screenshots

### Option 1: Puppeteer (Recommended - Real Screenshots)

Install Puppeteer to capture actual rendered templates:

```bash
npm install puppeteer
```

Create a screenshot script (`scripts/capture-screenshots.js`):

```javascript
const puppeteer = require('puppeteer');

async function captureScreenshots() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 800 });

  const templates = ['minimalist', 'dark-mode', 'grid-masonry'];

  for (const template of templates) {
    await page.goto(`http://localhost:3500/templates/${template}`);
    await page.screenshot({
      path: `public/screenshots/${template}-1.png`
    });
  }

  await browser.close();
}

captureScreenshots();
```

Run the script:
```bash
node scripts/capture-screenshots.js
```

### Option 2: Gemini API (Placeholder Images)

Use Gemini to generate stylized preview images:

```javascript
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

async function generatePlaceholder(templateName) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash-exp",
    contents: `Generate a stylized preview image for a ${templateName} portfolio template`,
  });
  // Save generated image
}
```

### Option 3: Manual Screenshots

1. Open template: `http://localhost:3500/templates/[template-name]`
2. Press `Cmd+Shift+4` (Mac) or use browser DevTools
3. Save to `/public/screenshots/`
4. Name: `[template-name]-1.png`, `[template-name]-2.png`, etc.

**Screenshot Requirements:**
- **Size**: 1200x800px (3:2 aspect ratio)
- **Format**: PNG or WebP
- **Quality**: High resolution for retina displays
- **Naming**: `[template-id]-[number].png`

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

## 🚀 Recent Updates & Improvements

### v2.0 - Marketplace Features (November 2024)
- ✅ **ThemeForest-Style Homepage** - Professional marketplace design
- ✅ **Enhanced Hero Section** - Clear value proposition and CTAs
- ✅ **Template Card Improvements** - Hover previews and dual-button layout
- ✅ **Sorting Functionality** - Sort by Newest, Oldest, Name (A-Z/Z-A)
- ✅ **Collapsible "How It Works"** - Minimize/maximize with localStorage persistence
- ✅ **All 61 Templates Complete** - Every template fully functional with 12 sections

### Recent Bug Fixes (November 2024)
- ✅ Fixed photography-immersive awards.map TypeError
- ✅ Fixed service-marketplace missing translations
- ✅ Fixed JSX syntax errors in about-me page
- ✅ Created placeholder screenshots for all templates

### Planned Features

- [ ] **Puppeteer Screenshot Automation** - Capture real template screenshots
- [ ] **Content Helper Service** - "Want us to help with content?" feature
- [ ] **Pricing Integration** - Add pricing tiers for templates
- [ ] **User Accounts** - Save designs and track orders
- [ ] **Payment Processing** - Stripe/PayPal integration
- [ ] **CMS Integration** - Sanity.io for dynamic content
- [ ] **Export to Code** - Download customized template as HTML/CSS
- [ ] **One-Click Deploy** - Deploy to Vercel/Netlify directly
- [ ] **Analytics Dashboard** - Track template popularity
- [ ] **Template Ratings** - User reviews and ratings
- [ ] **Social Proof Badges** - "Bestseller", "New", "Trending"

## 📞 Support

For questions or issues:
- Open an issue on GitHub
- Check documentation in `/docs`
- Review template examples in `/app/templates`

---

Built with ❤️ using Next.js 15, TypeScript, and Tailwind CSS
