import React from 'react';
import { Link } from 'react-router-dom';
import { useCatalog } from '../context/CatalogContext';
import ProductCard from './ProductCard';
import './ProductGrid.css';

const featuredIds = ['m1', 'm2', 'm3', 'm4', 'm5', 'w10', 'w11', 'w12', 'w13', 'w14'];

const ProductGrid = () => {
  const { products, loading } = useCatalog();
  
  if (loading) return null;
  const featuredProducts = featuredIds.map(id => products.find(p => p.id === id)).filter(Boolean);
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
