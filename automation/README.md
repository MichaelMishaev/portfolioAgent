# 🤖 Automation Scripts

This directory contains all automation scripts organized by functionality. Each script helps with testing, generating content, fixing issues, or maintaining the codebase.

## 📁 Directory Structure

```
automation/
├── testing/              # All testing scripts
│   ├── playwright/       # End-to-end browser tests
│   ├── jest/            # Unit and integration tests
│   └── manual/          # Manual testing helpers
├── preview-generation/   # Screenshot and preview generation
├── translation/         # Translation checking and testing
├── template/            # Template manipulation and fixes
├── mobile/              # Mobile-specific fixes
└── content/             # Content expansion and manipulation
```

---

## 🧪 Testing Scripts

### Playwright Tests (`testing/playwright/`)

Browser-based end-to-end tests using Playwright.

| Script | Purpose | Usage |
|--------|---------|-------|
| `playwright-test-templates.ts` | Test all templates rendering | `npx tsx automation/testing/playwright/playwright-test-templates.ts` |
| `playwright-test-russian-translations.ts` | Test Russian translations | `npx tsx automation/testing/playwright/playwright-test-russian-translations.ts` |
| `playwright-test-russian-ui.ts` | Test Russian UI elements | `npx tsx automation/testing/playwright/playwright-test-russian-ui.ts` |
| `test-mobile-responsive.ts` | Test mobile responsiveness | `npx tsx automation/testing/playwright/test-mobile-responsive.ts` |
| `test-minimalist-russian.ts` | Test minimalist template Russian | `npx tsx automation/testing/playwright/test-minimalist-russian.ts` |
| `test-service-marketplace.ts` | Test service marketplace | `npx tsx automation/testing/playwright/test-service-marketplace.ts` |
| `test-service-marketplace-final.ts` | Final marketplace tests | `npx tsx automation/testing/playwright/test-service-marketplace-final.ts` |
| `test-russian-service-marketplace.ts` | Test Russian service marketplace | `npx tsx automation/testing/playwright/test-russian-service-marketplace.ts` |
| `deep-check-mobile.ts` | Deep mobile compatibility check | `npx tsx automation/testing/playwright/deep-check-mobile.ts` |
| `test-stuck-templates.ts` | Test templates that had issues | `npx tsx automation/testing/playwright/test-stuck-templates.ts` |

**Quick Commands:**
```bash
# Run all Playwright tests
npm run test

# Run with UI
npm run test:ui

# Run headed (visible browser)
npm run test:headed

# Debug mode
npm run test:debug
```

### Jest Tests (`testing/jest/`)

Unit and integration tests.

| Script | Purpose | Usage |
|--------|---------|-------|
| `test-all-templates.js` | Test all templates exist | `node automation/testing/jest/test-all-templates.js` |
| `test-new-templates.js` | Test newly added templates | `node automation/testing/jest/test-new-templates.js` |

**Quick Commands:**
```bash
# Run Jest tests
npm run test:unit

# Watch mode
npm run test:unit:watch

# Coverage
npm run test:unit:coverage
```

### Manual Testing Helpers (`testing/manual/`)

Scripts for manual inspection and debugging.

| Script | Purpose | Usage |
|--------|---------|-------|
| `audit-templates-and-translations.js` | Audit template translations | `node automation/testing/manual/audit-templates-and-translations.js` |
| `audit-templates-and-translations.ts` | TypeScript version | `npx tsx automation/testing/manual/audit-templates-and-translations.ts` |
| `check-page-content.ts` | Check page content | `npx tsx automation/testing/manual/check-page-content.ts` |
| `inspect-buttons.ts` | Inspect button elements | `npx tsx automation/testing/manual/inspect-buttons.ts` |
| `check-icon-rendering.ts` | Check icon rendering | `npx tsx automation/testing/manual/check-icon-rendering.ts` |

---

## 🖼️ Preview Generation Scripts

### Preview Generation (`preview-generation/`)

Generate screenshots and cover images for templates.

| Script | Purpose | Usage |
|--------|---------|-------|
| `generate-previews.ts` | Generate template previews | `npx tsx automation/preview-generation/generate-previews.ts` |
| `generate-svg-previews.js` | Generate SVG previews | `node automation/preview-generation/generate-svg-previews.js` |
| `generate-template-covers.ts` | Generate template covers | `npx tsx automation/preview-generation/generate-template-covers.ts` |
| `generate-all-covers.ts` | Generate all cover images | `npx tsx automation/preview-generation/generate-all-covers.ts` |
| `screenshot-service-marketplace.ts` | Screenshot marketplace | `npx tsx automation/preview-generation/screenshot-service-marketplace.ts` |
| `verify-template-covers.ts` | Verify covers exist | `npx tsx automation/preview-generation/verify-template-covers.ts` |
| `fix-preview-images.ts` | Fix broken preview images | `npx tsx automation/preview-generation/fix-preview-images.ts` |
| `replace-error-previews.ts` | Replace error previews | `npx tsx automation/preview-generation/replace-error-previews.ts` |

**Common Workflow:**
```bash
# Generate all covers
npx tsx automation/preview-generation/generate-all-covers.ts

# Verify they were created
npx tsx automation/preview-generation/verify-template-covers.ts

# Fix any broken ones
npx tsx automation/preview-generation/fix-preview-images.ts
```

