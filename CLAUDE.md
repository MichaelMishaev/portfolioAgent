# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Portfolio Web** is a professional portfolio template marketplace built with Next.js 15, featuring 61+ templates with visual customization, checkout system, and Telegram integration. The platform allows users to browse templates, customize them visually, and purchase/share designs.

## Development Commands

### Core Development
```bash
# Development server (runs on port 3500)
npm run dev

# Production build (includes Prisma generation)
npm run build

# Start production server
npm start

# Linting
npm run lint
```

### Database (Prisma)
```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Open Prisma Studio
npx prisma studio

# Reset database
npx prisma migrate reset
```

### Testing
```bash
# Run all tests
npm run test:all

# Playwright E2E tests
npm run test              # Run all tests
npm run test:ui           # Interactive UI mode
npm run test:headed       # Show browser
npm run test:debug        # Debug mode
npm run test:report       # View report

# Jest unit tests
npm run test:unit         # Run unit tests
npm run test:unit:watch   # Watch mode
npm run test:unit:coverage # Coverage report

# Template integrity tests
npm run test:integrity    # Verify translations

# API tests
npm run test:api          # Run API tests
npm run test:admin        # Admin API tests
npm run test:all-api      # All API tests
```

### Utility Scripts
```bash
# Generate template preview images
npm run generate-previews

# Regenerate service previews
npm run regenerate-service

# Audit/fix text colors for dark mode
npm run audit:text-colors
npm run fix:text-colors
npm run fix:dark-mode
```

## Architecture

### Tech Stack
- **Framework**: Next.js 15 (App Router, React Server Components)
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS 4.0 with custom theme system
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Animations**: Framer Motion, GSAP
- **Database**: PostgreSQL (via Prisma ORM)
- **Payment**: Stripe
- **Authentication**: NextAuth.js
- **3D Graphics**: Three.js + React Three Fiber (for special templates)

### Project Structure
```
app/
├── templates/[templateId]/     # Template pages
│   ├── page.tsx               # Template display
│   ├── demo/page.tsx          # Full demo view
│   └── builder/page.tsx       # Visual builder
├── checkout/[templateId]/     # Checkout flow
├── admin/                     # Admin panel
│   ├── analytics/
│   └── discounts/
└── api/                       # API routes
    ├── checkout/
    ├── discount/
    └── send-to-telegram/

components/
├── templates/                 # 61+ template components
├── builder/                   # Visual builder components
├── style-preview/             # Style customization
├── ui/                        # shadcn/ui components
├── shared/                    # Shared components (Header, Footer)
├── animations/                # Reusable animations
└── enhanced-ui/               # Enhanced UI components

lib/
├── template-registry.ts       # Template metadata (62 templates)
├── translations.json          # UI translations (en/ru/he) - 480KB
├── template-translations.json # DEPRECATED: Use translations/templates/ instead
├── translations/              # NEW: Split template translations
│   ├── common-ui.json        # Common UI strings (navigation, buttons, etc.)
│   └── templates/            # Individual template files (~10KB each)
│       ├── minimalist.json   # NAMING: kebab-case matching template-registry.ts
│       ├── bold-typography.json
│       └── ... (62 files)    # EXACTLY one per template - NO camelCase!
├── i18n-context.tsx          # Client-side i18n context (UI only)
├── i18n/
│   └── server.ts             # Server-side translation utilities
├── hooks/
│   └── use-template-translations.ts  # Client-side template loader
├── prisma.ts                 # Database client
├── discount/                  # Discount system logic
└── services-types.ts         # Add-on services types

prisma/
└── schema.prisma             # Database schema (Discount, Purchase, User, Template)
```

### Key Systems

#### 1. Internationalization (i18n) - CRITICAL
**All UI text MUST support English, Russian, and Hebrew (RTL).**

### New Architecture (December 2024)
The i18n system has been refactored for better performance:
- **Before**: 668KB monolithic file loaded on every page
- **After**: Individual ~10KB files loaded per template (92% reduction)
- **Code Splitting**: Each template's translations are a separate chunk
- **RTL Support**: Hebrew (he) with proper text direction

### Translation Files Structure
```
lib/
├── translations.json                    # UI translations (480KB) - loaded globally
├── translations/
│   ├── common-ui.json                  # Common UI strings (manually translated)
│   └── templates/                      # Template translations - loaded per-template
│       ├── minimalist.json             # ~10KB per template (kebab-case ONLY)
│       ├── bold-typography.json        # Must match template ID from registry
│       └── ... (62 files total)        # EXACTLY one file per template
├── i18n-context.tsx                    # Client UI translations only
├── i18n/server.ts                      # Server-side template loaders
└── hooks/use-template-translations.ts  # Client-side template loaders
```

