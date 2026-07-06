import React from 'react';
import { Link } from 'react-router-dom';
import { useCatalog } from '../context/CatalogContext';
import ProductCard from './ProductCard';
import './ProductGrid.css';

const ProductGrid = () => {
  const { products, loading } = useCatalog();
  
  if (loading || !products) return null;
  
  // Create a visually balanced mix of categories for the homepage
  const men = products.filter(p => p.category === 'men' && p.id !== 'rzp_test_1');
  const women = products.filter(p => p.category === 'women');
  const couples = products.filter(p => p.category === 'couples');
  
  const featuredProducts = [];
  // Grab a mix of products to show exactly 12 items (4 rows of 3, or 3 rows of 4)
  for (let i = 0; i < 5; i++) {
    if (men[i]) featuredProducts.push(men[i]);
    if (women[i]) featuredProducts.push(women[i]);
    if (couples[i]) featuredProducts.push(couples[i]);
  }
  // If we don't have 12, fill the rest with whatever is new
  const uniqueFeatured = Array.from(new Set(featuredProducts));
  const newAdditions = products.filter(p => p.tag === 'NEW' && !uniqueFeatured.includes(p));
  
  const finalProducts = [...uniqueFeatured, ...newAdditions].slice(0, 12);

  return (
    <section className="product-section">
      <div className="container">
        <h2 className="section-heading text-center">
          FEATURED <span>PRODUCTS</span>
        </h2>
        <div className="product-grid">
          {finalProducts.map(product => (
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
