# Builder All Components Test Suite

## Overview

Comprehensive Playwright test suite for the Split-Screen Builder at `/templates/split-screen/builder`.

Tests **ALL 8 components** including the newly added Gallery component.

## Test Coverage

### Components Tested (8 Total)

#### Split-Screen Category (4 components)
1. **Split Hero** - Split-screen hero section with gradient
2. **Stats** - Statistics showcase with 4 metrics
3. **Skills** - Skills tags section with expertise areas
4. **Contact** - Contact split section with email

#### Generic Category (3 components)
5. **Hero** - Generic header section
6. **About** - About section with text and image
7. **Projects** - Project showcase with cards

#### Content Category (1 component)
8. **Gallery** - NEW - Image gallery with grid layout

## Test Scenarios

### For EACH Component:
- ✅ Component button appears in toolbox (EN and RU)
- ✅ Component can be added to canvas
- ✅ Component renders correctly after being added
- ✅ Component is selectable (blue border on selection)
- ✅ Settings panel opens when component is selected
- ✅ Component can be deleted

### Gallery-Specific Tests:
- ✅ Verify Gallery button exists in toolbox
- ✅ Add Gallery to canvas
- ✅ Verify gallery grid layout renders
- ✅ Verify placeholder images with ImageIcon appear
- ✅ Test grid layout selector in Settings
- ✅ Verify bilingual support (EN/RU)
- ✅ Ensure NO ImageIcon errors in console

### Language Switching:
- ✅ Switch from EN to RU
- ✅ Switch from RU to EN
- ✅ Components remain on canvas after switch
- ✅ No console errors during language switch

### Mobile Tests:
- ✅ Display all components in mobile toolbox
- ✅ Tap to add components on mobile
- ✅ Multiple components on mobile
- ✅ Mobile viewport (375x667)

### Integration Tests:
- ✅ Add multiple components simultaneously
- ✅ Delete components in any order
- ✅ Maintain canvas state after deletions
- ✅ Handle rapid component additions
- ✅ Full E2E workflow with all 8 components

## Running the Tests

### Prerequisites

1. Start the development server:
```bash
npm run dev
```

2. Ensure server is running on `http://localhost:3500`

### Run All Tests

```bash
# Run all builder tests
npx playwright test builder-all-components.spec.ts

# Run with UI mode (recommended for debugging)
npx playwright test builder-all-components.spec.ts --ui

# Run in headed mode (see browser)
npx playwright test builder-all-components.spec.ts --headed

# Run specific test group
npx playwright test builder-all-components.spec.ts -g "Desktop"
npx playwright test builder-all-components.spec.ts -g "Mobile"
npx playwright test builder-all-components.spec.ts -g "Gallery"
```

### Run Individual Tests

```bash
# Test specific component
npx playwright test builder-all-components.spec.ts -g "Component 1: Split Hero"
npx playwright test builder-all-components.spec.ts -g "Component 8: Gallery"

# Test language switching
npx playwright test builder-all-components.spec.ts -g "Language Switching"

# Test mobile viewport
npx playwright test builder-all-components.spec.ts -g "Mobile Viewport"
```

## Test Results

Tests generate screenshots in `test-results/`:

- `builder-initial-load.png` - Builder initial state
- `gallery-component.png` - Gallery component rendered
- `multiple-components.png` - Multiple components on canvas
- `all-components-added.png` - All 8 components added

## Success Criteria

All tests MUST pass with:
- ✅ No console errors related to ImageIcon
- ✅ No console errors related to Gallery component
- ✅ All 8 components render correctly
- ✅ Settings panel works for all components
- ✅ Deletion works for all components
- ✅ Language switching works without errors
- ✅ Mobile viewport works correctly

## Debugging Failed Tests

### If Gallery test fails:

1. Check ImageIcon import in builder:
```typescript
import { ImageIcon } from 'lucide-react';
```

2. Verify Gallery component is registered in toolbox

3. Check Gallery component renders in components list:
```bash
npx playwright test builder-all-components.spec.ts -g "should display all 8 component buttons" --headed
```

### If component addition fails:

1. Check component is in Craft.js resolver
2. Verify component has proper `.craft` configuration
3. Ensure component uses `useNode` hook correctly

### If deletion fails:

1. Verify component is selectable
2. Check Delete button appears in settings panel
3. Ensure component is not marked as `isDeletable: false`

## Test Architecture

### Helper Functions

- `waitForBuilderReady(page)` - Waits for builder to fully load
- `checkComponentInToolbox(page, name)` - Verifies component button exists
- `addComponentToCanvas(page, name, isMobile)` - Adds component to canvas
- `selectComponentOnCanvas(page, text)` - Selects component by text
- `checkSettingsPanelOpen(page, language)` - Verifies settings panel
- `deleteSelectedComponent(page, language)` - Deletes selected component

### Test Groups

1. **Desktop - Component Addition and Deletion** - Main component tests
2. **Language Switching Tests** - Bilingual support
3. **Mobile Viewport Tests** - Touch and mobile UI
4. **Gallery Component Settings Panel** - Gallery-specific tests
5. **Integration and Error Handling** - Edge cases
6. **Comprehensive End-to-End Workflow** - Full workflow test

## Expected Test Duration

- Desktop tests: ~3-4 minutes
- Mobile tests: ~2-3 minutes
- Integration tests: ~2-3 minutes
- **Total: ~8-10 minutes**

## Continuous Integration

Add to CI pipeline:

```yaml
- name: Run Builder Tests
  run: npx playwright test builder-all-components.spec.ts --reporter=html
```

## Notes

- Tests use `localhost:3500` - update if using different port
- Tests have 2-minute timeout for comprehensive scenarios
- Screenshots are saved to `test-results/` directory
- Mobile tests use 375x667 viewport (iPhone SE)

## Troubleshooting

### Test hangs or times out
- Increase timeout in test: `test.setTimeout(180000)`
- Check if dev server is running on correct port
- Verify builder loads without errors manually

### Component not found in toolbox
- Check component is imported in builder
- Verify component has bilingual labels
- Ensure component is in correct category

### Mobile tests fail
- Verify touch polyfill is loaded: `import "drag-drop-touch"`
- Check mobile tap handlers in toolbox
- Ensure mobile tabs work correctly

## Future Enhancements

- [ ] Add visual regression tests
- [ ] Test component settings changes
- [ ] Test export functionality
- [ ] Test undo/redo functionality
- [ ] Add performance benchmarks
- [ ] Test with different browsers (Firefox, Safari)

---

**Created**: 2025-11-03
**Last Updated**: 2025-11-03
**Test File**: `tests/builder-all-components.spec.ts`
