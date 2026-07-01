import React, { createContext, useState, useContext, useEffect } from 'react';
import { useCatalog } from './CatalogContext';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  // Read active marketing discount from context
  const { marketing: marketingConfig } = useCatalog();
  const [discountInfo, setDiscountInfo] = useState(null);
  
  React.useEffect(() => {
    if (marketingConfig && marketingConfig.discountData && marketingConfig.discountData.type !== 'none' && marketingConfig.discountData.value > 0) {
      setDiscountInfo(marketingConfig.discountData);
    } else {
      setDiscountInfo(null);
    }
  }, [marketingConfig]);

  // Compute processed cart items with active global discounts applied
  const processedCartItems = React.useMemo(() => {
    return cartItems.map(item => {
      const basePrice = item.customPrice !== null ? item.customPrice : item.product.price;
      let finalPrice = basePrice;
      const isEligible = discountInfo && 
        (discountInfo.applicableCategory === 'all' || item.product.category === discountInfo.applicableCategory);
      
      if (isEligible) {
        if (discountInfo.type === 'percent') {
          finalPrice = Math.round(basePrice * (1 - discountInfo.value / 100));
        } else if (discountInfo.type === 'flat') {
          finalPrice = Math.max(basePrice - discountInfo.value, 0);
        }
      }
      return {
        ...item,
        // Override or set customPrice to the final discounted price
        customPrice: finalPrice
      };
    });
  }, [cartItems, discountInfo]);

  const openCartDrawer = () => setIsCartDrawerOpen(true);
  const closeCartDrawer = () => setIsCartDrawerOpen(false);

  const addToCart = (product, size, customPrice = null, customOriginalPrice = null) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.product.id === product.id && item.size === size);
      if (existingItem) {
        return prev.map(item => 
          item.product.id === product.id && item.size === size 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { 
        product, 
        size, 
        quantity: 1, 
        customPrice, 
        customOriginalPrice 
      }];
    });
    // Auto-open cart drawer on adding a product
    setIsCartDrawerOpen(true);
  };

  const removeFromCart = (productId, size) => {
    setCartItems(prev => prev.filter(item => !(item.product.id === productId && item.size === size)));
  };

  const updateQuantity = (productId, size, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prev => 
      prev.map(item => 
        item.product.id === productId && item.size === size 
          ? { ...item, quantity: newQuantity } 
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalItems = processedCartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = processedCartItems.reduce((acc, item) => {
    const price = item.customPrice !== null ? item.customPrice : item.product.price;
    return acc + (price * item.quantity);
  }, 0);

  return (
    <CartContext.Provider value={{ 
      cartItems: processedCartItems, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart,
      totalItems, 
      totalPrice,
      isCartDrawerOpen,
      openCartDrawer,
      closeCartDrawer
    }}>
      {children}
    </CartContext.Provider>
  );
};
