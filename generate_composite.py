from PIL import Image, ImageChops, ImageFilter, ImageDraw
import numpy as np
import os

def generate_color_shirt(graphic_img_path, blank_img_path, out_path):
    img_graphic = Image.open(graphic_img_path).convert('RGB')
    img_blank = Image.open(blank_img_path).convert('RGB')
    
    base_w, base_h = 512, 600
    img_graphic = img_graphic.resize((base_w, base_h), resample=Image.LANCZOS)
    img_blank = img_blank.resize((base_w, base_h), resample=Image.LANCZOS)
    
    # Graphic area for men-new-x images
    # Let's use a conservative bounding box for the chest
    left, top, right, bottom = 120, 200, 390, 480
    
    mask = Image.new('L', (base_w, base_h), 0)
    draw = ImageDraw.Draw(mask)
    draw.rectangle([left, top, right, bottom], fill=255)
    
    mask = mask.filter(ImageFilter.GaussianBlur(radius=25))
    
    arr_graphic = np.array(img_graphic).astype(float)
    arr_blank = np.array(img_blank).astype(float)
    arr_mask = np.array(mask).astype(float) / 255.0
    arr_mask = np.expand_dims(arr_mask, axis=2)
    
    # Multiply blend mode
    arr_multiply = (arr_graphic * arr_blank) / 255.0
    
    arr_final = arr_blank * (1 - arr_mask) + arr_multiply * arr_mask
    
    out_img = Image.fromarray(np.clip(arr_final, 0, 255).astype(np.uint8))
    out_img.save(out_path, quality=95)
    print(f"Saved {out_path}")

graphic = r'C:\Users\Admin\.gemini\antigravity\scratch\namma-print-house-store\public\images\men-new-2.jpg'
blank_red = r'C:\Users\Admin\.gemini\antigravity\scratch\namma-print-house-store\public\images\men-blank-red.jpg'
out = r'C:\Users\Admin\.gemini\antigravity\scratch\namma-print-house-store\public\images\test_red.jpg'

generate_color_shirt(graphic, blank_red, out)
