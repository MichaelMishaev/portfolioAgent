#!/bin/bash

# ========================================
# ENHANCED MOBILE FIXES - Phase 2
# ========================================
# Fixes remaining mobile issues:
# 1. Text overflow (add break-words)
# 2. Button stacking (flex-col on mobile)

set -e

echo "🔧 Starting Enhanced Mobile Fixes - Phase 2..."
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

TEMPLATES_DIR="components/templates"
BACKUP_DIR="mobile-fix-backups-phase2"
FIXED_COUNT=0

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Templates with text overflow issues
TEXT_OVERFLOW_TEMPLATES=(
  "minimalist"
  "bento-grid"
  "fullscreen-immersive"
  "neo-brutalist"
  "y2k-retro"
  "blog-personal"
)

# Templates with button stacking issues
BUTTON_STACK_TEMPLATES=(
  "bold-typography"
  "bento-grid"
  "grid-masonry"
  "product-tech"
  "product-physical"
  "product-audio"
  "product-vacuum"
  "product-fashion"
  "service-dfyou"
  "blog-personal"
  "blog-tech"
  "blog-magazine"
)

echo "${BLUE}Phase 1: Fixing Text Overflow Issues${NC}"
echo ""

for TEMPLATE in "${TEXT_OVERFLOW_TEMPLATES[@]}"; do
    FILE="$TEMPLATES_DIR/$TEMPLATE/$TEMPLATE-template.tsx"

    if [ ! -f "$FILE" ]; then
        echo "${YELLOW}⚠️  Skipping $TEMPLATE - file not found${NC}"
        continue
    fi

    echo "${YELLOW}Processing: $TEMPLATE${NC}"

    # Create backup
    BACKUP_FILE="$BACKUP_DIR/$(basename "$FILE").bak-$(date +%s)"
    cp "$FILE" "$BACKUP_FILE"

    CHANGES_MADE=false

    # Add break-words to large headings (text-4xl and larger)
    if grep -qE 'className="[^"]*text-(4xl|5xl|6xl|7xl|8xl|9xl)' "$FILE"; then
        # Add break-words to h1 headings
        if grep -qE '<h1 className="[^"]*text-(4xl|5xl|6xl|7xl|8xl|9xl)[^"]*"' "$FILE"; then
            sed -i '' -E 's/<h1 className="([^"]*)(text-(4xl|5xl|6xl|7xl|8xl|9xl)[^"]*)">/<h1 className="\1\2 break-words">/' "$FILE"
            echo "  ✓ Added break-words to h1 headings"
            CHANGES_MADE=true
        fi

        # Add break-words to h2 headings
        if grep -qE '<h2 className="[^"]*text-(4xl|5xl|6xl|7xl|8xl|9xl)[^"]*"' "$FILE"; then
            sed -i '' -E 's/<h2 className="([^"]*)(text-(4xl|5xl|6xl|7xl|8xl|9xl)[^"]*)">/<h2 className="\1\2 break-words">/' "$FILE"
            echo "  ✓ Added break-words to h2 headings"
            CHANGES_MADE=true
        fi

        # Add break-words to large paragraphs
        if grep -qE '<p className="[^"]*text-(4xl|5xl|6xl)[^"]*"' "$FILE"; then
            sed -i '' -E 's/<p className="([^"]*)(text-(4xl|5xl|6xl)[^"]*)">/<p className="\1\2 break-words">/' "$FILE"
            echo "  ✓ Added break-words to large paragraphs"
            CHANGES_MADE=true
        fi
    fi

    # Add word-break and overflow-wrap for safety
    if grep -qE 'className="text-\[clamp' "$FILE"; then
        sed -i '' 's/className="text-\[clamp/className="break-words text-[clamp/' "$FILE"
        echo "  ✓ Added break-words to clamp() text"
        CHANGES_MADE=true
    fi

    if [ "$CHANGES_MADE" = true ]; then
        echo "${GREEN}  ✅ $TEMPLATE fixed (text overflow)${NC}"
        ((FIXED_COUNT++))
    else
        echo "  ℹ️  No changes needed"
        rm "$BACKUP_FILE"
    fi

    echo ""
done

echo ""
echo "${BLUE}Phase 2: Fixing Button Stacking Issues${NC}"
echo ""

for TEMPLATE in "${BUTTON_STACK_TEMPLATES[@]}"; do
    FILE="$TEMPLATES_DIR/$TEMPLATE/$TEMPLATE-template.tsx"

    if [ ! -f "$FILE" ]; then
        echo "${YELLOW}⚠️  Skipping $TEMPLATE - file not found${NC}"
        continue
    fi

    echo "${YELLOW}Processing: $TEMPLATE${NC}"

    # Create backup if not already backed up
    BACKUP_FILE="$BACKUP_DIR/$(basename "$FILE").bak-$(date +%s)"
    cp "$FILE" "$BACKUP_FILE"

    CHANGES_MADE=false

    # Fix button containers: flex gap-X → flex flex-col sm:flex-row gap-X
    # Pattern 1: <div className="flex gap-X">
    if grep -qE '<div className="flex gap-[0-9]+">' "$FILE"; then
        sed -i '' -E 's/<div className="flex gap-([0-9]+)">/<div className="flex flex-col sm:flex-row gap-\1">/g' "$FILE"
        echo "  ✓ Fixed button containers (pattern 1)"
        CHANGES_MADE=true
    fi

    # Pattern 2: className="flex gap-X" (anywhere)
    if grep -qE 'className="flex gap-[0-9]+"' "$FILE"; then
        sed -i '' -E 's/className="flex gap-([0-9]+)"/className="flex flex-col sm:flex-row gap-\1"/g' "$FILE"
        echo "  ✓ Fixed flex containers (pattern 2)"
        CHANGES_MADE=true
    fi

    # Pattern 3: Button groups in flex containers with "items-center"
    if grep -qE 'className="flex items-center gap-[0-9]+"' "$FILE"; then
        sed -i '' -E 's/className="flex items-center gap-([0-9]+)"/className="flex flex-col sm:flex-row sm:items-center gap-\1"/g' "$FILE"
        echo "  ✓ Fixed flex containers with items-center"
        CHANGES_MADE=true
    fi

    # Pattern 4: Flex containers in contact sections with Button children
    # Look for sections that likely contain buttons
    if grep -q "FiMail\|FiGithub\|FiLinkedin\|Button" "$FILE"; then
        # Fix flex containers that likely contain buttons
        sed -i '' -E 's/className="flex (items-start|items-end|justify-between) gap-/className="flex flex-col sm:flex-row \1 gap-/g' "$FILE"

        # Also fix nested button groups
        sed -i '' 's/className="flex gap-4">/className="flex flex-col sm:flex-row gap-4">/g' "$FILE"

        echo "  ✓ Fixed button group containers"
        CHANGES_MADE=true
    fi

    if [ "$CHANGES_MADE" = true ]; then
        echo "${GREEN}  ✅ $TEMPLATE fixed (button stacking)${NC}"
        ((FIXED_COUNT++))
    else
        echo "  ℹ️  No changes needed"
        rm "$BACKUP_FILE"
    fi

    echo ""
done

echo ""
echo "${GREEN}========================================${NC}"
echo "${GREEN}✅ Enhanced Mobile Fixes - Phase 2 Complete${NC}"
echo "${GREEN}========================================${NC}"
echo "Templates processed: $FIXED_COUNT"
echo "Backups saved in: $BACKUP_DIR/"
echo ""
echo "Next steps:"
echo "1. Run: npx tsx test-mobile-responsive.ts"
echo "2. Check for remaining warnings"
echo ""
