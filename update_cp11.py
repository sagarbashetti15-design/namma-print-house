import re
import os

cat_path = r'C:\Users\Admin\.gemini\antigravity\scratch\namma-print-house-store\src\data\catalog.js'
with open(cat_path, 'r', encoding='utf-8') as f:
    cat = f.read()

def replacer(match):
    id_str = match.group(1)
    
    inject = f"""{id_str}
    colors: ['White', 'Black', 'Cream', 'Trending Blue', 'Red', 'Brown', 'Orange'],
    colorImages: {{
      'White': '/images/cp11-White_v6.jpg',
      'Black': '/images/cp11-Black_v6.jpg',
      'Cream': '/images/cp11-Cream_v6.jpg',
      'Trending Blue': '/images/cp11-Trending-Blue_v6.jpg',
      'Red': '/images/cp11-Red_v6.jpg',
      'Brown': '/images/cp11-Brown_v6.jpg',
      'Orange': '/images/cp11-Orange_v6.jpg'
    }},"""
    return inject

pattern = re.compile(r"(id:\s*'cp11',)")
cat = pattern.sub(replacer, cat)

with open(cat_path, 'w', encoding='utf-8') as f:
    f.write(cat)

print("catalog.js updated for cp11.")
