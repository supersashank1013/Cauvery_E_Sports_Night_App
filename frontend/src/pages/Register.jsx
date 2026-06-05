import toast from "react-hot-toast";
import "../styles/register.css";
import { registerTeam } from "../services/api";
import { useState } from "react";

const Register = () => {
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        teamName: "",
        teamLeaderName: "",
        contactPhone: "",
        contactEmail: "",
        game: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validateForm = () => {
        if (!formData.teamName.trim()) {
            toast.error("Team name is required");
            return false;
        }

        if (!formData.teamLeaderName.trim()) {
            toast.error("Team leader name is required");
            return false;
        }


        if (!formData.contactPhone.trim()) {
            toast.error("Phone number is required");
            return false;
        }

        if (!/^\d{10}$/.test(formData.contactPhone)) {
            toast.error("Phone number must contain exactly 10 digits");
            return false;
        }

        if (!formData.contactEmail.trim()) {
            toast.error("Email is required");
            return false;
        }

        if (!/\S+@\S+\.\S+/.test(formData.contactEmail)) {
            toast.error("Please enter a valid email");
            return false;
        }

        if (!formData.game) {
            toast.error("Please select a game");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);

        try {
            const data = await registerTeam(formData);

            toast.success(data.message || "Thank you! Your registration is submitted.");

            setFormData({
                teamName: "",
                teamLeaderName: "",
                contactPhone: "",
                contactEmail: "",
                game: "",
            });
        } catch (error) {
            toast.error(error.message || "Server error. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container page-container">
            <h2>Team Registration</h2>

            <form
                className="register-form"
                onSubmit={handleSubmit}
                onKeyDown={(e) => {
                    if (e.key === "Enter") e.preventDefault();
                }}
            >
                <input
                    type="text"
                    name="teamName"
                    placeholder="Team Name"
                    value={formData.teamName}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="teamLeaderName"
                    placeholder="Team Leader Name"
                    value={formData.teamLeaderName}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="contactPhone"
                    placeholder="Phone Number"
                    value={formData.contactPhone}
                    onChange={handleChange}
                />

                <input
                    type="email"
                    name="contactEmail"
                    placeholder="Email"
                    value={formData.contactEmail}
                    onChange={handleChange}
                />

                <select
                    name="game"
                    value={formData.game}
                    onChange={handleChange}
                >
                    <option value="">Select Game</option>
                    <option value="Valorant">Valorant</option>
                    <option value="BGMI">BGMI</option>
                    <option value="Free Fire MAX">Free Fire MAX</option>
                    <option value="Call of Duty Mobile">Call of Duty Mobile</option>
                </select>

                <button type="submit" disabled={loading}>
                    {loading ? "Submitting..." : "Submit Registration"}
                </button>

            </form>
        </div>
    );
};

export default Register;
