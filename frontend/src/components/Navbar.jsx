import React from 'react';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../styles/navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const [isLive, setIsLive] = useState(false);
  const [gameName, setGameName] = useState('');

  useEffect(() => {
    const liveEvent = { status: true, game: 'Valorant' };
    if (liveEvent.status) {
      setIsLive(true);
      setGameName(liveEvent.game);
    }
  }, []);

  useEffect(() => {
  if (menuOpen) {
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
  } else {
    document.body.style.position = '';
    document.body.style.width = '';
  }
}, [menuOpen]);

  return (
    <>
      {/* ===== NAVBAR ===== */}
      <nav className="navbar">
        <div className="nav-left">
          <h1>E-Sports</h1>

          {isLive && (
            <div className="live-status">
              <span className="pulse-dot"></span>
              <span className="live-text">
                LIVE NOW • {gameName}
              </span>
            </div>
          )}
        </div>

        {/* DESKTOP LINKS */}
        <div className="nav-links desktop-only">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/schedule">Schedule</NavLink>
          <NavLink to="/rules">Rules</NavLink>
          <NavLink to="/events">Events</NavLink>
          <NavLink to="/register" className="register-btn">Register</NavLink>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button
          className="menu-toggle mobile-only"
          onClick={() => setMenuOpen(true)}
        >
             MENU
        </button>
      </nav>

      {/* ===== FULLSCREEN MOBILE OVERLAY (OUTSIDE NAVBAR) ===== */}
      {menuOpen && (
        <div className="mobile-overlay">
          <button
            className="mobile-close"
            onClick={() => setMenuOpen(false)}
          >
            ✕
          </button>

          <div className="mobile-menu">
            <NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
            <NavLink to="/schedule" onClick={() => setMenuOpen(false)}>Schedule</NavLink>
            <NavLink to="/events" onClick={() => setMenuOpen(false)}>Events</NavLink>
            <NavLink to="/rules" onClick={() => setMenuOpen(false)}>Rules</NavLink>
            <NavLink
              to="/register"
              className="register-btn"
              onClick={() => setMenuOpen(false)}
            >
              Register
            </NavLink>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
