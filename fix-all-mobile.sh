#!/bin/bash

# ========================================
# MOBILE-FIRST RESPONSIVENESS AUTOMATION
# ========================================
# This script fixes common mobile responsiveness issues
# across all portfolio templates at 346px viewport

set -e

echo "🔧 Starting Mobile-First Responsiveness Automation..."
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

TEMPLATES_DIR="components/templates"
BACKUP_DIR="mobile-fix-backups"
FIXED_COUNT=0

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Find all template files
TEMPLATE_FILES=$(find "$TEMPLATES_DIR" -name "*-template.tsx" -type f)

echo "${BLUE}Found $(echo "$TEMPLATE_FILES" | wc -l | tr -d ' ') template files${NC}"
echo ""

for FILE in $TEMPLATE_FILES; do
    TEMPLATE_NAME=$(basename "$FILE" | sed 's/-template\.tsx//')

    echo "${YELLOW}Processing: $TEMPLATE_NAME${NC}"

    # Create backup
    BACKUP_FILE="$BACKUP_DIR/$(basename "$FILE").bak-$(date +%s)"
    cp "$FILE" "$BACKUP_FILE"

    # Track if any changes were made
    CHANGES_MADE=false

    # ========================================
    # FIX 1: Add overflow-x-hidden to root div
    # ========================================
    if grep -q 'className="min-h-screen' "$FILE"; then
        if ! grep -q 'overflow-x-hidden max-w-full' "$FILE"; then
            sed -i '' 's/className="min-h-screen/className="min-h-screen overflow-x-hidden max-w-full/g' "$FILE"
            echo "  ✓ Added overflow-x-hidden to root div"
            CHANGES_MADE=true
        fi
    fi

    # ========================================
    # FIX 2: Reduce padding (px-6, px-5, px-4 → px-3)
    # ========================================
    if grep -qE '(px-6|px-5|px-4)' "$FILE"; then
        sed -i '' 's/px-6/px-3/g' "$FILE"
        sed -i '' 's/px-5/px-3/g' "$FILE"
        sed -i '' 's/px-4/px-3/g' "$FILE"
        echo "  ✓ Reduced padding to px-3"
        CHANGES_MADE=true
    fi

    # ========================================
    # FIX 3: Remove max-width constraints
    # ========================================
    if grep -qE 'max-w-(xl|2xl|3xl|4xl|5xl|6xl|7xl)' "$FILE"; then
        sed -i '' 's/max-w-xl/max-w-full/g' "$FILE"
        sed -i '' 's/max-w-2xl/max-w-full/g' "$FILE"
        sed -i '' 's/max-w-3xl/max-w-full/g' "$FILE"
        sed -i '' 's/max-w-4xl/max-w-full/g' "$FILE"
        sed -i '' 's/max-w-5xl/max-w-full/g' "$FILE"
        sed -i '' 's/max-w-6xl/max-w-full/g' "$FILE"
        sed -i '' 's/max-w-7xl/max-w-full/g' "$FILE"
        echo "  ✓ Changed max-w-* to max-w-full"
        CHANGES_MADE=true
    fi

    # ========================================
    # FIX 4: Fix grids to start at 1 column
    # ========================================
    if grep -qE 'grid md:grid-cols-[2-9]' "$FILE"; then
        sed -i '' 's/grid md:grid-cols-2/grid grid-cols-1 md:grid-cols-2/g' "$FILE"
        sed -i '' 's/grid md:grid-cols-3/grid grid-cols-1 md:grid-cols-3/g' "$FILE"
        sed -i '' 's/grid md:grid-cols-4/grid grid-cols-1 md:grid-cols-4/g' "$FILE"
        sed -i '' 's/grid lg:grid-cols-2/grid grid-cols-1 lg:grid-cols-2/g' "$FILE"
        sed -i '' 's/grid lg:grid-cols-3/grid grid-cols-1 lg:grid-cols-3/g' "$FILE"
        sed -i '' 's/grid lg:grid-cols-4/grid grid-cols-1 lg:grid-cols-4/g' "$FILE"
        echo "  ✓ Fixed grids to start at 1 column"
        CHANGES_MADE=true
    fi

    # Fix grids that skip mobile (grid-cols-2, grid-cols-3, etc.)
    if grep -qE 'grid grid-cols-[2-9]' "$FILE"; then
        sed -i '' 's/grid grid-cols-2/grid grid-cols-1 sm:grid-cols-2/g' "$FILE"
        sed -i '' 's/grid grid-cols-3/grid grid-cols-1 sm:grid-cols-3/g' "$FILE"
        sed -i '' 's/grid grid-cols-4/grid grid-cols-1 sm:grid-cols-4/g' "$FILE"
        echo "  ✓ Fixed grid-cols-* to grid-cols-1"
        CHANGES_MADE=true
    fi

    # ========================================
    # FIX 5: Add max-w-full to container mx-auto
    # ========================================
    if grep -q 'container mx-auto' "$FILE"; then
        if ! grep -q 'container mx-auto px-3 max-w-full' "$FILE"; then
            sed -i '' 's/container mx-auto px-3"/container mx-auto px-3 max-w-full"/g' "$FILE"
            sed -i '' 's/container mx-auto px-2"/container mx-auto px-2 max-w-full"/g' "$FILE"
            echo "  ✓ Added max-w-full to containers"
            CHANGES_MADE=true
        fi
    fi

    # ========================================
    # FIX 6: Fix button containers to stack
    # ========================================
    # This is harder to automate safely, so we'll skip it for now

    if [ "$CHANGES_MADE" = true ]; then
        echo "${GREEN}  ✅ $TEMPLATE_NAME fixed${NC}"
        ((FIXED_COUNT++))
    else
        echo "  ℹ️  No changes needed"
        # Remove backup if no changes
        rm "$BACKUP_FILE"
    fi

    echo ""
done

echo ""
echo "${GREEN}========================================${NC}"
echo "${GREEN}✅ Mobile-First Automation Complete${NC}"
echo "${GREEN}========================================${NC}"
echo "Templates fixed: $FIXED_COUNT"
echo "Backups saved in: $BACKUP_DIR/"
echo ""
echo "Next steps:"
echo "1. Run: npx tsx test-mobile-responsive.ts"
echo "2. Check results in mobile-test-report.json"
echo "3. Review screenshots in mobile-test-screenshots/"
echo ""
