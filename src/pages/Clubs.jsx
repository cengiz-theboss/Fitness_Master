import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './Clubs.css';

const clubsByCity = {
  Amsterdam: {
    basic: 'Basic-Fit Amsterdam Sloterdijk',
    train: 'TrainMore Amsterdam Centrum',
  },
  Rotterdam: {
    basic: 'Basic-Fit Rotterdam Blaak',
    train: 'TrainMore Rotterdam Zuidplein',
  },
  'Den Haag': {
    basic: 'Basic-Fit Den Haag Centrum',
    train: 'TrainMore Den Haag Spui',
  },
  Almere: {
    basic: 'Basic-Fit Almere Stad',
    train: 'TrainMore Almere Stad',
  },
};

const cityList = Object.keys(clubsByCity);
const brandList = ['Basic-Fit', 'TrainMore'];

const Clubs = () => {
  const { currentUser, loginWithGoogle, loading } = useAuth();
  const [selectedCity, setSelectedCity] = useState('Amsterdam');
  const [selectedBrand, setSelectedBrand] = useState('Basic-Fit');
  const brandKey = selectedBrand === 'Basic-Fit' ? 'basic' : 'train';
  const mapQuery = `${selectedBrand} ${selectedCity}`;
  const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`;

  if (loading) {
    return (
      <div className="page-container container section text-center">
        <h2 className="section-title">Loading your club access...</h2>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="page-container container section text-center">
        <h2 className="section-title">Sign in to access Clubs</h2>
        <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>
          Only signed-in members can view and switch club maps for Amsterdam, Rotterdam, Den Haag, and Almere.
        </p>
        <button className="btn btn-primary" style={{ marginTop: '1.5rem' }} onClick={loginWithGoogle}>
          Sign in with Google
        </button>
      </div>
    );
  }

  return (
    <section className="clubs-page section">
      <div className="container clubs-container">
        <div className="clubs-hero">
          <h1 className="clubs-title">Gym Clubs in the Netherlands</h1>
          <p className="clubs-intro">
            Choose a city, then pick Basic-Fit or TrainMore to open the right map and club location.
          </p>
        </div>

        <div className="selector-panel">
          <div className="selector-group">
            <h2>Pick a city</h2>
            <div className="button-row">
              {cityList.map((city) => (
                <button
                  key={city}
                  className={`selector-btn ${selectedCity === city ? 'active' : ''}`}
                  onClick={() => setSelectedCity(city)}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          <div className="selector-group">
            <h2>Pick a club brand</h2>
            <div className="button-row">
              {brandList.map((brand) => (
                <button
                  key={brand}
                  className={`selector-btn ${selectedBrand === brand ? 'active' : ''}`}
                  onClick={() => setSelectedBrand(brand)}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="map-card single-map-card">
          <div className="map-card-header">
            <h2>{selectedBrand} in {selectedCity}</h2>
            <p>{clubsByCity[selectedCity][brandKey]}</p>
          </div>
          <div className="map-frame-wrapper">
            <iframe
              title={`${selectedBrand} ${selectedCity}`}
              src={mapUrl}
              allowFullScreen
              loading="lazy"
            />
          </div>
          <div className="club-details">
            <p>
              Showing the {selectedBrand} club in <strong>{selectedCity}</strong>. Click another city or brand to update the map.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clubs;
