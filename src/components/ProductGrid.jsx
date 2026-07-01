import React from 'react';
import { Link } from 'react-router-dom';
import { useCatalog } from '../context/CatalogContext';
import ProductCard from './ProductCard';
import './ProductGrid.css';

const ProductGrid = () => {
  const { products, loading } = useCatalog();
  
  if (loading) return null;
  // Display newly added items and top featured items
  const featuredProducts = products.slice(0, 12);
  return (
    <section className="product-section">
      <div className="container">
        <h2 className="section-heading text-center">
          FEATURED <span>PRODUCTS</span>
        </h2>
        <div className="product-grid">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center" style={{ marginTop: '40px' }}>
          <Link to="/category/all" className="btn btn-yellow">VIEW ALL PRODUCTS</Link>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
