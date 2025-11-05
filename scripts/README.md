# Template Preview Screenshots Generator

Automated screenshot generation for all portfolio templates using Playwright.

## Overview

This script automatically captures high-quality screenshots of all 30 templates and saves them as preview images in the `public/previews` directory.

## Features

- ✅ **Automated**: Captures all 30 templates without manual intervention
- ✅ **High Quality**: Retina display (2x device scale factor) for crisp images
- ✅ **Optimized**: 1200x800px dimensions, perfect for gallery cards
- ✅ **Smart Capture**: Waits for animations and network idle before capturing
- ✅ **Error Handling**: Continues even if one template fails
- ✅ **Progress Tracking**: Real-time console feedback

## Usage

### Prerequisites

Make sure your development server is running:

```bash
npm run dev
```

The dev server must be running on `http://localhost:3500` before generating previews.

### Generate Screenshots

```bash
npm run generate-previews
```

### Output

All screenshots will be saved to:
```
public/previews/
├── minimalist.png
├── dark-mode.png
├── grid-masonry.png
├── ...
└── service-dfyou.png
```

### Generated Files

- **30 PNG images** (one for each template)
- **File sizes**: ~75KB - 1.3MB per image
- **Dimensions**: 1200x800 pixels at 2x scale
- **Format**: PNG with transparency support

## How It Works

1. Launches headless Chromium browser via Playwright
2. Navigates to each template URL (`/templates/{template-name}`)
3. Waits for page to fully load (network idle)
4. Waits 2 seconds for animations to settle
5. Scrolls down slightly to capture more content
6. Scrolls back to top to capture hero section
7. Takes screenshot of viewport (1200x800)
8. Saves as PNG in `public/previews/`

## Screenshot Settings

```typescript
viewport: { width: 1200, height: 800 }
deviceScaleFactor: 2  // Retina display
waitUntil: 'networkidle'
timeout: 30000  // 30 seconds
```

## Template List

The script captures screenshots for:

### Portfolio Templates (11)
- minimalist, dark-mode, grid-masonry
- bold-typography, fullscreen-immersive, split-screen
- illustration-focus, single-page, text-heavy
- card-modular, kinetic-typography

### Trending 2025 Templates (9)
- bento-grid, neo-brutalist, organic-liquid
- y2k-retro, collage-maximalist, 3d-immersive
- data-dashboard, ar-spatial, voice-first

### Product Templates (7)
- product-saas, product-course, product-physical
- product-premium, product-tech, product-fashion
- product-luxury

### Service Templates (3)
- service-b2b, service-community, service-dfyou

## Regenerating Screenshots

To regenerate all screenshots:

```bash
# Make sure dev server is running
npm run dev

# In another terminal, run:
npm run generate-previews
```

Screenshots will be overwritten with fresh captures.

## Troubleshooting

### "Failed to start server: EADDRINUSE"
The dev server is already running. This is expected - keep it running!

### "Failed: [template-name]"
- Check if the template page exists at `/templates/[template-name]`
- Check browser console for errors
- Verify the template renders correctly in your browser

### Screenshots are blank/empty
- Increase wait time in the script (currently 2 seconds)
- Check if animations are blocking the capture
- Verify CSS is loading correctly

## Technical Details

- **Browser**: Chromium (via Playwright)
- **Headless Mode**: Yes (no GUI)
- **Timeout**: 30 seconds per template
- **Parallel Processing**: Sequential (one at a time)
- **Total Time**: ~2 minutes for all 30 templates

## Next Steps

After generating screenshots, they are automatically used in the template gallery:

1. ✅ Screenshots saved to `public/previews/`
2. ✅ Template registry updated to use `/previews/{id}.png`
3. ✅ Gallery component displays actual screenshots instead of gradients

## Script Location

- **Main Script**: `scripts/generate-previews.ts`
- **Output Directory**: `public/previews/`
- **Registry File**: `lib/template-registry.ts`
- **Gallery Component**: `components/template-gallery.tsx`

---

**Last Updated**: October 2025

---

# Text Color Audit & Fix System

## Overview

The text color audit system prevents visibility issues by ensuring all text elements in templates have explicit color classes. This system was created after discovering that 98% of templates had text visibility problems affecting critical sections like Stats, Testimonials, Timeline, Pricing, and FAQ.

## Scripts

### `audit-text-colors.js`

Scans all template files for text elements missing explicit color classes.

**Usage:**
```bash
# Run audit locally (generates report)
npm run audit:text-colors

# Run in CI mode (fails if issues found)
npm run audit:text-colors:ci
```

