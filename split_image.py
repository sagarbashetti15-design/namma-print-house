from PIL import Image
import os

input_image_path = r'C:\Users\Admin\.gemini\antigravity\brain\656238a5-f331-4782-9bd9-8a84b94b50b2\media__1782469007945.jpg'
output_dir = r'C:\Users\Admin\.gemini\antigravity\scratch\namma-print-house-store\public\images'

try:
    img = Image.open(input_image_path)
    width, height = img.size
    
    mid_x = width // 2
    mid_y = height // 2
    
    # Top Left (Black)
    img_tl = img.crop((0, 0, mid_x, mid_y))
    img_tl.save(os.path.join(output_dir, 'blank-tee-black.jpg'))
    
    # Top Right (White)
    img_tr = img.crop((mid_x, 0, width, mid_y))
    img_tr.save(os.path.join(output_dir, 'blank-tee-white.jpg'))
    
    # Bottom Left (Beige)
    img_bl = img.crop((0, mid_y, mid_x, height))
    img_bl.save(os.path.join(output_dir, 'blank-tee-beige.jpg'))
    
    # Bottom Right (Grey)
    img_br = img.crop((mid_x, mid_y, width, height))
    img_br.save(os.path.join(output_dir, 'blank-tee-grey.jpg'))
    
    print("Successfully split image into 4 quarters.")
except Exception as e:
    print(f"Error: {e}")
