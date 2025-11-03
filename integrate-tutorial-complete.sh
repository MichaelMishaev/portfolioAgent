#!/bin/bash

FILE="components/builder/craftjs-template-builder.tsx"

echo "🎬 Integrating Builder Tutorial Animation..."
echo ""

# Step 1: Add import after useI18n import
echo "Step 1: Adding import statement..."
sed -i '' '/import { useI18n } from "@\/lib\/i18n-context";/a\
import { BuilderTutorialAnimation, ShowTutorialButton } from "@/components/builder-tutorial-animation";
' "$FILE"

# Step 2: Find the CraftJSTemplateBuilder function and add state after language state
echo "Step 2: Adding tutorial state management..."
sed -i '' '/const \[language, setLanguage\] = useState<.en. | .ru.>/a\
\
  \/\/ Tutorial state - shows on first visit\
  const [showTutorial, setShowTutorial] = React.useState(() => {\
    if (typeof window !== "undefined") {\
      const hasSeenTutorial = localStorage.getItem("hasSeenBuilderTutorial");\
      return !hasSeenTutorial;\
    }\
    return false;\
  });\
\
  const handleCloseTutorial = () => {\
    setShowTutorial(false);\
    if (typeof window !== "undefined") {\
      localStorage.setItem("hasSeenBuilderTutorial", "true");\
    }\
  };
' "$FILE"

# Step 3: Add tutorial components before the final closing </Editor>
echo "Step 3: Adding tutorial components to render..."

# Find the closing </Editor> tag and add tutorial components before it
# We'll add it right before the OnboardingTour closing section

sed -i '' '/<\/OnboardingTour>/a\
\
      {\/\* Builder Tutorial Animation \*\/}\
      {showTutorial && (\
        <BuilderTutorialAnimation\
          language={language}\
          onClose={handleCloseTutorial}\
          autoPlay={true}\
        \/>\
      )}\
\
      {\/\* Show Tutorial Button \*\/}\
      <ShowTutorialButton\
        onClick={() => setShowTutorial(true)}\
        language={language}\
      \/>
' "$FILE"

echo ""
echo "✅ Integration complete!"
echo ""
echo "📝 What was added:"
echo "   1. Import statement for tutorial components"
echo "   2. State management (showTutorial, handleCloseTutorial)"
echo "   3. Tutorial modal (shows on first visit)"
echo "   4. Floating 'Show Tutorial' button"
echo ""
echo "🧪 To test:"
echo "   1. Clear localStorage: localStorage.removeItem('hasSeenBuilderTutorial')"
echo "   2. Reload builder page"
echo "   3. Tutorial should show automatically!"
echo ""
echo "🔧 If you need to adjust:"
echo "   - Auto-play speed: Edit builder-tutorial-animation.tsx line ~75"
echo "   - Button position: Edit ShowTutorialButton component"
echo "   - Tutorial steps: Edit tutorialSteps array"
echo ""
