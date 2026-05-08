import './Clubs.css';

const Clubs = () => {
  return (
    <section className="clubs-page section">
      <div className="container clubs-container">
        <div className="clubs-hero">
          <h1 className="clubs-title">Gym Clubs in the Netherlands</h1>
          <p className="clubs-intro">
            Explore recommended fitness clubs in Amsterdam, Rotterdam, Den Haag, and Almere.
            The first map shows Basic-Fit locations, and the second map highlights TrainMore clubs.
          </p>
        </div>

        <div className="map-section">
          <div className="map-card">
            <div className="map-card-header">
              <h2>Basic-Fit Clubs</h2>
              <p>Amsterdam · Rotterdam · Den Haag · Almere</p>
            </div>
            <div className="map-frame-wrapper">
              <iframe
                title="Basic Fit Clubs"
                src="https://maps.google.com/maps?q=Basic-Fit+Amsterdam+Rotterdam+Den+Haag+Almere&output=embed"
                allowFullScreen
                loading="lazy"
              />
            </div>
            <ul className="club-list">
              <li><strong>Amsterdam:</strong> Basic-Fit Amsterdam Sloterdijk</li>
              <li><strong>Rotterdam:</strong> Basic-Fit Rotterdam Blaak</li>
              <li><strong>Den Haag:</strong> Basic-Fit Den Haag Centrum</li>
              <li><strong>Almere:</strong> Basic-Fit Almere Stad</li>
            </ul>
          </div>

          <div className="map-card">
            <div className="map-card-header">
              <h2>TrainMore Clubs</h2>
              <p>Amsterdam · Rotterdam · Den Haag · Almere</p>
            </div>
            <div className="map-frame-wrapper">
              <iframe
                title="TrainMore Clubs"
                src="https://maps.google.com/maps?q=TrainMore+Amsterdam+Rotterdam+Den+Haag+Almere&output=embed"
                allowFullScreen
                loading="lazy"
              />
            </div>
            <ul className="club-list">
              <li><strong>Amsterdam:</strong> TrainMore Amsterdam Centrum</li>
              <li><strong>Rotterdam:</strong> TrainMore Rotterdam Zuidplein</li>
              <li><strong>Den Haag:</strong> TrainMore Den Haag Spui</li>
              <li><strong>Almere:</strong> TrainMore Almere Stad</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clubs;
