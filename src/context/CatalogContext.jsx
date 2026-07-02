import React, { createContext, useContext, useState, useEffect } from 'react';
import { products as fallbackProducts } from '../data/catalog'; // Local static catalog

const CatalogContext = createContext();

export const useCatalog = () => useContext(CatalogContext);

export const CatalogProvider = ({ children }) => {
  const [products, setProducts] = useState(fallbackProducts);
  const [marketing, setMarketing] = useState({});
  const [loading, setLoading] = useState(false);

  // Sync products if fallbackProducts changes (like during hot reload)
  useEffect(() => {
    setProducts([...fallbackProducts]);
  }, [fallbackProducts]);

  // Admin function to update stock (mocked for local structure)
  const updateProductStock = async (productId, outOfStock) => {
    const updatedProducts = products.map(p => 
      p.id === productId ? { ...p, outOfStock } : p
    );
    setProducts(updatedProducts);
    return true;
  };

  const updateMarketingStore = async (marketingConfig) => {
    setMarketing(marketingConfig);
    return true;
  };

  return (
    <CatalogContext.Provider value={{ products, marketing, loading, updateProductStock, updateMarketingStore }}>
      {children}
    </CatalogContext.Provider>
  );
};
