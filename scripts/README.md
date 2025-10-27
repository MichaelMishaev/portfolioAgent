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
