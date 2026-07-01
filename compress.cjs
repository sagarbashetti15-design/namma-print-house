const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const dir = path.join(__dirname, 'public', 'images');

async function processImages() {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat.size > 200 * 1024) { // > 200KB
        console.log(`Compressing ${file} (${(stat.size / 1024).toFixed(2)} KB)`);
        const tempPath = path.join(dir, `temp_${file}`);
        
        try {
          await sharp(filePath)
            .resize({ width: 600, withoutEnlargement: true }) // Resize to max 600px width
            .toFile(tempPath);
          
          fs.renameSync(tempPath, filePath);
          const newStat = fs.statSync(filePath);
          console.log(` -> reduced to ${(newStat.size / 1024).toFixed(2)} KB`);
        } catch (e) {
          console.error(`Error processing ${file}:`, e);
          if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
        }
      }
    }
  }
}

processImages();
