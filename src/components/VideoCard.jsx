import { PlayCircle, Heart } from 'lucide-react';
import './VideoCard.css';

const VideoCard = ({ video, onPlay, onFavorite, isFavorite }) => {
  return (
    <div className="video-card">
      <div className="video-thumbnail" onClick={() => onPlay(video)}>
        <img src={video.thumbnail} alt={video.title} />
        <div className="play-overlay">
          <PlayCircle size={48} className="play-icon" />
        </div>
        <span className="video-duration">{video.duration}</span>
      </div>
      <div className="video-info">
        <div className="video-header">
          <h3 className="video-title" onClick={() => onPlay(video)}>{video.title}</h3>
          <button 
            className={`favorite-btn ${isFavorite ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              onFavorite(video);
            }}
          >
            <Heart size={20} fill={isFavorite ? "var(--accent-secondary)" : "none"} color={isFavorite ? "var(--accent-secondary)" : "currentColor"} />
          </button>
        </div>
        <p className="video-instructor">{video.instructor}</p>
        <div className="video-meta">
          <span className="video-category">{video.category}</span>
          <span className="video-level">{video.level}</span>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
