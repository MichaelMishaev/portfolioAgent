# 🔍 MANUAL QA TESTING GUIDE - Builder Drag & Drop

## ⚠️ IMPORTANT NOTE
Automated drag & drop tests CANNOT test HTML5 Drag & Drop API properly. Playwright's mouse simulation doesn't trigger the required `dragstart`, `dragover`, `drop` events that browsers generate during real drag operations.

**Therefore, this MUST be tested manually.**

---

## 📋 PRE-TEST CHECKLIST

1. **Start Dev Server:**
   ```bash
   npm run dev
   ```

2. **Open Builder in Browser:**
   ```
   http://localhost:3500/templates/split-screen/builder
   ```

3. **Open Browser DevTools Console** (F12) to monitor for errors

---

## 🧪 TEST SUITE 1: Component Visibility

### Test 1.1: English Toolbox
**Expected:** All 7 components should be visible

#### Split-Screen Section:
- [ ] "Split Hero" button visible
- [ ] "Stats" button visible
- [ ] "Skills" button visible
- [ ] "Contact" button visible

#### Generic Section:
- [ ] "Hero" button visible
- [ ] "About" button visible
- [ ] "Projects" button visible

### Test 1.2: Russian Toolbox
**Click "RU" button**

**Expected:** All 7 components should be visible in Russian

#### Разделённый экран Section:
- [ ] "Главный баннер" button visible
- [ ] "Статистика" button visible
- [ ] "Навыки" button visible
- [ ] "Контакты" button visible

#### Общие Section:
- [ ] "Баннер" button visible
- [ ] "О нас" button visible
- [ ] "Проекты" button visible

---

## 🧪 TEST SUITE 2: Drag & Drop Functionality (CRITICAL)

### ⚠️ KNOWN ISSUE SYMPTOMS:
- **"Sometimes doesn't drop"** - Component button shows dragging cursor but nothing appears in canvas
- **Multiple attempts needed** - Have to try dragging 3-4 times before it works
- **Touch not working** - Drag & drop fails completely on mobile/tablet

### Test 2.1: Desktop Mouse - Split Hero (EN)

**Steps:**
1. Ensure browser is in ENGLISH mode
2. Click and HOLD mouse button on "Split Hero" button
3. While holding, drag mouse to the center canvas area
4. Release mouse button

**Expected Result:**
- [ ] Component appears in canvas immediately after first drop attempt
- [ ] "John Doe" and "Full Stack Developer" text visible
- [ ] No console errors
- [ ] Component is selectable (blue border appears when clicked)

**If FAILED, note:**
- Number of attempts needed: _____
- Any console errors: _____
- Does cursor change during drag? Y/N

### Test 2.2: Desktop Mouse - Stats (EN)

**Steps:**
1. Refresh page (Cmd/Ctrl + R)
2. Drag "Stats" button to canvas

**Expected Result:**
- [ ] Stats component appears after ONE drop attempt
- [ ] "Years Experience" and number visible
- [ ] No console errors

### Test 2.3: Desktop Mouse - All Components (EN)

Test each component individually (refresh between tests):

- [ ] Skills → "React" tag visible
- [ ] Contact → "Get in Touch" heading visible
- [ ] Hero (Generic) → "John Doe" visible (gradient background)
- [ ] About → "About Me" heading visible
- [ ] Projects → "E-Commerce Platform" visible

### Test 2.4: Desktop Mouse - Russian Components

**Steps:**
1. Refresh page
2. Click "RU" button
3. Test each component:

- [ ] Главный баннер → "John Doe" visible
- [ ] Статистика → "Years Experience" visible
- [ ] Навыки → "React" tag visible
- [ ] Контакты → "Get in Touch" visible

### Test 2.5: Mobile/Touch - CRITICAL TEST

**Device Options:**
- Real phone/tablet, OR
- Chrome DevTools Device Emulation (F12 → Toggle Device Toolbar)

**Steps:**
1. Open `http://localhost:3500/templates/split-screen/builder` on mobile device
2. Tap and HOLD on "Split Hero" button
3. While holding, drag finger to canvas area
4. Release finger

**Expected Result:**
- [ ] Component drops on FIRST touch attempt
- [ ] No need to retry multiple times
- [ ] Smooth drag animation
- [ ] Component appears in canvas

**If FAILED:**
- [ ] Drag doesn't start at all
- [ ] Drag starts but drop doesn't register
- [ ] Need multiple attempts (how many? _____)

### Test 2.6: Language Switch During Active Canvas

**Steps:**
1. Drag "Split Hero" to canvas (English mode)
2. Click "RU" button to switch language
3. Immediately try dragging "Статистика" (Stats) to canvas

**Expected Result:**
- [ ] No console errors during language switch
- [ ] Stats component drops successfully
- [ ] Previously dropped Split Hero component remains visible
- [ ] No white screen / crash

---

## 🧪 TEST SUITE 3: Console Error Monitoring

### Test 3.1: Page Load
**Open DevTools Console before loading page**

**Expected:**
- [ ] NO errors on initial load
- [ ] NO warnings about React setState

### Test 3.2: Language Switching
**Click EN → RU → EN → RU rapidly**

**Expected:**
- [ ] NO "Cannot update component while rendering" errors
- [ ] NO crash or white screen
- [ ] Toolbox updates language smoothly

