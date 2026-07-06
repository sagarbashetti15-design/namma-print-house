import React from 'react';
import { Link } from 'react-router-dom';
import { useCatalog } from '../context/CatalogContext';
import ProductCard from './ProductCard';
import './ProductGrid.css';

const ProductGrid = () => {
  const { products, loading } = useCatalog();
  
  if (loading || !products) return null;
  
  // Exclude test products and get a mix of 8 items
  const displayProducts = products
    .filter(p => p.id !== 'rzp_test_1')
    .slice(0, 8); // Just take the first 8 mixed items from catalog

  return (
    <section className="product-section">
      <div className="container">
        <div className="category-collection">
          <div className="collection-header">
            <h2 className="section-heading">FEATURED PRODUCTS</h2>
            <Link to="/products" className="view-all-link">Shop All &rarr;</Link>
          </div>
          
          <div className="product-grid">
            {displayProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
