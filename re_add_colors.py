import re
import os

# 1. Update ProductDetail.jsx
pdp_path = r'C:\Users\Admin\.gemini\antigravity\scratch\namma-print-house-store\src\pages\ProductDetail.jsx'
with open(pdp_path, 'r', encoding='utf-8') as f:
    pdp = f.read()

# Add state
pdp = pdp.replace("  const [selectedSize, setSelectedSize] = useState('');", "  const [selectedSize, setSelectedSize] = useState('');\n  const [selectedColor, setSelectedColor] = useState('');")

# Revert handleAddToCart
addToCart_new = """  const handleAddToCart = () => {
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

addToCart_old = """  const handleAddToCart = () => {
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
        if (!menSize) { alert("Please select a size"); return; }
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

# Sometimes the women bundle condition might have a bug in my previous script (!menSize instead of !womenSize)
# So let's just replace the whole function by finding it.
pattern_addToCart = re.compile(r"  const handleAddToCart = \(\) => \{[\s\S]*?navigate\('/cart'\);\n  \};")
pdp = pattern_addToCart.sub(addToCart_new, pdp)


# Add color UI block
color_ui = """
          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div className="pdp-color-section" style={{ marginBottom: '25px' }}>
              <div className="pdp-size-header">
                <h3>Select Color</h3>
                <span style={{ fontSize: '0.9rem', color: '#737373' }}>{selectedColor}</span>
              </div>
              <div className="color-options" style={{ display: 'flex', gap: '10px', marginTop: '10px', flexWrap: 'wrap' }}>
                {product.colors.map(color => {
                  const colorMap = {
                    'White': '#ffffff',
                    'Black': '#111111',
                    'Cream': '#fcf9f2',
                    'Trending Blue': '#3F51B5',
                    'Red': '#d32f2f',
                    'Brown': '#5C4033',
                    'Orange': '#ff7f50'
                  };
                  return (
                    <button 
                      key={color}
                      className={`color-swatch-btn ${selectedColor === color ? 'selected' : ''}`}
                      onClick={() => setSelectedColor(color)}
                      style={{ 
                        backgroundColor: colorMap[color] || color.toLowerCase(),
                        width: '36px', height: '36px', borderRadius: '50%', 
                        border: selectedColor === color ? '2px solid #51cccc' : (color === 'White' ? '1px solid #ddd' : 'none'),
                        outline: selectedColor === color ? '2px solid #fff' : 'none',
                        outlineOffset: '-4px',
                        cursor: 'pointer',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                      }}
                      title={color}
                    />
                  );
                })}
              </div>
            </div>
          )}
"""
pdp = pdp.replace("          {/* Size Selection */}", color_ui + "\n          {/* Size Selection */}")

# Revert Image SRC
img_src_old = """            <img 
              src={product.images[activeImageIdx]} 
              alt={product.title} 
              className="pdp-main-image" 
            />"""

img_src_new = """            <img 
              src={(product.colorImages && selectedColor && product.colorImages[selectedColor]) || product.images[activeImageIdx]} 
              alt={product.title} 
              className="pdp-main-image" 
            />"""

pdp = pdp.replace(img_src_old, img_src_new)

with open(pdp_path, 'w', encoding='utf-8') as f:
    f.write(pdp)


# 2. Update catalog.js
cat_path = r'C:\Users\Admin\.gemini\antigravity\scratch\namma-print-house-store\src\data\catalog.js'
with open(cat_path, 'r', encoding='utf-8') as f:
    cat = f.read()

def replacer(match):
    id_str = match.group(1)
    
    inject = f"""{id_str}
    colors: ['White', 'Black', 'Cream', 'Trending Blue', 'Red', 'Brown', 'Orange'],
    colorImages: {{
      'White': '/images/m6-White_v6.jpg',
      'Black': '/images/m6-Black_v6.jpg',
      'Cream': '/images/m6-Cream_v6.jpg',
      'Trending Blue': '/images/m6-Trending-Blue_v6.jpg',
      'Red': '/images/m6-Red_v6.jpg',
      'Brown': '/images/m6-Brown_v6.jpg',
      'Orange': '/images/m6-Orange_v6.jpg'
    }},"""
    return inject

pattern = re.compile(r"(id:\s*'m6',)")
cat = pattern.sub(replacer, cat)

with open(cat_path, 'w', encoding='utf-8') as f:
    f.write(cat)

print("ProductDetail.jsx and catalog.js updated.")
