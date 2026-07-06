import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCatalog } from '../context/CatalogContext';
import { useWishlist } from '../context/WishlistContext';
import './BestSellers.css';

const BestSellers = () => {
  const scrollRef = useRef(null);
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { products, loading } = useCatalog();

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' ? -300 : 300;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (loading) return null;

  const newArrivals = products.filter(p => p && !isNaN(Number(p.id))).slice(0, 8);

  const bestSellers = [
    ...newArrivals,
    // Men's favorites
    products.find(p => p.id === 'm11'),
    products.find(p => p.id === 'm3'),
    // Women's favorites
    products.find(p => p.id === 'w1'),
    products.find(p => p.id === 'w11'),
    // Couples matching
    products.find(p => p.id === 'cp1'),
    products.find(p => p.id === 'cp11'),
    // Kannada collection
    products.find(p => p.id === 'k2'),
    products.find(p => p.id === 'k3')
  ].filter(Boolean);

  return (
    <section className="bestsellers-section">
      <div className="container">
        <h2 className="section-heading text-center">
          BEST <span>SELLERS</span>
        </h2>
        
        <div className="bestsellers-carousel-wrapper">
          <button className="bs-nav-btn left" aria-label="Scroll left" onClick={() => scroll('left')}>
            <ChevronLeft size={24} />
          </button>
          
          <div className="bestsellers-scroll-area" ref={scrollRef}>
            {bestSellers.map(product => {
              const isWished = isInWishlist(product.id);
              return (
                <div key={product.id} className="bs-card">
                  <Link to={`/product/${product.id}`} className="bs-image-wrap">
                    <img src={product.image} alt={product.title} className="bs-image" loading="lazy" />
                    <button 
                      className="bs-wishlist-btn" 
                      aria-label={isWished ? "Remove from wishlist" : "Add to wishlist"}
                      style={{ color: isWished ? 'var(--color-error)' : '' }}
                      onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
                    >
                      <Heart size={16} fill={isWished ? 'currentColor' : 'none'} />
                    </button>
                  </Link>
                  <Link to={`/product/${product.id}`} className="bs-info">
                    <p className="bs-title">{product.title}</p>
                    <p className="bs-price">₹{product.price}</p>
                  </Link>
                </div>
              );
            })}
          </div>
          
          <button className="bs-nav-btn right" aria-label="Scroll right" onClick={() => scroll('right')}>
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
