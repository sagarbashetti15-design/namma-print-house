import re
import os

cat_path = r'C:\Users\Admin\.gemini\antigravity\scratch\namma-print-house-store\src\data\catalog.js'
with open(cat_path, 'r', encoding='utf-8') as f:
    cat = f.read()

def replacer(match):
    id_str = match.group(1)
    
    inject = f"""{id_str}
    colors: ['White', 'Black', 'Beige', 'Navy', 'Olive Green', 'Brown', 'Blue Grey'],
    colorImages: {{
      'White': '/images/cp3-White_v6.jpg',
      'Black': '/images/cp3-Black_v6.jpg',
      'Beige': '/images/cp3-Beige_v6.jpg',
      'Navy': '/images/cp3-Navy_v6.jpg',
      'Olive Green': '/images/cp3-Olive-Green_v6.jpg',
      'Brown': '/images/cp3-Brown_v6.jpg',
      'Blue Grey': '/images/cp3-Blue-Grey_v6.jpg'
    }},"""
    return inject

pattern = re.compile(r"(id:\s*'cp3',)")
cat = pattern.sub(replacer, cat)

with open(cat_path, 'w', encoding='utf-8') as f:
    f.write(cat)

print("catalog.js updated for cp3.")
