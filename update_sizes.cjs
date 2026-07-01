const fs = require('fs');
const file = 'src/data/catalog.js';
let content = fs.readFileSync(file, 'utf8');
content = content.replace(/sizes:\s*\[\s*'S',\s*'M',\s*'L',\s*'XL'\s*\]/g, "sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']");
fs.writeFileSync(file, content);
