import React, { useState } from 'react';
import './InfoPage.css';

const FAQs = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const faqData = [
    {
      q: "What is the standard GSM of Namma Print House oversized t-shirts?",
      a: "Our oversized t-shirts are crafted from premium dense fabric, specifically 240 GSM (grams per square meter) heavy cotton. This ensures a rich, heavy drape, maximum durability, and an extremely soft hand-feel."
    },
    {
      q: "How long does shipping take?",
      a: "All orders are processed and dispatched from our Bengaluru studio within 24-48 hours. Standard courier transit time is 2 to 5 working days PAN India."
    },
    {
      q: "Do you offer free shipping?",
      a: "Yes! We offer Free Shipping on all orders above ₹999. For orders under ₹999, a flat shipping fee of ₹60 is applied during checkout."
    },
    {
      q: "What is your return/exchange policy?",
      a: "We offer a 7-Day Easy Return & Exchange policy. If you have size mismatches or quality issues, we will arrange a free reverse pickup from your address and process replacements or refunds immediately. (Note: Custom printed items are only returnable in case of defects)."
    },
    {
      q: "How do I take care of the prints?",
      a: "To keep your prints looking brand new: wash inside out in cold water (30°C), do not bleach, hang dry, and iron inside out (do not run a hot iron directly over the graphic print)."
    },
    {
      q: "Can I print my own custom designs?",
      a: "Absolutely! Go to our 'Custom Print' page, select your preferred t-shirt size and color, and use our designer panel to upload your artwork, quotes, or graphics. There is no minimum order quantity for custom prints!"
    },
    {
      q: "Do you take bulk orders for college clubs or companies?",
      a: "Yes! We specialize in Event & College merchandise, sports club apparel, and corporate uniform printing. We offer competitive tiered pricing. Head over to our 'Bulk Orders' page to submit an inquiry form or call us directly at +91 8296437764."
    }
  ];

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div className="info-page">
      <div className="info-header">
        <h1 className="info-title">FREQUENTLY ASKED QUESTIONS</h1>
        <p className="info-subtitle">Find Answers to Your Queries</p>
      </div>

      <div className="info-section">
        <div className="faq-container">
          {faqData.map((faq, idx) => (
            <div key={idx} className="faq-item">
              <div className="faq-question" onClick={() => toggleFaq(idx)}>
                <span>{faq.q}</span>
                <span style={{ fontSize: '1.2rem', color: '#F8B400' }}>
                  {openFaq === idx ? '−' : '+'}
                </span>
              </div>
              {openFaq === idx && (
                <div className="faq-answer">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="info-section" style={{ marginTop: '40px', textAlign: 'center' }}>
        <h3>Still have questions?</h3>
        <p>Contact Raghavendra Pujar and our customer support line directly:</p>
        <p>✉️ <strong>nammaprinthouse2k26@gmail.com</strong><br/>📞 <strong>+91 8296437764</strong></p>
      </div>
    </div>
  );
};

export default FAQs;
