import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';
import { dummyVideos } from '../data/dummyData';
import VideoCard from '../components/VideoCard';
import VideoPlayer from '../components/VideoPlayer';
import './Home.css';

const Home = () => {
  const [activeVideo, setActiveVideo] = useState(null);
  const [favorites, setFavorites] = useState(new Set());

  const featuredVideos = dummyVideos.slice(0, 3);

  const toggleFavorite = (video) => {
    setFavorites(prev => {
      const newFavs = new Set(prev);
      if (newFavs.has(video.id)) {
        newFavs.delete(video.id);
      } else {
        newFavs.add(video.id);
      }
      return newFavs;
    });
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <h1 className="hero-title">
            Unleash Your <br />
            <span className="text-gradient">Potential</span>
          </h1>
          <p className="hero-subtitle">
            Premium training, expert diet plans, and comprehensive equipment guides. All in one place.
          </p>
          <div className="hero-actions">
            <Link to="/training" className="btn btn-primary hero-btn">
              Start Training
            </Link>
            <button className="btn btn-outline hero-btn" onClick={() => setActiveVideo(dummyVideos[0])}>
              <Play size={18} style={{ marginRight: '8px' }} /> Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Featured Content */}
      <section className="section featured-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Trending Now</h2>
            <Link to="/training" className="view-all-link">
              View all <ArrowRight size={18} />
            </Link>
          </div>
          
          <div className="video-grid">
            {featuredVideos.map(video => (
              <VideoCard 
                key={video.id} 
                video={video} 
                onPlay={setActiveVideo}
                isFavorite={favorites.has(video.id)}
                onFavorite={toggleFavorite}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section categories-section">
        <div className="container">
          <h2 className="section-title">Explore Categories</h2>
          <div className="categories-grid">
            <Link to="/training" className="category-card training-bg">
              <div className="category-overlay"></div>
              <h3>Training</h3>
            </Link>
            <Link to="/diet" className="category-card diet-bg">
              <div className="category-overlay"></div>
              <h3>Diet & Nutrition</h3>
            </Link>
            <Link to="/inventory" className="category-card inventory-bg">
              <div className="category-overlay"></div>
              <h3>Gym Inventory</h3>
            </Link>
          </div>
        </div>
      </section>

      {activeVideo && (
        <VideoPlayer 
          video={activeVideo} 
          onClose={() => setActiveVideo(null)} 
        />
      )}
    </div>
  );
};

export default Home;
