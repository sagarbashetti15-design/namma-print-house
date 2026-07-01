import React, { useState } from 'react';
import { collection, onSnapshot, query, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useCatalog } from '../context/CatalogContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import CustomizerView from '../components/CustomizerView';
import SizePredictorModal from '../components/SizePredictorModal';
import { Star, Heart, ShoppingBag, ShieldCheck, RefreshCcw, Truck, ChevronDown, ChevronUp, FileText, X, Ruler } from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import './ProductDetail.css';

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { products, loading, marketing: marketingConfig } = useCatalog();

  const product = products.find(p => p.id === productId);
  useDocumentTitle(product ? product.title : 'Product Not Found');

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();
  
  // Read color query parameter from URL
  const queryParams = new URLSearchParams(location.search);
  const initialColor = queryParams.get('color') || '';
  
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState(initialColor);
  const [bundleOption, setBundleOption] = useState('set'); // 'set', 'men', 'women'
  const [menSize, setMenSize] = useState('');
  const [womenSize, setWomenSize] = useState('');
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [isImageLightboxOpen, setIsImageLightboxOpen] = useState(false);
  
  // Accordion state
  const [openAccordion, setOpenAccordion] = useState('');
  
  // New features state
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isSizePredictorOpen, setIsSizePredictorOpen] = useState(false);
  const [activeSizeTab, setActiveSizeTab] = useState('chart'); // 'chart', 'measure', 'fit'
  const [activeReviewTab, setActiveReviewTab] = useState('product'); // 'product', 'brand'
  
  // Pincode state
  const [pincode, setPincode] = useState('');
  const [deliveryStatus, setDeliveryStatus] = useState(null);

  // Reviews state
  const [selectedReviewRating, setSelectedReviewRating] = useState('all');
  const [reviewLightboxPhoto, setReviewLightboxPhoto] = useState(null);
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const [newReview, setNewReview] = useState({ author: '', rating: 5, comment: '' });

  const [mktDiscount, setMktDiscount] = React.useState(null);

  const [dynamicReviews, setDynamicReviews] = useState(product ? [
    {
      id: 1,
      author: "Rahul S.",
      rating: 5,
      date: "2 days ago",
      comment: `Absolutely in love with the print quality! The ${product.title.replace("Men's ", "").replace("Women's ", "")} graphic looks amazing. The fabric is thick and heavy (perfect 240 GSM oversized fit). Thoda Hawa Aane De indeed!`,
      verified: true,
      photos: [product.image],
      fit: "Fits loose / Oversized"
    },
    {
      id: 2,
      author: "Aditi G.",
      rating: 5,
      date: "1 week ago",
      comment: `Super premium streetwear packaging. The ${product.title.replace("Men's ", "").replace("Women's ", "")} is very cool. Bought size M, fits like a classic baggy fit. Highly recommended!`,
      verified: true,
      photos: [],
      fit: "True to size"
    },
    {
      id: 3,
      author: "Vikram P.",
      rating: 4,
      date: "2 weeks ago",
      comment: `Heavyweight cotton feels very premium. The ${product.title.replace("Men's ", "").replace("Women's ", "")} design looks stellar. Deducted 1 star because delivery took 4 days to Mumbai, but customer support was very helpful on WhatsApp.`,
      verified: true,
      photos: [product.colorImages && Object.values(product.colorImages)[0] ? Object.values(product.colorImages)[0] : product.image],
      fit: "Fits slightly large"
    },
    {
      id: 4,
      author: "Neha K.",
      rating: 5,
      date: "3 weeks ago",
      comment: `Perfect oversized t-shirt. The ${product.title.replace("Men's ", "").replace("Women's ", "")} print doesn't fade or crack after washing. Will buy couples set next time!`,
      verified: true,
      photos: [],
      fit: "Fits loose / Oversized"
    }
  ] : []);

  const [brandReviews, setBrandReviews] = useState([
    {
      id: 1,
      author: "Karthik R.",
      rating: 5,
      date: "1 month ago",
      comment: "Namma Print House is the best custom printer in Bengaluru. Super easy to order custom designs on WhatsApp, and fast dispatch."
    },
    {
      id: 2,
      author: "Divya M.",
      rating: 5,
      date: "1 month ago",
      comment: "Amazing quality, secure payments, and very responsive customer support."
    }
  ]);

  React.useEffect(() => {
    if (!product) return;
    const q = query(collection(db, 'reviews'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const dbReviews = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      const newDynamicReviews = dbReviews.filter(r => r.type === 'product' && r.productId === product.id);
      const newBrandReviews = dbReviews.filter(r => r.type === 'brand');

      newDynamicReviews.sort((a, b) => b.createdAt - a.createdAt);
      newBrandReviews.sort((a, b) => b.createdAt - a.createdAt);
      
      setDynamicReviews(prev => {
        const hardcoded = prev.filter(p => p.id <= 4); // keep hardcoded ones which have id 1-4
        return [...newDynamicReviews, ...hardcoded];
      });
      setBrandReviews(prev => {
        const hardcoded = prev.filter(p => p.id <= 2);
        return [...newBrandReviews, ...hardcoded];
      });
    });
    return () => unsubscribe();
  }, [product]);

  React.useEffect(() => {
    if (marketingConfig && marketingConfig.discountData && marketingConfig.discountData.type !== 'none' && marketingConfig.discountData.value > 0) {
      setMktDiscount(marketingConfig.discountData);
    } else {
      setMktDiscount(null);
    }
  }, [marketingConfig]);

  if (loading) return <div className="container" style={{ padding: '40px 1rem', minHeight: '60vh' }}>Loading product details...</div>;

  if (!product) {
    return <div className="container" style={{ padding: '40px 1rem' }}>Product not found</div>;
  }

  // Route to specific customizers
  if (product.isVisualCustomizer) {
    return <CustomizerView product={product} />;
  }

  const isWished = isInWishlist(product.id);

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (product.outOfStock) {
      showToast("This product is currently out of stock", "error");
      return;
    }

    if (product.colors && product.colors.length > 0 && !selectedColor) {
      showToast("Please select a color", "warning");
      return;
    }

    if (product.category === 'couples') {
      if (bundleOption === 'set') {
        if (!menSize || !womenSize) {
          showToast("Please select sizes for both Men and Women", "warning");
          return;
        }
        if ((product.outOfStockSizes && product.outOfStockSizes.includes(menSize)) || 
            (product.outOfStockSizes && product.outOfStockSizes.includes(womenSize))) {
          showToast("One of the selected sizes is out of stock", "error");
          return;
        }
        const colorStr = selectedColor ? ` | Color: ${selectedColor}` : '';
        addToCart(product, `Set (Men: ${menSize}, Women: ${womenSize})${colorStr}`, product.price, product.originalPrice);
      } else if (bundleOption === 'men') {
        if (!menSize) { showToast("Please select a size", "warning"); return; }
        if (product.outOfStockSizes && product.outOfStockSizes.includes(menSize)) {
          showToast("Selected size is out of stock", "error");
          return;
        }
        const colorStr = selectedColor ? ` | Color: ${selectedColor}` : '';
        addToCart(product, `Men's Only (${menSize})${colorStr}`, 699, 1299);
      } else if (bundleOption === 'women') {
        if (!womenSize) { showToast("Please select a size", "warning"); return; }
        if (product.outOfStockSizes && product.outOfStockSizes.includes(womenSize)) {
          showToast("Selected size is out of stock", "error");
          return;
        }
        const colorStr = selectedColor ? ` | Color: ${selectedColor}` : '';
        addToCart(product, `Women's Only (${womenSize})${colorStr}`, 699, 1299);
      }
    } else {
      if (!selectedSize) {
        showToast("Please select a size", "warning");
        return;
      }
      if (product.outOfStockSizes && product.outOfStockSizes.includes(selectedSize)) {
        showToast("Selected size is out of stock", "error");
        return;
      }
      const colorStr = selectedColor ? ` | Color: ${selectedColor}` : '';
      addToCart(product, `${selectedSize}${colorStr}`);
    }
    showToast(`${product.title} added to cart!`, "success", product.image);
  };

  const displayPrice = product.category === 'couples' && bundleOption !== 'set' ? 699 : product.price;
  const displayOriginalPrice = product.category === 'couples' && bundleOption !== 'set' ? 1299 : product.originalPrice;
  const discountPercent = Math.round(((displayOriginalPrice - displayPrice) / displayOriginalPrice) * 100);



  const isEligibleForDiscount = mktDiscount && (mktDiscount.applicableCategory === 'all' || product.category === mktDiscount.applicableCategory);

  const mktDiscountedPrice = isEligibleForDiscount
    ? mktDiscount.type === 'percent'
      ? Math.round(displayPrice * (1 - mktDiscount.value / 100))
      : Math.max(displayPrice - mktDiscount.value, 0)
    : null;

  const mktDiscountLabel = isEligibleForDiscount
    ? mktDiscount.type === 'percent'
      ? `${mktDiscount.value}% OFF`
      : `₹${mktDiscount.value} OFF`
    : null;

  const toggleAccordion = (name) => {
    setOpenAccordion(openAccordion === name ? '' : name);
  };

  const handlePincodeCheck = async () => {
    if (pincode.trim().length === 6 && !isNaN(pincode)) {
      setDeliveryStatus('loading');
      try {
        const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
        const data = await response.json();
        if (data && data[0] && data[0].Status === 'Success' && data[0].PostOffice && data[0].PostOffice.length > 0) {
          const postOffice = data[0].PostOffice[0];
          const location = `${postOffice.Name}, ${postOffice.District}, ${postOffice.State}`;
          setDeliveryStatus(`available:${location}`);
        } else {
          setDeliveryStatus('invalid');
        }
      } catch (error) {
        setDeliveryStatus('available:PAN India'); // fallback
      }
    } else {
      setDeliveryStatus('invalid');
    }
  };

  return (
    <div className="pdp-wrapper">
      <div className="pdp-container">
        
        {/* Left Column: Media */}
        <div className="pdp-media-section">
          <div className="pdp-thumbnails">
            {product.images.map((img, idx) => (
              <img 
                key={idx} 
                src={img} 
                alt={`Thumbnail ${idx}`} 
                className={`thumbnail-img ${activeImageIdx === idx ? 'active' : ''}`}
                onMouseEnter={() => setActiveImageIdx(idx)}
                onClick={() => setActiveImageIdx(idx)}
              />
            ))}
          </div>

          <div className="pdp-main-image-container" onClick={() => setIsImageLightboxOpen(true)} style={{ cursor: 'zoom-in', position: 'relative' }}>
            <img 
              src={(product.colorImages && selectedColor && product.colorImages[selectedColor]) || product.images[activeImageIdx]} 
              alt={product.title} 
              className="pdp-main-image"
            />
            <div className="zoom-hint-badge" style={{
              position: 'absolute', bottom: '15px', right: '15px',
              backgroundColor: 'rgba(13, 40, 80, 0.8)', color: '#fff',
              fontSize: '0.72rem', padding: '6px 12px', borderRadius: '20px',
              fontFamily: 'Montserrat', fontWeight: 600, pointerEvents: 'none',
              backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', gap: '5px'
            }}>
              🔍 Click to Zoom
            </div>
          </div>
        </div>
        
        {/* Right Column: Details */}
        <div className="pdp-details-section">
          <h1 className="pdp-brand">NAMMA PRINT HOUSE X ORIGINALS</h1>
          <h2 className="pdp-title">{product.title}</h2>
          
          <div className="pdp-rating-badge">
            <Star size={14} fill="#F8B400" color="#F8B400" />
            <span>4.5</span>
            <span className="count">| 540</span>
          </div>

          <div className="pdp-pricing-section">
            {mktDiscountedPrice !== null ? (
              <>
                <span className="pdp-price" style={{ color: '#ff0844' }}>₹{mktDiscountedPrice}</span>
                <span className="pdp-original-price">₹{displayPrice}</span>
                <span className="pdp-discount" style={{ background: 'linear-gradient(135deg, #ff0844, #ff4e50)', color: '#fff', padding: '2px 10px', borderRadius: '4px' }}>
                  {mktDiscountLabel} SALE
                </span>
              </>
            ) : (
              <>
                <span className="pdp-price">₹{displayPrice}</span>
                <span className="pdp-original-price">₹{displayOriginalPrice}</span>
                <span className="pdp-discount">{discountPercent}% OFF</span>
              </>
            )}
          </div>
          <div className="pdp-tax-info">inclusive of all taxes</div>

          <div className="pdp-fabric-pill">Premium Dense Fabric</div>

          {/* Couples Bundle Selection */}
          {product.category === 'couples' && (
            <div className="bundle-options">
              <h3>Purchase Option</h3>
              <div className="bundle-radio-group">
                <label>
                  <input type="radio" name="bundle" value="set" checked={bundleOption === 'set'} onChange={() => setBundleOption('set')} />
                  Couple Set (₹1299)
                </label>
                <label>
                  <input type="radio" name="bundle" value="men" checked={bundleOption === 'men'} onChange={() => setBundleOption('men')} />
                  Men's Only (₹699)
                </label>
                <label>
                  <input type="radio" name="bundle" value="women" checked={bundleOption === 'women'} onChange={() => setBundleOption('women')} />
                  Women's Only (₹699)
                </label>
              </div>
            </div>
          )}



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
                    'Red': '#d32f2f',
                    'White': '#ffffff',
                    'Black': '#111111',
                    'Cream': '#fcf9f2',
                    'Brown': '#5C4033'
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

          {/* Size Selection */}
          <div className="pdp-size-section">
            <div className="pdp-size-header">
              <h3>Select Size</h3>
              <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                <span className="size-predictor-link" onClick={() => setIsSizePredictorOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', color: '#f8b400', cursor: 'pointer', fontWeight: 600 }}>
                  <Ruler size={14} /> Find your size
                </span>
                <span className="size-guide-link" onClick={() => setIsSizeGuideOpen(true)}>Size guide &gt;</span>
              </div>
            </div>

            {product.category === 'couples' ? (
              <>
                {(bundleOption === 'set' || bundleOption === 'men') && (
                  <div style={{ marginBottom: '15px' }}>
                    <h4 style={{ fontSize: '0.85rem', marginBottom: '8px', color: '#737373' }}>Men's Size</h4>
                    <div className="size-options">
                      {product.sizes.map(size => {
                        const isSizeOutOfStock = product.outOfStockSizes && product.outOfStockSizes.includes(size);
                        return (
                          <button 
                            key={`m-${size}`} 
                            className={`size-btn ${menSize === size ? 'selected' : ''} ${isSizeOutOfStock ? 'out-of-stock' : ''}`} 
                            disabled={isSizeOutOfStock}
                            onClick={() => !isSizeOutOfStock && setMenSize(size)}
                          >
                            {size}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
                {(bundleOption === 'set' || bundleOption === 'women') && (
                  <div>
                    <h4 style={{ fontSize: '0.85rem', marginBottom: '8px', color: '#737373' }}>Women's Size</h4>
                    <div className="size-options">
                      {product.sizes.map(size => {
                        const isSizeOutOfStock = product.outOfStockSizes && product.outOfStockSizes.includes(size);
                        return (
                          <button 
                            key={`w-${size}`} 
                            className={`size-btn ${womenSize === size ? 'selected' : ''} ${isSizeOutOfStock ? 'out-of-stock' : ''}`} 
                            disabled={isSizeOutOfStock}
                            onClick={() => !isSizeOutOfStock && setWomenSize(size)}
                          >
                            {size}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="size-options">
                {product.sizes.map(size => {
                  const isSizeOutOfStock = product.outOfStockSizes && product.outOfStockSizes.includes(size);
                  return (
                    <button 
                      key={size}
                      className={`size-btn ${selectedSize === size ? 'selected' : ''} ${isSizeOutOfStock ? 'out-of-stock' : ''}`}
                      disabled={isSizeOutOfStock}
                      onClick={() => !isSizeOutOfStock && setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="pdp-actions">
            <button 
              className={`add-to-bag-btn ${product.outOfStock ? 'out-of-stock-btn' : ''}`} 
              onClick={handleAddToCart}
              disabled={product.outOfStock}
            >
              {product.outOfStock ? 'SOLD OUT' : <><ShoppingBag size={20} /> ADD TO BAG</>}
            </button>
            <button 
              className={`wishlist-icon-btn ${isWished ? 'wished' : ''}`}
              onClick={() => {
                toggleWishlist(product);
                showToast(!isWished ? 'Added to Wishlist' : 'Removed from Wishlist', 'info', product.image);
              }}
            >
              <Heart size={24} fill={isWished ? 'currentColor' : 'none'} />
            </button>
          </div>

          {/* Scarcity, Dispatch & Trust Badges */}
          <div className="pdp-scarcity-delivery" style={{ margin: '20px 0', padding: '15px', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid rgba(13, 40, 80, 0.05)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {product.outOfStock ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#e53935', fontWeight: 'bold', fontSize: '0.95rem' }}>
                <span>❌ Out of Stock: This item is currently unavailable</span>
              </div>
            ) : (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ff3333', fontWeight: 'bold', fontSize: '0.9rem' }}>
                  <span>🔥 Only {((product.id.charCodeAt(0) % 4) + 2)} left in stock - selling fast!</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0d2850', fontSize: '0.85rem', fontWeight: 600 }}>
                  <span>⚡ Order within 4 hrs to dispatch tomorrow from Bengaluru!</span>
                </div>
              </>
            )}
            <div className="pdp-trust-badges" style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', marginTop: '10px', borderTop: '1px solid rgba(13, 40, 80, 0.08)', paddingTop: '10px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', flex: 1, gap: '4px' }}>
                <ShieldCheck size={20} style={{ color: '#51cccc' }} />
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0d2850' }}>Secure Checkout</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', flex: 1, gap: '4px' }}>
                <span style={{ fontSize: '12px', fontWeight: 800, color: '#0d2850', border: '1px solid #0d2850', padding: '2px 4px', borderRadius: '3px', lineHeight: 1, scale: '0.9' }}>240 GSM</span>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0d2850' }}>Premium Cotton</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', flex: 1, gap: '4px' }}>
                <RefreshCcw size={18} style={{ color: '#f8b400' }} />
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0d2850' }}>7-Day Returns</span>
              </div>
            </div>
          </div>

          {/* Offers */}
          <div className="pdp-offers">
            <div style={{ backgroundColor: '#fff', padding: '4px', borderRadius: '4px' }}>
              <span style={{ fontSize: '1.2rem' }}>🎉</span>
            </div>
            <div className="pdp-offers-text">
              <p>Save extra with these offers</p>
              <span>Get EXTRA 5% OFF on all Prepaid orders above Rs.1299.</span>
            </div>
          </div>

          {/* Delivery Details */}
          <div className="pdp-delivery">
            <h3>Check for Delivery Details</h3>
            <div className="pdp-delivery-input">
              <input 
                type="text" 
                placeholder="Enter Pincode" 
                aria-label="Enter Pincode"
                maxLength={6}
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
              />
              <button onClick={handlePincodeCheck}>Check</button>
            </div>
            {deliveryStatus === 'loading' && (
              <p style={{ fontSize: '0.85rem', color: '#737373', marginTop: '8px' }}>Checking location...</p>
            )}
            {deliveryStatus === 'invalid' && (
              <p style={{ color: 'red', fontSize: '0.85rem', marginTop: '8px' }}>Please enter a valid 6-digit Indian pincode.</p>
            )}
            {deliveryStatus && deliveryStatus.startsWith('available:') && (
              <div style={{ marginTop: '12px', fontSize: '0.85rem', color: '#333' }}>
                <p style={{ color: '#00b852', fontWeight: '600', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Truck size={16} /> Delivery available to {deliveryStatus.split(':')[1]} ({pincode})
                </p>
                <p style={{ color: '#737373' }}>We deliver PAN India! Expect delivery in 3-5 business days.</p>
              </div>
            )}
          </div>

          {/* Key Highlights */}
          <div className="pdp-highlights">
            <h3>Key Highlights</h3>
            <div className="highlights-grid">
              <div className="highlight-item">
                <p className="label">Design</p>
                <p className="val">Graphic Print</p>
              </div>
              <div className="highlight-item">
                <p className="label">Fit</p>
                <p className="val">Oversized Fit</p>
              </div>
              <div className="highlight-item">
                <p className="label">Neck</p>
                <p className="val">Round Neck</p>
              </div>
              <div className="highlight-item">
                <p className="label">Occasion</p>
                <p className="val">Casual Wear</p>
              </div>
              <div className="highlight-item">
                <p className="label">Sleeve Style</p>
                <p className="val">Half Sleeve</p>
              </div>
              <div className="highlight-item">
                <p className="label">Wash Care</p>
                <p className="val">Gentile Machine Wash</p>
              </div>
            </div>
          </div>

          {/* Accordions */}
          <div className="pdp-accordion">
            <div className="accordion-header" onClick={() => toggleAccordion('desc')}>
              <div className="accordion-header-left">
                <FileText size={20} color="#737373" />
                <div>
                  <span>Product Description</span>
                  <small>Manufacture, Care and Fit</small>
                </div>
              </div>
              {openAccordion === 'desc' ? <ChevronUp size={20} color="#737373" /> : <ChevronDown size={20} color="#737373" />}
            </div>
            {openAccordion === 'desc' && (
              <div className="accordion-content">
                <p style={{ marginBottom: '15px', lineHeight: '1.6', color: '#555' }}>
                  {product.description || "Premium quality oversized t-shirt designed for maximum comfort and style. Perfect for casual outings and daily wear."}
                </p>
                <div className="pdp-care-instructions" style={{ borderTop: '1px solid #eee', paddingTop: '15px', marginTop: '15px' }}>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: '700', marginBottom: '12px', color: '#0d2850', letterSpacing: '0.5px' }}>CARE INSTRUCTIONS</h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: '1fr', gap: '10px', fontSize: '0.85rem', color: '#555' }}>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '1.1rem' }}>🧼</span> Wash inside out in cold water (30°C)
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '1.1rem' }}>🚫</span> Do not bleach
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '1.1rem' }}>👕</span> Hang dry for longer life
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '1.1rem' }}>💨</span> Iron inside out, do not iron on print
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '1.1rem' }}>❌</span> Do not dry clean
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          <div className="pdp-accordion">
            <div className="accordion-header" onClick={() => toggleAccordion('returns')}>
              <div className="accordion-header-left">
                <RefreshCcw size={20} color="#737373" />
                <div>
                  <span>15 Days Returns & Exchange</span>
                  <small>Know about return & exchange policy</small>
                </div>
              </div>
              {openAccordion === 'returns' ? <ChevronUp size={20} color="#737373" /> : <ChevronDown size={20} color="#737373" />}
            </div>
            {openAccordion === 'returns' && (
              <div className="accordion-content">
                Easy returns up to 15 days of delivery. Exchange or refund processed immediately after pickup.
              </div>
            )}
          </div>

          {/* Trust Badges */}
          <div className="pdp-trust-badges">
            <div className="trust-badge">
              <ShieldCheck size={28} color="#f8b400" />
              <span>100% GENUINE PRODUCT</span>
            </div>
            <div className="trust-badge">
              <ShieldCheck size={28} color="#f8b400" />
              <span>100% SECURE PAYMENT</span>
            </div>
            <div className="trust-badge">
              <RefreshCcw size={28} color="#f8b400" />
              <span>EASY RETURNS & EXCHANGES</span>
            </div>
          </div>

          {/* Product Reviews */}
          <div className="pdp-reviews-section">
            <div className="review-tabs" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <button 
                  className={`review-tab ${activeReviewTab === 'product' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveReviewTab('product');
                    setSelectedReviewRating('all');
                  }}
                >
                  Product Reviews ({dynamicReviews.length})
                </button>
                <button 
                  className={`review-tab ${activeReviewTab === 'brand' ? 'active' : ''}`}
                  onClick={() => setActiveReviewTab('brand')}
                >
                  Brand Reviews ({brandReviews.length})
                </button>
              </div>
              <button 
                onClick={() => {
                  const isLoggedIn = localStorage.getItem('nph_is_logged_in') === 'true';
                  if (!isLoggedIn) {
                    showToast('Please login to write a review', 'error');
                    // Scroll to top or trigger login modal if possible (for MVP, toast is fine)
                  } else {
                    setIsReviewFormOpen(true);
                  }
                }}
                style={{ background: '#ffcc00', color: '#000', border: 'none', padding: '8px 16px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9rem' }}
              >
                Write a Review
              </button>
            </div>
            
            {activeReviewTab === 'product' ? (
              <div className="reviews-container">
                {/* Stats Summary Card */}
                <div className="reviews-summary-card">
                  <div className="summary-score-box">
                    <span className="summary-rating-number">4.8</span>
                    <div className="summary-stars">★★★★★</div>
                    <span className="summary-total-reviews">Based on 540 ratings</span>
                  </div>
                  <div className="summary-distribution">
                    <div className="dist-row">
                      <span>5 ★</span>
                      <div className="dist-bar"><div className="dist-fill" style={{ width: '85%' }}></div></div>
                      <span>85%</span>
                    </div>
                    <div className="dist-row">
                      <span>4 ★</span>
                      <div className="dist-bar"><div className="dist-fill" style={{ width: '10%' }}></div></div>
                      <span>10%</span>
                    </div>
                    <div className="dist-row">
                      <span>3 ★</span>
                      <div className="dist-bar"><div className="dist-fill" style={{ width: '3%' }}></div></div>
                      <span>3%</span>
                    </div>
                    <div className="dist-row">
                      <span>2 ★</span>
                      <div className="dist-bar"><div className="dist-fill" style={{ width: '1%' }}></div></div>
                      <span>1%</span>
                    </div>
                    <div className="dist-row">
                      <span>1 ★</span>
                      <div className="dist-bar"><div className="dist-fill" style={{ width: '1%' }}></div></div>
                      <span>1%</span>
                    </div>
                  </div>
                </div>

                {/* Filter Chips */}
                <div className="reviews-filter-row">
                  <button 
                    className={`filter-chip ${selectedReviewRating === 'all' ? 'active' : ''}`}
                    onClick={() => setSelectedReviewRating('all')}
                  >
                    All Reviews
                  </button>
                  <button 
                    className={`filter-chip ${selectedReviewRating === '5' ? 'active' : ''}`}
                    onClick={() => setSelectedReviewRating('5')}
                  >
                    5 Star ({dynamicReviews.filter(r => r.rating === 5).length})
                  </button>
                  <button 
                    className={`filter-chip ${selectedReviewRating === '4' ? 'active' : ''}`}
                    onClick={() => setSelectedReviewRating('4')}
                  >
                    4 Star ({dynamicReviews.filter(r => r.rating === 4).length})
                  </button>
                  <button 
                    className={`filter-chip ${selectedReviewRating === 'photos' ? 'active' : ''}`}
                    onClick={() => setSelectedReviewRating('photos')}
                  >
                    With Photos ({dynamicReviews.filter(r => r.photos.length > 0).length})
                  </button>
                </div>

                {/* Reviews List */}
                <div className="reviews-list">
                  {dynamicReviews
                    .filter(review => {
                      if (selectedReviewRating === '5') return review.rating === 5;
                      if (selectedReviewRating === '4') return review.rating === 4;
                      if (selectedReviewRating === 'photos') return review.photos.length > 0;
                      return true;
                    })
                    .map(review => (
                      <div key={review.id} className="review-card">
                        <div className="review-card-header">
                          <div className="author-info">
                            <strong>{review.author}</strong>
                            {review.verified && <span className="verified-badge">✓ Verified Buyer</span>}
                          </div>
                          <span className="review-date">{review.date}</span>
                        </div>
                        <div className="review-rating-stars">
                          {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                        </div>
                        <p className="review-comment">{review.comment}</p>
                        {review.fit && <div className="review-fit-tag">Size Info: <strong>{review.fit}</strong></div>}
                        {review.photos.length > 0 && (
                          <div className="review-photos">
                            {review.photos.map((p, pIdx) => (
                              <img 
                                key={pIdx} 
                                src={p} 
                                alt="Buyer upload" 
                                className="review-photo-thumbnail"
                                onClick={() => setReviewLightboxPhoto(p)}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            ) : (
              <div className="reviews-list">
                {brandReviews.map(review => (
                  <div key={review.id} className="review-card">
                    <div className="review-card-header">
                      <strong>{review.author}</strong>
                      <span className="review-date">{review.date}</span>
                    </div>
                    <div className="review-rating-stars">★★★★★</div>
                    <p className="review-comment">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Write a Review Modal */}
            {isReviewFormOpen && (
              <div className="lightbox-overlay" onClick={() => setIsReviewFormOpen(false)} style={{ zIndex: 9999 }}>
                <div className="lightbox-content" onClick={e => e.stopPropagation()} style={{ background: '#111', color: '#fff', padding: '24px', borderRadius: '12px', maxWidth: '400px', width: '90%', border: '1px solid #333' }}>
                  <h3 style={{ marginBottom: '20px', fontSize: '1.2rem', textTransform: 'uppercase' }}>Write a {activeReviewTab === 'product' ? 'Product' : 'Brand'} Review</h3>
                  
                  <label style={{ display: 'block', marginBottom: '15px' }}>
                    <span style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', color: '#aaa' }}>Your Name</span>
                    <input 
                      type="text" 
                      placeholder="e.g. Rahul S." 
                      value={newReview.author}
                      onChange={e => setNewReview({...newReview, author: e.target.value})}
                      style={{ width: '100%', padding: '12px', background: '#222', border: '1px solid #444', color: '#fff', borderRadius: '4px' }}
                    />
                  </label>

                  <label style={{ display: 'block', marginBottom: '15px' }}>
                    <span style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', color: '#aaa' }}>Rating</span>
                    <select 
                      value={newReview.rating}
                      onChange={e => setNewReview({...newReview, rating: Number(e.target.value)})}
                      style={{ width: '100%', padding: '12px', background: '#222', border: '1px solid #444', color: '#fff', borderRadius: '4px' }}
                    >
                      <option value="5">5 Stars - Excellent</option>
                      <option value="4">4 Stars - Good</option>
                      <option value="3">3 Stars - Average</option>
                      <option value="2">2 Stars - Poor</option>
                      <option value="1">1 Star - Terrible</option>
                    </select>
                  </label>

                  <label style={{ display: 'block', marginBottom: '25px' }}>
                    <span style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', color: '#aaa' }}>Review</span>
                    <textarea 
                      placeholder="What did you think?" 
                      value={newReview.comment}
                      onChange={e => setNewReview({...newReview, comment: e.target.value})}
                      style={{ width: '100%', padding: '12px', background: '#222', border: '1px solid #444', color: '#fff', borderRadius: '4px', minHeight: '100px' }}
                    />
                  </label>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button 
                      onClick={() => setIsReviewFormOpen(false)}
                      style={{ flex: 1, padding: '12px', background: 'transparent', border: '1px solid #444', color: '#fff', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={async () => {
                        if(!newReview.author.trim() || !newReview.comment.trim()) {
                          alert('Please enter your name and a review.');
                          return;
                        }
                        const created = {
                          type: activeReviewTab === 'product' ? 'product' : 'brand',
                          productId: product.id,
                          author: newReview.author,
                          rating: newReview.rating,
                          date: 'Just now',
                          createdAt: Date.now(),
                          comment: newReview.comment,
                          verified: false,
                          photos: []
                        };
                        
                        try {
                          await addDoc(collection(db, 'reviews'), created);
                          showToast('Review submitted successfully! ⭐');
                        } catch (err) {
                          console.error(err);
                          showToast('Failed to submit review.');
                        }
                        
                        setIsReviewFormOpen(false);
                        setNewReview({ author: '', rating: 5, comment: '' });
                      }}
                      style={{ flex: 1, padding: '12px', background: '#ffcc00', border: 'none', color: '#000', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                      Post Review
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Lightbox for review photos */}
            {reviewLightboxPhoto && (
              <div className="lightbox-overlay" onClick={() => setReviewLightboxPhoto(null)}>
                <div className="lightbox-content" onClick={e => e.stopPropagation()}>
                  <img src={reviewLightboxPhoto} alt="Review expansion" />
                  <button className="lightbox-close" aria-label="Close review photo" onClick={() => setReviewLightboxPhoto(null)}>✕</button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="pdp-related-section" style={{
          marginTop: '60px',
          borderTop: '1px solid rgba(13, 40, 80, 0.08)',
          paddingTop: '40px',
          paddingBottom: '20px',
          width: '100%'
        }}>
          <h3 style={{
            fontFamily: 'Outfit',
            fontSize: '1.6rem',
            fontWeight: 800,
            color: 'var(--color-text-primary, #0d2850)',
            marginBottom: '25px',
            textAlign: 'center',
            letterSpacing: '0.5px',
            textTransform: 'uppercase'
          }}>
            You May Also Like
          </h3>
          <div className="related-products-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            marginTop: '20px'
          }}>
            {relatedProducts.map(p => {
              const originalPrice = p.originalPrice || Math.round(p.price * 1.8);
              const discount = Math.round(((originalPrice - p.price) / originalPrice) * 100);
              return (
                <div 
                  key={p.id} 
                  className="product-card" 
                  onClick={() => {
                    navigate(`/product/${p.id}`);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="product-image-wrap" style={{ position: 'relative', width: '100%', aspectRatio: '1/1', overflow: 'hidden', backgroundColor: 'transparent' }}>
                    <img src={p.image} alt={p.title} className="product-image" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} />
                    {p.tag && (
                      <span className="product-badge" style={{
                        position: 'absolute', top: '12px', left: '12px',
                        backgroundColor: '#ffd000', color: '#121212',
                        fontSize: '0.65rem', fontWeight: 800, padding: '4px 8px',
                        borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.5px',
                        zIndex: 2
                      }}>{p.tag}</span>
                    )}
                  </div>
                  <div className="product-info" style={{ padding: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', flexGrow: 1, textAlign: 'center' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#f8b400', textTransform: 'uppercase', letterSpacing: '0.5px' }}>NAMMA PRINT HOUSE</span>
                    <h4 className="product-title" style={{
                      fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-primary, #121212)',
                      margin: 0, lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', height: '2.8em',
                      textAlign: 'center'
                    }}>{p.title}</h4>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '4px' }}>
                      <span style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--color-text-primary, #121212)' }}>₹{p.price}</span>
                      <span style={{ fontSize: '0.8rem', color: '#737373', textDecoration: 'line-through' }}>₹{originalPrice}</span>
                      <span style={{ fontSize: '0.8rem', color: '#51cccc', fontWeight: 700 }}>({discount}% OFF)</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Size Guide Modal */}
      {isSizeGuideOpen && (
        <div className="modal-overlay" onClick={() => setIsSizeGuideOpen(false)}>
          <div className="size-guide-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Size Guide</h3>
              <button className="close-btn" aria-label="Close size guide" onClick={() => setIsSizeGuideOpen(false)}><X size={20} aria-hidden="true" /></button>
            </div>
            
            <div className="modal-product-info">
              <img src={product.image} alt={product.title} />
              <div className="modal-info-text">
                  <span className="modal-info-price">₹{displayPrice} <span className="modal-info-orig">₹{displayOriginalPrice}</span> <span className="modal-info-disc">{discountPercent}% OFF</span></span>
                  <span className="modal-info-brand">NAMMA PRINT HOUSE</span>
                  <span className="modal-info-title">{product.title}</span>
              </div>
            </div>

            <div className="modal-tabs">
              <button className={`modal-tab ${activeSizeTab === 'chart' ? 'active' : ''}`} onClick={() => setActiveSizeTab('chart')}>Size Chart</button>
              <button className={`modal-tab ${activeSizeTab === 'measure' ? 'active' : ''}`} onClick={() => setActiveSizeTab('measure')}>How to measure</button>
              <button className={`modal-tab ${activeSizeTab === 'fit' ? 'active' : ''}`} onClick={() => setActiveSizeTab('fit')}>Fit Guide</button>
            </div>

            <div className="modal-body">
              {activeSizeTab === 'chart' && (
                <div className="size-chart-content">
                  <p className="size-chart-desc"><strong>Oversized fit</strong><br/>Super Loose On Body Thoda Hawa Aane De</p>
                  <table className="size-table">
                    <thead>
                      <tr>
                        <th>Size</th><th>Chest</th><th>Front Length</th><th>Sleeve Length</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td>S</td><td>42</td><td>29</td><td>9.75</td></tr>
                      <tr><td>M</td><td>44</td><td>29.75</td><td>10</td></tr>
                      <tr><td>L</td><td>46</td><td>30.5</td><td>10.25</td></tr>
                      <tr><td>XL</td><td>48</td><td>31.25</td><td>10.5</td></tr>
                      <tr><td>2XL</td><td>50</td><td>32</td><td>10.75</td></tr>
                      <tr><td>3XL</td><td>52</td><td>32.75</td><td>11</td></tr>
                    </tbody>
                  </table>
                </div>
              )}
              {activeSizeTab === 'measure' && (
                <div className="measure-content">
                  <div style={{textAlign: 'center', margin: '20px 0'}}>
                    <img src="/images/measure-guide.png" alt="How to measure" style={{maxWidth: '200px'}} />
                  </div>
                  <div className="measure-steps">
                    <div className="step">
                      <span className="step-num">1</span>
                      <div>
                        <strong>Chest</strong>
                        <p>Stand straight with arms relaxed. Measure around the fullest part of your chest keeping the tape measure under your arms.</p>
                      </div>
                    </div>
                    <div className="step">
                      <span className="step-num">2</span>
                      <div>
                        <strong>Front Length</strong>
                        <p>Measure from the top of the shoulder seam straight down to the desired length on the front.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {activeSizeTab === 'fit' && (
                <div className="fit-content">
                  <div style={{textAlign: 'center', margin: '20px 0'}}>
                    <img src="/images/fit-guide.png" alt="Fit Guide" style={{maxWidth: '100%'}} />
                  </div>
                  <div className="fit-desc" style={{display: 'flex', gap: '20px', textAlign: 'center'}}>
                      <div style={{flex: 1}}>
                        <strong>REGULAR FIT</strong>
                        <p style={{fontSize: '0.8rem', marginTop: '10px'}}>Hugging you just the right amount around sleeves and torso...</p>
                      </div>
                      <div style={{flex: 1}}>
                        <strong>OVERSIZED FIT</strong>
                        <p style={{fontSize: '0.8rem', marginTop: '10px'}}>Featuring a shoulder-drop design & a baggy form...</p>
                      </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="modal-footer">
              <button className="modal-add-btn" onClick={handleAddToCart}>ADD TO BAG</button>
            </div>
          </div>
        </div>
      )}

      <SizePredictorModal 
        isOpen={isSizePredictorOpen} 
        onClose={() => setIsSizePredictorOpen(false)} 
        onApplySize={(size) => {
          if (product.outOfStockSizes && product.outOfStockSizes.includes(size)) {
            showToast(`Size ${size} is out of stock`, 'warning');
            return;
          }
          if (product.category === 'couples') {
            if (bundleOption === 'set' || bundleOption === 'men') {
              setMenSize(size);
            }
            if (bundleOption === 'set' || bundleOption === 'women') {
              setWomenSize(size);
            }
          } else {
            setSelectedSize(size);
          }
          showToast(`Selected size ${size}`, 'info');
        }}
      />

      {isImageLightboxOpen && (
        <div className="pdp-image-lightbox" onClick={() => setIsImageLightboxOpen(false)} style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 99999, cursor: 'zoom-out'
        }}>
          <div className="pdp-lightbox-content" onClick={(e) => e.stopPropagation()} style={{
            position: 'relative', maxWidth: '90vw', maxHeight: '90vh',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <button className="pdp-lightbox-close" aria-label="Close image zoom" onClick={() => setIsImageLightboxOpen(false)} style={{
              position: 'absolute', top: '-40px', right: '0',
              background: 'none', border: 'none', color: '#ffffff',
              cursor: 'pointer', display: 'flex', alignItems: 'center',
              justifyContent: 'center', padding: '5px'
            }}>
              <X size={28} />
            </button>
            <img 
              src={(product.colorImages && selectedColor && product.colorImages[selectedColor]) || product.images[activeImageIdx]} 
              alt={product.title} 
              style={{
                maxWidth: '90vw', maxHeight: '85vh',
                objectFit: 'contain', borderRadius: '8px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
                animation: 'zoom-in-fade 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
              }} 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
