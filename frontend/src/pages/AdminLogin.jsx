import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../services/api";
import "../styles/adminLogin.css";

const AdminLogin = () => {
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [shake, setShake] = useState(false);
    const [capsLockOn, setCapsLockOn] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await loginAdmin(password);

            toast.success("Admin logged in successfully", {
                duration: 2000,
            });

            localStorage.setItem("admin", "true");
            localStorage.setItem("adminPassword", password);

            setTimeout(() => {
                navigate("/admin");
            }, 600);
        } catch (error) {
            setShake(true);
            toast.error(error.message || "Incorrect admin password. Try again.", {
                duration: 3000,
            });
            setTimeout(() => setShake(false), 400);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-login-page">
            <form
                className={`admin-login-card ${shake ? "shake" : ""}`}
                onSubmit={handleLogin}
            >
                <h2>Admin Access</h2>
                <p>Restricted area - authorized personnel only</p>

                <div className="password-field">
                    <div className={`password-field ${shake ? "shake" : ""}`}>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter admin password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyUp={(e) => {
                                setCapsLockOn(e.getModifierState("CapsLock"));
                            }}
                        />
                        <span
                            className="eye-icon"
                            onClick={() => setShowPassword((value) => !value)}
                            title={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </span>
                        {capsLockOn && (
                            <p className="caps-warning">Caps Lock is ON</p>
                        )}
                    </div>
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
};

export default AdminLogin;
