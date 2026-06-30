import re
with open(r'C:\Users\Admin\.gemini\antigravity\scratch\namma-print-house-store\src\data\catalog.js', 'r', encoding='utf-8') as f:
    text = f.read()
for m in ['m1', 'm2', 'm3', 'm4', 'm5', 'm6', 'm7']:
    title_match = re.search(r"id:\s*'" + m + r"'.*?title:\s*'([^']+)'", text, re.DOTALL)
    if title_match:
        print(f'{m}: {title_match.group(1)}')
