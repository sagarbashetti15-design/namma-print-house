const fs = require('fs');
let content = fs.readFileSync('src/data/catalog.js', 'utf8');
content = content.replace(/\.png"/g, '.png?v=3"').replace(/\.jpg"/g, '.jpg?v=3"');
fs.writeFileSync('src/data/catalog.js', content, 'utf8');
