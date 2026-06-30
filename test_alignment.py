from PIL import Image
import numpy as np

img1 = np.array(Image.open(r'C:\Users\Admin\.gemini\antigravity\scratch\namma-print-house-store\public\images\men-new-2.jpg').convert('L'))
img2 = np.array(Image.open(r'C:\Users\Admin\.gemini\antigravity\scratch\namma-print-house-store\public\images\men-blank-white.jpg').convert('L'))

# Check sizes
print(f"img1 size: {img1.shape}, img2 size: {img2.shape}")

if img1.shape == img2.shape:
    diff = np.abs(img1.astype(int) - img2.astype(int))
    print(f"Max diff: {np.max(diff)}")
    print(f"Mean diff: {np.mean(diff)}")
    
    # Are the faces identical? Check top 100 pixels
    diff_top = np.mean(diff[:100, :])
    print(f"Mean diff top 100 px (face area): {diff_top}")
