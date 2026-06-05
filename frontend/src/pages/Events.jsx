import React, { useEffect, useState } from "react";
import "../styles/events.css";
import eventsData from "../data/eventsData";

const Events = () => {
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        if (!selectedEvent) return;

        const scrollY = window.scrollY;
        const originalPosition = document.body.style.position;
        const originalTop = document.body.style.top;
        const originalWidth = document.body.style.width;
        const originalOverflowY = document.body.style.overflowY;

        document.body.style.position = "fixed";
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = "100%";
        document.body.style.overflowY = "hidden";

        return () => {
            document.body.style.position = originalPosition;
            document.body.style.top = originalTop;
            document.body.style.width = originalWidth;
            document.body.style.overflowY = originalOverflowY;
            window.scrollTo(0, scrollY);
        };
    }, [selectedEvent]);

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


                        <button
                            className="event-cta"
                            onClick={() => setSelectedEvent(event)}
                        >
                            View Details
                        </button>
                    </div>
                ))}
            </div>
            {selectedEvent && (
                <div
                    className="modal-overlay"
                    onClick={() => setSelectedEvent(null)}
                >
                    <div
                        className="event-modal"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="close-btn"
                            onClick={() => setSelectedEvent(null)}
                        >
                            ✕
                        </button>

                        <img
                            src={selectedEvent.logo}
                            alt={selectedEvent.title}
                            className="modal-logo"
                        />

                        <h2>{selectedEvent.title}</h2>

                        <p className="event-fullform">
                            {selectedEvent.fullForm}
                        </p>

                        <p>{selectedEvent.description}</p>

                        <div className="modal-details">
                            <p><strong>Team Size:</strong> {selectedEvent.teamSize}</p>
                            <p><strong>Mode:</strong> {selectedEvent.mode}</p>
                            <p><strong>Status:</strong> {selectedEvent.status}</p>
                        </div>

                        <button
                            className="register-btn"
                            onClick={() => window.location.href = "/register"}
                        >
                            Register Now
                        </button>
                    </div>
                </div>
            )}
        </section>

    );
};

export default Events;
