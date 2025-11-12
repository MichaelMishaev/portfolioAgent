const fs = require('fs');
const path = require('path');

// Templates that already have translations in template-translations.json
const templatesWithTranslations = [
  {
    id: 'service-agency',
    file: 'components/templates/product-pages/agency-service-template.tsx',
    dataVar: 'serviceData',
    translationKey: 'serviceAgency'
  },
  {
    id: 'service-b2b',
    file: 'components/templates/product-pages/b2b-service-template.tsx',
    dataVar: 'serviceData',
    translationKey: 'serviceB2b'
  },
  {
    id: 'service-community',
    file: 'components/templates/product-pages/community-service-template.tsx',
    dataVar: 'serviceData',
    translationKey: 'serviceCommunity'
  },
  {
    id: 'service-consulting',
    file: 'components/templates/product-pages/consulting-service-template.tsx',
    dataVar: 'consultingData',
    translationKey: 'serviceConsulting'
  },
  {
    id: 'service-dfyou',
    file: 'components/templates/product-pages/dfyou-service-template.tsx',
    dataVar: 'serviceData',
    translationKey: 'serviceDfyou'
  },
  {
    id: 'service-enterprise',
    file: 'components/templates/product-pages/enterprise-service-template.tsx',
    dataVar: 'serviceData',
    translationKey: 'serviceEnterprise'
  }
];

console.log('🔧 Batch fixing i18n for templates with existing translations...\n');

templatesWithTranslations.forEach(template => {
  console.log(`Processing: ${template.id}`);

  try {
    const filePath = path.join(process.cwd(), template.file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Check if useI18n is already imported
    const hasI18nImport = content.includes('import { useI18n }');

    if (!hasI18nImport) {
      // Add import after other imports
      const importLine = 'import { useI18n } from "@/lib/i18n-context";';

      // Find the last import statement
      const importRegex = /import .+ from .+;/g;
      const imports = content.match(importRegex);
      if (imports && imports.length > 0) {
        const lastImport = imports[imports.length - 1];
        content = content.replace(lastImport, `${lastImport}\n${importLine}`);
        console.log(`  ✅ Added useI18n import`);
      }
    } else {
      console.log(`  ⏭️  useI18n already imported`);
    }

    // Check if the hook is used in the component
    const hookPattern = new RegExp(`const\\s+{\\s*tt\\s*}\\s*=\\s*useI18n\\(\\);`, 'g');
    const hasHook = hookPattern.test(content);

    if (!hasHook) {
      // Find the function component declaration
      const componentPattern = /export function \w+\([^)]*\) {/;
      const match = content.match(componentPattern);

      if (match) {
        const componentStart = match[0];
        // Add hooks after component start and any existing useState calls
        const hooksToAdd = `
  const { tt } = useI18n();
  const data = tt?.${template.translationKey} || {};`;

        // Find where to insert (after last useState or at component start)
        const useStatePattern = /const \[.+\] = useState.+;/g;
        const useStateMatches = [...content.matchAll(useStatePattern)];

        if (useStateMatches.length > 0) {
          const lastUseState = useStateMatches[useStateMatches.length - 1];
          const insertPos = lastUseState.index + lastUseState[0].length;
          content = content.slice(0, insertPos) + hooksToAdd + content.slice(insertPos);
        } else {
          content = content.replace(componentStart, componentStart + hooksToAdd);
        }

        console.log(`  ✅ Added useI18n hook`);
      }
    } else {
      console.log(`  ⏭️  useI18n hook already present`);
    }

    // Replace dataVar references with data (but keep fallback to original)
    // This regex finds {serviceData.something} and replaces with {data.something || serviceData.something}
    const dataRefRegex = new RegExp(`{${template.dataVar}\\.(\\w+(?:\\.\\w+)*)}`, 'g');
    let replacements = 0;

    content = content.replace(dataRefRegex, (match, path) => {
      replacements++;
      return `{data.${path} || ${template.dataVar}.${path}}`;
    });

    if (replacements > 0) {
      console.log(`  ✅ Replaced ${replacements} data references`);
    }

    // Write back
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`  ✅ File updated successfully\n`);

  } catch (error) {
    console.log(`  ❌ Error: ${error.message}\n`);
  }
});

console.log('✅ Batch processing complete!');
