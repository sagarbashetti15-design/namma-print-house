import React from 'react';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import './SocialProof.css';

const instagramImages = [
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=150&h=150',
  'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&q=80&w=150&h=150',
  'https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&q=80&w=150&h=150',
  'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=150&h=150',
  'https://images.unsplash.com/photo-1516570161787-2faa7afd717c?auto=format&fit=crop&q=80&w=150&h=150',
  'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=150&h=150',
  'https://images.unsplash.com/photo-1434389673669-e08b4cac3105?auto=format&fit=crop&q=80&w=150&h=150',
  'https://images.unsplash.com/photo-1475178626620-a4d074967452?auto=format&fit=crop&q=80&w=150&h=150'
];

const testimonials = [
  { id: 1, text: "The quality is insane! Super soft and the print is just perfect.", author: "- Rahul S." },
  { id: 2, text: "Loved the oversized fit. It's my new go-to t-shirt brand.", author: "- Priya M." },
  { id: 3, text: "Custom print came out exactly how I wanted! Amazing!", author: "- Kiran D." }
];

const SocialProof = () => {
  return (
    <section className="social-proof-section">
      <div className="container">
        <div className="sp-grid">
          
          <div className="sp-left">
            <div className="sp-header">
              <h3 className="sp-title">OUR HAPPY<br/>CUSTOMERS</h3>
              <p className="sp-subtitle">
                Tag us on instagram<br/>
                <a href="https://www.instagram.com/namma_print_house2k26" target="_blank" rel="noopener noreferrer" style={{ color: '#F8B400', textDecoration: 'underline' }}>
                  @namma_print_house2k26
                </a>
              </p>
            </div>
            
            <div className="ig-grid-container">
              <button className="sp-nav-btn left"><IoChevronBackOutline size={20}/></button>
              <div className="ig-grid">
                {instagramImages.map((img, idx) => (
                  <img key={idx} src={img} alt={`Customer ${idx}`} className="ig-image" />
                ))}
              </div>
            </div>
          </div>
          
          <div className="sp-right">
            <h3 className="sp-title text-center" style={{marginBottom: '30px'}}>WHAT OUR CUSTOMERS SAY</h3>
            
            <div className="testimonials-wrapper">
              <div className="testimonials-list">
                {testimonials.map(t => (
                  <div key={t.id} className="testimonial-card">
                    <div className="stars">★★★★★</div>
                    <p className="t-text">"{t.text}"</p>
                    <p className="t-author">{t.author}</p>
                  </div>
                ))}
              </div>
              <button className="sp-nav-btn right"><IoChevronForwardOutline size={20}/></button>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