### Usage Patterns

#### For UI Components (Header, Footer, Common Elements)
```typescript
import { useI18n } from "@/lib/i18n-context";

export function Header() {
  const { t, language, isRTL } = useI18n();

  return (
    <header dir={isRTL ? 'rtl' : 'ltr'}>
      {t.common?.backToGallery || "Back to Gallery"}
    </header>
  );
}
```

#### For Template Components - NEW (Recommended for new templates)
Use the hook for client components with automatic code splitting:

```typescript
"use client";
import { useTemplateTranslations } from "@/lib/hooks/use-template-translations";

export function MyTemplate() {
  const { t, loading } = useTemplateTranslations({ templateId: 'minimalist' });

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>{t.hero?.title}</h1>
      <p>{t.hero?.description}</p>
    </div>
  );
}
```

#### For Template Components - OLD (Backwards Compatible)
Existing templates can still use `tt` from context (DEPRECATED):

```typescript
"use client";
import { useI18n } from "@/lib/i18n-context";

export function LegacyTemplate() {
  const { tt } = useI18n(); // DEPRECATED but still works

  return <h1>{tt.minimalist?.hero?.title}</h1>;
}
```

#### For Server Components (Best Performance)
Use server-side loading for optimal performance:

```typescript
// app/templates/[templateId]/page.tsx
import { getServerTemplateTranslations } from "@/lib/i18n/server";

export default async function TemplatePage({ params }: { params: { templateId: string } }) {
  const t = await getServerTemplateTranslations(params.templateId, 'en');

  return (
    <div>
      <h1>{t.hero?.title}</h1>
      <p>{t.hero?.description}</p>
    </div>
  );
}
```

### Migration Guide

**Migrating Existing Templates:**
1. Change `const { tt } = useI18n()` to `const { t, loading } = useTemplateTranslations({ templateId: 'your-template' })`
2. Change `tt.yourTemplate?.` to `t.` (template ID is implicit)
3. Add loading state handling
4. Remove `tt` from destructuring

**Example:**
```typescript
// Before
const { tt } = useI18n();
const t = tt['minimalist'];

// After
const { t, loading } = useTemplateTranslations({ templateId: 'minimalist' });
if (loading) return <Loader />;
```

### Adding New Translations

**For UI translations** (add to `/lib/translations.json`):
```json
{
  "en": { "newKey": "English text" },
  "ru": { "newKey": "Russian text" },
  "he": { "newKey": "Hebrew text" }
}
```

**For template translations** (add to `/lib/translations/templates/your-template.json`):
```json
{
  "en": { "hero": { "title": "Title" } },
  "ru": { "hero": { "title": "Заголовок" } },
  "he": { "hero": { "title": "כותרת" } }
}
```

### RULES
- Always use optional chaining (`?.`) when accessing translations
- Always provide English fallback with `||` operator
- Add new translations to ALL languages (en, ru, he)
- Test language switching (including RTL) before committing
- Use `useTemplateTranslations` hook for NEW client components
- Use `getServerTemplateTranslations` for NEW server components
- Existing templates with `tt` will continue to work but are less performant

### Server-Side Language Detection
The root layout reads language preference from cookies for proper SSR:

```typescript
// app/layout.tsx
import { cookies } from "next/headers";

async function getServerLanguage(): Promise<"en" | "ru" | "he"> {
  try {
    const cookieStore = await cookies(); // MUST await in Next.js 15
    const savedLang = cookieStore.get("language")?.value;
    if (savedLang === "en" || savedLang === "ru" || savedLang === "he") {
      return savedLang;
    }
  } catch {
    // Fallback if cookies unavailable
  }
  return "en";
}

export default async function RootLayout({ children }) {
  const language = await getServerLanguage();
  const dir = language === "he" ? "rtl" : "ltr";

  return <html lang={language} dir={dir}>...</html>;
}
```

**CRITICAL**: The i18n context saves to BOTH localStorage and cookies to ensure server-side rendering works correctly.

#### 2. Template System
**61 templates** organized by category:
- Blog (5): Editorial, Magazine, Personal, Tech, Archetypes
- Portfolio (15+): Minimalist, Bold Typography, Grid Masonry, etc.
- Business (10+): B2B, Agency, Startup, SaaS, etc.
- Product (9): SaaS, Physical, Fashion, Luxury, etc.
- Service (6): Marketplace, B2B, Community, Consulting, etc.
- Special Effects (8): 3D, AR, Kinetic, Neo-Brutalist, etc.
- Modern Styles (8): Glassmorphism, Experimental 3D, Bento Grid, etc.

