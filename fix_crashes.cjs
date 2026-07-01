const fs = require('fs');
const file = 'src/pages/AdminDashboardSecure.jsx';
let content = fs.readFileSync(file, 'utf8');

// Replace the reloading messages
content = content.replace(/Storefront is reloading\.\.\./g, 'Storefront updated behind the scenes!');
content = content.replace(/Storefront reloading to display new item\.\.\./g, 'Storefront updated behind the scenes!');
content = content.replace(/Storefront is refreshing to reflect updates\.\.\./g, 'Storefront updated behind the scenes!');
content = content.replace(/Storefront is refreshing\.\.\./g, 'Storefront updated behind the scenes!');

// Remove all window.location.reload() in setTimeouts
content = content.replace(/setTimeout\(\(\) => \{\s*window\.location\.reload\(\);\s*\}, \d+\);/g, '');
// Also remove the one line version
content = content.replace(/setTimeout\(\(\) => \{ window\.location\.reload\(\); \}, \d+\);/g, '');

fs.writeFileSync(file, content);
console.log('Done removing reload crashes');
