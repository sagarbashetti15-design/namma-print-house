import re

path = r'C:\Users\Admin\.gemini\antigravity\scratch\namma-print-house-store\src\data\catalog.js'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

def replacer(match):
    id_str = match.group(1) # e.g. "id: 'm1',"
    pid = re.search(r"'(m[1-5])'", id_str).group(1)
    
    inject = f"""{id_str}
    colors: ['White', 'Black', 'Cream', 'Trending Blue', 'Red', 'Brown', 'Orange'],
    colorImages: {{
      'White': '/images/{pid}-White_v2.jpg',
      'Black': '/images/{pid}-Black_v2.jpg',
      'Cream': '/images/{pid}-Cream_v2.jpg',
      'Trending Blue': '/images/{pid}-Trending-Blue_v2.jpg',
      'Red': '/images/{pid}-Red_v2.jpg',
      'Brown': '/images/{pid}-Brown_v2.jpg',
      'Orange': '/images/{pid}-Orange_v2.jpg'
    }},"""
    return inject

# We match `id: 'm1',` etc.
# Since we already injected it before, we need to replace the old colors and colorImages.
# First, remove the old injection.
old_inject_pattern = re.compile(r"(id:\s*'(m[1-5])',)\s*colors: \['White', 'Black', 'Cream', 'Trending Blue', 'Red', 'Brown', 'Orange'\],\s*colorImages: {[\s\S]*?},")
content = old_inject_pattern.sub(r"\1", content)

# Now inject the new one
pattern = re.compile(r"(id:\s*'(m[1-5])',)")
new_content = pattern.sub(replacer, content)

with open(path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Catalog updated with _v2 images")
