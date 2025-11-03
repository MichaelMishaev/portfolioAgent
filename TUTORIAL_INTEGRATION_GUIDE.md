# Builder Tutorial Animation - Integration Guide

## ✅ What Was Created

**New Component:** `components/builder-tutorial-animation.tsx`

This component provides an animated, step-by-step tutorial showing users how to use the builder.

---

## 🎯 Features

### 5-Step Animated Walkthrough:
1. **Welcome Screen** - Overview of the builder
2. **Choose Components** - How to select components from the toolbox
3. **Add to Canvas** - Drag & drop or tap to add components
4. **Customize Settings** - Edit component properties
5. **Preview & Save** - Save and submit the template

### Key Features:
- ✅ **Bilingual Support** - English & Russian
- ✅ **Smooth Animations** - Framer Motion powered
- ✅ **Auto-Play** - Automatically advances through steps
- ✅ **Manual Controls** - Next/Previous buttons
- ✅ **Progress Indicators** - Dots showing current step
- ✅ **Visual Highlights** - Animated areas showing where to look
- ✅ **First-Visit Detection** - Shows automatically on first visit
- ✅ **Replay Button** - Users can watch again anytime

---

## 📝 Manual Integration Steps

Since the builder file is frequently modified, here's how to integrate manually:

### Step 1: Add Import
At the top of `components/builder/craftjs-template-builder.tsx`, add:

```tsx
import { BuilderTutorialAnimation, ShowTutorialButton } from "@/components/builder-tutorial-animation";
```

### Step 2: Add State Management
Inside the `CraftJSTemplateBuilder` function (after other state declarations):

```tsx
const [showTutorial, setShowTutorial] = React.useState(() => {
  // Show tutorial on first visit
  if (typeof window !== 'undefined') {
    const hasSeenTutorial = localStorage.getItem('hasSeenBuilderTutorial');
    return !hasSeenTutorial;
  }
  return false;
});

const handleCloseTutorial = () => {
  setShowTutorial(false);
  if (typeof window !== 'undefined') {
    localStorage.setItem('hasSeenBuilderTutorial', 'true');
  }
};
```

### Step 3: Add Tutorial Components to Render
At the **end** of the main return statement, **before the final closing `</div>`**:

```tsx
      {/* Builder Tutorial Animation */}
      {showTutorial && (
        <BuilderTutorialAnimation
          language={language}
          onClose={handleCloseTutorial}
          autoPlay={true}
        />
      )}

      {/* Show Tutorial Button */}
      <ShowTutorialButton
        onClick={() => setShowTutorial(true)}
        language={language}
      />
    </div> {/* This should be your final closing div */}
  );
}
```

---

## 🎨 Component API

### BuilderTutorialAnimation

```tsx
<BuilderTutorialAnimation
  language="en" | "ru"  // Current interface language
  onClose={() => void}  // Called when tutorial is closed
  autoPlay={boolean}    // Auto-advance through steps (default: true)
/>
```

### ShowTutorialButton

```tsx
<ShowTutorialButton
  onClick={() => void}  // Handler to show tutorial
  language="en" | "ru"  // Button text language
/>
```

---

## 🎬 Tutorial Steps in Detail

### Step 1: Welcome
- Animated emoji (🎨)
- Welcome message
- Introduction to the builder

### Step 2: Component Selection
- Shows component cards (Hero, Stats, Skills, Contact)
- Each card animates in sequence
- Demonstrates the component toolbox

### Step 3: Add to Canvas
- Large animated "+" icon
- Tooltip showing "Tap to add"
- Demonstrates how to add components

### Step 4: Edit Component
- Shows component with settings panel
- Animated connection between them
- Demonstrates customization process

### Step 5: Save Template
- Animated save icon
- Call-to-action button
- Completes the workflow

---

## 💡 User Experience Flow

1. **First Visit:**
   - Tutorial shows automatically
   - Overlays the entire screen
   - User can skip or watch

