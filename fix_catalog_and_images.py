import os
import re
from PIL import Image

# 1. Re-slice the images with correct names
img_path = r'C:\Users\Admin\.gemini\antigravity\brain\656238a5-f331-4782-9bd9-8a84b94b50b2\media__1782497038130.jpg'
out_dir = r'C:\Users\Admin\.gemini\antigravity\scratch\namma-print-house-store\public\images'
img = Image.open(img_path)
width, height = img.size

text_col_w = 149
img_col_w = 125
row_h = height / 5.0

# CORRECT product mapping
products = ['m6', 'm7', 'm8', 'm11', 'm12']
colors = ['White', 'Black', 'Cream', 'Trending Blue', 'Red', 'Brown', 'Orange']

for r in range(5):
    for c in range(7):  
        left = text_col_w + (c * img_col_w)
        upper = int(round(r * row_h))
        right = text_col_w + ((c + 1) * img_col_w)
        lower = int(round((r + 1) * row_h))
        
        box = (left, upper, right, lower)
        cropped = img.crop(box)
        
        color_name = colors[c].replace(' ', '-')
        out_name = f"{products[r]}-{color_name}_v3.jpg" # v3 to bust cache again
        cropped.save(os.path.join(out_dir, out_name), quality=95)
print("Re-sliced images correctly.")

# 2. Update catalog.js
cat_path = r'C:\Users\Admin\.gemini\antigravity\scratch\namma-print-house-store\src\data\catalog.js'
with open(cat_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Remove bad injection from m1-m5
old_inject_pattern = re.compile(r"(id:\s*'(m[1-5])',)\s*colors: \['White', 'Black', 'Cream', 'Trending Blue', 'Red', 'Brown', 'Orange'\],\s*colorImages: {[\s\S]*?},")
content = old_inject_pattern.sub(r"\1", content)

# Remove old injection from m6-m12 (if any)
old_inject_pattern_2 = re.compile(r"(id:\s*'((m6)|(m7)|(m8)|(m11)|(m12))',)\s*colors: \['White', 'Black', 'Cream', 'Trending Blue', 'Red', 'Brown', 'Orange'\],\s*colorImages: {[\s\S]*?},")
content = old_inject_pattern_2.sub(r"\1", content)

# Inject correctly into m6, m7, m8, m11, m12
def replacer(match):
    id_str = match.group(1) 
    pid = re.search(r"'([^']+)'", id_str).group(1)
    
    inject = f"""{id_str}
    colors: ['White', 'Black', 'Cream', 'Trending Blue', 'Red', 'Brown', 'Orange'],
    colorImages: {{
      'White': '/images/{pid}-White_v3.jpg',
      'Black': '/images/{pid}-Black_v3.jpg',
      'Cream': '/images/{pid}-Cream_v3.jpg',
      'Trending Blue': '/images/{pid}-Trending-Blue_v3.jpg',
      'Red': '/images/{pid}-Red_v3.jpg',
      'Brown': '/images/{pid}-Brown_v3.jpg',
      'Orange': '/images/{pid}-Orange_v3.jpg'
    }},"""
    return inject

pattern = re.compile(r"(id:\s*'((m6)|(m7)|(m8)|(m11)|(m12))',)")
content = pattern.sub(replacer, content)

with open(cat_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Catalog fixed!")
