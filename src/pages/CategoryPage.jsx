import React from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../data/catalog';
import ProductCard from '../components/ProductCard';
import '../components/ProductGrid.css';

const CategoryPage = () => {
  const { categoryId } = useParams();
  
  const categoryProducts = categoryId === 'all' 
    ? products 
    : products.filter(p => p.category === categoryId);

  return (
    <div className="container" style={{ padding: '40px 1rem', minHeight: '60vh' }}>
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
