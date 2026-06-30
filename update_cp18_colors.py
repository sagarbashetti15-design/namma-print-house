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
      'White': '/images/cp18-White_v6.jpg',
      'Black': '/images/cp18-Black_v6.jpg',
      'Cream': '/images/cp18-Cream_v6.jpg',
      'Trending Blue': '/images/cp18-Trending-Blue_v6.jpg',
      'Red': '/images/cp18-Red_v6.jpg',
      'Brown': '/images/cp18-Brown_v6.jpg',
      'Orange': '/images/cp18-Orange_v6.jpg'
    }},"""
    return inject

# Match the start of cp18 and update it. Note: we might have 'image: "/images/cp18.png",' etc. that we can keep or it will just be below.
# The previous state had no colors for cp18.
pattern = re.compile(r"(id:\s*'cp18',)")
cat = pattern.sub(replacer, cat)

with open(cat_path, 'w', encoding='utf-8') as f:
    f.write(cat)

print("catalog.js updated for cp18.")
