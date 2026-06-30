import re

path = r'C:\Users\Admin\.gemini\antigravity\scratch\namma-print-house-store\src\data\catalog.js'

with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# We want to match products in the 'men' category and add colorImages after colors array.
# A regex to match:
#   category: 'men',
#   ...
#   colors: ['White', 'Black', 'Cream', 'Trending Blue', 'Red', 'Brown'],
# 
# We'll use a function to replace it.
def replacer(match):
    prefix = match.group(1)
    colors_line = match.group(2)
    
    color_images = """
    colorImages: {
      'White': '/images/men-blank-white.jpg',
      'Black': '/images/men-blank-black.jpg',
      'Cream': '/images/men-blank-cream.jpg',
      'Trending Blue': '/images/men-blank-blue.jpg',
      'Red': '/images/men-blank-red.jpg',
      'Brown': '/images/men-blank-brown.jpg'
    },"""
    return prefix + colors_line + color_images

# Match category: 'men', followed by anything up to colors: [...],
pattern = re.compile(r"(category:\s*'men'[\s\S]*?)(colors:\s*\[.*?\]\,)")
new_content = pattern.sub(replacer, content)

with open(path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Updated catalog.js for men category")
