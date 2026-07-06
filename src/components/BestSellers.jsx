import React, { useRef } from 'react';
import { IoChevronBackOutline, IoChevronForwardOutline, IoHeartOutline } from 'react-icons/io5';
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

  const newArrivals = products.slice(-8);

  const bestSellers = [
    // Pick 2 men's, 2 women's, 2 couples, 2 kannada/anime dynamically
    ...products.filter(p => p.category === 'men').slice(0, 2),
    ...products.filter(p => p.category === 'women').slice(0, 2),
    ...products.filter(p => p.category === 'couples').slice(0, 2),
    ...products.filter(p => p.category !== 'men' && p.category !== 'women' && p.category !== 'couples').slice(0, 2),
    ...newArrivals.slice(0, 4)
  ].filter(Boolean);

  // Remove duplicates
  const uniqueBestSellers = [...new Map(bestSellers.map(item => [item.id, item])).values()];

  return (
    <section className="bestsellers-section" style={{ position: 'relative' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '30px' }}>
          <h2 className="section-title" style={{ fontSize: '2rem', fontWeight: 'bold' }}>
            BEST SELLERS
            <span className="title-underline"></span>
          </h2>
        </div>
        
        <div className="bestsellers-carousel-wrapper" style={{ position: 'relative' }}>
          <button className="bs-nav-btn left" onClick={() => scroll('left')}>
            <IoChevronBackOutline size={24} />
          </button>
          
          <div className="bestsellers-scroll-area" ref={scrollRef}>
            {uniqueBestSellers.map(product => {
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
                      <IoHeartOutline size={16} fill={isWished ? 'currentColor' : 'none'} />
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
            <IoChevronForwardOutline size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
