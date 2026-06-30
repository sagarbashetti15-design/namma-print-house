from PIL import Image
import numpy as np
import os

img_path = r'C:\Users\Admin\.gemini\antigravity\brain\656238a5-f331-4782-9bd9-8a84b94b50b2\media__1782500007802.jpg'
out_dir = r'C:\Users\Admin\.gemini\antigravity\scratch\namma-print-house-store\public\images'

img = Image.open(img_path).convert('L') # grayscale
arr = np.array(img)

# Threshold: non-white pixels
# Grid background is white (255) or close to it
is_non_white = arr < 245

# Find connected components (simple box finding since the grid is well-separated)
# Instead of full connected components, we can just project horizontally and vertically
# BUT the top row has 3, bottom has 4, so they are not aligned in columns!
# So we MUST do row projection first, then column projection per row.

row_proj = np.sum(is_non_white, axis=1)
is_image_row = row_proj > 50 # at least 50 non-white pixels to count as a row

changes = np.diff(is_image_row.astype(int))
r_starts = np.where(changes == 1)[0] + 1
r_ends = np.where(changes == -1)[0]
if is_image_row[0]:
    r_starts = np.insert(r_starts, 0, 0)
if is_image_row[-1]:
    r_ends = np.append(r_ends, len(row_proj)-1)

boxes = []
for rs, re in zip(r_starts, r_ends):
    # For each row, find columns
    row_slice = is_non_white[rs:re, :]
    col_proj = np.sum(row_slice, axis=0)
    is_image_col = col_proj > 20
    
    c_changes = np.diff(is_image_col.astype(int))
    c_starts = np.where(c_changes == 1)[0] + 1
    c_ends = np.where(c_changes == -1)[0]
    if is_image_col[0]:
        c_starts = np.insert(c_starts, 0, 0)
    if is_image_col[-1]:
        c_ends = np.append(c_ends, len(col_proj)-1)
        
    for cs, ce in zip(c_starts, c_ends):
        # Allow a small crop margin or just take the exact box
        # Actually the text "WHITE" is in the white area, so it won't be included if it's separated by white
        # Wait, the text "WHITE" is above the images. It will be its own small block!
        # We only want large blocks
        if (re - rs) > 100 and (ce - cs) > 100:
            boxes.append((cs, rs, ce, re))

print(f"Found {len(boxes)} image regions.")
for i, b in enumerate(boxes):
    print(f"Box {i}: {b}")

colors = ['White', 'Black', 'Cream', 'Trending Blue', 'Red', 'Brown', 'Orange']

if len(boxes) == 7:
    pil_img = Image.open(img_path)
    for i, b in enumerate(boxes):
        cs, rs, ce, re = b
        cropped = pil_img.crop((cs, rs, ce, re))
        color_name = colors[i].replace(' ', '-')
        out_name = f"m6-{color_name}.jpg"
        cropped.save(os.path.join(out_dir, out_name), quality=95)
        print(f"Saved {out_name}")
else:
    print("Warning: Did not find exactly 7 regions.")
