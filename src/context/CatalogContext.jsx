import React, { createContext, useContext, useState, useEffect } from 'react';
import { products as fallbackProducts } from '../data/catalog'; // Fallback if DB fails

const CatalogContext = createContext();

export const useCatalog = () => useContext(CatalogContext);

export const CatalogProvider = ({ children }) => {
  const [products, setProducts] = useState(fallbackProducts);
  const [marketing, setMarketing] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribeCatalog = () => {};
    let unsubscribeMarketing = () => {};

    const loadFirestore = async () => {
      try {
        const { db } = await import('../firebase');
        const { collection, onSnapshot, doc } = await import('firebase/firestore');

        unsubscribeCatalog = onSnapshot(
          collection(db, 'catalog'),
          (snapshot) => {
            const fetchedProducts = snapshot.docs.map((d) => d.data());
            if (fetchedProducts.length > 0) {
              fetchedProducts.sort((a, b) => {
                const aNum = Number(a.id);
                const bNum = Number(b.id);
                if (!isNaN(aNum) && !isNaN(bNum)) return bNum - aNum;
                if (!isNaN(aNum)) return -1;
                if (!isNaN(bNum)) return 1;
                return a.id.localeCompare(b.id);
              });
              setProducts(fetchedProducts);
            }
            setLoading(false);
          },
          (error) => {
            console.error("Error fetching catalog:", error);
            setLoading(false);
          }
        );

        unsubscribeMarketing = onSnapshot(
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
      } catch (err) {
        console.error("Failed to load Firebase", err);
        setLoading(false);
      }
    };

    loadFirestore();

    return () => {
      unsubscribeCatalog();
      unsubscribeMarketing();
    };
  }, []);

  const updateProductStock = async (productId, outOfStock) => {
    try {
      const { db } = await import('../firebase');
      const { doc, updateDoc } = await import('firebase/firestore');
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
      const { db } = await import('../firebase');
      const { doc, setDoc } = await import('firebase/firestore');
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
