const https = require('https');
const fs = require('fs');
const path = require('path');

/**
 * Script to replace low-quality and duplicate images with high-quality AI-generated versions
 * using Ideogram API
 *
 * Issues found:
 * 1. 60+ SVG placeholder files in public/screenshots/ (just blue gradients with text)
 * 2. Duplicate: product-course.png = online-business-course.png (671KB)
 * 3. Large unoptimized PNGs (fullscreen-immersive: 2.1MB, dark-mode: 1.8MB, etc.)
 */

const IDEOGRAM_API_KEY = process.env.IDEOGRAM_API_KEY;

if (!IDEOGRAM_API_KEY) {
  console.error('❌ Error: IDEOGRAM_API_KEY not found in environment variables');
  console.error('Please add it to .env.local file');
  process.exit(1);
}

// Templates that need replacement (SVG placeholders → real screenshots)
const TEMPLATES_NEEDING_SCREENSHOTS = [
  // Priority 1: Popular templates with placeholder SVGs
  { id: 'minimalist', category: 'portfolio', style: 'minimal clean white space' },
  { id: 'card-modular', category: 'portfolio', style: 'card grid layout modern' },
  { id: 'bold-typography', category: 'portfolio', style: 'bold large typography creative' },
  { id: 'split-screen', category: 'portfolio', style: 'split screen dual panel' },
  { id: 'y2k-retro', category: 'portfolio', style: 'Y2K retro vibrant colorful' },
  { id: 'product-fashion', category: 'product', style: 'fashion ecommerce elegant' },
  { id: 'service-agency', category: 'service', style: 'creative agency modern' },
  { id: 'minimal-portfolio-clean', category: 'portfolio', style: 'minimal clean professional' },

  // Priority 2: Duplicate that needs unique version
  { id: 'online-business-course', category: 'business', style: 'online course learning platform modern' },

  // Priority 3: Large files needing optimization (will regenerate at better quality/size ratio)
  { id: 'fullscreen-immersive', category: 'portfolio', style: 'fullscreen immersive hero background' },
  { id: 'dark-mode', category: 'portfolio', style: 'dark mode theme elegant' },
  { id: 'product-fashion', category: 'product', style: 'fashion product showcase elegant' },
  { id: 'organic-liquid', category: 'portfolio', style: 'organic liquid fluid shapes' },
  { id: 'ar-spatial', category: 'portfolio', style: 'AR augmented reality spatial' },
  { id: 'bento-grid', category: 'portfolio', style: 'bento grid layout modular' },
  { id: 'y2k-retro', category: 'portfolio', style: 'Y2K retro 90s aesthetic vibrant' }
];

/**
 * Generate prompt for template screenshot
 */
function generatePrompt(template, screenshotNumber) {
  const basePrompts = {
    1: `A ${template.style} portfolio website mockup on laptop screen, hero section, clean professional UI design, photorealistic rendering, 16:9`,
    2: `A ${template.style} website mockup on laptop display, main content section, project gallery or features, modern web design, photorealistic, 16:9`,
    3: `A ${template.style} website mockup on laptop, about or contact page, professional layout, clean interface, photorealistic rendering, 16:9`
  };

  return basePrompts[screenshotNumber] || basePrompts[1];
}

/**
 * Generate image using Ideogram API
 */
