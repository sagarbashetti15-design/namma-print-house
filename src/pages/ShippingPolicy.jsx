import React from 'react';
import './InfoPage.css';

const ShippingPolicy = () => {
  return (
    <div className="info-page">
      <div className="info-header">
        <h1 className="info-title">SHIPPING POLICY</h1>
        <p className="info-subtitle">Fast & Reliable Pan India Shipping</p>
      </div>

      <div className="info-section">
        <h2>Delivery Timelines</h2>
        <p>At Namma Print House, we strive to print, pack, and ship your orders as quickly as possible. All orders are processed and dispatched within 24-48 hours from our studio in Bengaluru.</p>
        <p><strong>Pan India Delivery:</strong> We deliver to all pincodes across India. Once dispatched, your package will reach you within <strong>2 to 5 working days</strong> depending on your location.</p>
      </div>

      <div className="info-section">
        <h2>Shipping Charges</h2>
        <ul className="info-list">
          <li><strong>Free Shipping:</strong> All orders above <strong>₹999</strong> qualify for free standard shipping.</li>
          <li><strong>Standard Shipping:</strong> For orders below ₹999, a flat shipping charge of <strong>₹60</strong> is applicable PAN India.</li>
        </ul>
      </div>

      <div className="info-section">
        <h2>Tracking Your Order</h2>
        <p>Once your order is shipped, you will receive an SMS and email notification with the tracking link and AWB number. You can also track your order directly on our website by going to the "Track Order" page in the footer menu.</p>
      </div>

      <div className="info-section">
        <h2>Delay & Support</h2>
        <p>While we make every effort to deliver within the specified timelines, delivery times may occasionally be affected by public holidays, extreme weather conditions, or carrier delays. If your order is delayed beyond 7 business days, please contact our support team:</p>
        <p>✉️ <strong>nammaprinthouse2k26@gmail.com</strong><br/>📞 <strong>+91 8296437764</strong></p>
      </div>
    </div>
  );
};

export default ShippingPolicy;
