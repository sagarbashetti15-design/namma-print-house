import re
from PIL import Image

with open(r'C:\Users\Admin\.gemini\antigravity\scratch\namma-print-house-store\src\data\catalog.js', 'r', encoding='utf-8') as f:
    text = f.read()

m7_match = re.search(r"id:\s*'m7'.*?image:\s*'([^']+)'", text, re.DOTALL)
if m7_match:
    img_path_rel = m7_match.group(1)
    full_path = r'C:\Users\Admin\.gemini\antigravity\scratch\namma-print-house-store\public' + img_path_rel.replace('/', '\\')
    try:
        img = Image.open(full_path)
        print(f'Original m7 image {img_path_rel} size: {img.size}')
    except Exception as e:
        print(f'Could not open {full_path}: {e}')
