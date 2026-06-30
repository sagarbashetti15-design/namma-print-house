import re

path = r'C:\Users\Admin\.gemini\antigravity\scratch\namma-print-house-store\src\data\catalog.js'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Remove the colors array we added
content = content.replace("    colors: ['White', 'Black', 'Cream', 'Trending Blue', 'Red', 'Brown'],\n", "")

# Remove the colorImages object we added
color_images_regex = r"\s*colorImages:\s*{\s*'White':\s*'/images/men-blank-white\.jpg',\s*'Black':\s*'/images/men-blank-black\.jpg',\s*'Cream':\s*'/images/men-blank-cream\.jpg',\s*'Trending Blue':\s*'/images/men-blank-blue\.jpg',\s*'Red':\s*'/images/men-blank-red\.jpg',\s*'Brown':\s*'/images/men-blank-brown\.jpg'\s*},"
content = re.sub(color_images_regex, "", content)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Catalog reverted to remove color concept.")
