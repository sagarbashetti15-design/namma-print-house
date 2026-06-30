import re
import os

cat_path = r'C:\Users\Admin\.gemini\antigravity\scratch\namma-print-house-store\src\data\catalog.js'
with open(cat_path, 'r', encoding='utf-8') as f:
    cat = f.read()

def replacer(match):
    id_str = match.group(1)
    
    inject = f"""{id_str}
    colors: ['Black', 'White', 'Beige', 'Navy', 'Olive Green', 'Brown', 'Charcoal'],
    colorImages: {{
      'Black': '/images/cp8-Black_v6.jpg',
      'White': '/images/cp8-White_v6.jpg',
      'Beige': '/images/cp8-Beige_v6.jpg',
      'Navy': '/images/cp8-Navy_v6.jpg',
      'Olive Green': '/images/cp8-Olive-Green_v6.jpg',
      'Brown': '/images/cp8-Brown_v6.jpg',
      'Charcoal': '/images/cp8-Charcoal_v6.jpg'
    }},"""
    return inject

pattern = re.compile(r"(id:\s*'cp8',)")
cat = pattern.sub(replacer, cat)

with open(cat_path, 'w', encoding='utf-8') as f:
    f.write(cat)

print("catalog.js updated for cp8.")
