import React from 'react';
import { X } from 'lucide-react';
import axios from 'axios';
import { useToast } from '../context/ToastContext';
import './LoginModal.css';

const LoginModal = ({ isOpen, onClose, onLogin }) => {
  const { showToast } = useToast();
  
  if (!isOpen) return null;

  const handleGoogleLogin = async () => {
    // For MVP Google OAuth mock
    try {
      const res = await axios.post('/api/auth/login', { email: 'user@gmail.com', password: 'google_auth_mock' });
      localStorage.setItem('nph_token', res.data.token);
      onLogin(res.data.user);
    } catch (err) {
      // Fallback: register the mock google user if they don't exist
      try {
        const reg = await axios.post('/api/auth/register', { name: 'Google User', email: 'user@gmail.com', password: 'google_auth_mock', mobile: '' });
        localStorage.setItem('nph_token', reg.data.token);
        onLogin(reg.data.user);
      } catch (err2) {
        showToast('Google login failed', 'error');
      }
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><X size={24} /></button>
        
        <div className="modal-header">
          <h2>Welcome</h2>
          <p>Login to continue shopping</p>
        </div>

        <button type="button" className="google-login-btn" onClick={handleGoogleLogin} style={{ marginBottom: '5px' }}>
          <svg className="google-icon" viewBox="0 0 24 24" width="20" height="20">
            <path fill="#EA4335" d="M12 5.04c1.78 0 3.37.61 4.63 1.8l3.46-3.46C17.99 1.3 15.22 0 12 0 7.37 0 3.36 2.66 1.41 6.55l3.99 3.1C6.35 6.88 8.94 5.04 12 5.04z"/>
            <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.51h6.46c-.29 1.48-1.14 2.73-2.4 3.58l3.73 2.9c2.18-2.01 3.7-4.96 3.7-8.63z"/>
            <path fill="#FBBC05" d="M5.4 14.35c-.24-.72-.38-1.5-.38-2.35s.14-1.63.38-2.35L1.41 6.55C.51 8.19 0 10.04 0 12s.51 3.81 1.41 5.45l3.99-3.1z"/>
            <path fill="#34A853" d="M12 24c3.24 0 5.97-1.07 7.96-2.91l-3.73-2.9c-1.04.7-2.38 1.11-4.23 1.11-3.06 0-5.65-1.84-6.6-4.61L1.41 17.8c1.95 3.89 5.96 6.55 12 6.55z"/>
          </svg>
          Continue with Google
        </button>

      </div>
    </div>
  );
};

export default LoginModal;
