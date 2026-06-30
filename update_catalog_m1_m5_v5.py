import re

path = r'C:\Users\Admin\.gemini\antigravity\scratch\namma-print-house-store\src\data\catalog.js'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace _v4.jpg with _v5.jpg
content = content.replace('_v4.jpg', '_v5.jpg')

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Catalog updated with _v5 images")
