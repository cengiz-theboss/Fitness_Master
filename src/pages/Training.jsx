import { useState } from 'react';
import { dummyVideos } from '../data/dummyData';
import VideoCard from '../components/VideoCard';
import VideoPlayer from '../components/VideoPlayer';

const Training = () => {
  const [activeVideo, setActiveVideo] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  const trainingVideos = dummyVideos.filter(v => v.type === 'training');

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
    <div className="page-container section container">
      <div className="text-center" style={{ marginBottom: 'var(--spacing-3xl)' }}>
        <h1 className="section-title text-gradient">Training Hub</h1>
        <p className="text-secondary" style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
          Explore our collection of premium workout videos. From high-intensity cardio to beginner strength training, find the perfect routine to crush your goals.
        </p>
      </div>
      
      <div className="video-grid">
        {trainingVideos.map(video => (
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

export default Training;
