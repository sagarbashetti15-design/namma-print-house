const fs = require('fs');

async function cleanCatalog() {
  // 1. Get local IDs
  let content = fs.readFileSync('src/data/catalog.js', 'utf8');
  content = content.replace(/export const getProducts.*/s, '');
  content = content.replace(/export const products.*/s, '');
  const initialProducts = eval(content + '\ninitialProducts;');
  const localIds = new Set(initialProducts.map(p => p.id));
  
  // 2. Fetch Firebase docs
  const res = await fetch("https://firestore.googleapis.com/v1/projects/namma-print-house/databases/(default)/documents/catalog");
  const data = await res.json();
  const docs = data.documents;
  
  // 3. Mark missing as deleted
  let deletedCount = 0;
  for (const d of docs) {
    const id = d.name.split('/').pop();
    const isDeleted = d.fields?.deleted?.booleanValue;
    
    if (!localIds.has(id) && !isDeleted) {
      console.log(`Soft deleting ghost product from Firebase: ${id}`);
      
      const payload = {
        fields: {
          ...d.fields,
          deleted: { booleanValue: true }
        }
      };
      
      await fetch(`https://firestore.googleapis.com/v1/projects/namma-print-house/databases/(default)/documents/catalog/${id}?updateMask.fieldPaths=deleted`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      deletedCount++;
    }
  }
  
  console.log(`Soft deleted ${deletedCount} obsolete products from Firebase.`);
}

cleanCatalog();
