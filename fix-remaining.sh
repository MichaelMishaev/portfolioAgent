#!/bin/bash
# Fix Skills and Contact hoisting issues

FILE="components/builder/split-screen-components.tsx"

# Create backup
cp "$FILE" "${FILE}.backup2"

# For Skills - find the .craft assignment line and the Settings definition line
# Then reorganize them

# For Contact - same thing

# Use perl for multi-line regex (more reliable than sed)
perl -i -0pe '
# Fix Skills
s/(SplitScreenSkills\.craft = \{[^\}]+related: \{[^\}]+settings: SplitScreenSkillsSettings,[^\}]+\},[^\}]+\};)\n\nexport const SplitScreenSkillsSettings/const SplitScreenSkillsSettings/g;

# Fix Contact
s/(SplitScreenContact\.craft = \{[^\}]+related: \{[^\}]+settings: SplitScreenContactSettings,[^\}]+\},[^\}]+\};)\n\nexport const SplitScreenContactSettings/const SplitScreenContactSettings/g;
' "$FILE"

echo "Skills and Contact Settings definitions moved"

# Now we need to add the .craft assignments back after the Settings definitions
# This is complex - let me just output line numbers to help debug

echo "Checking Skills patterns:"
grep -n "SplitScreenSkills" "$FILE" | head -5

echo "Checking Contact patterns:"
grep -n "SplitScreenContact" "$FILE" | head -5
