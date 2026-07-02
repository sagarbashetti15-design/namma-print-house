import React from 'react';
import { useParams } from 'react-router-dom';
import { useCatalog } from '../context/CatalogContext';
import ProductCard from '../components/ProductCard';
import SEO from '../components/SEO';
import '../components/ProductGrid.css';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const { products, loading } = useCatalog();
  
  if (loading) return <div className="container" style={{ padding: '40px 1rem', minHeight: '60vh' }}>Loading products...</div>;

  const categoryProducts = categoryId === 'all' 
    ? products 
    : products.filter(p => p.category === categoryId);

  const pageTitle = categoryId === 'all' ? 'All Products' : categoryId;
  const capitalizedTitle = pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1);
  const seoTitle = `Buy ${capitalizedTitle} Online | Namma Print House`;
  const seoDesc = `Shop the best collection of ${pageTitle} at Namma Print House. Premium quality, great designs, and fast shipping across India.`;

  return (
    <div className="container" style={{ padding: '40px 1rem', minHeight: '60vh' }}>
      <SEO title={seoTitle} description={seoDesc} />
      <h1 style={{ textTransform: 'uppercase', marginBottom: '20px', fontSize: '2rem' }}>
        {categoryId === 'all' ? 'All Products' : categoryId}
      </h1>
      
      {categoryProducts.length === 0 ? (
        <p>No products found in this category.</p>
      ) : (
        <div className="product-grid">
          {categoryProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
