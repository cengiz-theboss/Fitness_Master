import { Link, useLocation } from 'react-router-dom';
import { Dumbbell, Menu, X, User } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { currentUser, loginWithGoogle, logout } = useAuth();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Training', path: '/training' },
    { name: 'Recipes', path: '/recipes' },
    { name: 'Diet', path: '/diet' },
    { name: 'Gym Inventory', path: '/inventory' },
    { name: 'Schedule', path: '/schedule' },
  ];

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Link to="/" className="nav-logo">
          <Dumbbell className="logo-icon" />
          <span>Fitness<span className="text-gradient">Master</span></span>
        </Link>

        <div className="nav-links desktop-only">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
            >
              {link.name}
            </Link>
          ))}
          {currentUser ? (
            <div className="user-menu ml-4">
              <Link to="/profile" className="profile-btn btn btn-outline">
                {currentUser.user_metadata?.avatar_url ? (
                  <img src={currentUser.user_metadata.avatar_url} alt="Profile" className="nav-avatar" style={{ width: '24px', height: '24px', borderRadius: '50%', marginRight: '8px' }} />
                ) : (
                  <User size={18} style={{ marginRight: '8px' }} />
                )}
                Profile
              </Link>
              <button className="btn btn-primary ml-4" onClick={logout}>Logout</button>
            </div>
          ) : (
            <button className="btn btn-primary ml-4" onClick={loginWithGoogle}>Login with Google</button>
          )}
        </div>

        <button 
          className="mobile-menu-btn mobile-only"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={`mobile-nav-link ${location.pathname === link.path ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {link.name}
          </Link>
        ))}
        {currentUser ? (
          <>
            <Link to="/profile" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
              Profile
            </Link>
            <button className="btn btn-primary w-full mt-4" onClick={() => { logout(); setIsMobileMenuOpen(false); }}>Logout</button>
          </>
        ) : (
          <button className="btn btn-primary w-full mt-4" onClick={() => { loginWithGoogle(); setIsMobileMenuOpen(false); }}>Login with Google</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
