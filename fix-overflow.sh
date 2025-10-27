#!/bin/bash

# Templates that are failing
TEMPLATES=(
  "components/templates/blog-pages/tech-blog-template.tsx"
  "components/templates/minimalist/minimalist-template.tsx"
  "components/templates/bold-typography/bold-typography-template.tsx"
  "components/templates/bento-grid/bento-grid-template.tsx"
  "components/templates/neo-brutalist/neo-brutalist-template.tsx"
  "components/templates/product-pages/premium-product-template.tsx"
  "components/templates/product-pages/agency-service-template.tsx"
  "components/templates/product-pages/b2b-service-template.tsx"
  "components/templates/product-pages/community-service-template.tsx"
  "components/templates/product-pages/consulting-service-template.tsx"
  "components/templates/product-pages/enterprise-service-template.tsx"
)

for template in "${TEMPLATES[@]}"; do
  echo "Fixing: $template"
  
  # Add overflow-x-hidden to the outermost div
  # Find the first div with className and add overflow-x-hidden
  sed -i.bak 's/<div className="min-h-screen/<div className="min-h-screen overflow-x-hidden max-w-full/g' "$template"
  
  # Also change container mx-auto to add max-w-full
  sed -i.bak2 's/container mx-auto px-4/container mx-auto px-3 max-w-full/g' "$template"
  
  echo "  ✓ Added overflow-x-hidden and max-w-full"
done

echo "Done!"
