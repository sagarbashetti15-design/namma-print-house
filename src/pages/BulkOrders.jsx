import React, { useState } from 'react';
import './InfoPage.css';

const BulkOrders = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    org: '',
    email: '',
    phone: '',
    qty: '50-100',
    type: 'T-Shirts',
    msg: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.phone) {
      setFormSubmitted(true);
      // Reset form
      setFormData({
        name: '',
        org: '',
        email: '',
        phone: '',
        qty: '50-100',
        type: 'T-Shirts',
        msg: ''
      });
    }
  };

  return (
    <div className="info-page">
      <div className="info-header">
        <h1 className="info-title">BULK ORDERS</h1>
        <p className="info-subtitle">Event Merchandise, College Clubs & Corporate Merch</p>
      </div>

      <div className="info-section">
        <h2>Specialized Bulk Manufacturing</h2>
        <p>Looking to print t-shirts for your college festival, corporate team, sports club, or private event? <strong>Namma Print House</strong> offers full-scale apparel manufacturing and custom printing services with competitive tiered pricing and premium fabric standards.</p>
        <p>We work with schools, universities (representing college fests and club merchandise), and corporate brands across Bengaluru and PAN India, delivering high-impact clothing built to wear and represent your team.</p>
      </div>

      <div className="info-section">
        <h2>Why Partner With Namma Print House?</h2>
        <ul className="info-list">
          <li><strong>Premium Fabric Options:</strong> Choose from 180 GSM, 240 GSM (Heavy Oversized), or customized fabric densities.</li>
          <li><strong>Precision Printing:</strong> State-of-the-art Screen Printing, Direct to Film (DTF), and embroidery.</li>
          <li><strong>Design Assistance:</strong> Free support from our layout designers to refine your artwork and prepare high-res mockups.</li>
          <li><strong>Tiered Pricing:</strong> The larger the order, the lower the price per unit. No hidden charges.</li>
          <li><strong>Sample Verification:</strong> Fabric samples and sizing rings can be shipped to you for verification before bulk production.</li>
        </ul>
      </div>

      <div className="info-section">
        <h2>Submit Bulk Inquiry</h2>
        <p>Fill out the form below with your requirements, and Raghavendra Pujar and our bulk sales team will get back to you with custom quotes and design options within 12 hours.</p>

        {formSubmitted ? (
          <div style={{ backgroundColor: '#0d2850', color: '#fff', padding: '25px', borderRadius: '8px', textAlign: 'center', marginTop: '20px' }}>
            <h3 style={{ color: '#F8B400', marginBottom: '10px' }}>🎉 INQUIRY RECEIVED!</h3>
            <p>Thank you for submitting your bulk inquiry. We have received your details and will contact you via email or phone shortly with design ideas and pricing quotes.</p>
            <button className="bulk-submit-btn" style={{ marginTop: '15px' }} onClick={() => setFormSubmitted(false)}>Send Another Inquiry</button>
          </div>
        ) : (
          <form className="bulk-form" onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label>Contact Name*</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter your full name" required />
              </div>
              <div className="form-group">
                <label>Company / College / Event Name</label>
                <input type="text" name="org" value={formData.org} onChange={handleInputChange} placeholder="Enter organization name" />
              </div>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>Email Address*</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Enter your email address" required />
              </div>
              <div className="form-group">
                <label>Phone Number*</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Enter mobile number" required />
              </div>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>Expected Quantity</label>
                <select name="qty" value={formData.qty} onChange={handleInputChange}>
                  <option value="20-50">20 to 50 pcs</option>
                  <option value="50-100">50 to 100 pcs</option>
                  <option value="100-300">100 to 300 pcs</option>
                  <option value="300-500">300 to 500 pcs</option>
                  <option value="500+">500+ pcs</option>
                </select>
              </div>
              <div className="form-group">
                <label>Apparel Type</label>
                <select name="type" value={formData.type} onChange={handleInputChange}>
                  <option value="T-Shirts">Oversized T-Shirts</option>
                  <option value="Standard T-Shirts">Standard Fit T-Shirts</option>
                  <option value="Hoodies">Hoodies / Sweatshirts</option>
                  <option value="Collared">Collared Polo Shirts</option>
                  <option value="Mixed">Mixed / Other Merchandise</option>
                </select>
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label>Design Requirements & Details</label>
              <textarea name="msg" value={formData.msg} onChange={handleInputChange} rows="4" placeholder="Describe the graphic placement, color preferences, and event deadlines..." />
            </div>

            <button type="submit" className="bulk-submit-btn">SUBMIT BULK INQUIRY</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default BulkOrders;
