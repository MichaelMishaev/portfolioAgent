#!/usr/bin/env python3
"""
Fix hoisting issues in split-screen-components.tsx
Moves Settings component definitions before .craft assignments
"""

import re

file_path = "/Users/michaelmishayev/Desktop/Projects/portfolioWeb/components/builder/split-screen-components.tsx"

with open(file_path, 'r') as f:
    content = f.read()

# Pattern to find: Component.craft = { ... settings: SettingsComponent } followed by export const SettingsComponent = () => {...}
# We need to move the Settings component definition BEFORE the .craft assignment

# Fix Stats
stats_craft_pattern = r'(SplitScreenStats\.craft = \{[^}]+related: \{[^}]+settings: SplitScreenStatsSettings,[^}]+\},[^}]+\};)\n\n(export const SplitScreenStatsSettings = \(\) => \{[\s\S]+?\n\};)'
stats_match = re.search(stats_craft_pattern, content)
if stats_match:
    # Move settings before craft
    settings_def = stats_match.group(2).replace('export const', 'const')  # Remove export
    craft_def = stats_match.group(1)
    replacement = f"{settings_def}\n\n// Assign .craft config AFTER Settings component is defined\n{craft_def}"
    content = content.replace(stats_match.group(0), replacement)
    print("✅ Fixed SplitScreenStats hoisting")
else:
    print("❌ Could not find SplitScreenStats pattern")

# Fix Skills
skills_craft_pattern = r'(SplitScreenSkills\.craft = \{[^}]+related: \{[^}]+settings: SplitScreenSkillsSettings,[^}]+\},[^}]+\};)\n\n(export const SplitScreenSkillsSettings = \(\) => \{[\s\S]+?\n\};)'
skills_match = re.search(skills_craft_pattern, content)
if skills_match:
    settings_def = skills_match.group(2).replace('export const', 'const')
    craft_def = skills_match.group(1)
    replacement = f"{settings_def}\n\n// Assign .craft config AFTER Settings component is defined\n{craft_def}"
    content = content.replace(skills_match.group(0), replacement)
    print("✅ Fixed SplitScreenSkills hoisting")
else:
    print("❌ Could not find SplitScreenSkills pattern")

# Fix Contact
contact_craft_pattern = r'(SplitScreenContact\.craft = \{[^}]+related: \{[^}]+settings: SplitScreenContactSettings,[^}]+\},[^}]+\};)\n\n(export const SplitScreenContactSettings = \(\) => \{[\s\S]+?\n\};)'
contact_match = re.search(contact_craft_pattern, content)
if contact_match:
    settings_def = contact_match.group(2).replace('export const', 'const')
    craft_def = contact_match.group(1)
    replacement = f"{settings_def}\n\n// Assign .craft config AFTER Settings component is defined\n{craft_def}"
    content = content.replace(contact_match.group(0), replacement)
    print("✅ Fixed SplitScreenContact hoisting")
else:
    print("❌ Could not find SplitScreenContact pattern")

# Write back
with open(file_path, 'w') as f:
    f.write(content)

print("\n✅ All hoisting issues fixed!")
