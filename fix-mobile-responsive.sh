#!/bin/bash

# Fix Mobile Responsive Issues in Builder
# 1. Fix scroll issue: h-screen -> min-h-screen
# 2. Fix overflow: overflow-hidden -> relative min-h-0
# 3. Improve text visibility: Larger fonts on mobile

FILE="components/builder/craftjs-template-builder.tsx"

echo "Fixing mobile responsive issues in $FILE..."

# Fix 1: Change h-screen to min-h-screen
sed -i '' 's/<div className="h-screen flex flex-col">/<div className="min-h-screen flex flex-col">/g' "$FILE"

# Fix 2: Fix overflow issue
sed -i '' 's/className="flex-1 flex overflow-hidden relative"/className="flex-1 flex relative min-h-0"/g' "$FILE"

# Fix 3: Improve component button text visibility
# Update Hero button text
sed -i '' 's/className="font-semibold text-sm flex items-center gap-2">/className="font-semibold text-base md:text-sm flex items-center gap-2">/g' "$FILE"
sed -i '' 's/<span className="text-purple-600">✨<\/span>/<span className="text-purple-600 text-xl">✨<\/span>/g' "$FILE"
sed -i '' 's/className="text-xs text-gray-600 mt-1">/className="text-sm md:text-xs text-gray-700 mt-1 font-medium">/g' "$FILE"
sed -i '' 's/className="text-xs text-gray-500 mt-1">/className="text-sm md:text-xs text-gray-700 mt-1 font-medium">/g' "$FILE"

# Update all component button titles
sed -i '' 's/<div className="font-semibold text-sm">/<div className="font-semibold text-base md:text-sm">/g' "$FILE"

echo "✅ Fixed mobile responsive issues!"
echo ""
echo "Changes made:"
echo "1. ✅ Changed h-screen to min-h-screen (allows scrolling)"
echo "2. ✅ Fixed overflow-hidden issue (enables scroll on mobile)"
echo "3. ✅ Increased component text size on mobile (14px -> 16px)"
echo "4. ✅ Improved text contrast (gray-600 -> gray-700)"
echo "5. ✅ Larger emoji icons (default -> text-xl)"
echo ""
echo "Please test on mobile device at http://localhost:3500/templates/{id}/builder"
