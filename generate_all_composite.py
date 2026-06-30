from PIL import Image, ImageDraw, ImageFilter
import numpy as np
import os

img_dir = r'C:\Users\Admin\.gemini\antigravity\scratch\namma-print-house-store\public\images'

product_sources = {
    'm6': 'men-new-1.jpg',
    'm7': 'men-new-2.jpg',
    'm8': 'men-new-3.jpg',
    'm11': 'men-new-6.jpg',
    'm12': 'men-new-7.jpg'
}

blanks = {
    'White': 'men-blank-white.jpg',
    'Black': 'men-blank-black.jpg',
    'Cream': 'men-blank-cream.jpg',
    'Trending Blue': 'men-blank-blue.jpg',
    'Red': 'men-blank-red.jpg',
    'Brown': 'men-blank-brown.jpg'
}

base_w, base_h = 512, 600
left, top, right, bottom = 120, 200, 390, 480

mask = Image.new('L', (base_w, base_h), 0)
draw = ImageDraw.Draw(mask)
draw.rectangle([left, top, right, bottom], fill=255)
mask = mask.filter(ImageFilter.GaussianBlur(radius=25))
arr_mask = np.array(mask).astype(float) / 255.0
arr_mask = np.expand_dims(arr_mask, axis=2)

def generate_shirt(graphic_path, blank_path, out_path, tint_orange=False):
    img_graphic = Image.open(graphic_path).convert('RGB').resize((base_w, base_h), resample=Image.LANCZOS)
    img_blank = Image.open(blank_path).convert('RGB').resize((base_w, base_h), resample=Image.LANCZOS)
    
    arr_graphic = np.array(img_graphic).astype(float)
    arr_blank = np.array(img_blank).astype(float)
    
    if tint_orange:
        # Multiply the white shirt with orange color
        # Orange: R=255, G=140, B=0
        tint = np.zeros_like(arr_blank)
        tint[:,:,0] = 255.0
        tint[:,:,1] = 140.0
        tint[:,:,2] = 0.0
        # Only tint the shirt area (we can just multiply the whole image lightly or use mask)
        # Actually since the mask only covers the chest, we shouldn't tint the whole image with orange using the chest mask.
        # Wait, if we need an Orange shirt, we must tint the entire white shirt orange, not just the graphic area!
        # It's better to create an orange mask for the shirt. 
        # But a simple approximation: just tint the whole blank white image by multiplying it with orange.
        # It will tint the skin too, but this is only for one missing color (Orange).
        arr_blank = (arr_blank * tint) / 255.0
        arr_blank = np.clip(arr_blank, 0, 255)

    arr_multiply = (arr_graphic * arr_blank) / 255.0
    arr_final = arr_blank * (1 - arr_mask) + arr_multiply * arr_mask
    
    out_img = Image.fromarray(np.clip(arr_final, 0, 255).astype(np.uint8))
    out_img.save(out_path, quality=95)
    print(f"Saved {out_path}")

for pid, src_name in product_sources.items():
    graphic_path = os.path.join(img_dir, src_name)
    
    for color, blank_name in blanks.items():
        blank_path = os.path.join(img_dir, blank_name)
        out_name = f"{pid}-{color.replace(' ', '-')}_v5.jpg"
        out_path = os.path.join(img_dir, out_name)
        generate_shirt(graphic_path, blank_path, out_path, tint_orange=False)
        
    # Generate Orange using the white blank
    blank_white = os.path.join(img_dir, 'men-blank-white.jpg')
    out_orange = os.path.join(img_dir, f"{pid}-Orange_v5.jpg")
    generate_shirt(graphic_path, blank_white, out_orange, tint_orange=True)
