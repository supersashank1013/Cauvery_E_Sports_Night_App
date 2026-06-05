import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/navbar.css";

const liveEvent = { status: true, game: "Valorant" };

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.position = "";
      document.body.style.width = "";
    }

    return () => {
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [menuOpen]);

  return (
    <>
      <nav className="navbar">
        <div className="nav-left">
          <h1>E-Sports</h1>

          {liveEvent.status && (
            <div className="live-status">
              <span className="pulse-dot"></span>
              <span className="live-text">LIVE NOW - {liveEvent.game}</span>
            </div>
          )}
        </div>

        <div className="nav-links desktop-only">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/schedule">Schedule</NavLink>
          <NavLink to="/rules">Rules</NavLink>
          <NavLink to="/events">Events</NavLink>
          <NavLink to="/register" className="register-btn">Register</NavLink>
        </div>

        <button
          className="menu-toggle mobile-only"
          onClick={() => setMenuOpen(true)}
        >
          MENU
        </button>
      </nav>

      {menuOpen && (
        <div className="mobile-overlay">
          <button
            className="mobile-close"
            onClick={() => setMenuOpen(false)}
          >
            X
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
