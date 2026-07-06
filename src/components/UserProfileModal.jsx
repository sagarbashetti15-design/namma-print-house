import React, { useState } from 'react';
import { IoCloseOutline, IoLogOutOutline, IoSaveOutline, IoPersonOutline, IoMailOutline, IoCallOutline } from 'react-icons/io5';
import './UserProfileModal.css';

const UserProfileModal = ({ isOpen, onClose, userProfile, onSave, onLogout }) => {
  const [name, setName] = useState(userProfile?.name || '');
  const [email, setEmail] = useState(userProfile?.email || '');
  const [mobile, setMobile] = useState(userProfile?.mobile || '');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ name, email, mobile });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content profile-modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><IoCloseOutline size={24} /></button>
        
        <div className="modal-header">
          <h2>My Profile</h2>
          <p>View and manage your account details</p>
        </div>

        <form className="modal-form profile-form" onSubmit={handleSubmit}>
          <div className="profile-field-group">
            <label><IoPersonOutline size={16} /> Full Name</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </div>

          <div className="profile-field-group">
            <label><IoMailOutline size={16} /> Gmail / Email Address</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>

          <div className="profile-field-group">
            <label><IoCallOutline size={16} /> Mobile Number</label>
            <input 
              type="tel" 
              placeholder="e.g. +91 98765 43210" 
              value={mobile} 
              onChange={(e) => setMobile(e.target.value)} 
            />
          </div>
          
          <button type="submit" className="primary-btn save-profile-btn">
            <IoSaveOutline size={18} /> SAVE CHANGES
          </button>
        </form>

        <div className="profile-actions-divider"></div>

        <button type="button" className="logout-btn" onClick={onLogout}>
          <IoLogOutOutline size={18} /> Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfileModal;
