import React from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { useToast } from '../context/ToastContext';
import { auth, googleProvider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import './LoginModal.css';

const LoginModal = ({ isOpen, onClose, onLogin }) => {
  const { showToast } = useToast();
  
  if (!isOpen) return null;

  const handleGoogleLogin = async () => {
    try {
      // Force Google to show the account selection screen
      googleProvider.setCustomParameters({
        prompt: 'select_account'
      });
      
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      const userProfile = {
        name: user.displayName || 'Google User',
        email: user.email,
        mobile: user.phoneNumber || '',
        uid: user.uid,
        photoURL: user.photoURL
      };

      const token = await user.getIdToken();
      localStorage.setItem('nph_token', token);
      
      onLogin(userProfile);
    } catch (err) {
      console.error(err);
      // Give a more descriptive error based on common Firebase issues
      let errorMessage = 'Google login failed. Please try again.';
      if (err.code === 'auth/unauthorized-domain') {
        errorMessage = 'This domain is not authorized in Firebase. Please add it to Firebase Console -> Authentication -> Settings -> Authorized Domains.';
      } else if (err.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Login popup was closed before completing.';
      } else {
        errorMessage = `Login error: ${err.message}`;
      }
      showToast(errorMessage, 'error');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><IoCloseOutline size={24} /></button>
        
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
