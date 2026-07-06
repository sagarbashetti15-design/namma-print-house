import React, { useState, useEffect } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';

const NewsletterModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const hasSeen = localStorage.getItem('newsletter_seen');
    if (!hasSeen) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 10000); // Show after 10 seconds
      return () => clearTimeout(timer);
    }
  }, []);

  const close = () => {
    setIsOpen(false);
    localStorage.setItem('newsletter_seen', 'true');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      localStorage.setItem('newsletter_seen', 'true');
      setTimeout(() => {
        setIsOpen(false);
      }, 3000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="newsletter-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 9999, padding: '20px'
          }}
          onClick={close}
        >
          <motion.div 
            className="newsletter-modal"
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            style={{
              backgroundColor: '#fff', borderRadius: '12px',
              maxWidth: '500px', width: '100%', overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              position: 'relative', display: 'flex', flexDirection: 'column'
            }}
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={close}
              style={{
                position: 'absolute', top: '15px', right: '15px',
                background: 'rgba(255,255,255,0.8)', border: 'none',
                borderRadius: '50%', width: '32px', height: '32px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', zIndex: 10
              }}
            >
              <IoCloseOutline size={20} />
            </button>
            
            <div style={{ padding: '40px', textAlign: 'center' }}>
              {!submitted ? (
                <>
                  <h2 style={{ fontSize: '2rem', textTransform: 'uppercase', marginBottom: '10px' }}>Unlock 10% Off</h2>
                  <p style={{ color: '#555', marginBottom: '25px', lineHeight: '1.5' }}>
                    Join the Namma Print House family and get 10% off your first order, plus exclusive access to new drops!
                  </p>
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <input 
                      type="email" 
                      placeholder="Enter your email address" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      style={{
                        padding: '15px', border: '1px solid #ddd',
                        borderRadius: '6px', fontSize: '1rem',
                        outline: 'none', width: '100%'
                      }}
                    />
                    <button 
                      type="submit"
                      style={{
                        padding: '15px', backgroundColor: '#000',
                        color: '#fff', border: 'none', borderRadius: '6px',
                        fontSize: '1rem', fontWeight: 'bold', textTransform: 'uppercase',
                        cursor: 'pointer', letterSpacing: '1px'
                      }}
                    >
                      Reveal My Code
                    </button>
                  </form>
                  <button 
                    onClick={close}
                    style={{
                      background: 'none', border: 'none', color: '#888',
                      marginTop: '20px', textDecoration: 'underline',
                      cursor: 'pointer', fontSize: '0.85rem'
                    }}
                  >
                    No thanks, I prefer paying full price
                  </button>
                </>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ padding: '30px 0' }}
                >
                  <div style={{ 
                    width: '60px', height: '60px', borderRadius: '50%', 
                    backgroundColor: '#4caf50', color: '#fff', display: 'flex', 
                    alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' 
                  }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ width: '30px', height: '30px' }}>
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <h2 style={{ fontSize: '1.8rem', marginBottom: '15px' }}>You're In!</h2>
                  <p style={{ color: '#555', marginBottom: '20px' }}>Use code at checkout:</p>
                  <div style={{ 
                    padding: '15px 30px', backgroundColor: '#f5f5f5', 
                    border: '2px dashed #ccc', display: 'inline-block',
                    fontSize: '1.5rem', fontWeight: 'bold', letterSpacing: '2px'
                  }}>
                    NAMMA10
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NewsletterModal;
