from PIL import Image
import os

img_path = r'C:\Users\Admin\.gemini\antigravity\brain\656238a5-f331-4782-9bd9-8a84b94b50b2\media__1782497038130.jpg'
out_dir = r'C:\Users\Admin\.gemini\antigravity\scratch\namma-print-house-store\public\images'
img = Image.open(img_path)
width, height = img.size

text_col_w = 149
img_col_w = 125
row_h = height / 5.0

products = ['m1', 'm2', 'm3', 'm4', 'm5']
colors = ['White', 'Black', 'Cream', 'Trending Blue', 'Red', 'Brown', 'Orange']

for r in range(5):
    for c in range(7):  
        left = text_col_w + (c * img_col_w)
        upper = int(round(r * row_h))
        right = text_col_w + ((c + 1) * img_col_w)
        lower = int(round((r + 1) * row_h))
        
        box = (left, upper, right, lower)
        cropped = img.crop(box)
        
        color_name = colors[c].replace(' ', '-')
        out_name = f"{products[r]}-{color_name}_v2.jpg"
        cropped.save(os.path.join(out_dir, out_name), quality=95)
