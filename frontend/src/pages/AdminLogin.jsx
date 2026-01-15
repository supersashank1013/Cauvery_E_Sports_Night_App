import React from "react";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/adminLogin.css";

const AdminLogin = () => {
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [shake, setShake] = useState(false);
    const [capsLockOn, setCapsLockOn] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        if (password !== "supersecretadmin123") {
            setShake(true);
            toast.error("Incorrect admin password. Try again.", {
                 duration: 3000 
            });
            setTimeout(() => setShake(false), 400);
            return;
        }
        // ✅ Success flow
  toast.success("Admin logged in successfully", {
    duration: 2000,
  });
        localStorage.setItem("admin", "true");
        setTimeout(() =>{
            window.location.href = "/admin";
        }, 600);
    };


    return (
        <div className="admin-login-page">
            <form
                className={`admin-login-card ${shake ? "shake" : ""}`}
                onSubmit={handleLogin}
            >
                <h2>Admin Access</h2>
                <p>Restricted area — authorized personnel only</p>

                <div className="password-field">
                    <div className={`password-field ${shake ? "shake" : ""}`}>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter admin password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyUp={(e) => { setCapsLockOn(e.getModifierState("CapsLock")); }}
                        />
                        <span
                            className="eye-icon"
                            onClick={() => setShowPassword((p) => !p)}
                            title={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? "👁️‍🗨️" : "👁️"}
                        </span>
                        {capsLockOn && (
                            <p className="caps-warning">Caps Lock is ON</p>
                        )}

                    </div>



                </div>

                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default AdminLogin;
