import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useCatalog } from '../context/CatalogContext';
import ProductCard from '../components/ProductCard';
import SEO from '../components/SEO';
import SkeletonCard from '../components/SkeletonCard';
import { motion, AnimatePresence } from 'framer-motion';
import { IoFilterOutline } from 'react-icons/io5';
import '../components/ProductGrid.css';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const { products, loading } = useCatalog();
  
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortOption, setSortOption] = useState('newest');
  const [selectedColors, setSelectedColors] = useState([]);
  
  const allColors = ['black', 'white', 'red', 'cream', 'brown', 'navy'];

  const categoryProducts = useMemo(() => {
    let filtered = categoryId === 'all' 
      ? products 
      : products.filter(p => p.category === categoryId);
      
    if (selectedColors.length > 0) {
      filtered = filtered.filter(p => {
        if (!p.colors) return false;
        return p.colors.some(c => selectedColors.includes(c.name.toLowerCase()));
      });
    }
    
    if (sortOption === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    }
    
    return filtered;
  }, [products, categoryId, selectedColors, sortOption]);

  const toggleColor = (color) => {
    setSelectedColors(prev => 
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  const pageTitle = categoryId === 'all' ? 'All Products' : categoryId;
  const capitalizedTitle = pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1);
  const seoTitle = `Buy ${capitalizedTitle} Online | Namma Print House`;
  const seoDesc = `Shop the best collection of ${pageTitle} at Namma Print House. Premium quality, great designs, and fast shipping across India.`;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="container" 
      style={{ padding: '40px 1rem', minHeight: '60vh' }}
    >
      <SEO title={seoTitle} description={seoDesc} />
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '20px' }}>
        <h1 style={{ textTransform: 'uppercase', fontSize: '2rem', margin: 0 }}>
          {capitalizedTitle}
        </h1>
        <button 
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: '1px solid #ddd', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}
        >
          <IoFilterOutline size={18} /> {isFilterOpen ? 'Hide Filters' : 'Filters'}
        </button>
      </div>

      <div style={{ display: 'flex', gap: '30px', flexDirection: window.innerWidth < 768 ? 'column' : 'row' }}>
        {/* Filters Sidebar */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div 
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 250, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              style={{ flexShrink: 0, overflow: 'hidden' }}
            >
              <div style={{ width: '250px', paddingRight: '20px' }}>
                <div style={{ marginBottom: '30px' }}>
                  <h4 style={{ textTransform: 'uppercase', marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Sort By</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {['newest', 'price-low', 'price-high'].map(opt => (
                      <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                        <input 
                          type="radio" 
                          checked={sortOption === opt} 
                          onChange={() => setSortOption(opt)} 
                        />
                        {opt === 'newest' ? 'Newest Arrivals' : opt === 'price-low' ? 'Price: Low to High' : 'Price: High to Low'}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 style={{ textTransform: 'uppercase', marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Color</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {allColors.map(color => (
                      <button
                        key={color}
                        onClick={() => toggleColor(color)}
                        title={color}
                        style={{
                          width: '30px', height: '30px', borderRadius: '50%',
                          backgroundColor: color === 'cream' ? '#f5f5dc' : color === 'navy' ? '#000080' : color,
                          border: selectedColors.includes(color) ? '2px solid #000' : '1px solid #ddd',
                          cursor: 'pointer',
                          padding: 2,
                          boxShadow: selectedColors.includes(color) ? '0 0 0 2px #fff inset' : 'none'
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Product Grid */}
        <div style={{ flexGrow: 1 }}>
          {loading ? (
            <div className="product-grid">
              {[1,2,3,4,5,6].map(i => <SkeletonCard key={i} />)}
            </div>
          ) : categoryProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', backgroundColor: '#fafafa', borderRadius: '8px' }}>
              <p style={{ fontSize: '1.2rem', color: '#666' }}>No products match your selected filters.</p>
              <button 
                onClick={() => { setSelectedColors([]); setSortOption('newest'); }}
                style={{ marginTop: '15px', padding: '10px 20px', backgroundColor: '#000', color: '#fff', border: 'none', cursor: 'pointer' }}
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="product-grid">
              {categoryProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CategoryPage;
