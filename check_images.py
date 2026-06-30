import re
with open(r'C:\Users\Admin\.gemini\antigravity\scratch\namma-print-house-store\src\data\catalog.js', 'r', encoding='utf-8') as f:
    text = f.read()

for m in ['m6', 'm7', 'm8', 'm11', 'm12']:
    match = re.search(r"id:\s*'" + m + r"'.*?images:\s*(\[[^\]]+\])", text, re.DOTALL)
    if match:
        print(f'{m}: {match.group(1).strip()}')