**Features:**
- Scans 61 templates across all template types
- Identifies issues in critical sections (Stats, Testimonials, Timeline, Pricing, FAQ)
- Intelligent filtering to skip emojis, icons, and semantic colors
- Generates detailed markdown report (docs/text-visibility-audit.md)
- CI mode exits with error code 1 if issues detected

**CI Integration:**
- Runs automatically on pushes/PRs to main/develop
- Only triggers when template files or audit script changes
- Fails PR if text visibility issues detected
- Uploads audit report as artifact on failure
- Posts comment on PR with summary and fix instructions

### `fix-text-colors.js`

Automatically fixes text visibility issues with conservative, context-aware color selection.

**Usage:**
```bash
# Preview fixes without applying (dry-run)
npm run fix:text-colors:dry

# Apply fixes (creates backups)
npm run fix:text-colors
```

**Features:**
- Conservative automated fixing with intelligent filtering
- Context-aware color selection based on background colors
- Skips emojis, icons, and decorative elements
- Creates automatic backups (.bak.auto files)
- Dry-run mode for safe preview

**Color Selection Logic:**
- Light backgrounds → `text-gray-900`
- Dark backgrounds (bg-gray-900, bg-black) → `text-white`
- Primary/gradient backgrounds → `text-white`
- Muted backgrounds → `text-foreground`

## NPM Scripts

```json
{
  "audit:text-colors": "node scripts/audit-text-colors.js",
  "audit:text-colors:ci": "node scripts/audit-text-colors.js --ci",
  "fix:text-colors": "node scripts/fix-text-colors.js",
  "fix:text-colors:dry": "node scripts/fix-text-colors.js --dry-run"
}
```

## GitHub Actions Workflow

File: `.github/workflows/text-visibility-audit.yml`

**Triggers:**
- Push to main/develop (only on template changes)
- Pull requests to main/develop (only on template changes)

**Steps:**
1. Checkout code
2. Setup Node.js 20
3. Install dependencies
4. Run text color audit in CI mode
5. On failure: Upload audit report as artifact
6. On failure (PR): Post comment with summary and fix instructions

## Workflow Examples

### Developer Workflow

1. **Make template changes**
   ```bash
   # Edit template files
   vi components/templates/my-template/my-template-template.tsx
   ```

2. **Run audit before committing**
   ```bash
   npm run audit:text-colors
   ```

3. **If issues found, preview fixes**
   ```bash
   npm run fix:text-colors:dry
   ```

4. **Apply fixes**
   ```bash
   npm run fix:text-colors
   ```

5. **Verify fixes**
   ```bash
   npm run audit:text-colors:ci
   npm run build
   ```

6. **Commit and push**
   ```bash
   git add .
   git commit -m "Fix text visibility issues"
   git push
   ```

### CI/CD Workflow

1. **Developer pushes changes** → GitHub Actions triggered
2. **CI runs audit** → `npm run audit:text-colors:ci`
3. **If issues found:**
   - Build fails with error message
   - Audit report uploaded as artifact
   - PR comment posted with instructions
   - Developer fixes locally and pushes again
4. **If no issues:** Build continues normally

## Historical Context

**Bug #21: Systematic Text Visibility Crisis**

- **Discovered:** 2025-11-05
- **Scope:** 60 out of 61 templates (98%)
- **Total Fixes:** 527 text visibility issues
- **Impact:** Critical usability issue affecting Stats, Testimonials, Timeline, Pricing, and FAQ sections

**Resolution:**
- Created automated audit and fix tooling
- Integrated into CI/CD pipeline
- Fixed all existing issues
- Prevented future regressions

## Troubleshooting

**False Positives:**

If audit incorrectly flags elements:
1. Check if element is icon/emoji → Add to skip pattern
2. Check if color is semantic → Add to `TEXT_COLOR_PATTERN`
3. Check if element is decorative → Add to skip conditions

**Fix Script Not Catching Issues:**

The fix script is intentionally conservative. For issues it misses:
1. Run `npm run fix:text-colors:dry` to see what it would fix
2. Manually fix remaining issues
3. Consider updating `shouldFix()` function if pattern is common

## Related Files

- **Audit Script:** `scripts/audit-text-colors.js`
- **Fix Script:** `scripts/fix-text-colors.js`
- **CI Workflow:** `.github/workflows/text-visibility-audit.yml`
- **Audit Report:** `docs/text-visibility-audit.md` (generated)
- **Bug Documentation:** `docs/bugs.md` (Bug #21)
- **Package Scripts:** `package.json`

---

**Last Updated**: November 2025
