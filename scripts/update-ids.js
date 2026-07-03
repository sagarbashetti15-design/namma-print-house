import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const catalogPath = path.resolve(__dirname, '../src/data/catalog.js');
let content = fs.readFileSync(catalogPath, 'utf8');

// A simple slugify function
function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w-]+/g, '')       // Remove all non-word chars
    .replace(/--+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

// Find all objects in initialProducts array to extract title and old ID
const idToSlug = {};

// We can use a regex to find all titles and IDs in the file
// Example block:
// id: 'm1',
// category: 'men',
// title: "Men's RCB Black Oversized T-Shirt",

const blockRegex = /id:\s*'([^']+)',\s*(?:[a-zA-Z]+:\s*[^,]+,\s*)*title:\s*"([^"]+)"/g;
let match;
while ((match = blockRegex.exec(content)) !== null) {
  const oldId = match[1];
  const title = match[2];
  
  if (oldId === 'custom-tee') continue; // Keep custom-tee as is
  
  const newSlug = slugify(title);
  
  // To avoid duplicates if titles are exact same, though they shouldn't be
  idToSlug[oldId] = newSlug;
}

const blockRegexSingleQuotes = /id:\s*'([^']+)',\s*(?:[a-zA-Z]+:\s*[^,]+,\s*)*title:\s*'([^']+)'/g;
while ((match = blockRegexSingleQuotes.exec(content)) !== null) {
  const oldId = match[1];
  const title = match[2];
  if (oldId === 'custom-tee') continue;
  idToSlug[oldId] = slugify(title);
}

// Now replace IDs in the file.
for (const [oldId, newSlug] of Object.entries(idToSlug)) {
  // Be careful to only replace the ID property, not other occurrences
  const idRegex = new RegExp(`id:\\s*'${oldId}'`, 'g');
  content = content.replace(idRegex, `id: '${newSlug}'`);
  
  // Also replace any specific cache busting logic references
  const cacheRegex = new RegExp(`const ${oldId} = parsed\\.find\\(p => p\\.id === '${oldId}'\\);`, 'g');
  content = content.replace(cacheRegex, `const ${oldId} = parsed.find(p => p.id === '${newSlug}');`);
}

fs.writeFileSync(catalogPath, content, 'utf8');
console.log('Successfully updated product IDs in catalog.js!');
