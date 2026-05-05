import { useState } from 'react';
import { dummyVideos } from '../data/dummyData';
import VideoCard from '../components/VideoCard';
import VideoPlayer from '../components/VideoPlayer';

const Inventory = () => {
  const [activeVideo, setActiveVideo] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  const inventoryVideos = dummyVideos.filter(v => v.type === 'inventory');

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
        <h1 className="section-title text-gradient">Gym Inventory</h1>
        <p className="text-secondary" style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
          Master the machines. Watch our quick, easy-to-follow tutorials on how to safely and effectively use various gym equipment.
        </p>
      </div>
      
      <div className="video-grid">
        {inventoryVideos.map(video => (
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

export default Inventory;
