#!/usr/bin/env python3
import re
import os

template_dir = "/Users/michaelmishayev/Desktop/Projects/portfolioWeb/components/templates"

# Templates that need fixing (excluding already fixed ones)
files_to_fix = [
    "dark-mode/dark-mode-template.tsx",
    "split-screen/split-screen-template.tsx",
    "grid-masonry/grid-masonry-template.tsx",
    "card-modular/card-modular-template.tsx",
    "voice-first/voice-first-template.tsx",
    "fullscreen-immersive/fullscreen-immersive-template.tsx",
    "ar-spatial/ar-spatial-template.tsx",
    "neo-brutalist/neo-brutalist-template.tsx",
    "kinetic-typography/kinetic-typography-template.tsx",
    "illustration-focus/illustration-focus-template.tsx",
    "y2k-retro/y2k-retro-template.tsx",
    "collage-maximalist/collage-maximalist-template.tsx",
    "organic-liquid/organic-liquid-template.tsx",
    "text-heavy/text-heavy-template.tsx",
    "blog-pages/magazine-blog-template.tsx",
]

def ensure_imports(content):
    """Ensure useState and mobile icons are imported"""
    # Add useState if not present
    if 'import { useState } from "react";' not in content:
        content = content.replace(
            '"use client";\n\n',
            '"use client";\n\nimport { useState } from "react";\n'
        )

    # Add FiMenu, FiX to react-icons if not present
    if 'from "react-icons/fi"' in content:
        if 'FiMenu' not in content or 'FiX' not in content:
            # Find the react-icons import line
            icon_import_pattern = r'(import \{[^}]*)\} from "react-icons/fi"'
            match = re.search(icon_import_pattern, content)
            if match:
                existing_imports = match.group(1)
                # Add FiMenu and FiX if not present
                if 'FiMenu' not in existing_imports:
                    existing_imports += ', FiMenu'
                if 'FiX' not in existing_imports:
                    existing_imports += ', FiX'
                content = re.sub(icon_import_pattern, existing_imports + ' } from "react-icons/fi"', content)

    return content

def fix_navigation(content, filename):
    """Fix navigation to include mobile menu"""

    # Check if already has mobile menu
    if 'mobileMenuOpen' in content and 'Mobile Menu Button' in content:
        print(f"  ✓ Already has mobile menu")
        return content

    # Find the export function and add state
    function_pattern = r'(export function \w+\([^)]*\) \{)(\s*(?:const \[[^\]]+\] = useState[^;]+;)?)'

    def add_state(match):
        func_start = match.group(1)
        existing_state = match.group(2) if match.group(2) else '\n'

        # Check if mobileMenuOpen already exists
        if 'mobileMenuOpen' in existing_state:
            return match.group(0)

        # Add mobileMenuOpen state
        if 'useState' in existing_state:
            return f'{func_start}{existing_state}  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);\n'
        else:
            return f'{func_start}\n  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);\n'

    content = re.sub(function_pattern, add_state, content, count=1)

    # Find and fix navigation
    # Pattern 1: Simple flex navigation
    nav_pattern_1 = r'(<nav[^>]*>\s*<div className="container mx-auto px-(?:4 sm:px-)?6 py-4)\s+flex\s+items-center\s+justify-between">(.*?)</div>\s*</nav>'

    match = re.search(nav_pattern_1, content, re.DOTALL)
    if match:
        nav_start = match.group(1)
        nav_content = match.group(2)

        # Extract logo/brand and navigation links
        # Try to find the navigation menu
        menu_pattern = r'<div className="flex[^"]*gap-\d+">(.*?)</div>'
        menu_match = re.search(menu_pattern, nav_content, re.DOTALL)

        if not menu_match:
            print(f"  ⚠ Could not find navigation menu pattern")
            return content

        # Split content into before menu and menu
        menu_start_pos = nav_content.find(menu_match.group(0))
        before_menu = nav_content[:menu_start_pos].strip()
        menu_content = menu_match.group(1)

        # Extract links from menu
        link_pattern = r'<a\s+href="([^"]+)"[^>]*>(.*?)</a>'
        button_pattern = r'<Button[^>]*>(.*?)</Button>'

        links = re.findall(link_pattern, menu_content, re.DOTALL)
        button_match = re.search(button_pattern, menu_content)
        button_text = button_match.group(1).strip() if button_match else "Get Started"

        # Build mobile menu links
        mobile_links = []
        for href, text in links:
            text = ' '.join(text.split())
            mobile_links.append(f'''              <a
                href="{href}"
                className="text-sm hover:text-primary transition-colors py-2"
                onClick={{() => setMobileMenuOpen(false)}}
              >
                {text}
              </a>''')

        mobile_links.append(f'''              <Button size="sm" className="w-full" onClick={{() => setMobileMenuOpen(false)}}>
                {button_text}
              </Button>''')

        mobile_menu_content = '\n'.join(mobile_links)

        # Build new navigation
        new_nav = f'''{nav_start}">\n          <div className="flex items-center justify-between">
            {before_menu}

            {{/* Desktop Navigation */}}
            <div className="hidden md:flex items-center gap-6">
{menu_content}
            </div>

            {{/* Mobile Menu Button */}}
            <button
              className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
              onClick={{() => setMobileMenuOpen(!mobileMenuOpen)}}
              aria-label="Toggle menu"
            >
              {{mobileMenuOpen ? <FiX size={{24}} /> : <FiMenu size={{24}} />}}
            </button>
          </div>
        </div>

        {{/* Mobile Menu */}}
        {{mobileMenuOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-sm border-t">
            <div className="container mx-auto px-4 sm:px-6 py-4 flex flex-col gap-4">
{mobile_menu_content}
            </div>
          </div>
        )}}
      </nav>'''

        content = re.sub(nav_pattern_1, new_nav, content, count=1, flags=re.DOTALL)
        print(f"  ✅ Fixed navigation with {len(links)} links")

    return content

def fix_spacing(content):
    """Fix mobile spacing throughout template"""
    # Replace px-6 with px-4 sm:px-6 for container elements
    content = re.sub(
        r'container mx-auto px-6',
        'container mx-auto px-4 sm:px-6',
        content
    )

    # Fix text sizes
    content = re.sub(r'text-5xl md:text-7xl', 'text-4xl sm:text-5xl md:text-7xl', content)
    content = re.sub(r'text-3xl md:text-5xl', 'text-2xl sm:text-3xl md:text-5xl', content)
    content = re.sub(r'text-4xl md:text-6xl', 'text-3xl sm:text-4xl md:text-6xl', content)

    return content

def process_file(filepath):
    filename = os.path.basename(filepath)
    print(f"\nProcessing {filename}...")

    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        # Apply fixes
        content = ensure_imports(content)
        content = fix_navigation(content, filename)
        content = fix_spacing(content)

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

        print(f"  ✅ Successfully processed {filename}")

    except Exception as e:
        print(f"  ❌ Error processing {filename}: {str(e)}")
        import traceback
        traceback.print_exc()

# Process all files
print("Starting fixes for portfolio templates...")
for file_path in files_to_fix:
    full_path = os.path.join(template_dir, file_path)
    if os.path.exists(full_path):
        process_file(full_path)
    else:
        print(f"⚠ File not found: {full_path}")

print("\n✅ All portfolio templates processed!")
