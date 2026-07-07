const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function splitImage() {
  const inputFile = 'C:/Users/Admin/Downloads/Copilot_20260707_024032.png';
  const outDir = 'public/images';

  const metadata = await sharp(inputFile).metadata();
  console.log(`Original image: ${metadata.width}x${metadata.height}`);

  // Top row (3 columns)
  const topW = Math.floor(1024 / 3);
  const h = 512;

  await sharp(inputFile)
    .extract({ left: 0, top: 0, width: topW, height: h })
    .jpeg({ quality: 85 })
    .toFile(path.join(outDir, 'model_women_red_back.jpg'));
    
  await sharp(inputFile)
    .extract({ left: topW, top: 0, width: topW, height: h })
    .jpeg({ quality: 85 })
    .toFile(path.join(outDir, 'model_women_white_back.jpg'));

  await sharp(inputFile)
    .extract({ left: topW * 2, top: 0, width: 1024 - (topW * 2), height: h })
    .jpeg({ quality: 85 })
    .toFile(path.join(outDir, 'model_women_black_back.jpg'));

  // Bottom row (2 columns)
  const botW = 512;

  await sharp(inputFile)
    .extract({ left: 0, top: h, width: botW, height: h })
    .jpeg({ quality: 85 })
    .toFile(path.join(outDir, 'model_women_cream_back.jpg'));

  await sharp(inputFile)
    .extract({ left: botW, top: h, width: botW, height: h })
    .jpeg({ quality: 85 })
    .toFile(path.join(outDir, 'model_women_brown_back.jpg'));

  console.log('Images split successfully!');
}

splitImage().catch(console.error);
