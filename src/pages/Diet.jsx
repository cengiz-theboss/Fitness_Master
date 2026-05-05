import { useState } from 'react';
import { dummyVideos } from '../data/dummyData';
import VideoCard from '../components/VideoCard';
import VideoPlayer from '../components/VideoPlayer';

const Diet = () => {
  const [activeVideo, setActiveVideo] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  const dietVideos = dummyVideos.filter(v => v.type === 'diet');

  const toggleFavorite = (video) => {
    setFavorites(prev => {
      const newFavs = new Set(prev);
      if (newFavs.has(video.id)) newFavs.delete(video.id);
      else newFavs.add(video.id);
      return newFavs;
    });
  };

  return (
    <div className="page-container section container">
      <div className="text-center" style={{ marginBottom: 'var(--spacing-3xl)' }}>
        <h1 className="section-title text-gradient">Diet & Nutrition</h1>
        <p className="text-secondary" style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
          Fuel your body right. Discover meal prep guides, high-protein recipes, and nutritional advice to support your fitness journey.
        </p>
      </div>
      
      <div className="video-grid">
        {dietVideos.map(video => (
          <VideoCard 
            key={video.id} 
            video={video} 
            onPlay={setActiveVideo}
            isFavorite={favorites.has(video.id)}
            onFavorite={toggleFavorite}
          />
        ))}
      </div>

      {activeVideo && (
        <VideoPlayer 
          video={activeVideo} 
          onClose={() => setActiveVideo(null)} 
        />
      )}
    </div>
  );
};

export default Diet;
