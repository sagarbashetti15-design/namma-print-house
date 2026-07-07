import React from 'react';
import { IoCloseOutline, IoLogOutOutline, IoPersonOutline, IoBagCheckOutline } from 'react-icons/io5';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './UserProfileModal.css';

const UserProfileModal = ({ isOpen, onClose }) => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  if (!isOpen || !currentUser) return null;

  const handleLogout = async () => {
    try {
      await logout();
      onClose();
    } catch (e) {
      console.error(e);
    }
  };

  const handleMyOrders = () => {
    onClose();
    navigate('/my-orders');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content profile-modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><IoCloseOutline size={24} /></button>
        
        <div className="modal-header" style={{ textAlign: 'center' }}>
          {currentUser.photoURL ? (
            <img src={currentUser.photoURL} alt="Profile" style={{ width: '60px', height: '60px', borderRadius: '50%', marginBottom: '10px' }} />
          ) : (
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#0d2850', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px', fontSize: '24px' }}>
              <IoPersonOutline />
            </div>
          )}
          <h2>{currentUser.displayName || 'My Account'}</h2>
          <p style={{ color: '#666', fontSize: '0.9rem', margin: 0 }}>{currentUser.email}</p>
        </div>

        <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button 
            type="button" 
            onClick={handleMyOrders}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', width: '100%', backgroundColor: '#0d2850', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' }}
          >
            <IoBagCheckOutline size={20} /> View My Orders
          </button>
          
          <button 
            type="button" 
            className="logout-btn" 
            onClick={handleLogout}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', width: '100%', backgroundColor: '#fee2e2', color: '#dc2626', border: '1px solid #fecaca', borderRadius: '6px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' }}
          >
            <IoLogOutOutline size={20} /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;

