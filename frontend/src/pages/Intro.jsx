import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/intro.css";

const Intro = () => {
    const navigate = useNavigate();
    const [showSkip, setShowSkip] = useState(false);

    const handleFinish = useCallback(() => {
        sessionStorage.setItem("introSeen", "true");
        navigate("/");
    }, [navigate]);

    useEffect(() => {
        const skipTimer = setTimeout(() => {
            setShowSkip(true);
        }, 3000);

        const autoEnd = setTimeout(() => {
            handleFinish();
        }, 5000);

        return () => {
            clearTimeout(skipTimer);
            clearTimeout(autoEnd);
        };
    }, [handleFinish]);

    return (
        <div className="intro-screen">
            <div className="intro-content">
                <div className="loading-bar-container">
                    <div className="loading-bar-fill"></div>
                </div>
                <h1 className="intro-title">Cauvery</h1>
                <h2 className="intro-subtitle">E-Sports Night</h2>
            </div>

            {showSkip && (
                <button className="intro-skip" onClick={handleFinish}>
                    Skip →
                </button>
            )}
        </div>
    );
};

export default Intro;
