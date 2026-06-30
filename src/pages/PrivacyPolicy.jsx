import React from 'react';
import './InfoPage.css';

const PrivacyPolicy = () => {
  return (
    <div className="info-page">
      <div className="info-header">
        <h1 className="info-title">PRIVACY POLICY</h1>
        <p className="info-subtitle">Your Privacy is Safe with Us</p>
      </div>

      <div className="info-section">
        <h2>1. Information We Collect</h2>
        <p>When you visit Namma Print House or place an order, we collect specific personal information required to complete your transaction and improve your shopping experience. This includes:</p>
        <ul className="info-list">
          <li>Name, shipping address, billing address.</li>
          <li>Email address, phone number.</li>
          <li>IP address and browser details.</li>
          <li>Custom design assets uploaded by you for print jobs.</li>
        </ul>
      </div>

      <div className="info-section">
        <h2>2. How We Use Your Data</h2>
        <p>We use the collected information for the following purposes:</p>
        <ul className="info-list">
          <li>Processing, printing, and delivering your custom apparel.</li>
          <li>Sending shipping updates, tracking links, and transaction receipts.</li>
          <li>Providing customer support regarding orders or sizing.</li>
          <li>Sending newsletter offers and promotions (only if you subscribe).</li>
        </ul>
      </div>

      <div className="info-section">
        <h2>3. Data Sharing & Security</h2>
        <p>We do not sell, trade, or share your personal information with third parties, except for essential service partners (courier companies for delivery and secure payment gateways for processing payments).</p>
        <p>We employ standard secure-socket-layer (SSL) technology and industry-standard security measures to safeguard your personal data from unauthorized access or alteration.</p>
      </div>

      <div className="info-section">
        <h2>4. Cookies</h2>
        <p>Our website uses cookies to remember items in your shopping cart, save your preferences for future visits, and compile aggregate data about site traffic for analytics purposes.</p>
      </div>

      <div className="info-section">
        <h2>5. Your Choices & Rights</h2>
        <p>You can opt-out of our marketing newsletters at any time by clicking the "Unsubscribe" link at the bottom of our emails. You can also contact us to request the deletion or correction of your personal database records.</p>
      </div>

      <div className="info-section">
        <h2>6. Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please reach out to us at <strong>nammaprinthouse2k26@gmail.com</strong>.</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
