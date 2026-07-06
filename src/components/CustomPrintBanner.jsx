import React from 'react';
import { IoCheckmarkOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import './CustomPrintBanner.css';

const CustomPrintBanner = () => {
  return (
    <section className="cpb-section">
      <div className="container">
        <div className="cpb-banner">
          <div className="cpb-content">
            <h4 className="cpb-subtitle">MAKE IT YOURS</h4>
            <h2 className="cpb-title">
              <span className="text-yellow">CUSTOM</span> PRINTING
            </h2>
            
            <div className="cpb-features-grid">
              <div className="cpb-feature">
                <IoCheckmarkOutline size={18} className="text-yellow" />
                <span>Photo Print</span>
              </div>
              <div className="cpb-feature">
                <IoCheckmarkOutline size={18} className="text-yellow" />
                <span>Couple Print</span>
              </div>
              <div className="cpb-feature">
                <IoCheckmarkOutline size={18} className="text-yellow" />
                <span>Name Print</span>
              </div>
              <div className="cpb-feature">
                <IoCheckmarkOutline size={18} className="text-yellow" />
                <span>Company Orders</span>
              </div>
              <div className="cpb-feature">
                <IoCheckmarkOutline size={18} className="text-yellow" />
                <span>Logo Print</span>
              </div>
              <div className="cpb-feature">
                <IoCheckmarkOutline size={18} className="text-yellow" />
                <span>Bulk Orders</span>
              </div>
            </div>
            
            <Link to="/category/custom" className="btn btn-yellow">START DESIGNING</Link>
          </div>
          
          <div className="cpb-image-wrapper">
            <img 
              src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=600&h=400" 
              alt="Custom T-Shirt" 
              className="cpb-image"
              loading="lazy"
              width="600"
              height="400"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomPrintBanner;
