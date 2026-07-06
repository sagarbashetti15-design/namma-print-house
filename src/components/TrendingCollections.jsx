import React, { useRef } from 'react';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import './TrendingCollections.css';

const collections = [
  { id: 1, title: 'Dog Lovers', image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=200&h=200', query: 'dog' },
  { id: 2, title: 'Cat Lovers', image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=200&h=200', query: 'cat' },
  { id: 3, title: 'Anime', image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&q=80&w=200&h=200', query: 'anime' },
  { id: 4, title: 'Kannada', image: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&q=80&w=200&h=200', query: 'kannada' },
  { id: 5, title: 'Couple', image: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&q=80&w=200&h=200', query: 'couple' },
  { id: 6, title: 'Funny', image: 'https://images.unsplash.com/photo-1545665277-5937489579f2?auto=format&fit=crop&q=80&w=200&h=200', query: 'funny' },
  { id: 7, title: 'Spiritual', image: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&q=80&w=200&h=200', query: 'spiritual' },
  { id: 8, title: 'Cricket', image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=200&h=200', query: 'rcb' }
];

const TrendingCollections = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className="trending-col-section">
      <div className="container">
        <h2 className="section-heading text-center">
          TRENDING <span>COLLECTIONS</span>
        </h2>
        
        <div className="collection-carousel-wrapper">
          <button className="col-nav-btn left" onClick={() => scroll('left')}>
            <IoChevronBackOutline size={24} />
          </button>
          
          <div className="collection-scroll-area" ref={scrollRef}>
            {collections.map(col => (
              <Link to={`/search?q=${col.query}`} key={col.id} className="collection-item">
                <div className="col-image-wrapper">
                  <img src={col.image} alt={col.title} className="col-image" />
                </div>
                <p className="col-title">{col.title}</p>
              </Link>
            ))}
          </div>
          
          <button className="col-nav-btn right" onClick={() => scroll('right')}>
            <IoChevronForwardOutline size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TrendingCollections;
