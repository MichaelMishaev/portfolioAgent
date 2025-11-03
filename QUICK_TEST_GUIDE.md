# Quick Test Guide - Builder All Components

## 🚀 Quick Start (3 Steps)

```bash
# 1. Start dev server
npm run dev

# 2. Run tests
npx playwright test builder-all-components.spec.ts

# 3. View results
npx playwright show-report
```

## 📋 What Gets Tested

✅ **8 Components Total**:
1. Split Hero
2. Stats
3. Skills
4. Contact
5. Hero (Generic)
6. About
7. Projects
8. **Gallery (NEW with ImageIcon)**

✅ **25 Test Cases**:
- Component addition and rendering
- Component selection
- Settings panel
- Component deletion
- Language switching (EN/RU)
- Mobile viewport
- Integration scenarios

## 🎯 Common Test Commands

```bash
# Run all tests (recommended)
npx playwright test builder-all-components.spec.ts

# Run with UI (best for debugging)
npx playwright test builder-all-components.spec.ts --ui

# Run in headed mode (see browser)
npx playwright test builder-all-components.spec.ts --headed

# Test specific component
npx playwright test builder-all-components.spec.ts -g "Component 8: Gallery"

# Test desktop only
npx playwright test builder-all-components.spec.ts -g "Desktop"

# Test mobile only
npx playwright test builder-all-components.spec.ts -g "Mobile"

# Test Gallery specifically
npx playwright test builder-all-components.spec.ts -g "Gallery"

# Test language switching
npx playwright test builder-all-components.spec.ts -g "Language"
```

## 🎨 Interactive Menu

```bash
./scripts/test-builder.sh
```

Provides menu-driven interface:
1. Run all tests
2. Desktop tests only
3. Mobile tests only
4. Gallery tests
5. Language tests
6. UI mode
7. Individual component tests

## 📊 Test Results

Generated files in `test-results/`:
- `builder-initial-load.png`
- `gallery-component.png`
- `multiple-components.png`
- `all-components-added.png`

## ✅ Success Criteria

All tests pass with:
- ✅ No ImageIcon errors
- ✅ No Gallery component errors
- ✅ All 8 components render
- ✅ Settings work for all
- ✅ Deletion works for all
- ✅ Language switching works
- ✅ Mobile viewport works

## ⏱️ Test Duration

- Desktop: ~3-4 minutes
- Mobile: ~2-3 minutes
- Integration: ~2-3 minutes
- **Total: ~8-10 minutes**

## 🐛 Quick Troubleshooting

**Dev server not running?**
```bash
npm run dev
```

**Tests fail?**
```bash
# Run in UI mode to debug
npx playwright test builder-all-components.spec.ts --ui
```

**Component not found?**
1. Check builder loads at: http://localhost:3500/templates/split-screen/builder
2. Verify component appears in toolbox manually
3. Check ImageIcon is imported: `import { ImageIcon } from 'lucide-react'`

## 📚 Full Documentation

- Test Suite: `/tests/builder-all-components.spec.ts`
- README: `/tests/README-BUILDER-TESTS.md`
- Summary: `/BUILDER_TEST_SUITE_SUMMARY.md`

## 🔥 Most Important Tests

```bash
# Test Gallery component (the new one)
npx playwright test builder-all-components.spec.ts -g "Component 8: Gallery"

# Test all components work
npx playwright test builder-all-components.spec.ts -g "should display all 8 component buttons"

# Full E2E workflow
npx playwright test builder-all-components.spec.ts -g "Comprehensive End-to-End"
```

---

**Builder URL**: http://localhost:3500/templates/split-screen/builder
**Test File**: tests/builder-all-components.spec.ts
**Test Count**: 25 tests
**Components**: 8 total
