import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, doc, updateDoc, setDoc } from 'firebase/firestore';
import { products as fallbackProducts } from '../data/catalog'; // Local static catalog

const CatalogContext = createContext();

export const useCatalog = () => useContext(CatalogContext);

export const CatalogProvider = ({ children }) => {
  const [products, setProducts] = useState(fallbackProducts);
  const [marketing, setMarketing] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen to real-time updates from Firestore
    const unsubscribe = onSnapshot(
      collection(db, 'catalog'),
      (snapshot) => {
        const fetchedProducts = snapshot.docs.map((doc) => doc.data());
        
        // Smart Merge: Connect Admin DB with Local Catalog
        let mergedProducts = [...fallbackProducts];

        fetchedProducts.forEach(dbProduct => {
          const localIndex = mergedProducts.findIndex(p => p.id === dbProduct.id);
          if (localIndex >= 0) {
            // Apply admin dashboard overrides (stock) but keep local prices for Razorpay testing
            mergedProducts[localIndex] = {
              ...mergedProducts[localIndex],
              outOfStock: dbProduct.outOfStock !== undefined ? dbProduct.outOfStock : mergedProducts[localIndex].outOfStock,
              outOfStockSizes: dbProduct.outOfStockSizes || mergedProducts[localIndex].outOfStockSizes
            };
          } else {
            // New products added purely via Admin Dashboard
            mergedProducts.push(dbProduct);
          }
        });

        // Sort newest first
        mergedProducts.sort((a, b) => {
          const aNum = Number(a.id);
          const bNum = Number(b.id);
          if (!isNaN(aNum) && !isNaN(bNum)) return bNum - aNum;
          if (!isNaN(aNum)) return -1;
          if (!isNaN(bNum)) return 1;
          return a.id.localeCompare(b.id);
        });

        setProducts(mergedProducts);
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
