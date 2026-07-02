import React from 'react';
import { Link } from 'react-router-dom';
import './CategoryCards.css';

const categories = [
  {
    id: 1,
    title: 'MEN',
    btnText: 'SHOP NOW',
    link: '/category/men',
    image: '/images/cat_men.png'
  },
  {
    id: 2,
    title: 'WOMEN',
    btnText: 'SHOP NOW',
    link: '/category/women',
    image: '/images/cat_women.png'
  },
  {
    id: 3,
    title: 'COUPLES',
    btnText: 'SHOP NOW',
    link: '/category/couples',
    image: '/images/cat_couples.png'
  },
  {
    id: 4,
    title: 'CUSTOM PRINT',
    btnText: 'UPLOAD DESIGN',
    link: '/category/custom',
    image: '/images/blank-tee-black.jpg'
  }
];

const CategoryCards = () => {
  return (
    <section className="category-section">
      <div className="container category-container">
        <div className="category-header">
          <span className="category-preheading">DISCOVER OUR CREATIONS</span>
          <h2 className="section-heading text-center">
            SHOP BY <span>CATEGORY</span>
          </h2>
        </div>
        
        <div className="category-cards-grid">
          {categories.map((cat) => (
            <Link to={cat.link} key={cat.id} className="cat-card-wrapper">
              <div className="cat-card">
                <img src={cat.image} alt={cat.title} className="cat-image" loading="lazy" />
                <div className="cat-overlay"></div>
                
                <div className="cat-content">
                  <h3 className="cat-title">{cat.title}</h3>
                  <span className="cat-action-btn">{cat.btnText}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryCards;
