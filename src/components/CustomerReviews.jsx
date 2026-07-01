import React from 'react';
import './CustomerReviews.css';
import { Star } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: "Rahul Verma",
    handle: "@rahulv_street",
    text: "The drop shoulder fit on these is insane. Quality easily beats brands charging 3x the price. Def copping more.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=11"
  },
  {
    id: 2,
    name: "Sneha Patel",
    handle: "@sneha.p",
    text: "Literally the only oversized tees I wear now. The fabric is so thick and premium but feels buttery soft. 10/10.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=5"
  },
  {
    id: 3,
    name: "Arjun Reddy",
    handle: "@arjun_creates",
    text: "Used their custom bulk print for my brand launch. The 3D puff print came out flawless. Crazy attention to detail.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=68"
  }
];

const CustomerReviews = () => {
  return (
    <section className="customer-reviews-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">DON'T JUST TAKE OUR WORD FOR IT</h2>
          <p className="section-subtitle">Real feedback from the Namma fam</p>
        </div>

        <div className="reviews-grid">
          {reviews.map((review) => (
            <div key={review.id} className="review-card-3d">
              <div className="review-card-inner">
                <div className="review-header">
                  <img src={review.avatar} alt={review.name} className="review-avatar" loading="lazy" />
                  <div className="review-meta">
                    <h4 className="review-name">{review.name}</h4>
                    <span className="review-handle">{review.handle}</span>
                  </div>
                  <div className="review-stars">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="#F8B400" color="#F8B400" />
                    ))}
                  </div>
                </div>
                <p className="review-text">"{review.text}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
