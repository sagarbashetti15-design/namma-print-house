import React from 'react';
import './InfoPage.css';

const ReturnRefundPolicy = () => {
  return (
    <div className="info-page">
      <div className="info-header">
        <h1 className="info-title">RETURN & REFUND</h1>
        <p className="info-subtitle">7-Day Easy Returns & Exchanges</p>
      </div>

      <div className="info-section">
        <h2>Our Policy</h2>
        <p>We want you to love your purchase! If you are not completely satisfied with your order, we offer a hassle-free <strong>7-Day Easy Returns & Exchanges</strong> policy from the date of delivery.</p>
        <p>Whether you want to swap for a different size or request a full refund, our support team will handle it quickly and professionally.</p>
      </div>

      <div className="info-section">
        <h2>Conditions for Returns & Exchanges</h2>
        <p>To qualify for a return or exchange, the item must meet the following criteria:</p>
        <ul className="info-list">
          <li>The request must be made within 7 days of delivery.</li>
          <li>Items must be unworn, unwashed, and undamaged.</li>
          <li>All original tags, including the NPH brand tag, must be intact.</li>
          <li>Custom prints (customized text/images uploaded by you) are not eligible for returns unless there is a print defect or shipping damage.</li>
        </ul>
      </div>

      <div className="info-section">
        <h2>How It Works</h2>
        <p><strong>Step 1: Raise a Request</strong><br/>Email us at <strong>nammaprinthouse2k26@gmail.com</strong> or call <strong>+91 8296437764</strong> with your Order ID and the reason for return/exchange.</p>
        <p><strong>Step 2: Free Reverse Pickup</strong><br/>Namma Print House will arrange a free reverse pickup from your delivery address within 24-48 hours of request approval.</p>
        <p><strong>Step 3: Verification & Processing</strong><br/>Once the item is picked up and verified by our courier partner, we will process your exchange order or issue a full refund immediately to your original payment mode (or UPI/bank account for COD orders).</p>
      </div>

      <div className="info-section">
        <h2>Damaged or Defective Items</h2>
        <p>In the rare event that your product arrives damaged or with a print defect, please notify us within 48 hours of delivery. We will ship a brand-new replacement to you immediately at no additional cost.</p>
      </div>
    </div>
  );
};

export default ReturnRefundPolicy;
