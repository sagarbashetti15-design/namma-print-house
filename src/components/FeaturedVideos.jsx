import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import './FeaturedVideos.css';

const FeaturedVideos = () => {
  const [isMuted, setIsMuted] = useState(true);
  const video1Ref = useRef(null);
  const video2Ref = useRef(null);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  // Sync the videos so they play exactly at the same time
  useEffect(() => {
    if (video1Ref.current && video2Ref.current) {
      video1Ref.current.currentTime = 0;
      video2Ref.current.currentTime = 0;
    }
  }, []);

  return (
    <section className="featured-videos-section">
      <div className="container" style={{ position: 'relative' }}>
        <h2 className="section-heading text-center" style={{ marginBottom: '40px' }}>
          FEEL THE <span>VIBE</span>
        </h2>
        
        <div className="videos-layout-wrapper">
          <button 
            className="audio-toggle-btn" 
            onClick={toggleMute}
            aria-label="Toggle Audio"
          >
            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
            <span className="audio-toggle-text">{isMuted ? "UNMUTE" : "MUTED"}</span>
          </button>

          <div className="videos-grid">
            <div className="video-card">
              <video 
                ref={video1Ref}
                src="/videos/video1.mp4" 
                autoPlay 
                loop 
                muted={isMuted} // Only video 1 plays audio to prevent echoing "one music for both"
                playsInline 
                className="featured-video"
              />
            </div>
            <div className="video-card">
              <video 
                ref={video2Ref}
                src="/videos/video2.mp4" 
                autoPlay 
                loop 
                muted={true} // Video 2 stays silent, video 1 acts as the master audio
                playsInline 
                className="featured-video"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedVideos;