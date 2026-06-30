import React from 'react';
import { Shirt, Scissors, Wand2 } from 'lucide-react';
import './Features.css';

const Features = () => {
  return (
    <section className="features-section">
      <div className="container">
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <Shirt size={32} className="feature-icon" />
            </div>
            <h3 className="feature-title">Premium Oversized Fit</h3>
            <p className="feature-desc">Experience ultimate comfort with our signature drop-shoulder, heavy-cotton oversized silhouette designed for both men and women.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <Scissors size={32} className="feature-icon" />
            </div>
            <h3 className="feature-title">Trending Ready-Made</h3>
            <p className="feature-desc">Shop our curated collection of high-quality, pre-designed graphic tees that are guaranteed to turn heads.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <Wand2 size={32} className="feature-icon" />
            </div>
            <h3 className="feature-title">Infinite Customization</h3>
            <p className="feature-desc">Upload your own reference images or write custom text in your mother tongue. We bring your exact vision to life.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
