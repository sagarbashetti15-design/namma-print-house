import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import '../components/ProductGrid.css';

const WishlistPage = () => {
  const { wishlistItems, toggleWishlist } = useWishlist();

  if (wishlistItems.length === 0) {
    return (
      <div className="container" style={{ padding: '100px 1rem', textAlign: 'center', minHeight: '60vh' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>Your Wishlist is Empty</h2>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '30px' }}>Save your favorite items here.</p>
        <Link to="/" style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-secondary)', padding: '15px 30px', fontWeight: '700', borderRadius: '4px' }}>
          CONTINUE SHOPPING
        </Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '40px 1rem', minHeight: '60vh' }}>
      <h1 style={{ marginBottom: '20px', fontSize: '1.8rem' }}>My Wishlist ({wishlistItems.length})</h1>
      
      <div className="product-grid">
        {wishlistItems.map(product => (
          <div key={product.id} className="product-card">
            <Link to={`/product/${product.id}`} className="product-image-wrap">
              <img src={product.image} alt={product.title} className="product-image" />
              {product.tag && <div className="product-tag">{product.tag}</div>}
            </Link>
            
            <button 
              className="wishlist-btn" 
              style={{ position: 'absolute', top: 10, right: 10, zIndex: 10, color: 'var(--color-error)' }}
              onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
            >
              <Heart size={18} fill="currentColor" />
            </button>
            
            <Link to={`/product/${product.id}`} className="product-info">
              <h3 className="product-brand">NAMMA PRINT HOUSE</h3>
              <p className="product-title">{product.title}</p>
              <div className="product-pricing">
                <span className="price">₹{product.price}</span>
                <span className="original-price">₹{product.originalPrice}</span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
