import React from 'react';
import { NavLink } from 'react-router-dom';
import { IoHomeOutline, IoSearchOutline, IoHeartOutline, IoBagOutline, IoPersonOutline } from 'react-icons/io5';
import { useCart } from '../context/CartContext';
import './BottomNav.css';

const BottomNav = () => {
  const { cartItems, openCartDrawer } = useCart();
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="bottom-nav">
      <div className="bottom-nav-container">
        <NavLink to="/" className={({ isActive }) => (isActive ? 'bottom-nav-item active' : 'bottom-nav-item')}>
          <IoHomeOutline className="bottom-nav-icon" />
          <span>Home</span>
        </NavLink>
        <NavLink to="/search" className={({ isActive }) => (isActive ? 'bottom-nav-item active' : 'bottom-nav-item')}>
          <IoSearchOutline className="bottom-nav-icon" />
          <span>Search</span>
        </NavLink>
        <NavLink to="/wishlist" className={({ isActive }) => (isActive ? 'bottom-nav-item active' : 'bottom-nav-item')}>
          <IoHeartOutline className="bottom-nav-icon" />
          <span>Saved</span>
        </NavLink>
        <button className="bottom-nav-item" onClick={openCartDrawer}>
          <div className="bottom-nav-icon-wrapper">
            <IoBagOutline className="bottom-nav-icon" />
            {cartItemCount > 0 && <span className="bottom-nav-badge">{cartItemCount}</span>}
          </div>
          <span>Cart</span>
        </button>
        <NavLink to="/admin" className={({ isActive }) => (isActive ? 'bottom-nav-item active' : 'bottom-nav-item')}>
          <IoPersonOutline className="bottom-nav-icon" />
          <span>Profile</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default BottomNav;