### Test 3.3: Drag Operations
**Monitor console while performing 5 drag & drop operations**

**Expected:**
- [ ] NO errors during drag
- [ ] NO errors during drop
- [ ] NO errors after drop completes

---

## 🧪 TEST SUITE 4: Touch Action CSS

### Test 4.1: Verify Touch Action Applied

**Steps:**
1. Open DevTools (F12)
2. Go to Elements/Inspector tab
3. Find any component button in toolbox
4. Check Computed Styles

**Expected:**
- [ ] `touch-action: none` appears in computed styles
- [ ] All 7 buttons have this property

---

## 🧪 TEST SUITE 5: Edge Cases

### Test 5.1: Rapid Dragging
**Drag 5 components quickly, one after another without pausing**

**Expected:**
- [ ] All 5 components appear in canvas
- [ ] No components "lost" or failed to drop
- [ ] Canvas scrolls if needed

### Test 5.2: Drag Outside Canvas Then Back
**Drag component outside canvas area, then back inside before releasing**

**Expected:**
- [ ] Component drops successfully when released inside canvas
- [ ] OR component cancels if released outside canvas (acceptable)

### Test 5.3: Multiple Components Same Type
**Drag "Split Hero" to canvas 3 times**

**Expected:**
- [ ] 3 separate Split Hero components appear
- [ ] Each is independently selectable and editable

---

## ✅ SUCCESS CRITERIA

**PASS Requirements:**
- ✅ All components visible in both languages
- ✅ Drag & drop works on FIRST attempt (desktop)
- ✅ Drag & drop works on FIRST touch (mobile)
- ✅ NO console errors during any operation
- ✅ Language switch works without errors
- ✅ `touch-action: none` applied to all buttons

**FAIL Indicators:**
- ❌ Any component requires >1 attempt to drop
- ❌ Touch drag & drop doesn't work
- ❌ Console shows React setState errors
- ❌ Components don't appear after drop
- ❌ Browser crashes or white screen

---

## 📊 BUG REPORT TEMPLATE

If drag & drop fails, fill out this report:

```
**Bug:** Drag & Drop Failure

**Browser:** (Chrome/Firefox/Safari)
**Device:** (Desktop/Mobile/Tablet)
**OS:** (Windows/Mac/iOS/Android)

**Component Tested:**
**Language Mode:** EN / RU

**Symptoms:**
- [ ] Drag doesn't start
- [ ] Drag starts but drop doesn't register
- [ ] Need multiple attempts (how many: ___)
- [ ] Works on desktop but not touch
- [ ] Console errors (copy below)

**Console Errors:**
```
(paste errors here)
```

**Steps to Reproduce:**
1.
2.
3.

**Expected:** Component drops on first attempt
**Actual:** (describe what happened)

**Screenshots/Video:** (if possible)
```

---

## 🔧 DIAGNOSTIC COMMANDS

Run these in browser console to diagnose issues:

### Check if touch polyfill is loaded:
```javascript
console.log('DragDropTouch loaded:', typeof DragDropTouch !== 'undefined');
```

### Check component buttons:
```javascript
document.querySelectorAll('.w-64.bg-white.border-r button').forEach((btn, i) => {
  console.log(`Button ${i}:`, {
    text: btn.textContent.trim().split('\n')[0],
    touchAction: window.getComputedStyle(btn).touchAction,
    draggable: btn.draggable,
    hasRef: !!btn._craftNode
  });
});
```

### Check Craft.js editor state:
```javascript
// This should be run AFTER Editor component is mounted
console.log('Craft.js Editor:', window.craftEditor ? 'Found' : 'Not Found');
```

---

## 📝 TESTING LOG

**Date:** _______________
**Tester:** _______________
**Browser:** _______________
**Device:** _______________

| Test ID | Test Name | Status | Notes |
|---------|-----------|--------|-------|
| 1.1 | English Toolbox | ☐ Pass ☐ Fail | |
| 1.2 | Russian Toolbox | ☐ Pass ☐ Fail | |
| 2.1 | Desktop - Split Hero | ☐ Pass ☐ Fail | |
| 2.2 | Desktop - Stats | ☐ Pass ☐ Fail | |
| 2.3 | Desktop - All Components | ☐ Pass ☐ Fail | |
| 2.4 | Desktop - Russian | ☐ Pass ☐ Fail | |
| 2.5 | Mobile/Touch | ☐ Pass ☐ Fail | |
| 2.6 | Language Switch | ☐ Pass ☐ Fail | |
| 3.1 | Page Load Errors | ☐ Pass ☐ Fail | |
| 3.2 | Language Switch Errors | ☐ Pass ☐ Fail | |
| 3.3 | Drag Operation Errors | ☐ Pass ☐ Fail | |
| 4.1 | Touch Action CSS | ☐ Pass ☐ Fail | |
| 5.1 | Rapid Dragging | ☐ Pass ☐ Fail | |
| 5.2 | Drag Outside Canvas | ☐ Pass ☐ Fail | |
| 5.3 | Multiple Same Type | ☐ Pass ☐ Fail | |

**Overall Result:** ☐ PASS ☐ FAIL

**Critical Issues Found:**
_______________________________________________
_______________________________________________
_______________________________________________
