import re
import os

cat_path = r'C:\Users\Admin\.gemini\antigravity\scratch\namma-print-house-store\src\data\catalog.js'
with open(cat_path, 'r', encoding='utf-8') as f:
    cat = f.read()

def replacer(match):
    id_str = match.group(1)
    
    inject = f"""{id_str}
    colors: ['White', 'Black', 'Cream', 'Blue', 'Navy', 'Brown', 'Grey', 'Olive Green', 'Maroon', 'Sand Beige', 'Charcoal'],
    colorImages: {{
      'White': '/images/cp1-White_v6.jpg',
      'Black': '/images/cp1-Black_v6.jpg',
      'Cream': '/images/cp1-Cream_v6.jpg',
      'Blue': '/images/cp1-Blue_v6.jpg',
      'Navy': '/images/cp1-Navy_v6.jpg',
      'Brown': '/images/cp1-Brown_v6.jpg',
      'Grey': '/images/cp1-Grey_v6.jpg',
      'Olive Green': '/images/cp1-Olive-Green_v6.jpg',
      'Maroon': '/images/cp1-Maroon_v6.jpg',
      'Sand Beige': '/images/cp1-Sand-Beige_v6.jpg',
      'Charcoal': '/images/cp1-Charcoal_v6.jpg'
    }},"""
    return inject

pattern = re.compile(r"(id:\s*'cp1',)")
cat = pattern.sub(replacer, cat)

with open(cat_path, 'w', encoding='utf-8') as f:
    f.write(cat)

print("catalog.js updated for cp1.")
