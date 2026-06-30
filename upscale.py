import cv2
import os

images = [
    'clean-hero-bg.jpg',
    'couples-new-8.jpg',
    'men-new-1.jpg',
    'women-new-1.jpg'
]

in_dir = r'C:\Users\Admin\.gemini\antigravity\scratch\namma-print-house-store\public\images'

for img_name in images:
    path = os.path.join(in_dir, img_name)
    if os.path.exists(path):
        img = cv2.imread(path)
        # upscale by 3x
        new_width = img.shape[1] * 3
        new_height = img.shape[0] * 3
        
        # apply bilateral filter to reduce noise/artifacts before upscaling
        img_filtered = cv2.bilateralFilter(img, 9, 75, 75)
        
        # resize using Lanczos4 which is generally good for upscaling
        upscaled = cv2.resize(img_filtered, (new_width, new_height), interpolation=cv2.INTER_LANCZOS4)
        
        out_name = "hd-" + img_name
        out_path = os.path.join(in_dir, out_name)
        cv2.imwrite(out_path, upscaled, [cv2.IMWRITE_JPEG_QUALITY, 100])
        print(f"Upscaled {img_name} to {out_name} ({new_width}x{new_height})")
