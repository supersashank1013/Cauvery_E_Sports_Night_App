import React from "react";
import toast from "react-hot-toast";

import "../styles/Home.css";
import { useNavigate } from "react-router-dom";
import eventsData from "../data/eventsData";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section className="hero page-container">
        <div className="hero-content">
          <h1 className="fade-up fade-delay-1">
            Cauvery E-Sports Night
          </h1>

          <p className="hero-subtitle fade-up fade-delay-2">
            Experience an electrifying night of competitive gaming
          </p>

          <p className="hero-description fade-up fade-delay-3">
            Featuring Valorant, BGMI, Free Fire MAX, and Call of Duty: Mobile.
            High stakes. High energy. One unforgettable night.
          </p>

          <button
            className="hero-cta fade-up fade-delay-4"
            onClick={() => navigate("/register")}
          >
            Register Now
          </button>
          
        </div>
      </section>

      {/* ===== FEATURED GAMES SECTION (ADD HERE) ===== */}
      <section className="featured-games">
        <h2 className="section-title">Featured Games</h2>

        <div className="featured-grid">
          {eventsData.slice(0, 4).map((event) => (
            <div
              key={event.id}
              className="featured-card"
              style={{ backgroundImage: `url(${event.bgImage})` }}
              onClick={() => navigate("/events")}
            >
              <div className="featured-overlay"></div>

              <img
                src={event.logo}
                alt={`${event.title} logo`}
                className="featured-logo"
              />

              <h3>{event.title}</h3>
              <p>{event.fullForm}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