function generateImage(prompt) {
  return new Promise((resolve, reject) => {
    const requestData = JSON.stringify({
      prompt: prompt.replace(/['"]/g, ' '), // Clean special characters
      aspect_ratio: '16x9',
      model: 'V_3',
      magic_prompt_option: 'AUTO',
      style_type: 'REALISTIC',
      rendering_speed: 'TURBO'
    });

    const options = {
      hostname: 'api.ideogram.ai',
      path: '/v1/ideogram-v3/generate',
      method: 'POST',
      headers: {
        'Api-Key': IDEOGRAM_API_KEY,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(requestData)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode !== 200) {
          reject(new Error(`API returned status ${res.statusCode}: ${data}`));
          return;
        }

        try {
          const response = JSON.parse(data);
          if (response.data && response.data[0] && response.data[0].url) {
            resolve(response.data[0].url);
          } else {
            reject(new Error('Invalid API response format'));
          }
        } catch (error) {
          reject(new Error(`Failed to parse API response: ${error.message}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(requestData);
    req.end();
  });
}

/**
 * Download image from URL
 */
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);

    https.get(url, (response) => {
      response.pipe(file);

      file.on('finish', () => {
        file.close();
        resolve(filepath);
      });
    }).on('error', (error) => {
      fs.unlink(filepath, () => {}); // Delete the file if error
      reject(error);
    });
  });
}

/**
 * Process a single template (generate 3 screenshots)
 */
async function processTemplate(template) {
  console.log(`\n📸 Processing template: ${template.id}`);
  console.log(`   Category: ${template.category} | Style: ${template.style}`);

  for (let i = 1; i <= 3; i++) {
    const prompt = generatePrompt(template, i);
    const outputPath = path.join(__dirname, '..', 'public', 'screenshots', `${template.id}-${i}.png`);

    try {
      console.log(`\n   Screenshot ${i}/3:`);
      console.log(`   📝 Prompt: ${prompt.substring(0, 80)}...`);
      console.log(`   🎨 Generating with Ideogram AI...`);

      const imageUrl = await generateImage(prompt);
      console.log(`   ✅ Generated: ${imageUrl.substring(0, 60)}...`);

      console.log(`   💾 Downloading to: ${outputPath}`);
      await downloadImage(imageUrl, outputPath);

      const stats = fs.statSync(outputPath);
      const fileSizeKB = (stats.size / 1024).toFixed(2);
      console.log(`   ✅ Saved: ${fileSizeKB} KB`);

      // Remove old SVG placeholder if it exists
      const oldSvgPath = outputPath.replace('.png', '.svg');
      if (fs.existsSync(oldSvgPath)) {
        fs.unlinkSync(oldSvgPath);
        console.log(`   🗑️  Removed old SVG placeholder`);
      }

      // Rate limiting: wait 2 seconds between requests
      if (i < 3) {
        console.log(`   ⏳ Waiting 2 seconds (rate limiting)...`);
        await new Promise(resolve => setTimeout(resolve, 2000));
      }

    } catch (error) {
      console.error(`   ❌ Error generating screenshot ${i}: ${error.message}`);

      // If rate limited, wait longer and retry once
      if (error.message.includes('429')) {
        console.log(`   ⏳ Rate limited. Waiting 10 seconds before retry...`);
        await new Promise(resolve => setTimeout(resolve, 10000));

        try {
          const imageUrl = await generateImage(prompt);
          await downloadImage(imageUrl, outputPath);
          console.log(`   ✅ Retry successful!`);
        } catch (retryError) {
          console.error(`   ❌ Retry failed: ${retryError.message}`);
        }
      }
    }
  }

  console.log(`\n✅ Completed: ${template.id}`);
  console.log(`   📁 Files: ${template.id}-1.png, ${template.id}-2.png, ${template.id}-3.png`);
}

/**
 * Main execution
 */
async function main() {
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║  Image Quality Improvement Script                          ║');
  console.log('║  Replacing low-quality images with AI-generated versions   ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  console.log(`📊 Templates to process: ${TEMPLATES_NEEDING_SCREENSHOTS.length}`);
  console.log(`📊 Total images to generate: ${TEMPLATES_NEEDING_SCREENSHOTS.length * 3}`);
  console.log(`⏱️  Estimated time: ~${(TEMPLATES_NEEDING_SCREENSHOTS.length * 3 * 4) / 60} minutes\n`);

  const startTime = Date.now();
  let successCount = 0;
  let errorCount = 0;

  for (const template of TEMPLATES_NEEDING_SCREENSHOTS) {
    try {
      await processTemplate(template);
      successCount++;

      // Wait between templates to respect rate limits
      console.log(`\n⏳ Waiting 3 seconds before next template...\n`);
      await new Promise(resolve => setTimeout(resolve, 3000));

    } catch (error) {
      console.error(`\n❌ Failed to process ${template.id}: ${error.message}\n`);
      errorCount++;
    }
  }

  const endTime = Date.now();
  const durationMinutes = ((endTime - startTime) / 1000 / 60).toFixed(2);

  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║  SUMMARY                                                    ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');
  console.log(`✅ Successfully processed: ${successCount} templates`);
  console.log(`❌ Errors: ${errorCount} templates`);
  console.log(`⏱️  Total time: ${durationMinutes} minutes`);
  console.log(`\n📁 Output directory: public/screenshots/`);
  console.log(`\n🎉 Done! Check the generated images in your browser.`);
}

// Run the script
main().catch(error => {
  console.error('\n💥 Fatal error:', error.message);
  process.exit(1);
});
