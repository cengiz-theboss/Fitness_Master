import { Dumbbell, Circle } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer section">
      <div className="container footer-container">
        <div className="footer-brand">
          <Link to="/" className="nav-logo mb-4 inline-block">
            <Dumbbell className="logo-icon" />
            <span>Fitness<span className="text-gradient">Master</span></span>
          </Link>
          <p className="footer-desc text-secondary">
            Your ultimate destination for premium fitness training, diet plans, and gym equipment tutorials. Elevate your workout today.
          </p>
          <div className="social-links">
            <a href="#" className="social-link"><Circle /></a>
            <a href="#" className="social-link"><Circle /></a>
            <a href="#" className="social-link"><Circle /></a>
          </div>
        </div>

        <div className="footer-links-group">
          <h4 className="footer-title">Quick Links</h4>
          <Link to="/training">Training</Link>
          <Link to="/diet">Diet & Nutrition</Link>
          <Link to="/inventory">Gym Inventory</Link>
        </div>

        <div className="footer-links-group">
          <h4 className="footer-title">Support</h4>
          <a href="#">FAQ</a>
          <a href="#">Contact Us</a>
          <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
        </div>
      </div>
      <div className="footer-bottom text-center text-secondary">
        <p>&copy; {new Date().getFullYear()} FitnessMaster. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
