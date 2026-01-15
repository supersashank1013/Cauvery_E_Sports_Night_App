import React from 'react';
import '../styles/schedule.css';
import scheduleData from '../data/scheduledata';

const Schedule = () => {
    return (
        <section className="schedule page-container">
            <h1 className="page-title">Event Schedule</h1>

            <div className="schedule-list">
                {scheduleData.map((item, index) => (
                    <div className={`schedule-item fade-up fade-up-delay-${index % 4}`}
                        key={index}
                    >
                        <div className="timeline-dot"></div>

                        <div className="icon-3d tilt">🕒</div>
                        
                        <div className="content">
                            <span className="time">{item.time}</span>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Schedule;