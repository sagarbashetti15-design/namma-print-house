import re
import os

cat_path = r'C:\Users\Admin\.gemini\antigravity\scratch\namma-print-house-store\src\data\catalog.js'
with open(cat_path, 'r', encoding='utf-8') as f:
    cat = f.read()

def replacer(match):
    id_str = match.group(1)
    
    inject = f"""{id_str}
    colors: ['White', 'Black', 'Cream', 'Trending Blue', 'Red', 'Brown'],
    colorImages: {{
      'White': '/images/m12-White_v6.jpg',
      'Black': '/images/m12-Black_v6.jpg',
      'Cream': '/images/m12-Cream_v6.jpg',
      'Trending Blue': '/images/m12-Trending-Blue_v6.jpg',
      'Red': '/images/m12-Red_v6.jpg',
      'Brown': '/images/m12-Brown_v6.jpg'
    }},"""
    return inject

pattern = re.compile(r"(id:\s*'m12',)")
cat = pattern.sub(replacer, cat)

with open(cat_path, 'w', encoding='utf-8') as f:
    f.write(cat)

print("catalog.js updated for m12.")
