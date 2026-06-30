import cv2
import numpy as np
import os

img_path = r'C:\Users\Admin\.gemini\antigravity\brain\656238a5-f331-4782-9bd9-8a84b94b50b2\media__1782501269544.jpg'
out_dir = r'C:\Users\Admin\.gemini\antigravity\scratch\namma-print-house-store\public\images'

img = cv2.imread(img_path)
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

_, thresh = cv2.threshold(gray, 245, 255, cv2.THRESH_BINARY_INV)
contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

bounding_boxes = [cv2.boundingRect(c) for c in contours]
bounding_boxes = [b for b in bounding_boxes if b[2] > 100 and b[3] > 100]

rows = {}
for b in bounding_boxes:
    x, y, w, h = b
    row_key = round(y / 50) * 50
    if row_key not in rows:
        rows[row_key] = []
    rows[row_key].append(b)

sorted_boxes = []
for row_key in sorted(rows.keys()):
    row_boxes = sorted(rows[row_key], key=lambda b: b[0])
    sorted_boxes.extend(row_boxes)

colors = ['White', 'Black', 'Cream', 'Trending Blue', 'Red', 'Brown', 'Orange']

if len(sorted_boxes) == 7:
    for i, b in enumerate(sorted_boxes):
        x, y, w, h = b
        cropped = img[y:y+h, x:x+w]
        color_name = colors[i].replace(' ', '-')
        out_name = f"m13-{color_name}_v6.jpg"
        cv2.imwrite(os.path.join(out_dir, out_name), cropped, [cv2.IMWRITE_JPEG_QUALITY, 95])
        print(f"Saved {out_name}")
else:
    print(f"Warning: Found {len(sorted_boxes)} regions, expected 7.")
