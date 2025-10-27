# 🚀 Quick Start Guide

## Installation (5 minutes)

### Step 1: Install Dependencies

```bash
cd /Users/michaelmishayev/Desktop/Projects/portfolio-web
npm install
```

This will install all required packages (~2-3 minutes).

### Step 2: Run Development Server

```bash
npm run dev
```

### Step 3: Open in Browser

Navigate to: **http://localhost:3500**

You should see the portfolio template gallery!

## 🎨 Explore Templates

### Available Templates:

1. **Minimalist & Clean** - http://localhost:3500/templates/minimalist
2. **Dark Mode Cinematic** - http://localhost:3500/templates/dark-mode
3. **Grid & Masonry** - http://localhost:3500/templates/grid-masonry

### Features to Test:

- ✅ Dark mode toggle (top right)
- ✅ Smooth scroll animations
- ✅ Responsive design (resize browser)
- ✅ Template filtering (gallery page)
- ✅ Lightbox (grid template)

## 📝 Next Steps

### Add Your Content

Edit template data in:
```
components/templates/[template-name]/[template-name]-template.tsx
```

Look for the `portfolioData` object and customize:
- Name
- Bio
- Projects
- Social links
- Contact info

### Customize Colors

Each template has inline color schemes. Update them in the template component or create a centralized theme config.

### Build More Templates

Follow the guide in `README.md` under "Adding a New Template"

## 🐛 Troubleshooting

### Port 3500 already in use?

```bash
npm run dev -- -p 3600
```

### Dependencies not installing?

```bash
rm -rf node_modules package-lock.json
npm install
```

### TypeScript errors?

```bash
npm run build
```

This will show any type errors that need fixing.

## 📦 Production Build

### Build

```bash
npm run build
```

### Test Production Build

```bash
npm start
```

### Deploy to Vercel

```bash
npm i -g vercel
vercel
```

Follow prompts to deploy!

## 🎯 What's Included

### ✅ Completed

- Next.js 15 setup with App Router
- 3 fully functional templates
- Template gallery with filtering
- Animation components (FadeIn, ScrollReveal, Parallax)
- Dark mode support
- Responsive design
- shadcn/ui component library
- TypeScript configuration
- Tailwind CSS setup

### 📋 To Do

- Build remaining 17 templates
- Add CMS integration
- Create customization UI
- Add export functionality
- Implement analytics

---

**Estimated time to first view:** 5 minutes
**Time to customize content:** 15 minutes
**Time to build new template:** 2-4 hours

Happy building! 🎉
