import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Hero.css';

const slides = [
  { id: 1, bg: '/images/unique-dslr-women-hero.jpg', bgColor: '#8c1619' }, // Solid Deep Red
  { id: 2, bg: '/images/unique-dslr-couples-hero.jpg', bgColor: '#1A1A1A' }, // Slate Grey
  { id: 3, bg: '/images/unique-dslr-men-hero.jpg', bgColor: '#25292D' }, // Slate Skatepark Blue-Grey
  { id: 4, bg: '/images/unique-dslr-women-hero-slide4.jpg', bgColor: '#181A1D' }, // City Dark Charcoal
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero">
      {/* Layer 0: 3D Blurred Deep Background */}
      <div 
        className="hero-bg-blur"
        style={{ backgroundImage: `url(${slides[currentSlide].bg})` }}
      ></div>

      {/* Layer 1: Sharp 3D Floating Model (Zoomed out on the right) */}
      <div 
        className="hero-bg-sharp"
        style={{ backgroundImage: `url(${slides[currentSlide].bg})` }}
      ></div>

      <div className="hero-overlay"></div>
      <div className="hero-content-wrapper">
        <button className="slider-arrow arrow-left" onClick={prevSlide}>
          <ChevronLeft size={24} />
        </button>

        <div className="hero-content">
          <h1 className="hero-title">
            WE DON'T SELL T-SHIRTS,<br />
            <span className="text-yellow">WE PRINT IDEAS</span>
          </h1>
          <p className="hero-subtitle">
            Premium Oversized T-Shirts<br />
            Ready-Made | Custom Print | Bulk Orders
          </p>
          <div className="hero-actions">
            <Link to="/category/men" className="btn btn-yellow">SHOP MEN</Link>
            <Link to="/category/women" className="btn btn-white">SHOP WOMEN</Link>
            <Link to="/category/custom" className="btn btn-outline">CUSTOMIZE NOW</Link>
          </div>
        </div>
        
        <button className="slider-arrow arrow-right" onClick={nextSlide}>
          <ChevronRight size={24} />
        </button>
      </div>
      
      <div className="hero-dots">
        {slides.map((_, index) => (
          <span 
            key={index} 
            className={`dot ${currentSlide === index ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          ></span>
        ))}
      </div>
    </section>
  );
};

export default Hero;
