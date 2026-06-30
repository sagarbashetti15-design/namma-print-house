import cv2

img_path = r'C:\Users\Admin\.gemini\antigravity\brain\656238a5-f331-4782-9bd9-8a84b94b50b2\media__1782503877033.jpg'
img = cv2.imread(img_path)
print("Image shape:", img.shape)

gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
_, thresh = cv2.threshold(gray, 245, 255, cv2.THRESH_BINARY_INV)
contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
bounding_boxes = [cv2.boundingRect(c) for c in contours]
bounding_boxes = [b for b in bounding_boxes if b[2] > 100 and b[3] > 100]

print("Found boxes:", len(bounding_boxes))
for b in bounding_boxes:
    print(b)
