import React from "react";

import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './styles/animations.css';
import './styles/background.css';
import './styles/icons.css';

import Background from "./components/Background";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Events from "./pages/Events";
import Schedule from "./pages/Schedule";
import Rules from "./pages/Rules";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";

const hasSeenIntro = sessionStorage.getItem("introSeen");

function App() {

  return (
    <BrowserRouter>
    <div className="global-bg "/>

      <Background />
      <Navbar />
      <Toaster position="top-right" />
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/register" element={<Register />} />
        <Route path="/events" element={<Events />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<Admin />} />

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
