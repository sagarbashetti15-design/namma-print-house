import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, doc, updateDoc, setDoc } from 'firebase/firestore';
import { products as fallbackProducts } from '../data/catalog'; // Fallback if DB fails

const CatalogContext = createContext();

export const useCatalog = () => useContext(CatalogContext);

export const CatalogProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [marketing, setMarketing] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen to real-time updates from Firestore
    const unsubscribe = onSnapshot(
      collection(db, 'catalog'),
      (snapshot) => {
        const fetchedProducts = snapshot.docs.map((doc) => doc.data());
        if (fetchedProducts.length > 0) {
          // Sort newest (numeric IDs) first
          fetchedProducts.sort((a, b) => {
            const aNum = Number(a.id);
            const bNum = Number(b.id);
            if (!isNaN(aNum) && !isNaN(bNum)) return bNum - aNum;
            if (!isNaN(aNum)) return -1;
            if (!isNaN(bNum)) return 1;
            return a.id.localeCompare(b.id);
          });
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

    const unsubscribeMarketing = onSnapshot(
      doc(db, 'settings', 'marketing'),
      (docSnap) => {
        if (docSnap.exists()) {
          setMarketing(docSnap.data());
        }
      },
      (error) => {
        console.error("Error fetching marketing:", error);
      }
    );

    return () => {
      unsubscribe();
      unsubscribeMarketing();
    };
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

  const updateMarketingStore = async (marketingConfig) => {
    try {
      const marketingRef = doc(db, 'settings', 'marketing');
      await setDoc(marketingRef, marketingConfig);
      return true;
    } catch (err) {
      console.error("Failed to update marketing", err);
      return false;
    }
  };

  return (
    <CatalogContext.Provider value={{ products, marketing, loading, updateProductStock, updateMarketingStore }}>
      {children}
    </CatalogContext.Provider>
  );
};
