import { useState, useEffect, useRef } from 'react';
import { User, LogOut, Heart, Video, BookOpen, Settings, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { dummyVideos } from '../data/dummyData';
import VideoCard from '../components/VideoCard';
import RecipeCard from '../components/RecipeCard';
import RecipeModal from '../components/RecipeModal';
import './Profile.css';

const Profile = () => {
  const { currentUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('videos');
  const [activeRecipe, setActiveRecipe] = useState(null);
  const [profilePhotoUrl, setProfilePhotoUrl] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!currentUser) return;
    const savedPhoto = localStorage.getItem(`fitnessmaster-profile-photo-${currentUser.uid}`);
    if (savedPhoto) {
      setProfilePhotoUrl(savedPhoto);
    }
  }, [currentUser]);

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === 'string') {
        setProfilePhotoUrl(result);
        if (currentUser) {
          localStorage.setItem(`fitnessmaster-profile-photo-${currentUser.uid}`, result);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  // Filter dummy data to simulate "saved" items
  const savedVideos = dummyVideos.filter(v => v.type !== 'recipe').slice(0, 2);
  const savedRecipes = dummyVideos.filter(v => v.type === 'recipe');

  if (!currentUser) {
    return (
      <div className="page-container container section text-center">
        <h2 className="section-title">Sign in to view your profile</h2>
        <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#333', color: 'white', borderRadius: '8px', textAlign: 'left', overflowWrap: 'break-word' }}>
          <h3>Debug Info (Please send me this!):</h3>
          <p><strong>Current URL:</strong> {window.location.href}</p>
          <p><strong>URL Hash:</strong> {window.location.hash || "No Hash Found"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container container section">
      <div className="profile-layout">
        <aside className="profile-sidebar">
          <div className="profile-info-card">
            <div className="profile-avatar-large">
            {profilePhotoUrl ? (
              <img src={profilePhotoUrl} alt="Profile" />
            ) : currentUser.user_metadata?.avatar_url ? (
              <img src={currentUser.user_metadata.avatar_url} alt={currentUser.user_metadata.full_name} />
            ) : (
              <User size={40} />
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="profile-file-input"
            onChange={handlePhotoChange}
            style={{ display: 'none' }}
          />
          <button
            type="button"
            className="btn-upload"
            onClick={() => fileInputRef.current?.click()}
          >
            Upload Profile Photo
          </button>
          <p className="upload-note">Select an image from your phone gallery or choose a file from your computer.</p>
            <p className="profile-email">{currentUser.email}</p>
            <button className="btn-logout" onClick={logout}>
              <LogOut size={18} />
              Sign Out
            </button>
          </div>

          <nav className="profile-nav">
            <button className="profile-nav-item active">
              <Heart size={18} />
              My Savings
              <ChevronRight size={16} />
            </button>
            <button className="profile-nav-item">
              <Settings size={18} />
              Settings
              <ChevronRight size={16} />
            </button>
          </nav>
        </aside>

        <main className="profile-content">
          <div className="section-header-flex">
            <h1 className="section-title-small">My Savings</h1>
            <div className="tab-group">
              <button 
                className={`tab-btn ${activeTab === 'videos' ? 'active' : ''}`}
                onClick={() => setActiveTab('videos')}
              >
                <Video size={16} />
                Videos
              </button>
              <button 
                className={`tab-btn ${activeTab === 'recipes' ? 'active' : ''}`}
                onClick={() => setActiveTab('recipes')}
              >
                <BookOpen size={16} />
                Recipes
              </button>
            </div>
          </div>

          <div className="saved-items-grid">
            {activeTab === 'videos' ? (
              <div className="video-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
                {savedVideos.map(video => (
                  <VideoCard key={video.id} video={video} onPlay={() => {}} isFavorite={true} onFavorite={() => {}} />
                ))}
              </div>
            ) : (
              <div className="video-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
                {savedRecipes.map(recipe => (
                  <RecipeCard 
                    key={recipe.id} 
                    recipe={recipe} 
                    onClick={setActiveRecipe} 
                    isFavorite={true} 
                    onFavorite={() => {}} 
                  />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      {activeRecipe && (
        <RecipeModal recipe={activeRecipe} onClose={() => setActiveRecipe(null)} />
      )}
    </div>
  );
};

export default Profile;
