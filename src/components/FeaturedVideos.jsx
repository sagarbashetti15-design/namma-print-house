import React from 'react';
import './FeaturedVideos.css';

const FeaturedVideos = () => {
  return (
    <section className="featured-videos-section">
      <div className="container">
        <h2 className="section-heading text-center" style={{ marginBottom: '40px' }}>
          FEEL THE <span>VIBE</span>
        </h2>
        <div className="videos-grid">
          <div className="video-card">
            <video 
              src="/videos/video1.mp4" 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="featured-video"
            />
          </div>
          <div className="video-card">
            <video 
              src="/videos/video2.mp4" 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="featured-video"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedVideos;