#!/bin/bash

# ========================================
# ADD HAMBURGER MENUS TO TEMPLATES
# ========================================
# This script adds mobile hamburger menu functionality
# to templates that are missing it

set -e

echo "🍔 Adding Hamburger Menus to Templates..."
echo ""

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

BACKUP_DIR="hamburger-menu-backups"
FIXED_COUNT=0

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Templates missing hamburger menus
TEMPLATES=(
  "components/templates/3d-immersive/3d-immersive-template.tsx"
  "components/templates/ar-spatial/ar-spatial-template.tsx"
  "components/templates/blog-pages/archetypes-editorial-blog-template.tsx"
  "components/templates/blog-pages/archetypes-minimal-blog-template.tsx"
  "components/templates/bento-grid/bento-grid-template.tsx"
  "components/templates/collage-maximalist/collage-maximalist-template.tsx"
  "components/templates/data-dashboard/data-dashboard-template.tsx"
  "components/templates/minimalist/minimalist-template.tsx"
  "components/templates/neo-brutalist/neo-brutalist-template.tsx"
  "components/templates/online-business/online-business-agency-template.tsx"
  "components/templates/online-business/online-business-coach-template.tsx"
  "components/templates/online-business/online-business-course-template.tsx"
  "components/templates/online-business-saas/online-business-saas-template.tsx"
  "components/templates/organic-liquid/organic-liquid-template.tsx"
  "components/templates/blog-pages/personal-blog-template.tsx"
  "components/templates/voice-first/voice-first-template.tsx"
  "components/templates/y2k-retro/y2k-retro-template.tsx"
)

for FILE in "${TEMPLATES[@]}"; do
  if [ ! -f "$FILE" ]; then
    echo "${YELLOW}⚠️  Skipping: $FILE (not found)${NC}"
    continue
  fi

  TEMPLATE_NAME=$(basename "$FILE" | sed 's/-template\.tsx//')
  echo "${YELLOW}Processing: $TEMPLATE_NAME${NC}"

  # Create backup
  BACKUP_FILE="$BACKUP_DIR/$(basename "$FILE").bak-$(date +%s)"
  cp "$FILE" "$BACKUP_FILE"

  CHANGES_MADE=false

  # Step 1: Add FiMenu, FiX to imports if not already there
  if ! grep -q "FiMenu.*FiX\|FiX.*FiMenu" "$FILE"; then
    # Find the react-icons/fi import line and add FiMenu, FiX
    if grep -q 'from "react-icons/fi"' "$FILE"; then
      # Add to existing import
      sed -i '' 's/} from "react-icons\/fi"/, FiMenu, FiX } from "react-icons\/fi"/' "$FILE"
      echo "  ✓ Added FiMenu, FiX to imports"
      CHANGES_MADE=true
    fi
  fi

  # Step 2: Add mobileMenuOpen state if useState is imported but state doesn't exist
  if grep -q 'from "react"' "$FILE" && ! grep -q 'mobileMenuOpen' "$FILE"; then
    # Find the function component line and add state after it
    # Look for: export function ComponentName() {
    # Add:      const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    sed -i '' '/export function.*Template.*{/a\
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
' "$FILE"
    echo "  ✓ Added mobileMenuOpen state"
    CHANGES_MADE=true
  fi

  # Step 3: Add hamburger button to navigation
  # This is complex and template-specific, so we'll use a marker approach
  # We need to find the navigation and add the button

  # Step 4: Add mobile menu panel
  # This is also complex and template-specific

  if [ "$CHANGES_MADE" = true ]; then
    echo "${GREEN}  ✅ $TEMPLATE_NAME updated (imports and state added)${NC}"
    ((FIXED_COUNT++))
  else
    echo "  ℹ️  No changes needed or already has hamburger menu"
    rm "$BACKUP_FILE"
  fi

  echo ""
done

echo ""
echo "${GREEN}========================================${NC}"
echo "${GREEN}✅ Hamburger Menu Addition Complete${NC}"
echo "${GREEN}========================================${NC}"
echo "Templates processed: $FIXED_COUNT"
echo "Backups saved in: $BACKUP_DIR/"
echo ""
echo "⚠️  Note: Templates now have imports and state."
echo "You may need to manually add the hamburger button and mobile menu HTML."
echo ""
