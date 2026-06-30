import React from 'react';
import { Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        
        <div className="footer-col brand-col">
          <div className="footer-logo">
            <span className="logo-text text-yellow">NAMMA</span>
            <span className="logo-sub text-white">PRINT HOUSE</span>
          </div>
          <p className="footer-desc">
            "Your Idea. Our Print. Your Identity."<br/>
            Premium oversized t-shirts & custom prints.
          </p>
          <div className="social-links">
            <a href="https://www.instagram.com/namma_print_house2k26" target="_blank" rel="noopener noreferrer" className="social-link">IG</a>
            <a href="#" className="social-link">FB</a>
            <a href="#" className="social-link">TW</a>
            <a href="#" className="social-link">YT</a>
            <a href="mailto:nammaprinthouse2k26@gmail.com" className="social-link"><Mail size={18} /></a>
          </div>
          <div className="footer-contact-info" style={{ marginTop: '15px', fontSize: '0.85rem', color: '#bbb', display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <p>📍 Bengaluru</p>
            <p>📞 +91 8296437764</p>
            <p>✉️ nammaprinthouse2k26@gmail.com</p>
          </div>
        </div>
        
        <div className="footer-col">
          <h4 className="footer-heading">QUICK LINKS</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About us</Link></li>
            <li><Link to="/category/all">Products</Link></li>
            <li><Link to="/category/custom">Custom Print</Link></li>
            <li><Link to="/track-order">Track Order</Link></li>
          </ul>
        </div>
        
        <div className="footer-col">
          <h4 className="footer-heading">HELP & SUPPORT</h4>
          <ul className="footer-links">
            <li><Link to="/contact">Contact us</Link></li>
            <li><Link to="/shipping">Shipping Policy</Link></li>
            <li><Link to="/returns">Return & Refund</Link></li>
            <li><Link to="/terms">Terms & Conditions</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
          </ul>
        </div>
        
        <div className="footer-col">
          <h4 className="footer-heading">INFORMATION</h4>
          <ul className="footer-links">
            <li><Link to="/bulk">Bulk Orders</Link></li>
            <li><Link to="/faq">FAQs</Link></li>
            <li><Link to="/size-guide">Size Guide</Link></li>
            <li><Link to="/care">Care Instructions</Link></li>
          </ul>
        </div>

        <div className="footer-col newsletter-col">
          <h4 className="footer-heading">NEWSLETTER</h4>
          <p className="footer-desc" style={{marginBottom: '15px'}}>Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Enter your email" required />
            <button type="submit">→</button>
          </form>
        </div>
        
      </div>
      
      <div className="footer-bottom">
        <div className="container bottom-flex">
          <p>&copy; {new Date().getFullYear()} Namma Print House. All rights reserved.</p>
          <div className="payment-icons">
            <span>UPI</span>
            <span>VISA</span>
            <span>MC</span>
            <span>AMEX</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
