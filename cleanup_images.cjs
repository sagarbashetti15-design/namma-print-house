const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const publicImagesDir = path.join(__dirname, 'public/images');

// 1. Get all files in src/
function getSrcFiles(dir, files = []) {
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getSrcFiles(fullPath, files);
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

const srcFiles = getSrcFiles(srcDir);

// 2. Extract all potential image filenames from src/
const usedImageNames = new Set();
// Also include index.html if it has references
srcFiles.push(path.join(__dirname, 'index.html'));

for (const file of srcFiles) {
  const content = fs.readFileSync(file, 'utf8');
  // Simple regex to find words ending in image extensions
  const matches = content.match(/[a-zA-Z0-9_.-]+\.(png|jpe?g|svg|webp|gif)/gi);
  if (matches) {
    matches.forEach(m => usedImageNames.add(m));
  }
}

// 3. Get all files in public/images/
function getPublicImageFiles(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getPublicImageFiles(fullPath, files);
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

const imageFiles = getPublicImageFiles(publicImagesDir);

// 4. Delete unused images
let deletedCount = 0;
for (const file of imageFiles) {
  const basename = path.basename(file);
  // Exception for standard assets that might be dynamically referenced or standard names
  if (['favicon.ico', 'logo.png', 'og-image.jpg'].includes(basename)) continue;
  
  if (!usedImageNames.has(basename)) {
    console.log(`Deleting unused image: ${file}`);
    fs.unlinkSync(file);
    deletedCount++;
  }
}

console.log(`Deleted ${deletedCount} unused images.`);