2. **After First Visit:**
   - Tutorial doesn't show automatically
   - Floating "Show Tutorial" button in bottom-right
   - User can replay anytime

3. **During Tutorial:**
   - Auto-advances every 4 seconds
   - User can pause/play
   - User can skip to any step
   - User can navigate with Previous/Next buttons

---

## 🎯 Customization Options

### Adjust Auto-Play Speed
In `builder-tutorial-animation.tsx`, line ~75:
```tsx
const timer = setTimeout(() => {
  setCurrentStep(prev => Math.min(prev + 1, tutorialSteps.length - 1));
}, 4000); // Change this value (milliseconds)
```

### Add More Steps
In `builder-tutorial-animation.tsx`, add to `tutorialSteps` array:
```tsx
{
  id: 6,
  title: "New Step",
  titleRu: "Новый шаг",
  description: "Step description",
  descriptionRu: "Описание шага",
  screenshot: "/tutorial/new-step.png",
  highlightArea: { x: 0, y: 0, width: 100, height: 100 }
}
```

### Change Button Position
In `builder-tutorial-animation.tsx`, `ShowTutorialButton` component:
```tsx
className="fixed bottom-6 right-6 ..." // Adjust position
```

---

## 📱 Responsive Design

- ✅ **Desktop:** Full modal with large animations
- ✅ **Tablet:** Scales appropriately
- ✅ **Mobile:** Optimized for small screens
- ✅ **Touch-Friendly:** Large buttons and touch targets

---

## 🚀 Testing

### Manual Testing:
1. Clear localStorage: `localStorage.removeItem('hasSeenBuilderTutorial')`
2. Reload builder page
3. Tutorial should show automatically
4. Test all controls:
   - Next/Previous buttons
   - Progress dots
   - Play/Pause button
   - Close button
   - Language switching

### Test Different Scenarios:
- First visit (tutorial shows)
- Second visit (tutorial hidden, button shows)
- Click "Show Tutorial" button
- Switch languages during tutorial
- Mobile viewport (responsive behavior)

---

## 🎨 Visual Elements

### Animations Used:
- **Fade In/Out** - Modal appearance
- **Scale** - Component emphasis
- **Slide** - Step transitions
- **Pulse** - Highlight areas
- **Rotate** - Save icon animation
- **Float** - Hero emoji animation

### Colors:
- **Primary:** Blue-600 (#2563EB)
- **Secondary:** Purple-600 (#9333EA)
- **Success:** Green-600 (#16A34A)
- **Highlight:** Yellow-400 (#FACC15)

---

## 📊 Analytics (Optional)

You can track tutorial usage by adding analytics:

```tsx
// When tutorial starts
handleCloseTutorial = () => {
  // Track tutorial completion
  analytics.track('builder_tutorial_completed', {
    stepsViewed: currentStep + 1,
    language: language
  });

  setShowTutorial(false);
  localStorage.setItem('hasSeenBuilderTutorial', 'true');
};
```

---

## 🔧 Troubleshooting

### Tutorial doesn't show:
- Check localStorage: `localStorage.getItem('hasSeenBuilderTutorial')`
- Clear it: `localStorage.removeItem('hasSeenBuilderTutorial')`
- Check imports are correct
- Verify state is initialized

### Animations laggy:
- Check if framer-motion is installed: `npm install framer-motion`
- Reduce animation duration
- Disable auto-play

### Button overlaps content:
- Adjust button position in CSS
- Change z-index value
- Use different placement (top-right, bottom-left, etc.)

---

## 📝 Future Enhancements

Possible improvements:
- [ ] Add actual screenshots from the builder
- [ ] Video tutorials for each step
- [ ] Interactive mode (click actual components)
- [ ] Track which steps users skip
- [ ] A/B test different tutorial flows
- [ ] Add tooltips to individual UI elements
- [ ] Create template-specific tutorials

---

**Created:** 2025-11-03
**Component:** `builder-tutorial-animation.tsx`
**Integration:** Manual (see steps above)
