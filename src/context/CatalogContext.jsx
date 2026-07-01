import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { products as fallbackProducts } from '../data/catalog'; // Fallback if DB fails

const CatalogContext = createContext();

export const useCatalog = () => useContext(CatalogContext);

export const CatalogProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen to real-time updates from Firestore
    const unsubscribe = onSnapshot(
      collection(db, 'catalog'),
      (snapshot) => {
        const fetchedProducts = snapshot.docs.map((doc) => doc.data());
        if (fetchedProducts.length > 0) {
          // Sort or preserve original order (optional, here we rely on ID or default)
          // For now, let's just use the fetched list
          setProducts(fetchedProducts);
        } else {
          setProducts(fallbackProducts);
        }
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching catalog from Firestore:", error);
        setProducts(fallbackProducts);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Admin function to update stock
  const updateProductStock = async (productId, outOfStock) => {
    try {
      const productRef = doc(db, 'catalog', productId);
      await updateDoc(productRef, { outOfStock });
      return true;
    } catch (err) {
      console.error("Failed to update stock in Firestore", err);
      return false;
    }
  };

  return (
    <CatalogContext.Provider value={{ products, loading, updateProductStock }}>
      {children}
    </CatalogContext.Provider>
  );
};
