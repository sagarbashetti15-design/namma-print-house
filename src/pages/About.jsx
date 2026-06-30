import React from 'react';
import './InfoPage.css';

const About = () => {
  return (
    <div className="info-page">
      <div className="info-header">
        <h1 className="info-title">ABOUT US</h1>
        <p className="info-subtitle">"Your Idea. Our Print. Your Identity."</p>
      </div>

      <div className="info-section">
        <h2>Who We Are</h2>
        <p>Founded by <strong>Raghavendra Pujar</strong> in Bengaluru, <strong>Namma Print House</strong> is a premier streetwear and custom apparel brand. We specialize in high-quality streetwear, specifically designing premium oversized t-shirts that are built to look premium, fit perfectly, and last longer.</p>
        <p>We operate on a simple core belief: <strong>"WE DON'T SELL T-SHIRTS, WE PRINT IDEAS"</strong>. We believe clothing is the ultimate medium for self-expression, identity, and representation. Every piece we create is designed to help you represent who you are, what you love, and what you stand for.</p>
      </div>

      <div className="info-section">
        <h2>Our Core Specializations</h2>
        <p>We are a full-service custom printing house and design studio specializing in:</p>
        <ul className="info-list">
          <li><strong>Custom T-Shirts:</strong> Made to Wear. Made to Represent. High-quality oversized tees for personal use.</li>
          <li><strong>Custom Gifts:</strong> Creative prints on blank tees and accessories to capture special moments.</li>
          <li><strong>Bulk Orders:</strong> Tailored manufacturing and print runs for schools, groups, and clubs.</li>
          <li><strong>Event & College Merchandise:</strong> High-impact apparel for college fests, sports clubs, and cultural groups.</li>
          <li><strong>Corporate & Brand Merchandise:</strong> Professional uniforms, branding, and promotional apparel.</li>
          <li><strong>Premium Quality Prints:</strong> Utilizing state-of-the-art print techniques that remain vibrant and never peel or crack.</li>
        </ul>
      </div>

      <div className="info-section">
        <h2>Our Philosophy</h2>
        <p><em>"Crafted with Creativity. Printed with Precision."</em></p>
        <p>We prioritize visual and material excellence above all else. That’s why we use premium dense fabrics (240 GSM heavy cotton) and state-of-the-art digital and screen printing techniques. From sourcing the finest threads to packaging your order with care, our Bengaluru-based team pours passion into every single print.</p>
      </div>

      <div className="info-section" style={{ textAlign: 'center', marginTop: '40px' }}>
        <p>Thank you for supporting a local, original business. We truly appreciate your support!</p>
        <p><strong>Namma Print House Team</strong></p>
      </div>
    </div>
  );
};

export default About;
