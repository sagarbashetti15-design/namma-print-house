import React from 'react';
import { Link } from 'react-router-dom';
import { useCatalog } from '../context/CatalogContext';
import ProductCard from './ProductCard';
import './ProductGrid.css';

const ProductGrid = () => {
  const { products, loading } = useCatalog();
  
  if (loading || !products) return null;
  
  // Exclude test products
  const validProducts = products.filter(p => p.id !== 'rzp_test_1');
  
  // Pick a mix of products from different categories
  const menProducts = validProducts.filter(p => p.category === 'men').slice(0, 3);
  const womenProducts = validProducts.filter(p => p.category === 'women').slice(0, 3);
  const couplesProducts = validProducts.filter(p => p.category === 'couples').slice(0, 2);
  
  // Combine and optionally shuffle (or just interleave)
  const displayProducts = [...menProducts, ...womenProducts, ...couplesProducts].sort(() => Math.random() - 0.5);

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
