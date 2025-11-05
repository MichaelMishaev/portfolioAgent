#!/usr/bin/env node

const fs = require('fs');

console.log('🔧 Auto-fixing ALL text contrast issues...\n');

const fixes = [
  {
    file: 'components/templates/product-pages/fashion-product-template.tsx',
    line: 542,
    old: '<h3 className="font-semibold mb-2">{item.name}</h3>',
    new: '<h3 className="font-semibold mb-2 text-stone-900">{item.name}</h3>'
  },
  {
    file: 'components/templates/saas-feature-rich/saas-feature-rich-template.tsx',
    line: 287,
    old: '<h4 className="font-semibold mb-4">Product</h4>',
    new: '<h4 className="font-semibold mb-4 text-gray-900 dark:text-white">Product</h4>'
  },
  {
    file: 'components/templates/saas-feature-rich/saas-feature-rich-template.tsx',
    line: 295,
    old: '<h4 className="font-semibold mb-4">Connect</h4>',
    new: '<h4 className="font-semibold mb-4 text-gray-900 dark:text-white">Connect</h4>'
  },
  {
    file: 'components/templates/online-business/online-business-course-template.tsx',
    line: 168,
    old: '<h3 className="font-semibold mb-1">{data.features?.onDemand?.title || "On-Demand Videos"}</h3>',
    new: '<h3 className="font-semibold mb-1 text-gray-900 dark:text-white">{data.features?.onDemand?.title || "On-Demand Videos"}</h3>'
  },
  {
    file: 'components/templates/online-business/online-business-course-template.tsx',
    line: 177,
    old: '<h3 className="font-semibold mb-1">{data.features?.workbooks?.title || "Workbooks & PDFs"}</h3>',
    new: '<h3 className="font-semibold mb-1 text-gray-900 dark:text-white">{data.features?.workbooks?.title || "Workbooks & PDFs"}</h3>'
  },
  {
    file: 'components/templates/online-business/online-business-course-template.tsx',
    line: 186,
    old: '<h3 className="font-semibold mb-1">{data.features?.community?.title || "Private Community"}</h3>',
    new: '<h3 className="font-semibold mb-1 text-gray-900 dark:text-white">{data.features?.community?.title || "Private Community"}</h3>'
  },
  {
    file: 'components/templates/online-business/online-business-course-template.tsx',
    line: 195,
    old: '<h3 className="font-semibold mb-1">{data.features?.certificate?.title || "Certificate"}</h3>',
    new: '<h3 className="font-semibold mb-1 text-gray-900 dark:text-white">{data.features?.certificate?.title || "Certificate"}</h3>'
  },
];

fixes.forEach(fix => {
  try {
    const content = fs.readFileSync(fix.file, 'utf8');
    const newContent = content.replace(fix.old, fix.new);
    fs.writeFileSync(fix.file, newContent);
    console.log(`✅ Fixed: ${fix.file}:${fix.line}`);
  } catch (err) {
    console.log(`❌ Error fixing ${fix.file}: ${err.message}`);
  }
});

console.log('\n✨ Auto-fix complete!');
