# Test Execution Checklist

## Pre-Test Verification

### Environment Setup
- [ ] Node.js and npm are installed
- [ ] All dependencies are installed (`npm install`)
- [ ] Playwright is installed (`npx playwright install`)
- [ ] Dev server can start without errors

### Server Verification
- [ ] Start dev server: `npm run dev`
- [ ] Verify server runs on: http://localhost:3500
- [ ] Builder loads at: http://localhost:3500/templates/split-screen/builder
- [ ] No console errors on initial load
- [ ] Components toolbox is visible

### Builder Component Verification
- [ ] Split Hero button appears in toolbox
- [ ] Stats button appears in toolbox
- [ ] Skills button appears in toolbox
- [ ] Contact button appears in toolbox
- [ ] Hero button appears in toolbox
- [ ] About button appears in toolbox
- [ ] Projects button appears in toolbox
- [ ] **Gallery button appears in toolbox** (NEW)

### Gallery Component Prerequisites
- [ ] ImageIcon is imported from lucide-react
- [ ] Gallery component exists in builder file
- [ ] Gallery has proper `.craft` configuration
- [ ] Gallery renders without console errors

## Test Execution

### Quick Smoke Test (2 minutes)
```bash
# Test Gallery component specifically
npx playwright test builder-all-components.spec.ts -g "Component 8: Gallery" --headed
```
Expected: Gallery adds to canvas, renders with ImageIcon placeholders, no errors

### Component Tests (5 minutes)
```bash
# Test all 8 components
npx playwright test builder-all-components.spec.ts -g "Desktop - Component Addition"
```
Expected: All 8 components can be added, selected, and deleted

### Language Tests (1 minute)
```bash
# Test EN/RU switching
npx playwright test builder-all-components.spec.ts -g "Language Switching"
```
Expected: Language switches without errors, components remain on canvas

### Mobile Tests (3 minutes)
```bash
# Test mobile viewport
npx playwright test builder-all-components.spec.ts -g "Mobile Viewport"
```
Expected: All components work on mobile, tap-to-add functions correctly

### Full Test Suite (8-10 minutes)
```bash
# Run all 25 tests
npx playwright test builder-all-components.spec.ts
```
Expected: All tests pass, screenshots generated

## Post-Test Verification

### Test Results
- [ ] All 25 tests passed
- [ ] No console errors related to ImageIcon
- [ ] No console errors related to Gallery
- [ ] No unexpected test failures
- [ ] Test duration within expected range (8-10 min)

### Generated Files
- [ ] `test-results/builder-initial-load.png` exists
- [ ] `test-results/gallery-component.png` exists
- [ ] `test-results/multiple-components.png` exists
- [ ] `test-results/all-components-added.png` exists
- [ ] HTML report can be viewed: `npx playwright show-report`

### Visual Verification
- [ ] Screenshots show correct component rendering
- [ ] Gallery displays 6 project placeholders
- [ ] ImageIcon placeholders are visible
- [ ] No visual glitches or errors

## Troubleshooting Checklist

### If tests fail to start:
- [ ] Verify dev server is running on port 3500
- [ ] Check no other service is using port 3500
- [ ] Clear browser cache and restart dev server
- [ ] Check Playwright browsers are installed

### If Gallery tests fail:
- [ ] Verify ImageIcon import: `import { ImageIcon } from 'lucide-react'`
- [ ] Check Gallery component is in toolbox
- [ ] Manually test Gallery in browser
- [ ] Check console for Gallery-specific errors
- [ ] Verify Gallery has `.craft.displayName = "Gallery"`

### If component addition fails:
- [ ] Check component is in Craft.js resolver
- [ ] Verify component has proper settings panel
- [ ] Check component uses `useNode` hook
- [ ] Verify component is not marked as non-draggable

### If mobile tests fail:
- [ ] Verify touch polyfill is loaded: `import "drag-drop-touch"`
- [ ] Check mobile tap handlers work
- [ ] Test mobile tabs navigation
- [ ] Verify viewport is set correctly (375x667)

### If language tests fail:
- [ ] Check language toggle button exists
- [ ] Verify bilingual labels are defined
- [ ] Check language prop is passed to components
- [ ] Test manual language switch in browser

## Success Criteria

### Must Pass:
✅ All 25 tests pass without errors
✅ No ImageIcon console errors
✅ No Gallery component errors
✅ All 8 components render correctly
✅ Settings panel works for all components
✅ Deletion works for all components
✅ Language switching works
✅ Mobile viewport works

### Should Generate:
✅ 4+ screenshot files
✅ HTML test report
✅ Detailed test logs
✅ Error-free console output

## Documentation Checklist

### Files to Review:
- [ ] `tests/builder-all-components.spec.ts` - Main test file
- [ ] `tests/README-BUILDER-TESTS.md` - Full documentation
- [ ] `BUILDER_TEST_SUITE_SUMMARY.md` - Implementation summary
- [ ] `QUICK_TEST_GUIDE.md` - Quick reference
- [ ] `TEST_EXECUTION_CHECKLIST.md` - This file

### Test Coverage Verification:
- [ ] All 8 components have individual tests
- [ ] Gallery has specific ImageIcon tests
- [ ] Language switching is tested
- [ ] Mobile viewport is tested
- [ ] Integration scenarios are tested
- [ ] Error handling is tested

## CI/CD Integration Checklist

### GitHub Actions Setup:
- [ ] Workflow file exists (`.github/workflows/test.yml`)
- [ ] Playwright is installed in CI
- [ ] Dev server starts in CI
- [ ] Tests run in CI environment
- [ ] Test reports are uploaded

### CI Configuration:
```yaml
- name: Install Playwright
  run: npx playwright install --with-deps

- name: Start dev server
  run: npm run dev &

- name: Wait for server
  run: npx wait-on http://localhost:3500

- name: Run Builder Tests
  run: npx playwright test builder-all-components.spec.ts

- name: Upload test results
  uses: actions/upload-artifact@v3
  with:
    name: playwright-report
    path: playwright-report/
```

## Final Sign-Off

### Before Marking Complete:
- [ ] All tests pass locally
- [ ] Documentation is complete and clear
- [ ] Interactive runner works: `./scripts/test-builder.sh`
- [ ] Screenshots verify correct rendering
- [ ] No blockers or critical issues
- [ ] Code is committed to repository
- [ ] Team has been notified

### Test Suite Quality:
- [ ] Tests are maintainable
- [ ] Tests are well-documented
- [ ] Tests are reusable
- [ ] Tests are comprehensive
- [ ] Tests are production-ready

## Commands Quick Reference

```bash
# Start server
npm run dev

# Run all tests
npx playwright test builder-all-components.spec.ts

# Run with UI
npx playwright test builder-all-components.spec.ts --ui

# Run Gallery test
npx playwright test builder-all-components.spec.ts -g "Gallery"

# Interactive menu
./scripts/test-builder.sh

# View report
npx playwright show-report
```

---

## Sign-Off

**Tester**: ___________________
**Date**: ___________________
**Status**: [ ] PASS  [ ] FAIL
**Notes**: ___________________

---

**Created**: 2025-11-03
**Version**: 1.0
**Test Suite**: builder-all-components.spec.ts
