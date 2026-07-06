const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'public/images');
const srcDir = path.join(__dirname, 'src');

// Recursively get all files in src/
function getFiles(dir, files = []) {
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getFiles(fullPath, files);
    } else if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx') || fullPath.endsWith('.css')) {
      files.push(fullPath);
    }
  }
  return files;
}

const srcFiles = getFiles(srcDir);
const pngFiles = fs.readdirSync(imagesDir).filter(f => f.endsWith('.png'));

let renamedCount = 0;

for (const file of pngFiles) {
  const fullPath = path.join(imagesDir, file);
  const buffer = Buffer.alloc(4);
  const fd = fs.openSync(fullPath, 'r');
  fs.readSync(fd, buffer, 0, 4, 0);
  fs.closeSync(fd);
  
  const hex = buffer.toString('hex');
  if (hex === 'ffd8ffe0' || hex === 'ffd8ffe1') {
    const baseName = file.slice(0, -4);
    const newFile = `${baseName}.jpg`;
    const newPath = path.join(imagesDir, newFile);
    
    // Rename file
    fs.renameSync(fullPath, newPath);
    console.log(`Renamed ${file} to ${newFile}`);
    renamedCount++;
    
    // Find and replace in src files
    for (const srcFile of srcFiles) {
      let content = fs.readFileSync(srcFile, 'utf8');
      if (content.includes(file)) {
        // Also remove ?v=2 because we are changing the filename anyway, which naturally busts the cache
        // Actually let's just replace the filename, and let the query param be if it's there
        content = content.replace(new RegExp(file, 'g'), newFile);
        fs.writeFileSync(srcFile, content, 'utf8');
        console.log(`Updated reference to ${newFile} in ${srcFile}`);
      }
    }
  }
}

console.log(`Fixed ${renamedCount} misnamed JPEGs.`);
