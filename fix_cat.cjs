const fs = require('fs');
let c = fs.readFileSync('src/data/catalog.js', 'utf8');
c = c.replace(/_new\.png/g, '_new.jpg');
fs.writeFileSync('src/data/catalog.js', c);
