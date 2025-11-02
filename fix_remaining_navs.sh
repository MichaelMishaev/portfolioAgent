#!/bin/bash

FILES=(
  "components/templates/product-pages/b2b-service-template.tsx"
  "components/templates/product-pages/community-service-template.tsx"
  "components/templates/product-pages/consulting-service-template.tsx"
  "components/templates/product-pages/dfyou-service-template.tsx"
  "components/templates/product-pages/enterprise-service-template.tsx"
  "components/templates/product-pages/fashion-product-template.tsx"
  "components/templates/product-pages/luxury-product-template.tsx"
  "components/templates/product-pages/premium-product-template.tsx"
)

for FILE in "${FILES[@]}"; do
  echo "Processing $FILE..."
  
  # Use a more sophisticated approach with perl for multi-line replacements
  perl -i -0777 -pe '
    # Add mobile menu state if not present
    s/(export function \w+\(\) \{\n)(?!.*const \[mobileMenuOpen)/$1  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);\n\n/s;
    
    # Fix navigation structure (pattern 1: with container and flex together)
    s/<nav className="([^"]*)">\s*<div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">\s*(<Link[^>]*>.*?<\/Link>)\s*<div className="flex items-center gap-\d+">(.*?)<\/div>\s*<\/div>\s*<\/nav>/<nav className="$1">\n        <div className="container mx-auto px-4 sm:px-6 py-4">\n          <div className="flex items-center justify-between">\n            $2\n\n            {\/\* Desktop Navigation \*\/}\n            <div className="hidden md:flex items-center gap-6">$3<\/div>\n\n            {\/\* Mobile Menu Button \*\/}\n            <button\n              className="md:hidden p-2 text-foreground hover:text-primary transition-colors"\n              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}\n              aria-label="Toggle menu"\n            >\n              {mobileMenuOpen ? <FiX size={24} \/> : <FiMenu size={24} \/>}\n            <\/button>\n          <\/div>\n        <\/div>\n\n        {\/\* Mobile Menu \*\/}\n        {mobileMenuOpen && (\n          <div className="md:hidden bg-background\/95 backdrop-blur-sm border-t">\n            <div className="container mx-auto px-4 sm:px-6 py-4 flex flex-col gap-4">\n              MOBILE_LINKS_PLACEHOLDER\n            <\/div>\n          <\/div>\n        )}\n      <\/nav>/sg;
  ' "$FILE"
  
  echo "Fixed $FILE"
done

echo "Done!"
