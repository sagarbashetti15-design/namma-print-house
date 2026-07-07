const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function splitImages() {
  const frontInput = 'C:/Users/Admin/.gemini/antigravity/brain/656238a5-f331-4782-9bd9-8a84b94b50b2/media__1783443416074.jpg';
  const backInput = 'C:/Users/Admin/.gemini/antigravity/brain/656238a5-f331-4782-9bd9-8a84b94b50b2/media__1783444335474.jpg';
  const outDir = 'public/images';

  const topW = Math.floor(1024 / 3);
  const h = 512;
  const botW = 512;

  // PROCESS FRONT IMAGES
  console.log('Processing front images...');
  await sharp(frontInput).extract({ left: 0, top: 0, width: topW, height: h }).jpeg({ quality: 85 }).toFile(path.join(outDir, 'model_women_red_front.jpg'));
  await sharp(frontInput).extract({ left: topW, top: 0, width: topW, height: h }).jpeg({ quality: 85 }).toFile(path.join(outDir, 'model_women_white_front.jpg'));
  await sharp(frontInput).extract({ left: topW * 2, top: 0, width: 1024 - (topW * 2), height: h }).jpeg({ quality: 85 }).toFile(path.join(outDir, 'model_women_black_front.jpg'));
  await sharp(frontInput).extract({ left: 0, top: h, width: botW, height: h }).jpeg({ quality: 85 }).toFile(path.join(outDir, 'model_women_cream_front.jpg'));
  await sharp(frontInput).extract({ left: botW, top: h, width: botW, height: h }).jpeg({ quality: 85 }).toFile(path.join(outDir, 'model_women_brown_front.jpg'));

  // PROCESS BACK IMAGES
  console.log('Processing back images...');
  await sharp(backInput).extract({ left: 0, top: 0, width: topW, height: h }).jpeg({ quality: 85 }).toFile(path.join(outDir, 'model_women_red_back.jpg'));
  await sharp(backInput).extract({ left: topW, top: 0, width: topW, height: h }).jpeg({ quality: 85 }).toFile(path.join(outDir, 'model_women_white_back.jpg'));
  await sharp(backInput).extract({ left: topW * 2, top: 0, width: 1024 - (topW * 2), height: h }).jpeg({ quality: 85 }).toFile(path.join(outDir, 'model_women_black_back.jpg'));
  await sharp(backInput).extract({ left: 0, top: h, width: botW, height: h }).jpeg({ quality: 85 }).toFile(path.join(outDir, 'model_women_cream_back.jpg'));
  await sharp(backInput).extract({ left: botW, top: h, width: botW, height: h }).jpeg({ quality: 85 }).toFile(path.join(outDir, 'model_women_brown_back.jpg'));

  console.log('Images successfully generated from correct source files!');
}

splitImages().catch(console.error);
