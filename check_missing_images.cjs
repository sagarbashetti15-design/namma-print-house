const fs = require('fs');
const path = require('path');

let content = fs.readFileSync('src/data/catalog.js', 'utf8');
// Evaluate catalog.js to get the products array
// We need to strip the export statements first
content = content.replace(/export const getProducts.*/s, '');
content = content.replace(/export const products.*/s, '');

// Safely evaluate to get initialProducts
const initialProducts = eval(content + '\ninitialProducts;');

const missingImages = new Set();

initialProducts.forEach(product => {
  if (product.image) {
    const imgPath = product.image.split('?')[0]; // remove ?v=3
    const fullPath = path.join(__dirname, 'public', imgPath);
    if (!fs.existsSync(fullPath)) {
      missingImages.add(imgPath);
    }
  }
  
  if (product.images) {
    product.images.forEach(img => {
      const imgPath = img.split('?')[0];
      const fullPath = path.join(__dirname, 'public', imgPath);
      if (!fs.existsSync(fullPath)) {
        missingImages.add(imgPath);
      }
    });
  }
});

console.log('Missing images:', Array.from(missingImages));
