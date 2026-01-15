import React from 'react';
import '../styles/footer.css';
import { Github, Instagram, Youtube, Twitter, Shield } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand Section */}
        <div className="footer-brand">
          <h2 className="footer-logo">CAUVERY</h2>
          <p className="footer-tagline">Elevating E-sports to the next level. Join the flow, dominate the game.</p>
          <div className="social-icons">
            <a href="#"><Instagram size={20} /></a>
            <a href="#"><Youtube size={20} /></a>
            <a href="#"><Twitter size={20} /></a>
          </div>
        </div>

        {/* Links Sections */}
        <div className="footer-links-group">
          <div className="footer-column">
            <h4>Tournament</h4>
            <a href="#schedule">Schedule</a>
            <a href="#brackets">Brackets</a>
            <a href="#rules">Rulebook</a>
          </div>
          <div className="footer-column">
            <h4>Games</h4>
            <a href="#valorant">Valorant</a>
            <a href="#bgmi">BGMI</a>
            <a href="#freefire">Free Fire</a>
          </div>
          <div className="footer-column">
            <h4>Support</h4>
            <a href="#faq">FAQ</a>
            <a href="#contact">Contact Us</a>
            <a href="#discord">Discord</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; {new Date().getFullYear()} CAUVERY E-SPORTS. iRIS Built.</p>
          <div className="footer-legal">
            <Shield size={14} />
            <span>Anti-Cheat Verified</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;