**Template Registration** (`lib/template-registry.ts`):
```typescript
export interface TemplateConfig {
  id: string;
  name: string;
  description: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  features: string[];
  colors: { primary, secondary, accent };
  fonts: { heading, body };
  thumbnail: string;
  demoPath: string;
  tags: string[];
  bestFor: string[];
  price: number;
  screenshots: string[];
  longDescription: string;
  whatsIncluded: string[];
}
```

#### 3. Visual Builder System
Located in `components/builder/` and `app/templates/[templateId]/builder/`.

**Features**:
- Drag-and-drop section reordering
- Section visibility toggles
- Live preview
- Device preview (mobile/desktop)
- Telegram sharing

**Builder Flow**:
1. User clicks "Customize" on template card
2. Opens `/templates/[templateId]/builder`
3. Unified builder loads template sections
4. User reorders/toggles sections
5. Preview updates in real-time
6. "Send to Telegram" shares design

#### 4. Discount System
Full-featured discount code system with admin panel.

**Models** (Prisma schema):
- `DiscountCode` - Code configuration
- `DiscountUsage` - Usage tracking
- `DiscountAuditLog` - Change history
- `Purchase` - Purchase records
- `User` - User accounts

**Key Features**:
- Percentage and fixed amount discounts
- Time-based validity
- Usage limits (global + per-user)
- Template/category restrictions
- Stackable codes with priority
- Fraud detection
- Analytics tracking

**API Endpoints**:
- `POST /api/discount/validate` - Validate code
- `POST /api/discount/apply` - Apply discount
- `POST /api/admin/discount` - Create code (admin)
- `GET /api/admin/discount` - List codes (admin)
- `PUT /api/admin/discount/[id]` - Update code (admin)

#### 5. Checkout System
Stripe-powered checkout with add-on services.

**Flow**:
1. User selects template
2. Views `/checkout/[templateId]`
3. Optionally adds services (content help, customization)
4. Applies discount codes
5. Completes Stripe payment
6. Receives download/license key

**Add-on Services** (`lib/services-types.ts`):
- Content creation help
- Logo design
- Custom domain setup
- Premium support

#### 6. Dark Mode System
**IMPORTANT**: All templates must support dark mode properly.

**Implementation**:
- Uses `next-themes` for theme management
- Class-based: `dark:` prefix for dark mode styles
- Proper text contrast in both modes
- Component-level dark mode state: `const { theme } = useTheme()`

**Common Pattern**:
```typescript
const isDark = theme === 'dark';

<h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
  Title
</h1>
```

## Code Quality Standards

### Next.js 15 Patterns
- **Server Components**: Default to async server components when possible
- **Async APIs**: Always `await` calls to `cookies()`, `headers()`, `params`
- **Client Components**: Mark with `"use client"` directive only when needed
- **Dynamic Imports**: Use for heavy client-side libraries

```typescript
// Server Component (async by default)
export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params; // Must await in Next.js 15
  const cookieStore = await cookies(); // Must await
  return <div>{id}</div>;
}

// Client Component (when interactivity needed)
"use client";
export function InteractiveComponent() {
  const [state, setState] = useState();
  return <button onClick={() => setState(...)}>Click</button>;
}
```

### TypeScript
- Use strict type checking (enabled in `tsconfig.json`)
- Avoid `any` - use proper types or `unknown`
- Define interfaces for all props
- Use type imports: `import type { ... }`

### Styling with Tailwind
- Use existing Tailwind utilities first
- Custom colors via CSS variables (see `app/globals.css`)
- Dark mode: always test both themes
- Responsive: mobile-first approach (`sm:`, `md:`, `lg:`, `xl:`)

### Component Structure
```typescript
"use client"; // Only if needed (client components)

import type { FC } from "react";
import { useI18n } from "@/lib/i18n-context";

interface ComponentProps {
  // Props definition
}

export const Component: FC<ComponentProps> = ({ ...props }) => {
  const { t, language } = useI18n();

  return (
    // JSX
  );
};
```

### Accessibility
- Use semantic HTML (`<header>`, `<nav>`, `<main>`, `<footer>`)
- Add `aria-label` to icon-only buttons
- Ensure keyboard navigation works (focus states)
- Test with screen readers when possible
- Maintain color contrast ratios (WCAG AA)

### Performance
- Use Next.js `<Image>` for images (auto-optimization)
- Lazy load below-the-fold content
- Code split by template (automatic via App Router)
- Minimize client-side JavaScript

