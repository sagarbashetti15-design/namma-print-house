const fs = require('fs');

async function fetchCatalog() {
  const res = await fetch("https://firestore.googleapis.com/v1/projects/namma-print-house/databases/(default)/documents/catalog");
  const data = await res.json();
  const docs = data.documents;
  
  const formatted = docs.map(d => {
    const id = d.name.split('/').pop();
    const title = d.fields?.title?.stringValue;
    const image = d.fields?.image?.stringValue;
    const deleted = d.fields?.deleted?.booleanValue;
    return { id, title, image, deleted };
  }).filter(d => !d.deleted);
  
  console.log(JSON.stringify(formatted, null, 2));
}

fetchCatalog();
