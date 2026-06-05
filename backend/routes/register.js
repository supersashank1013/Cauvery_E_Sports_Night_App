const express = require("express");
const router = express.Router();
const Registration = require("../models/Registration");

router.post("/", async (req, res) => {
  try {
    const {
      teamName,
      teamLeaderName,
      contactPhone,
      contactEmail,
      game,
    } = req.body;

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

    const existingTeamForGame = await Registration.findOne({
      game,
      teamName,
    });

    if (existingTeamForGame) {
      return res.status(409).json({
        success: false,
        message: "This team name is already registered for this game.",
      });
    }

    const existingPhoneForGame = await Registration.findOne({
      game,
      contactPhone,
    });

    if (existingPhoneForGame) {
      return res.status(409).json({
        success: false,
        message: "This phone number is already registered for this game.",
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
