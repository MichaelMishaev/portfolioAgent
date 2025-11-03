#!/bin/bash

# Add Tutorial Animation to Builder
FILE="components/builder/craftjs-template-builder.tsx"

echo "Integrating Builder Tutorial Animation..."

# Add import at the top (after other imports)
sed -i '' '/import { useI18n } from "@\/lib\/i18n-context";/a\
import { BuilderTutorialAnimation, ShowTutorialButton } from "@/components/builder-tutorial-animation";\
' "$FILE"

# Add state for tutorial at the beginning of CraftJSTemplateBuilder function
sed -i '' '/const \[language, setLanguage\] = useState<'"'"'en'"'"' | '"'"'ru'"'"'>/a\
  const [showTutorial, setShowTutorial] = React.useState(() => {\
    // Show tutorial on first visit\
    if (typeof window !== '"'"'undefined'"'"') {\
      const hasSeenTutorial = localStorage.getItem('"'"'hasSeenBuilderTutorial'"'"');\
      return !hasSeenTutorial;\
    }\
    return false;\
  });\
\
  const handleCloseTutorial = () => {\
    setShowTutorial(false);\
    if (typeof window !== '"'"'undefined'"'"') {\
      localStorage.setItem('"'"'hasSeenBuilderTutorial'"'"', '"'"'true'"'"');\
    }\
  };\
' "$FILE"

echo "✅ Tutorial imports and state added!"
echo ""
echo "Next steps:"
echo "1. Manually add tutorial components to the render:"
echo "   - Add <BuilderTutorialAnimation /> before closing </div>"
echo "   - Add <ShowTutorialButton /> for showing tutorial again"
echo ""
echo "See TUTORIAL_INTEGRATION_GUIDE.md for complete instructions"
