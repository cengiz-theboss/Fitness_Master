import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Training from './pages/Training';
import Diet from './pages/Diet';
import Inventory from './pages/Inventory';
import Profile from './pages/Profile';
import Recipes from './pages/Recipes';
import Schedule from './pages/Schedule';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/training" element={<Training />} />
              <Route path="/diet" element={<Diet />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/recipes" element={<Recipes />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
