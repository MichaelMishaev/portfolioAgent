import https from 'https';
import fs from 'fs';
import path from 'path';

// Templates that currently show error screenshots in gallery
// We'll replace them with proper thematic Unsplash images
const TEMPLATES_NEEDING_NEW_COVERS = {
  'blog-personal': 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=675&fit=crop&q=80',
  'blog-magazine': 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&h=675&fit=crop&q=80',
  'blog-tech': 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=675&fit=crop&q=80',
  'blog-archetypes-minimal': 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&h=675&fit=crop&q=80',
  'blog-archetypes-editorial': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=675&fit=crop&q=80',
};

async function downloadImage(url: string, filepath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // Delete existing file first
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
      console.log(`  🗑️  Deleted old: ${path.basename(filepath)}`);
    }

    const file = fs.createWriteStream(filepath);

    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      } else {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

async function replaceErrorPreviews() {
  const previewsDir = path.join(process.cwd(), 'public', 'previews');

  console.log('🔄 Replacing Error Preview Images\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  let successCount = 0;
  let failCount = 0;

  for (const [templateId, imageUrl] of Object.entries(TEMPLATES_NEEDING_NEW_COVERS)) {
    const outputPath = path.join(previewsDir, `${templateId}.png`);

    try {
      console.log(`📥 Replacing: ${templateId}...`);
      await downloadImage(imageUrl, outputPath);

      const stats = fs.statSync(outputPath);
      const sizeKB = (stats.size / 1024).toFixed(1);
      console.log(`✅ Replaced: ${templateId}.png (${sizeKB} KB)\n`);
      successCount++;

      // Add delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 300));
    } catch (error) {
      console.error(`❌ Failed: ${templateId} - ${error}\n`);
      failCount++;
    }
  }

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`\n📊 Summary:`);
  console.log(`   ✅ Replaced: ${successCount}`);
  console.log(`   ❌ Failed: ${failCount}`);
  console.log(`   📁 Total: ${Object.keys(TEMPLATES_NEEDING_NEW_COVERS).length}`);

  if (failCount === 0) {
    console.log('\n🎉 All error preview images replaced with proper images!');
    console.log('\n💡 Refresh your browser to see the new preview images in the gallery.');
  }
}

replaceErrorPreviews().catch(console.error);
