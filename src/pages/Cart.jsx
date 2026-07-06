import React from 'react';
import { useCart } from '../context/CartContext';
import { IoTrashOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="container empty-cart">
        <h2>Your Bag is Empty</h2>
        <p>Looks like you haven't added anything to your bag yet.</p>
        <button className="continue-shopping" onClick={() => navigate('/')}>CONTINUE SHOPPING</button>
      </div>
    );
  }

  return (
    <div className="container cart-container">
      <div className="cart-items-section">
        <h2>My Bag ({totalItems} items)</h2>
        
        <div className="cart-items-list">
          {cartItems.map(item => (
            <div key={`${item.product.id}-${item.size}`} className="cart-item">
              <img src={item.product.image} alt={item.product.title} className="cart-item-image" />
              
              <div className="cart-item-details">
                <div className="cart-item-header">
                  <div>
                    <h3>{item.product.title}</h3>
                    <p className="cart-item-price">₹{item.customPrice !== null ? item.customPrice : item.product.price}</p>
                  </div>
                  <button className="remove-btn" onClick={() => removeFromCart(item.product.id, item.size)}>
                    <IoTrashOutline size={20} />
                  </button>
                </div>
                
                <div className="cart-item-options">
                  <div className="option-box">Size: <strong>{item.size}</strong></div>
                  <div className="option-box">
                    Qty: 
                    <select 
                      value={item.quantity} 
                      onChange={(e) => updateQuantity(item.product.id, item.size, parseInt(e.target.value))}
                    >
                      {[1,2,3,4,5,6,7,8,9,10].map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="cart-summary-section">
        <div className="price-summary">
          <h3>Price Summary</h3>
          <div className="summary-row">
            <span>Total MRP (Incl. of taxes)</span>
            <span>₹{cartItems.reduce((acc, i) => acc + ((i.customOriginalPrice !== null ? i.customOriginalPrice : i.product.originalPrice) * i.quantity), 0)}</span>
          </div>
          <div className="summary-row discount">
            <span>Bag Discount</span>
            <span>- ₹{cartItems.reduce((acc, i) => {
              const original = i.customOriginalPrice !== null ? i.customOriginalPrice : i.product.originalPrice;
              const price = i.customPrice !== null ? i.customPrice : i.product.price;
              return acc + ((original - price) * i.quantity);
            }, 0)}</span>
          </div>
          <div className="summary-row">
            <span>Delivery Fee</span>
            <span className="free">FREE</span>
          </div>
          <div className="summary-row total">
            <span>Subtotal</span>
            <span>₹{totalPrice}</span>
          </div>
        </div>
        
        <button className="checkout-btn" onClick={() => navigate('/checkout')}>PROCEED TO CHECKOUT</button>
      </div>
    </div>
  );
};

export default Cart;
