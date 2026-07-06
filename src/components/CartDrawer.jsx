import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { useCatalog } from '../context/CatalogContext';
import { IoCloseOutline, IoTrashOutline, IoRemoveOutline, IoAddOutline, IoBagOutline, IoAddCircleOutline } from 'react-icons/io5';
import './CartDrawer.css';

const CartDrawer = () => {
  const { 
    cartItems, 
    addToCart,
    removeFromCart, 
    updateQuantity, 
    totalPrice, 
    isCartDrawerOpen, 
    closeCartDrawer 
  } = useCart();

  const { showToast } = useToast();
  const { products } = useCatalog();
  const navigate = useNavigate();

  // Find 3 products that are not currently in the cart
  const cartProductIds = cartItems.map(item => item.product.id);
  const recommendations = products
    .filter(p => !cartProductIds.includes(p.id) && !p.isVisualCustomizer)
    .slice(0, 3);

  // Prevent scroll when cart drawer is open
  useEffect(() => {
    if (isCartDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCartDrawerOpen]);

  const handleCheckoutClick = () => {
    closeCartDrawer();
    navigate('/checkout');
  };

  const handleViewCartClick = () => {
    closeCartDrawer();
    navigate('/cart');
  };

  return (
    <>
      {/* Background Overlay */}
      <div 
        className={`cart-drawer-overlay ${isCartDrawerOpen ? 'open' : ''}`} 
        onClick={closeCartDrawer}
      />

      {/* Cart Drawer Panel */}
      <div className={`cart-drawer ${isCartDrawerOpen ? 'open' : ''}`}>
        <div className="cart-drawer-header">
          <div className="cd-title">
            <IoBagOutline size={20} />
            <span>Your Cart ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})</span>
          </div>
          <button className="cd-close-btn" aria-label="Close cart" onClick={closeCartDrawer}>
            <IoCloseOutline size={24} />
          </button>
        </div>

        <div className="cart-drawer-items">
          {cartItems.length === 0 ? (
            <div className="cd-empty-state">
              <IoBagOutline size={48} className="cd-empty-icon" />
              <h3>Your cart is empty</h3>
              <p>Add some premium oversized T-shirts to get started!</p>
              <button className="btn btn-navy" onClick={closeCartDrawer}>
                SHOP NOW
              </button>
            </div>
          ) : (
            cartItems.map((item, index) => {
              const displayPrice = item.customPrice !== null ? item.customPrice : item.product.price;
              return (
                <div key={`${item.product.id}-${item.size}-${index}`} className="cd-item">
                  <div className="cd-item-img-wrapper">
                    <img src={item.product.image} alt={item.product.title} className="cd-item-img" loading="lazy" width="80" height="106" />
                  </div>
                  
                  <div className="cd-item-details">
                    <h4 className="cd-item-title">{item.product.title}</h4>
                    <p className="cd-item-meta">Size: {item.size}</p>
                    
                    <div className="cd-item-bottom">
                      <div className="quantity-selector cd-qty">
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <IoRemoveOutline size={14} />
                        </button>
                        <span>{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                        >
                          <IoAddOutline size={14} />
                        </button>
                      </div>
                      
                      <span className="cd-item-price">₹{displayPrice * item.quantity}</span>
                    </div>
                  </div>

                  <button 
                    className="cd-item-remove"
                    onClick={() => removeFromCart(item.product.id, item.size)}
                    title="Remove item"
                  >
                    <IoTrashOutline size={16} />
                  </button>
                </div>
              );
            })
          )}

          {cartItems.length > 0 && recommendations.length > 0 && (
            <div className="cd-upsell-container">
              <h4 className="cd-upsell-heading">Complete the Look</h4>
              <div className="cd-upsell-list">
                {recommendations.map(prod => (
                  <div key={prod.id} className="cd-upsell-item">
                    <div className="cd-upsell-img-wrap">
                      <img src={prod.image} alt={prod.title} className="cd-upsell-img" loading="lazy" width="80" height="106" />
                    </div>
                    <div className="cd-upsell-info">
                      <p className="cd-upsell-title">{prod.title}</p>
                      <span className="cd-upsell-price">₹{prod.price}</span>
                    </div>
                    <button 
                      className="cd-upsell-add-btn" 
                      onClick={() => {
                        addToCart(prod, 'L');
                        showToast(`${prod.title} (Size: L) added!`, 'success', prod.image);
                      }}
                      title="Add size L to cart"
                    >
                      <IoAddCircleOutline size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cd-summary-row">
              <span>Subtotal</span>
              <span className="cd-subtotal-price">₹{totalPrice}</span>
            </div>
            <p className="cd-footer-note">Shipping & taxes calculated at checkout.</p>
            
            <div className="cd-actions">
              <button className="btn btn-outline cd-btn-cart" onClick={handleViewCartClick}>
                VIEW FULL CART
              </button>
              <button className="btn btn-yellow cd-btn-checkout" onClick={handleCheckoutClick}>
                CHECKOUT NOW
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
