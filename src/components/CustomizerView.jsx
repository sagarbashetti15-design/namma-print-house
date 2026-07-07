import React, { useState, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { IoCloudUploadOutline, IoTrashOutline, IoInformationCircleOutline, IoMoveOutline, IoTextOutline, IoReloadOutline, IoSyncOutline } from 'react-icons/io5';
import './CustomizerView.css';

const CustomizerView = ({ product }) => {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const fileInputRef = useRef(null);
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedColor, setSelectedColor] = useState('White');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedGender, setSelectedGender] = useState('Men'); // Default to Men to show a model initially

  // Color map for plain t-shirt SVG tinting
  const tshirtColorMap = {
    'White':  'brightness(1.08) saturate(0)',
    'Black':  'brightness(0.08) saturate(0)',
    'Red':    'brightness(0.7) saturate(5) hue-rotate(330deg)',
    'Cream':  'brightness(1.05) sepia(0.3) saturate(0.8)',
    'Brown':  'brightness(0.5) sepia(1) saturate(1.5)',
  };

  const getMockupImage = () => {
    // Use plain SVG t-shirt for all colors, genders and sides
    return printSide === 'Back'
      ? `/images/plain-tshirt-back.svg`
      : `/images/plain-tshirt-front.svg`;
  };

  const getMockupStyle = () => ({
    filter: tshirtColorMap[selectedColor] || tshirtColorMap['White'],
    transition: 'filter 0.3s ease',
  });

  
  // Customizer canvas states
  const [printSide, setPrintSide] = useState('Front'); // 'Front' or 'Back'

  // Front Design States
  const [uploadedImageFront, setUploadedImageFront] = useState(null);
  const [imgPosFront, setImgPosFront] = useState({ x: 0, y: 0 });
  const [imgScaleFront, setImgScaleFront] = useState(80);
  const [selectedFilterFront, setSelectedFilterFront] = useState('Normal');
  const [customTextFront, setCustomTextFront] = useState('');
  const [textPosFront, setTextPosFront] = useState({ x: 0, y: -50 });
  const [textScaleFront, setTextScaleFront] = useState(100);
  const [textFontFront, setTextFontFront] = useState('Impact');
  const [textColorFront, setTextColorFront] = useState('#ffffff');

  // Back Design States
  const [uploadedImageBack, setUploadedImageBack] = useState(null);
  const [imgPosBack, setImgPosBack] = useState({ x: 0, y: 0 });
  const [imgScaleBack, setImgScaleBack] = useState(80);
  const [selectedFilterBack, setSelectedFilterBack] = useState('Normal');
  const [customTextBack, setCustomTextBack] = useState('');
  const [textPosBack, setTextPosBack] = useState({ x: 0, y: -50 });
  const [textScaleBack, setTextScaleBack] = useState(100);
  const [textFontBack, setTextFontBack] = useState('Impact');
  const [textColorBack, setTextColorBack] = useState('#ffffff');

  // Active getters/setters based on current print side
  const uploadedImage = printSide === 'Front' ? uploadedImageFront : uploadedImageBack;
  const setUploadedImage = printSide === 'Front' ? setUploadedImageFront : setUploadedImageBack;

  const imgPos = printSide === 'Front' ? imgPosFront : imgPosBack;
  const setImgPos = printSide === 'Front' ? setImgPosFront : setImgPosBack;

  const imgScale = printSide === 'Front' ? imgScaleFront : imgScaleBack;
  const setImgScale = printSide === 'Front' ? setImgScaleFront : setImgScaleBack;

  const selectedFilter = printSide === 'Front' ? selectedFilterFront : selectedFilterBack;
  const setSelectedFilter = printSide === 'Front' ? setSelectedFilterFront : setSelectedFilterBack;

  const customText = printSide === 'Front' ? customTextFront : customTextBack;
  const setCustomText = printSide === 'Front' ? setCustomTextFront : setCustomTextBack;

  const textPos = printSide === 'Front' ? textPosFront : textPosBack;
  const setTextPos = printSide === 'Front' ? setTextPosFront : setTextPosBack;

  const textScale = printSide === 'Front' ? textScaleFront : textScaleBack;
  const setTextScale = printSide === 'Front' ? setTextScaleFront : setTextScaleBack;

  const textFont = printSide === 'Front' ? textFontFront : textFontBack;
  const setTextFont = printSide === 'Front' ? setTextFontFront : setTextFontBack;

  const textColor = printSide === 'Front' ? textColorFront : textColorBack;
  const setTextColor = printSide === 'Front' ? setTextColorFront : setTextColorBack;

  const getFilterStyle = (filter) => {
    switch (filter) {
      case 'Grayscale': return 'grayscale(100%) contrast(120%)';
      case 'Duo-tone': return 'grayscale(100%) sepia(100%) hue-rotate(180deg) saturate(300%) contrast(130%)';
      case 'Halftone': return 'contrast(250%) saturate(0%) brightness(110%)';
      case 'Chrome': return 'invert(90%) contrast(200%) brightness(95%)';
      default: return 'none';
    }
  };

  const fontOptions = ['Impact', 'Arial', 'Courier New', 'Georgia', 'Trebuchet MS'];
  const textColorMap = {
    'White': '#ffffff',
    'Black': '#111111',
    'Neon Yellow': '#eaff00',
    'Flame Red': '#ff3333',
    'Royal Blue': '#3366ff',
    'Street Orange': '#ff6600',
    'Neon Green': '#33ff33'
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
      showToast("Design image uploaded successfully!", "success");
    }
  };

  const removeImage = () => {
    setUploadedImage(null);
    setImgPos({ x: 0, y: 0 });
    setImgScale(80);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    showToast("Design image removed", "info");
  };

  const resetWorkspace = () => {
    setImgPos({ x: 0, y: 0 });
    setImgScale(80);
    setTextPos({ x: 0, y: -50 });
    setTextScale(100);
    setCustomText('');
    showToast("Workspace alignment reset", "info");
  };

  // Reusable React Dragging hook-like implementation
  const handleDragStart = (e, element) => {
    e.preventDefault();
    const isTouch = e.type.startsWith('touch');
    const startX = isTouch ? e.touches[0].clientX : e.clientX;
    const startY = isTouch ? e.touches[0].clientY : e.clientY;
    
    const initialPos = element === 'image' ? imgPos : textPos;

    const handleDragMove = (moveEvent) => {
      const currentX = isTouch ? moveEvent.touches[0].clientX : moveEvent.clientX;
      const currentY = isTouch ? moveEvent.touches[0].clientY : moveEvent.clientY;
      
      const dx = currentX - startX;
      const dy = currentY - startY;

      if (element === 'image') {
        setImgPos({
          x: initialPos.x + dx,
          y: initialPos.y + dy
        });
      } else {
        setTextPos({
          x: initialPos.x + dx,
          y: initialPos.y + dy
        });
      }
    };

    const handleDragEnd = () => {
      window.removeEventListener(isTouch ? 'touchmove' : 'mousemove', handleDragMove);
      window.removeEventListener(isTouch ? 'touchend' : 'mouseup', handleDragEnd);
    };

    window.addEventListener(isTouch ? 'touchmove' : 'mousemove', handleDragMove);
    window.addEventListener(isTouch ? 'touchend' : 'mouseup', handleDragEnd);
  };

  const capturePreviews = async () => {
    setIsGenerating(true);
    const canvasEl = document.querySelector('.tshirt-preview-wrapper');
    const originalSide = printSide;
    
    // Hide drag handles and helpers for clean capture
    const handles = document.querySelectorAll('.drag-handle-badge');
    handles.forEach(h => h.style.display = 'none');
    const emptyArea = document.querySelector('.empty-print-area');
    if (emptyArea) emptyArea.style.display = 'none';
    const label = document.querySelector('.print-area-label');
    if (label) label.style.display = 'none';
    
    let frontDataUrl = null;
    let backDataUrl = null;
    
    // Capture Front
    setPrintSide('Front');
    await new Promise(r => setTimeout(r, 150)); // let DOM update
      if (uploadedImageFront || customTextFront) {
        const html2canvas = (await import('html2canvas')).default;
        const canvasFront = await html2canvas(canvasEl, { useCORS: true, backgroundColor: null });
      frontDataUrl = canvasFront.toDataURL('image/png');
    }
    
    // Capture Back
    setPrintSide('Back');
    await new Promise(r => setTimeout(r, 150)); // let DOM update
      if (uploadedImageBack || customTextBack) {
        const html2canvas = (await import('html2canvas')).default;
        const canvasBack = await html2canvas(canvasEl, { useCORS: true, backgroundColor: null });
      backDataUrl = canvasBack.toDataURL('image/png');
    }
    
    // Restore state
    setPrintSide(originalSide);
    handles.forEach(h => h.style.display = '');
    if (emptyArea) emptyArea.style.display = '';
    if (label) label.style.display = '';
    setIsGenerating(false);
    
    return { frontDataUrl, backDataUrl };
  };

  const handleAddToCart = async () => {
    const hasFrontDesign = uploadedImageFront || customTextFront;
    const hasBackDesign = uploadedImageBack || customTextBack;
    
    if (!hasFrontDesign && !hasBackDesign) {
      showToast("Please add a design before adding to cart", "warning");
      return;
    }
    if (!selectedSize) {
      showToast("Please select a size", "warning");
      return;
    }

    const { frontDataUrl, backDataUrl } = await capturePreviews();
    
    let details = [];
    details.push(`Color: ${selectedColor}`);
    details.push(`Size: ${selectedSize}`);
    details.push(`Gender: ${selectedGender}`);
    
    if (hasFrontDesign) {
      let frontStr = "Front: [";
      if (uploadedImageFront) frontStr += "Custom Graphic";
      if (customTextFront) frontStr += (uploadedImageFront ? " + " : "") + `Text: "${customTextFront}" (${textFontFront}/${textColorFront})`;
      frontStr += "]";
      details.push(frontStr);
    }
    
    if (hasBackDesign) {
      let backStr = "Back: [";
      if (uploadedImageBack) backStr += "Custom Graphic";
      if (customTextBack) backStr += (uploadedImageBack ? " + " : "") + `Text: "${customTextBack}" (${textFontBack}/${textColorBack})`;
      backStr += "]";
      details.push(backStr);
    }
    
    const configStr = details.join(' | ');
    
    const productCopy = { 
      ...product, 
      image: frontDataUrl || backDataUrl || product.colorImages[selectedColor],
      customImages: { front: frontDataUrl, back: backDataUrl },
      title: `Custom ${selectedColor} T-Shirt (${hasFrontDesign && hasBackDesign ? 'Double-Sided' : hasFrontDesign ? 'Front Print' : 'Back Print'})`
    };
    
    addToCart(productCopy, configStr);
    showToast("Custom design added to cart!", "success", productCopy.image);
  };

  return (
    <div className="customizer-container">
      <div className="customizer-layout">
        
        {/* Left Side: Drag & Drop Interactive Preview Area */}
        <div className="customizer-preview-area">
          <div className="preview-sticky-wrap">
            
            {/* Front / Back Toggle Tabs */}
            <div className="print-side-tabs">
              <button 
                className={`side-tab-btn ${printSide === 'Front' ? 'active' : ''}`}
                onClick={() => setPrintSide('Front')}
              >
                FRONT VIEW
              </button>
              <button 
                className={`side-tab-btn ${printSide === 'Back' ? 'active' : ''}`}
                onClick={() => setPrintSide('Back')}
              >
                BACK VIEW
              </button>
            </div>

            <div className="tshirt-preview-wrapper">
              <img 
                src={getMockupImage()} 
                alt={`Plain ${selectedColor} T-Shirt ${printSide} View`} 
                className="base-tshirt" 
                style={getMockupStyle()}
              />
              
              {/* Dynamic Print Bounds Overlay */}
              <div className="print-area">
                <div className="print-area-label">{printSide} Printable Area</div>
                
                {/* Uploaded Image element (draggable) */}
                {uploadedImage && (
                  <div 
                    className="draggable-wrapper"
                    style={{
                      transform: `translate(${imgPos.x}px, ${imgPos.y}px)`,
                      width: `${imgScale}%`
                    }}
                  >
                    <img 
                      src={uploadedImage} 
                      alt="User Design Overlay" 
                      className="uploaded-design" 
                      style={{ filter: getFilterStyle(selectedFilter) }}
                      onMouseDown={(e) => handleDragStart(e, 'image')}
                      onTouchStart={(e) => handleDragStart(e, 'image')}
                    />
                    <div className="drag-handle-badge" title="Drag to reposition">
                      <IoMoveOutline size={12} />
                    </div>
                  </div>
                )}

                {/* Custom Text Overlay (draggable) */}
                {customText && (
                  <div 
                    className="draggable-wrapper text-draggable-wrapper"
                    style={{
                      transform: `translate(${textPos.x}px, ${textPos.y}px) scale(${textScale / 100})`,
                      color: textColor,
                      fontFamily: textFont === 'Impact' 
                        ? "Impact, Charcoal, 'Outfit', 'Inter', 'Noto Sans', sans-serif" 
                        : `${textFont}, 'Outfit', 'Inter', 'Noto Sans', sans-serif`,
                    }}
                    onMouseDown={(e) => handleDragStart(e, 'text')}
                    onTouchStart={(e) => handleDragStart(e, 'text')}
                  >
                    <span className="overlay-custom-text">{customText}</span>
                    <div className="drag-handle-badge text-badge" title="Drag to reposition">
                      <IoTextOutline size={12} />
                    </div>
                  </div>
                )}

                {!uploadedImage && !customText && (
                  <div className="empty-print-area">
                    <span>Upload an image or type text below to begin customizing</span>
                  </div>
                )}
              </div>
            </div>

            <div className="preview-instructions">
              <IoMoveOutline size={14} /> Click & drag graphic/text elements directly on the shirt to position them.
            </div>
          </div>
        </div>
        
        {/* Right Side: Workspace Controls */}
        <div className="customizer-controls">
          <div className="cc-header">
            <span className="cc-badge">{product.tag}</span>
            <h1 className="cc-title">{product.title}</h1>
            <p className="cc-desc">{product.description}</p>
            <div className="cc-price">₹{product.price} <span className="cc-orig-price">₹{product.originalPrice}</span></div>
          </div>
          
          {/* Action Row: Reset Workspace */}
          {(uploadedImage || customText) && (
            <button className="reset-ws-btn" onClick={resetWorkspace}>
              <IoReloadOutline size={14} /> Reset Graphic Position & Scaling
            </button>
          )}

          {/* Section 1: Image Upload */}
          <div className="cc-section">
            <div className="cc-section-header">
              <h3>1. Graphic Design</h3>
              {uploadedImage && (
                <button className="text-danger-btn" onClick={removeImage}>
                  <IoTrashOutline size={14} /> Remove Image
                </button>
              )}
            </div>
            
            {!uploadedImage ? (
              <div className="upload-box">
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageUpload} 
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  id="upload-design"
                />
                <label htmlFor="upload-design" className="upload-btn">
                  <IoCloudUploadOutline size={18} /> Upload Logo / Graphic
                </label>
                <p className="upload-hint"><IoInformationCircleOutline size={12}/> High resolution transparent PNGs recommended.</p>
              </div>
            ) : (
              <div className="scale-control-group">
                <label className="range-label">
                  <span>Graphic Scaling</span>
                  <span className="range-val">{imgScale}%</span>
                </label>
                <input 
                  type="range" 
                  min="30" 
                  max="180" 
                  value={imgScale}
                  onChange={(e) => setImgScale(parseInt(e.target.value))}
                  className="sp-range-input"
                />

                {/* Streetwear Studio Filters */}
                <div className="studio-filters-section" style={{ marginTop: '20px' }}>
                  <label className="range-label" style={{ marginBottom: '8px' }}>
                    <span>Studio Print Filter</span>
                    <span className="range-val" style={{ textTransform: 'uppercase', color: '#51cccc', fontWeight: 'bold' }}>{selectedFilter}</span>
                  </label>
                  <div className="filter-buttons-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                    {['Normal', 'Grayscale', 'Duo-tone', 'Halftone', 'Chrome'].map(filterName => (
                      <button
                        key={filterName}
                        type="button"
                        className={`filter-option-btn ${selectedFilter === filterName ? 'active' : ''}`}
                        onClick={() => setSelectedFilter(filterName)}
                      >
                        {filterName}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Section 2: Custom Text Tool */}
          <div className="cc-section">
            <h3>2. Text Customization</h3>
            
            <div className="text-tool-wrapper">
              <input 
                type="text" 
                placeholder="Type custom text (e.g. NAMMA, Pujar, 26)..."
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                className="custom-text-input"
                maxLength={25}
              />
              
              {customText && (
                <div className="text-tool-controls">
                  <div className="tool-row">
                    <label>Font Style:</label>
                    <div className="font-options-list">
                      {fontOptions.map(font => (
                        <button 
                          key={font} 
                          className={`font-btn ${textFont === font ? 'active' : ''}`}
                          onClick={() => setTextFont(font)}
                          style={{ fontFamily: font }}
                        >
                          {font === 'Trebuchet MS' ? 'Treb' : font}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="tool-row">
                    <label>Text Color:</label>
                    <div className="color-swatches-row">
                      {Object.keys(textColorMap).map(colorName => (
                        <button 
                          key={colorName}
                          className={`text-color-swatch ${textColor === textColorMap[colorName] ? 'selected' : ''}`}
                          style={{ backgroundColor: textColorMap[colorName] }}
                          onClick={() => setTextColor(textColorMap[colorName])}
                          title={colorName}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="scale-control-group" style={{ marginTop: '10px' }}>
                    <label className="range-label">
                      <span>Text Scaling</span>
                      <span className="range-val">{textScale}%</span>
                    </label>
                    <input 
                      type="range" 
                      min="40" 
                      max="200" 
                      value={textScale}
                      onChange={(e) => setTextScale(parseInt(e.target.value))}
                      className="sp-range-input"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Section 3: T-Shirt Color */}
          <div className="cc-section">
            <h3>3. T-Shirt Fabric Color</h3>
            <div className="color-options">
              {product.colors.map(color => {
                const customColorMap = {
                  'Red': '#d32f2f',
                  'White': '#ffffff',
                  'Black': '#111111',
                  'Cream': '#fcf9f2',
                  'Brown': '#5C4033'
                };
                return (
                  <button 
                    key={color}
                    className={`color-btn ${selectedColor === color ? 'active' : ''}`}
                    onClick={() => setSelectedColor(color)}
                    style={{ 
                      backgroundColor: customColorMap[color] || color.toLowerCase(),
                      border: color === 'White' ? '1px solid #ccc' : 'none'
                    }}
                    title={color}
                  />
                );
              })}
            </div>
          </div>
          
          {/* Section 4: Gender & Size */}
          <div className="customizer-options-grid">
            <div className="cc-section" style={{ marginBottom: 0 }}>
              <h3>4. Fit / Gender</h3>
              <div className="gender-options">
                <button 
                  className={`gender-btn ${selectedGender === 'Men' ? 'active' : ''}`}
                  onClick={() => setSelectedGender('Men')}
                >Men</button>
                <button 
                  className={`gender-btn ${selectedGender === 'Women' ? 'active' : ''}`}
                  onClick={() => setSelectedGender('Women')}
                >Women</button>
              </div>
            </div>
            
            <div className="cc-section" style={{ marginBottom: 0 }}>
              <h3>5. Select Size</h3>
              <div className="size-options">
                {product.sizes.map(size => (
                  <button 
                    key={size}
                    className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >{size}</button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Section 5: Add to Cart */}
          <button className="add-to-cart-btn custom-cart-btn" onClick={handleAddToCart} disabled={isGenerating}>
            {isGenerating ? <><IoSyncOutline size={18} className="spin-icon" /> GENERATING PREVIEW...</> : `ADD TO BAG - ₹${product.price}`}
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default CustomizerView;
