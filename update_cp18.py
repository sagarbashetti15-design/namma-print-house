import re
import os

cat_path = r'C:\Users\Admin\.gemini\antigravity\scratch\namma-print-house-store\src\data\catalog.js'
with open(cat_path, 'r', encoding='utf-8') as f:
    cat = f.read()

def replacer(match):
    id_str = match.group(1)
    
    inject = f"""{id_str}
    image: "/images/cp18.png",
    images: ["/images/cp18.png"],"""
    return inject

pattern = re.compile(r"(id:\s*'cp18',\s*category:\s*'couples',\s*title:\s*\"Balance Energy Navy Matching T-Shirts\",\s*price:\s*1299,\s*originalPrice:\s*2499,\s*tag:\s*\"COUPLES\",\s*)image:\s*\"[^\"]+\",\s*images:\s*\[\"[^\"]+\"\],")
cat = pattern.sub(replacer, cat)

with open(cat_path, 'w', encoding='utf-8') as f:
    f.write(cat)

print("catalog.js updated for cp18.")
