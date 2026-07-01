const fs = require('fs');
const file = 'src/pages/AdminDashboardSecure.jsx';
let content = fs.readFileSync(file, 'utf8');

// Replace await axios.put('/api/marketing', ...)
content = content.replace(
  /await axios\.put\('\/api\/marketing', \{[^}]+\}\);/g,
  "await new Promise(r => setTimeout(r, 600)); // Mock API"
);

// Replace axios.put(`/api/catalog/${matchedProduct.id}/stock`, ...)
content = content.replace(
  /axios\.put\(`\/api\/catalog\/\$\{matchedProduct\.id\}\/stock`, \{ outOfStock: (true|false) \}\)/g,
  "new Promise(r => setTimeout(r, 500))"
);

// Replace axios.put(`/api/catalog/${productId}/stock`, ...)
content = content.replace(
  /axios\.put\(`\/api\/catalog\/\$\{productId\}\/stock`, \{ outOfStock: newStatus \}\)/g,
  "new Promise(r => setTimeout(r, 500))"
);

// Replace axios.post('/api/catalog', addedItem)
content = content.replace(
  /axios\.post\('\/api\/catalog', addedItem\)/g,
  "new Promise(r => setTimeout(r, 500))"
);

fs.writeFileSync(file, content);
console.log('Done replacing axios calls');
