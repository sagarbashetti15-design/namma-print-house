import re
import os

# 1. Revert ProductDetail.jsx
pdp_path = r'C:\Users\Admin\.gemini\antigravity\scratch\namma-print-house-store\src\pages\ProductDetail.jsx'
with open(pdp_path, 'r', encoding='utf-8') as f:
    pdp = f.read()

# Remove state
pdp = re.sub(r"  const \[selectedColor, setSelectedColor\] = useState\(''\);\n", "", pdp)

# Clean handleAddToCart
addToCart_old = """  const handleAddToCart = () => {
    if (product.colors && product.colors.length > 0 && !selectedColor) {
      alert("Please select a color");
      return;
    }

    if (product.category === 'couples') {
      if (bundleOption === 'set') {
        if (!menSize || !womenSize) {
          alert("Please select sizes for both Men and Women");
          return;
        }
        const colorStr = selectedColor ? ` | Color: ${selectedColor}` : '';
        addToCart(product, `Set (Men: ${menSize}, Women: ${womenSize})${colorStr}`, product.price, product.originalPrice);
      } else if (bundleOption === 'men') {
        if (!menSize) { alert("Please select a size"); return; }
        const colorStr = selectedColor ? ` | Color: ${selectedColor}` : '';
        addToCart(product, `Men's Only (${menSize})${colorStr}`, 699, 1299);
      } else if (bundleOption === 'women') {
        if (!womenSize) { alert("Please select a size"); return; }
        const colorStr = selectedColor ? ` | Color: ${selectedColor}` : '';
        addToCart(product, `Women's Only (${womenSize})${colorStr}`, 699, 1299);
      }
    } else {
      if (!selectedSize) {
        alert("Please select a size");
        return;
      }
      const colorStr = selectedColor ? ` | Color: ${selectedColor}` : '';
      addToCart(product, `${selectedSize}${colorStr}`);
    }
    navigate('/cart');
  };"""

addToCart_new = """  const handleAddToCart = () => {
    if (product.category === 'couples') {
      if (bundleOption === 'set') {
        if (!menSize || !womenSize) {
          alert("Please select sizes for both Men and Women");
          return;
        }
        addToCart(product, `Set (Men: ${menSize}, Women: ${womenSize})`, product.price, product.originalPrice);
      } else if (bundleOption === 'men') {
        if (!menSize) { alert("Please select a size"); return; }
        addToCart(product, `Men's Only (${menSize})`, 699, 1299);
      } else if (bundleOption === 'women') {
        if (!womenSize) { alert("Please select a size"); return; }
        addToCart(product, `Women's Only (${womenSize})`, 699, 1299);
      }
    } else {
      if (!selectedSize) {
        alert("Please select a size");
        return;
      }
      addToCart(product, `${selectedSize}`);
    }
    navigate('/cart');
  };"""

pdp = pdp.replace(addToCart_old, addToCart_new)

# Revert Image SRC
img_src_old = """            <img 
              src={(product.colorImages && selectedColor && product.colorImages[selectedColor]) || product.images[activeImageIdx]} 
              alt={product.title} 
              className="pdp-main-image" 
            />"""

img_src_new = """            <img 
              src={product.images[activeImageIdx]} 
              alt={product.title} 
              className="pdp-main-image" 
            />"""

pdp = pdp.replace(img_src_old, img_src_new)

# Remove color UI block
color_ui_pattern = re.compile(r"          \{\/\* Color Selection \*\/\}[\s\S]*?          \}\)\}\n              <\/div>\n            <\/div>\n          \)\}\n", re.MULTILINE)
pdp = color_ui_pattern.sub("", pdp)

with open(pdp_path, 'w', encoding='utf-8') as f:
    f.write(pdp)

print("ProductDetail.jsx reverted.")

# 2. Revert catalog.js
cat_path = r'C:\Users\Admin\.gemini\antigravity\scratch\namma-print-house-store\src\data\catalog.js'
with open(cat_path, 'r', encoding='utf-8') as f:
    cat = f.read()

colors_pattern = re.compile(r"(\s+colors: \['White', 'Black', 'Cream', 'Trending Blue', 'Red', 'Brown', 'Orange'\],\s+colorImages: \{[\s\S]*?\},)")
cat = colors_pattern.sub("", cat)

with open(cat_path, 'w', encoding='utf-8') as f:
    f.write(cat)

print("catalog.js reverted.")
