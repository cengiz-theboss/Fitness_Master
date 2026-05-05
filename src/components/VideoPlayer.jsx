import ReactPlayer from 'react-player';
import { X } from 'lucide-react';
import CommentSection from './CommentSection';
import './VideoPlayer.css';

const VideoPlayer = ({ video, onClose }) => {
  if (!video) return null;

  // Helper to get YouTube ID
  const getYoutubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const youtubeId = getYoutubeId(video.url);

  return (
    <div className="video-player-overlay">
      <div className="video-player-container">
        <button className="close-btn" onClick={onClose}>
          <X size={24} />
        </button>
        
        <div className="player-wrapper">
          {youtubeId ? (
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="native-player"
            ></iframe>
          ) : (
            <ReactPlayer
              url={video.url}
              className="react-player"
              width="100%"
              height="100%"
              controls={true}
              playing={true}
              onError={(e) => console.error("ReactPlayer Error:", e)}
            />
          )}
        </div>
        
        <div className="video-details">
          <div className="video-header-flex">
            <h2 className="video-title-large">{video.title}</h2>
            <a href={video.url} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">
              Watch on Source
            </a>
          </div>
          <p className="video-description">{video.description}</p>
          
          <div className="troubleshooting-tip">
            <p><strong>Not playing?</strong> Try disabling your ad-blocker or Brave Shields for this site. YouTube embeds can sometimes be blocked by privacy settings.</p>
          </div>

          <div className="comments-wrapper">
            <CommentSection videoId={video.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
