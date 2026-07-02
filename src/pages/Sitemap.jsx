import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { useCatalog } from '../context/CatalogContext';
import './Sitemap.css';

const Sitemap = () => {
  const { categories } = useCatalog();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="sitemap-page">
      <SEO 
        title="Sitemap | Namma Print House" 
        description="Find all categories, products, and information pages on Namma Print House."
      />
      
      <div className="sitemap-container container">
        <h1 className="sitemap-title">Site Map</h1>
        <p className="sitemap-subtitle">Navigate through our entire store collection and policies.</p>
        
        <div className="sitemap-grid">
          {/* Main Links */}
          <div className="sitemap-section">
            <h2>Main Pages</h2>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/category/all">Shop All</Link></li>
              <li><Link to="/cart">Shopping Cart</Link></li>
              <li><Link to="/checkout">Checkout</Link></li>
              <li><Link to="/search">Search</Link></li>
              <li><Link to="/wishlist">Wishlist</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="sitemap-section">
            <h2>Collections</h2>
            <ul>
              {categories.map(cat => (
                <li key={cat.id}>
                  <Link to={`/category/${cat.id}`}>{cat.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div className="sitemap-section">
            <h2>Customer Support</h2>
            <ul>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/track-order">Track Order</Link></li>
              <li><Link to="/faq">FAQs</Link></li>
              <li><Link to="/size-guide">Size Guide</Link></li>
              <li><Link to="/care">Care Instructions</Link></li>
              <li><Link to="/bulk">Bulk Orders</Link></li>
            </ul>
          </div>

          {/* Legal / Info */}
          <div className="sitemap-section">
            <h2>Policies & Info</h2>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/shipping">Shipping Policy</Link></li>
              <li><Link to="/returns">Return & Refund Policy</Link></li>
              <li><Link to="/terms">Terms & Conditions</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sitemap;
