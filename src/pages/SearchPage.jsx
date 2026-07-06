import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useCatalog } from '../context/CatalogContext';
import { useWishlist } from '../context/WishlistContext';
import { IoHeartOutline } from 'react-icons/io5';
import '../components/ProductGrid.css';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { products, loading } = useCatalog();
  
  if (loading) return <div className="container" style={{ padding: '40px 1rem', minHeight: '60vh' }}>Loading...</div>;

  const searchResults = products.filter(p => 
    p.title.toLowerCase().includes(query.toLowerCase()) || 
    p.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="container" style={{ padding: '40px 1rem', minHeight: '60vh' }}>
      <h1 style={{ marginBottom: '20px', fontSize: '1.8rem' }}>
        Search Results for: "{query}"
      </h1>
      
      {searchResults.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px 0' }}>
          <h2>No results found.</h2>
          <p style={{ color: 'var(--color-text-secondary)', marginTop: '10px' }}>Try searching for "t-shirt", "mug", or "custom".</p>
        </div>
      ) : (
        <div className="product-grid">
          {searchResults.map(product => {
            const isWished = isInWishlist(product.id);
            return (
              <div key={product.id} className="product-card">
                <Link to={`/product/${product.id}`} className="product-image-wrap">
                  <img src={product.image} alt={product.title} className="product-image" />
                  {product.tag && <div className="product-tag">{product.tag}</div>}
                </Link>
                <button 
                  className="wishlist-btn" 
                  style={{ position: 'absolute', top: 10, right: 10, zIndex: 10, color: isWished ? 'var(--color-error)' : '' }}
                  onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
                >
                  <IoHeartOutline size={18} fill={isWished ? 'currentColor' : 'none'} />
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
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
