import re
import os

path = r'C:\Users\Admin\.gemini\antigravity\scratch\namma-print-house-store\src\data\catalog.js'

with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace sizes array with sizes + colors
old_str = "sizes: ['S', 'M', 'L', 'XL'],"
new_str = "sizes: ['S', 'M', 'L', 'XL'],\n    colors: ['White', 'Black', 'Cream', 'Trending Blue', 'Red', 'Brown'],"
content = content.replace(old_str, new_str)

# Fix custom-tee double colors
fix_regex = r"(colors: \['Black', 'White', 'Beige', 'Dark Grey'\],\s*colorImages: {[\s\S]*?},\s*sizes: \['S', 'M', 'L', 'XL'\],)\s*colors: \['White', 'Black', 'Cream', 'Trending Blue', 'Red', 'Brown'\],"
content = re.sub(fix_regex, r"\1", content)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Successfully updated catalog.js")
