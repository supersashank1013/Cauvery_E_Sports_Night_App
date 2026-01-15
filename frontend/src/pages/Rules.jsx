import React from "react";
import '../styles/rules.css';
import rulesData from '../data/rulesData';

const Rules = () => {
    return (
        <section className="rules page-container">
            <h1 className="page-title">Event Rules</h1>

            <div className="rules-list">
                {rulesData.map((section, index) => (
                    <div className={`rules-card ${section.level} fade-up fade-up-delay-${index % 4}`} key={index}>
                        <div className="rules-header">
                            <div className="icon-3d tilt">
                                {section.level === "info" && "ℹ️"}
                                {section.level === "standard" && "📋"}
                                {section.level === "strict" && "⛔"}
                                {section.level === "warning" && "⚠️"}
                            </div>

                            <h3>{section.title}</h3>
                        </div>

                        <ul>
                            {section.points.map((rule, idx) => (
                                <li key={idx}>{rule}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Rules;