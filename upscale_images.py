from PIL import Image, ImageFilter
import os
import glob

img_dir = r'C:\Users\Admin\.gemini\antigravity\scratch\namma-print-house-store\public\images'
target_size = (512, 512)

# Find all v3 images
v3_images = glob.glob(os.path.join(img_dir, '*_v3.jpg'))

for img_path in v3_images:
    filename = os.path.basename(img_path)
    new_filename = filename.replace('_v3.jpg', '_v4.jpg')
    out_path = os.path.join(img_dir, new_filename)
    
    with Image.open(img_path) as img:
        # Resize to fit within 512x512 while maintaining aspect ratio
        img = img.resize((470, 512), resample=Image.LANCZOS)
        
        # Create a new square 512x512 background (assuming greyish background to match)
        # Let's just pick a generic light grey or get the top-left pixel color
        bg_color = img.getpixel((0,0))
        new_img = Image.new('RGB', target_size, bg_color)
        
        # Paste the resized image into the center
        offset = ((target_size[0] - 470) // 2, 0)
        new_img.paste(img, offset)
        
        # Apply slight sharpening
        new_img = new_img.filter(ImageFilter.UnsharpMask(radius=2, percent=150, threshold=3))
        
        new_img.save(out_path, quality=100)

print(f"Upscaled {len(v3_images)} images to v4.")
