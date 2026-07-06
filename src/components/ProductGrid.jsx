import React from 'react';
import { Link } from 'react-router-dom';
import { useCatalog } from '../context/CatalogContext';
import ProductCard from './ProductCard';
import './ProductGrid.css';

const ProductGrid = () => {
  const { products, loading } = useCatalog();
  
  if (loading || !products) return null;
  
  // Create collections
  const men = products.filter(p => p.category === 'men' && p.id !== 'rzp_test_1').slice(0, 4);
  const women = products.filter(p => p.category === 'women').slice(0, 4);
  const couples = products.filter(p => p.category === 'couples').slice(0, 4);

  const collections = [
    { title: "MEN's COLLECTION", items: men, link: "/category/men" },
    { title: "WOMEN's COLLECTION", items: women, link: "/category/women" },
    { title: "COUPLES MATCHING", items: couples, link: "/category/couples" }
  ];

  return (
    <section className="product-section">
      <div className="container">
        
        {collections.map((collection, idx) => (
          <div key={idx} className="category-collection">
            <div className="collection-header">
              <h2 className="section-heading">{collection.title}</h2>
              <Link to={collection.link} className="view-all-link">View All &rarr;</Link>
            </div>
            
            <div className="product-grid">
              {collection.items.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        ))}
        
      </div>
    </section>
  );
};

export default ProductGrid;
