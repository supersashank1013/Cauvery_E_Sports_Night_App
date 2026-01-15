import React from "react";  
import "../styles/events.css";
import eventsData from "../data/eventsData";

const Events = () => {
    return (
        <section className="events page-container">
            <h1 className="page-title">Events</h1>

            <div className="events-grid">
                {eventsData.map((event, index) => (
                    <div className={`event-card fade-up fade-up-delay-${index % 4}`}
                        key={event.id} style={{
                            backgroundImage: `url(${event.bgImage})`
                        }}
                    >
                        <div className="event-header">
                            <div className="event-title">
                                <img
                                    src={event.logo}
                                    alt={`${event.title} logo`}
                                    className="event-game-icon"
                                />

                                <h3>{event.title}</h3>
                            </div>

                            <span className={`status ${event.status.toLowerCase().replace(" ", "-")}`}>
                                {event.status}
                            </span>
                        </div>


                        <p className="event-type">{event.fullForm}</p>

                        <p className="event-description">
                            {event.description}
                        </p>

                        <div className="event-meta">
                            <span>
                                <span className="meta-icon">👥</span>
                                {event.teamSize}
                            </span>
                            <span>
                                <span className="meta-icon">⚔️</span>
                                {event.mode}
                            </span>
                        </div>


                        <button className="event-cta">
                            View Details
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Events;
