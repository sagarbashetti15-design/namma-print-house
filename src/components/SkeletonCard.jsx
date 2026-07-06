import React from 'react';
import { motion } from 'framer-motion';

const SkeletonCard = () => {
  return (
    <div className="product-card" style={{ boxShadow: 'none' }}>
      <div className="product-image-wrap" style={{ position: 'relative', width: '100%', aspectRatio: '1/1', overflow: 'hidden', backgroundColor: '#f0f0f0' }}>
        <motion.div
          animate={{ x: ['-100%', '100%'] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          style={{
            position: 'absolute',
            top: 0, bottom: 0, left: 0, right: 0,
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)'
          }}
        />
      </div>
      <div className="product-info" style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '15px' }}>
        <div style={{ height: '20px', backgroundColor: '#f0f0f0', borderRadius: '4px', width: '80%', overflow: 'hidden', position: 'relative' }}>
          <motion.div
            animate={{ x: ['-100%', '100%'] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            style={{
              position: 'absolute', top: 0, bottom: 0, left: 0, right: 0,
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)'
            }}
          />
        </div>
        <div style={{ height: '16px', backgroundColor: '#f0f0f0', borderRadius: '4px', width: '40%', overflow: 'hidden', position: 'relative' }}>
          <motion.div
            animate={{ x: ['-100%', '100%'] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            style={{
              position: 'absolute', top: 0, bottom: 0, left: 0, right: 0,
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
