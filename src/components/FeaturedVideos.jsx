import React, { useState, useRef, useEffect } from 'react';
import { IoVolumeHighOutline, IoVolumeMuteOutline } from 'react-icons/io5';
import './FeaturedVideos.css';

const FeaturedVideos = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [userHasUnmuted, setUserHasUnmuted] = useState(false);
  const sectionRef = useRef(null);
  const video1Ref = useRef(null);
  const video2Ref = useRef(null);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    setUserHasUnmuted(true); // Remember that user explicitly wants to hear audio
  };

  // Sync the videos so they play exactly at the same time
  useEffect(() => {
    if (video1Ref.current && video2Ref.current) {
      video1Ref.current.currentTime = 0;
      video2Ref.current.currentTime = 0;
    }
  }, []);

  // Intersection Observer to auto-mute when scrolled out of view
  useEffect(() => {
    const currentRef = sectionRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Video is in view - unmute ONLY if the user previously unmuted it, 
            // OR if we want to try to auto-unmute (which browsers often block without interaction)
            if (userHasUnmuted) {
              setIsMuted(false);
            }
          } else {
            // Video is out of view - always mute it!
            setIsMuted(true);
          }
        });
      },
      { threshold: 0.3 } // Triggers when 30% of the video section is visible
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [userHasUnmuted]);

  return (
    <section className="featured-videos-section" ref={sectionRef}>
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
            {isMuted ? <IoVolumeMuteOutline size={24} /> : <IoVolumeHighOutline size={24} />}
            <span className="audio-toggle-text">{isMuted ? "UNMUTE" : "MUTED"}</span>
          </button>

          <div className="videos-grid">
            <div className="video-card">
              <video 
                ref={video1Ref}
                src="/videos/video1.mp4" 
                autoPlay 
                loop 
                muted={isMuted} // Only video 1 plays audio to prevent echoing
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
                muted={true} // Video 2 stays silent
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