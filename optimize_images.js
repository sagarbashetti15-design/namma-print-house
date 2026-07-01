import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const dir = 'public/images';

async function optimizeImages() {
  const files = fs.readdirSync(dir);
  let totalSaved = 0;
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png')) {
      const stat = fs.statSync(filePath);
      const originalSize = stat.size;
      
      // we don't want to optimize small files (under 100KB) just in case
      if (originalSize < 100 * 1024) continue;
      
      const tempPath = filePath + '.tmp';
      try {
        let image = sharp(filePath);
        const metadata = await image.metadata();
        
        // Resize if width is greater than 1200
        if (metadata.width > 1200) {
          image = image.resize({ width: 1200, withoutEnlargement: true });
        }
        
        // Optimize format
        if (file.endsWith('.png')) {
          await image.png({ quality: 80, compressionLevel: 8 }).toFile(tempPath);
        } else {
          await image.jpeg({ quality: 80, mozjpeg: true }).toFile(tempPath);
        }
        
        const newStat = fs.statSync(tempPath);
        if (newStat.size < originalSize) {
          fs.renameSync(tempPath, filePath);
          const saved = originalSize - newStat.size;
          totalSaved += saved;
          console.log(`Optimized ${file}: Saved ${(saved / 1024).toFixed(1)} KB`);
        } else {
          fs.unlinkSync(tempPath);
          console.log(`Skipped ${file} (no size improvement)`);
        }
      } catch (err) {
        console.error(`Error processing ${file}:`, err);
        if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
      }
    }
  }
  
  console.log(`\nTotal space saved: ${(totalSaved / 1024 / 1024).toFixed(2)} MB`);
}

optimizeImages();
