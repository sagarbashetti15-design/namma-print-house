import re

path = r'C:\Users\Admin\.gemini\antigravity\scratch\namma-print-house-store\src\data\catalog.js'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

products_to_update = ['m1', 'm2', 'm3', 'm4', 'm5']

def replacer(match):
    id_str = match.group(1) # e.g. "id: 'm1',"
    pid = re.search(r"'(m[1-5])'", id_str).group(1)
    
    inject = f"""{id_str}
    colors: ['White', 'Black', 'Cream', 'Trending Blue', 'Red', 'Brown', 'Orange'],
    colorImages: {{
      'White': '/images/{pid}-White.jpg',
      'Black': '/images/{pid}-Black.jpg',
      'Cream': '/images/{pid}-Cream.jpg',
      'Trending Blue': '/images/{pid}-Trending-Blue.jpg',
      'Red': '/images/{pid}-Red.jpg',
      'Brown': '/images/{pid}-Brown.jpg',
      'Orange': '/images/{pid}-Orange.jpg'
    }},"""
    return inject

# We match `id: 'm1',` etc.
pattern = re.compile(r"(id:\s*'(m[1-5])',)")
new_content = pattern.sub(replacer, content)

with open(path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Catalog updated for m1-m5")
