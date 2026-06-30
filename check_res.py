import cv2
import os

images = [
    'clean-hero-bg.jpg',
    'couples-new-8.jpg',
    'men-new-1.jpg',
    'women-new-1.jpg'
]

for img_name in images:
    path = os.path.join(r'C:\Users\Admin\.gemini\antigravity\scratch\namma-print-house-store\public\images', img_name)
    if os.path.exists(path):
        img = cv2.imread(path)
        if img is not None:
            print(f"{img_name}: {img.shape}")
        else:
            print(f"{img_name}: Failed to load")
    else:
        print(f"{img_name}: File not found")
