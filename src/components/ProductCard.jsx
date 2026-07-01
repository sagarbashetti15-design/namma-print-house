import React, { useState } from 'react';
import { Heart, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const isWished = isInWishlist(product.id);
  const navigate = useNavigate();
  
  // Track currently active/hovered color
  const [activeColor, setActiveColor] = useState('');

  // Read marketing discount from localStorage
  const [discountInfo, setDiscountInfo] = useState(null);
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem('nph_marketing');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.discountData && parsed.discountData.type !== 'none' && parsed.discountData.value > 0) {
          setDiscountInfo(parsed.discountData);
        }
      }
    } catch (e) {
      console.error("Failed to parse nph_marketing inside ProductCard", e);
    }
  }, []);

  // Calculate discounted price
  const getDiscountedPrice = () => {
    if (!discountInfo) return null;
    // Check category eligibility
    const isEligible = discountInfo.applicableCategory === 'all' || product.category === discountInfo.applicableCategory;
    if (!isEligible) return null;

    if (discountInfo.type === 'percent') {
      return Math.round(product.price * (1 - discountInfo.value / 100));
    } else if (discountInfo.type === 'flat') {
      return Math.max(product.price - discountInfo.value, 0);
    }
    return null;
  };

  const discountedPrice = getDiscountedPrice();
  const discountLabel = discountInfo
    ? discountInfo.type === 'percent'
      ? `SAVE ${discountInfo.value}%`
      : `SAVE ₹${discountInfo.value}`
    : null;

  const colorMap = {
    'Red': '#d32f2f',
    'White': '#ffffff',
    'Black': '#111111',
    'Cream': '#fcf9f2',
    'Brown': '#5C4033'
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (product.outOfStock) return;
    if (product.sizes && product.sizes.length > 0) {
      // Navigate to detail page to select size, passing color parameter
      const colorQuery = activeColor ? `?color=${encodeURIComponent(activeColor)}` : '';
      navigate(`/product/${product.id}${colorQuery}`);
    } else {
      addToCart(product, activeColor ? `Standard | Color: ${activeColor}` : 'Standard');
      showToast(`${product.title} added to cart`, 'success', product.image);
    }
  };

  // Determine current image source
  const currentImage = (product.colorImages && activeColor && product.colorImages[activeColor]) || product.image;

  return (
    <div className={`product-card ${product.outOfStock ? 'out-of-stock' : ''}`}>
      <Link 
        to={`/product/${product.id}${activeColor ? `?color=${encodeURIComponent(activeColor)}` : ''}`} 
        className="product-image-wrap"
      >
        <img src={currentImage} alt={product.title} className="product-image" loading="lazy" />
        {product.outOfStock ? (
          <div className="out-of-stock-badge">OUT OF STOCK</div>
        ) : product.tag ? (
          <div className="product-tag">{product.tag}</div>
        ) : null}
        {/* Discount Badge */}
        {discountLabel && !product.outOfStock && (
          <div className="discount-sale-badge">{discountLabel}</div>
        )}
      </Link>
      
      <button 
        className="wishlist-btn" 
        aria-label={isWished ? "Remove from wishlist" : "Add to wishlist"}
        style={{ color: isWished ? 'var(--color-error, #ff4d4f)' : '' }}
        onClick={(e) => { 
          e.preventDefault(); 
          toggleWishlist(product); 
          showToast(!isWished ? 'Added to Wishlist' : 'Removed from Wishlist', 'info', product.image);
        }}
      >
        <Heart size={18} fill={isWished ? 'currentColor' : 'none'} />
      </button>

      <div className="product-info">
        <div className="product-stars">★★★★★</div>
        <p className="product-title">{product.title}</p>
        
        {/* Color Swatch Previews */}
        {product.colors && product.colors.length > 0 && (
          <div className="product-swatches" onClick={(e) => e.preventDefault()}>
            <div className="swatch-dots-container">
              {product.colors.map(color => (
                <button 
                  key={color}
                  className={`swatch-dot ${activeColor === color ? 'active' : ''}`}
                  aria-label={`Select color ${color}`}
                  onMouseEnter={() => setActiveColor(color)}
                  onClick={() => setActiveColor(color)}
                  style={{ 
                    backgroundColor: colorMap[color] || color.toLowerCase(),
                    border: color === 'White' ? '1px solid #ccc' : 'none'
                  }}
                  title={color}
                />
              ))}
            </div>
            {activeColor && (
              <button 
                className="clear-swatch-btn" 
                aria-label="Clear selected color"
                onClick={() => setActiveColor('')}
                title="Reset color"
              >
                ✕
              </button>
            )}
          </div>
        )}

        <div className="product-pricing">
          {discountedPrice !== null ? (
            <>
              <span className="price discount-price">₹{discountedPrice}</span>
              <span className="original-price">₹{product.price}</span>
            </>
          ) : (
            <>
              <span className="price">₹{product.price}</span>
              {product.originalPrice && <span className="original-price">₹{product.originalPrice}</span>}
            </>
          )}
        </div>
        
        <button 
          className={`btn-add-cart ${product.outOfStock ? 'out-of-stock-btn' : ''}`} 
          onClick={handleAddToCart}
          disabled={product.outOfStock}
        >
          {product.outOfStock ? (
            'OUT OF STOCK'
          ) : (
            <>
              <ShoppingBag size={16} /> ADD TO CART
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
