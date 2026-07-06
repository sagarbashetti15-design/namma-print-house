const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '../public/images');
const files = fs.readdirSync(imagesDir).filter(f => f.endsWith('.jpg') || f.endsWith('.jpeg'));

const SIZE_THRESHOLD_KB = 200; // Only compress images larger than 200KB

async function compressImages() {
  console.log(`Found ${files.length} JPG images. Compressing those over ${SIZE_THRESHOLD_KB}KB...\n`);
  let totalSaved = 0;

  for (const file of files) {
    const filePath = path.join(imagesDir, file);
    const stats = fs.statSync(filePath);
    const sizeKB = stats.size / 1024;

    if (sizeKB > SIZE_THRESHOLD_KB) {
      const originalSize = stats.size;
      const tempPath = filePath + '.tmp';

      try {
        // Get image dimensions first
        const metadata = await sharp(filePath).metadata();
        
        // For very large images, also resize them to max 1200px wide
        let pipeline = sharp(filePath);
        if (metadata.width > 1200) {
          pipeline = pipeline.resize(1200, null, { withoutEnlargement: true });
        }

        await pipeline
          .jpeg({ quality: 75, progressive: true, mozjpeg: true })
          .toFile(tempPath);

        const newSize = fs.statSync(tempPath).size;
        const savedKB = Math.round((originalSize - newSize) / 1024);
        totalSaved += (originalSize - newSize);

        // Replace original with compressed version
        fs.unlinkSync(filePath);
        fs.renameSync(tempPath, filePath);

        console.log(`✅ ${file}: ${Math.round(sizeKB)}KB → ${Math.round(newSize/1024)}KB (saved ${savedKB}KB)`);
      } catch (err) {
        console.error(`❌ Error compressing ${file}:`, err.message);
        if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
      }
    } else {
      console.log(`⏭️  ${file}: ${Math.round(sizeKB)}KB (already small, skipping)`);
    }
  }

  console.log(`\n🎉 Done! Total space saved: ${Math.round(totalSaved/1024)}KB`);
}

compressImages();
