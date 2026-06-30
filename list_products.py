import re
with open(r'C:\Users\Admin\.gemini\antigravity\scratch\namma-print-house-store\src\data\catalog.js', 'r', encoding='utf-8') as f:
    text = f.read()

items = re.findall(r"id:\s*'([^']+)',.*?title:\s*['\"]([^'\"]+)['\"]", text, re.DOTALL)
for id_str, title in items:
    print(f"{id_str}: {title}")
