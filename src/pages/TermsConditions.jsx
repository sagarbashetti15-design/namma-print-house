import React from 'react';
import './InfoPage.css';

const TermsConditions = () => {
  return (
    <div className="info-page">
      <div className="info-header">
        <h1 className="info-title">TERMS & CONDITIONS</h1>
        <p className="info-subtitle">Namma Print House Store Guidelines</p>
      </div>

      <div className="info-section">
        <h2>1. Acceptance of Terms</h2>
        <p>By accessing and placing an order with <strong>Namma Print House</strong> (nammaprinthouse.com), you confirm that you agree to and are bound by the terms of service contained in the Terms & Conditions outlined below. These terms apply to the entire website and any email or other type of communication between you and Namma Print House.</p>
      </div>

      <div className="info-section">
        <h2>2. Products and Pricing</h2>
        <p>We reserve the right to alter pricing, product descriptions, and availability without prior notice. While we strive to display color options and fabric textures as accurately as possible, actual screen renders may vary slightly based on display settings.</p>
        <p>All prices listed on the store are inclusive of taxes where applicable, and exclusive of shipping unless otherwise stated (e.g., standard free shipping above ₹999).</p>
      </div>

      <div className="info-section">
        <h2>3. Custom Printing Guidelines</h2>
        <p>When utilizing our custom designer to upload designs, text, or graphics, you guarantee that you hold the copyrights or appropriate licenses for the content. Namma Print House reserves the right to reject custom orders containing explicit hate speech, copyrighted logos without permission, or offensive material.</p>
        <p>Custom printed apparel is made-to-order and cannot be refunded or exchanged unless there is an structural defect or printing error on our part.</p>
      </div>

      <div className="info-section">
        <h2>4. Payments & Security</h2>
        <p>We offer secure payment gateways supporting UPI, debit/credit cards, and Cash on Delivery (COD). Namma Print House never stores your credit card details or bank credentials on our servers.</p>
      </div>

      <div className="info-section">
        <h2>5. Shipping & Cancellations</h2>
        <p>Orders can be cancelled within 12 hours of placement or before they enter the printing/shipping stage. Once shipped, orders must be processed under our standard return policy.</p>
      </div>

      <div className="info-section">
        <h2>6. Intellectual Property</h2>
        <p>All brand graphics, logos (including NPH logo), website designs, and custom artwork featured on this store are the exclusive property of Namma Print House and Raghavendra Pujar. Unauthorized reproduction is strictly prohibited.</p>
      </div>
    </div>
  );
};

export default TermsConditions;