## Bug Documentation

**REQUIREMENT**: All bugs must be documented in `/docs/bugs.md`

**Format**:
```markdown
### Issue #X: [Title]
**Date Discovered**: YYYY-MM-DD
**Severity**: CRITICAL | HIGH | MEDIUM | LOW
**Status**: FIXED ✅ | IN PROGRESS | OPEN

**Description**: [What was the bug]

**Files Modified**: [List of files]

**Changes Made**: [What was fixed]

**Testing**: [How to verify fix]
```

## Environment Variables

Required for full functionality (see `.env.example`):

```bash
# Database
DATABASE_URL="postgresql://..."

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="" # Generate with: openssl rand -base64 32

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."

# Optional
GEMINI_API_KEY="" # For AI features
TELEGRAM_BOT_TOKEN="" # For Telegram integration
```

## Common Patterns

### Adding a New Template

**CRITICAL: File Naming Convention**
- **Template IDs**: Use kebab-case (lowercase with hyphens)
- **Translation files**: MUST exactly match template ID from registry
- **NO camelCase**: Never use `boldTypography.json` - use `bold-typography.json`
- **One file per template**: Each template has EXACTLY one translation file

1. **Create template component**:
   ```bash
   components/templates/[category]/[template-name]-template.tsx
   ```

2. **Create route**:
   ```bash
   app/templates/[template-id]/page.tsx
   ```

3. **Register in template registry** (defines the ID):
   ```typescript
   // lib/template-registry.ts
   {
     id: "bold-typography",  // ✅ kebab-case - this is the source of truth
     name: "Bold Typography",
     category: "Portfolio",
     // ... other config
   }
   ```

4. **Create translation file** (MUST match template ID):
   ```bash
   # CORRECT: lib/translations/templates/bold-typography.json
   # WRONG:   lib/translations/templates/boldTypography.json (camelCase)
   ```

   ```json
   // lib/translations/templates/bold-typography.json
   {
     "en": { "templateId": { "hero": { "title": "..." } } },
     "ru": { "templateId": { "hero": { "title": "..." } } }
   }
   ```

5. **Create screenshots**:
   - Place in `/public/screenshots/[template-id]-1.png`
   - Size: 1200x800px
   - Use `npm run generate-previews`

### Working with Prisma

```bash
# After schema changes
npx prisma migrate dev --name descriptive_name
npx prisma generate

# View data
npx prisma studio
```

### Dark Mode Text Color Pattern

**ALWAYS use this pattern** for text in templates:
```typescript
// Headings
className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}

// Body text
className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}

// Muted text
className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}

// Badges
className={isDark ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-700'}
```

## Testing Guidelines

### Before Committing
1. Test in both light and dark modes
2. Test on mobile (responsive design)
3. Test language switching (EN/RU)
4. Run `npm run test:integrity` (translation check)
5. Check for TypeScript errors: `npm run build`

### Manual Testing Checklist
- [ ] Homepage loads without errors
- [ ] Template gallery displays all templates
- [ ] Template detail pages work
- [ ] Builder allows section reordering
- [ ] Telegram sharing works
- [ ] Dark mode toggles properly
- [ ] Language switch persists
- [ ] Mobile responsive on all pages
- [ ] Discount codes validate correctly
- [ ] Checkout flow completes

## Important Notes

1. **Port**: Development runs on port **3500** (not 3000)
2. **Path Alias**: Use `@/` for imports (resolves to root directory)
3. **Image Optimization**: All images go through Next.js Image component
4. **Build Warnings**: TypeScript errors are ignored in build (see `next.config.ts`)
5. **Bug Tracking**: Use `/docs/bugs.md` for all bug documentation
6. **Next.js 15 Async APIs**: `cookies()`, `headers()`, and `params` must be awaited in server components
7. **Language Persistence**: Uses both localStorage (client) and cookies (server) for language preference

## Deployment

**Production builds require**:
1. Database connection (PostgreSQL)
2. Prisma client generation (automatic in build)
3. Environment variables set
4. Stripe webhooks configured (for payments)

**Vercel Deployment**:
- Automatic via GitHub integration
- Set environment variables in Vercel dashboard
- Database URL must be for production database

## Resources

- **Main Docs**: `/README.md` - Comprehensive project overview
- **Bug Log**: `/docs/bugs.md` - All bugs and fixes
- **Architecture**: `/ARCHITECTURE.md` - Detailed architecture
- **Templates Guide**: `/TEMPLATES.md` - Template documentation