---

## 🌍 Translation Scripts

### Translation Testing (`translation/`)

Check and test translations for English and Russian.

| Script | Purpose | Usage |
|--------|---------|-------|
| `check-russian-translations.ts` | Check Russian translations | `npx tsx automation/translation/check-russian-translations.ts` |
| `check-translations.js` | Check all translations | `node automation/translation/check-translations.js` |
| `check-template-translations.js` | Check template translations | `node automation/translation/check-template-translations.js` |

**Quick Check:**
```bash
# Check all Russian translations
npx tsx automation/translation/check-russian-translations.ts
```

---

## 🎨 Template Scripts

### Template Management (`template/`)

Scripts for manipulating and fixing templates.

| Script | Purpose | Usage |
|--------|---------|-------|
| `expand-all-13-templates.ts` | Expand 13 templates with content | `npx tsx automation/template/expand-all-13-templates.ts` |
| `debug-minimalist.ts` | Debug minimalist template | `npx tsx automation/template/debug-minimalist.ts` |
| `fix_portfolio_templates.py` | Fix portfolio templates | `python automation/template/fix_portfolio_templates.py` |
| `fix_remaining_navs.sh` | Fix remaining navigations | `bash automation/template/fix_remaining_navs.sh` |
| `fix-hoisting.py` | Fix hoisting issues | `python automation/template/fix-hoisting.py` |
| `fix-remaining.sh` | Fix remaining issues | `bash automation/template/fix-remaining.sh` |
| `integrate-tutorial-complete.sh` | Complete tutorial integration | `bash automation/template/integrate-tutorial-complete.sh` |
| `integrate-tutorial.sh` | Integrate tutorial | `bash automation/template/integrate-tutorial.sh` |

**Example:**
```bash
# Expand all templates with additional content
npx tsx automation/template/expand-all-13-templates.ts
```

---

## 📱 Mobile Scripts

### Mobile Fixes (`mobile/`)

Scripts specifically for mobile responsiveness fixes.

| Script | Purpose | Usage |
|--------|---------|-------|
| `fix-mobile-nav.js` | Fix mobile navigation | `node automation/mobile/fix-mobile-nav.js` |
| `add-hamburger-menus.sh` | Add hamburger menus | `bash automation/mobile/add-hamburger-menus.sh` |
| `fix-all-mobile.sh` | Fix all mobile issues | `bash automation/mobile/fix-all-mobile.sh` |
| `fix-overflow.sh` | Fix overflow issues | `bash automation/mobile/fix-overflow.sh` |
| `fix-remaining-mobile-issues.sh` | Fix remaining mobile issues | `bash automation/mobile/fix-remaining-mobile-issues.sh` |
| `fix-mobile-responsive.sh` | Fix mobile responsiveness | `bash automation/mobile/fix-mobile-responsive.sh` |

**Run All Mobile Fixes:**
```bash
# Fix all mobile issues at once
bash automation/mobile/fix-all-mobile.sh
```

---

## 📝 Content Scripts

### Content Management (`content/`)

Scripts for expanding and managing content.

| Script | Purpose | Usage |
|--------|---------|-------|
| `add-extensive-content.py` | Add extensive content | `python automation/content/add-extensive-content.py` |
| `expand-templates-content.py` | Expand template content | `python automation/content/expand-templates-content.py` |
| `enhance-all-templates.sh` | Enhance all templates | `bash automation/content/enhance-all-templates.sh` |
| `extensive-content-data.json` | Content data file | _(data file)_ |

**Example:**
```bash
# Enhance all templates with more content
bash automation/content/enhance-all-templates.sh
```

---

## 🚀 Quick Start

### Run All Tests
```bash
# Unit tests
npm run test:unit

# E2E tests
npm run test

# All tests
npm run test:all
```

### Generate All Previews
```bash
npx tsx automation/preview-generation/generate-all-covers.ts
```

### Check Translations
```bash
npx tsx automation/translation/check-russian-translations.ts
```

### Fix Mobile Issues
```bash
bash automation/mobile/fix-all-mobile.sh
```

---

## 📋 Best Practices

1. **Always test after running scripts** - Use `npm run dev` to verify changes
2. **Run tests before committing** - Ensure nothing broke
3. **Generate previews after template changes** - Keep screenshots up to date
4. **Check translations for new templates** - Maintain bilingual support
5. **Use TypeScript scripts when possible** - Better type safety

---

## 🔧 Adding New Scripts

When adding new automation scripts:

1. **Choose the right category** (testing/preview-generation/translation/template/mobile/content)
2. **Name it descriptively** (e.g., `test-new-feature.ts`, not `script1.ts`)
3. **Add usage instructions** to this README
4. **Include error handling** in your script
5. **Test it thoroughly** before committing

---

## 📚 Related Documentation

- [Testing Guide](/docs/testing.md)
- [Template Guide](/TEMPLATES.md)
- [Translation Status](/TRANSLATION_STATUS.md)
- [Mobile Audit Report](/MOBILE_AUDIT_REPORT.md)

---

**Last Updated:** 2025-11-04
