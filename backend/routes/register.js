const express = require("express");
const router = express.Router();
const Registration = require("../models/Registration");
const sendConfirmationEmail = require("../utils/sendEmail");

// POST: Register a team
router.post("/", async (req, res) => {
  try {
    const {
      teamName,
      teamLeaderName,
      contactPhone,
      contactEmail,
      game,
    } = req.body;

    // 🔴 Minimal validation (matches current form)
    if (
      !teamName ||
      !teamLeaderName ||
      !contactPhone ||
      !contactEmail ||
      !game
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // 🔒 Prevent duplicate team names
    const existingTeam = await Registration.findOne({ teamName });
    if (existingTeam) {
      return res.status(409).json({
        success: false,
        message: "Team name already exists",
      });
    }

    const registration = new Registration({
      teamName,
      teamLeaderName,
      contactPhone,
      contactEmail,
      game,
    });

    await registration.save();

    // (Email can be added here later safely)

    res.status(201).json({
      success: true,
      message: "Registration successful",
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});
module.exports = router;
