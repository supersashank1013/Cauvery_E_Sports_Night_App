const express = require("express");
const router = express.Router();
const Registration = require("../models/Registration");
const adminAuth = require("../middleware/adminAuth");

router.post("/login", (req, res) => {
  const { password } = req.body;

  if (!process.env.ADMIN_PASSWORD) {
    return res.status(500).json({
      success: false,
      message: "Admin password is not configured",
    });
  }

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({
      success: false,
      message: "Invalid admin password",
    });
  }

  res.status(200).json({
    success: true,
    message: "Admin login successful",
  });
});

// View all registrations (Admin only) 
router.get("/registrations", adminAuth, async (req, res) => {
  try {
    const registrations = await Registration.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true,registrations});
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch registrations",
    });
  }
});

// 📊 Export CSV
router.get("/registrations/csv", adminAuth, async (req, res) => {
  try {
    const registrations = await Registration.find();

    let csv = "Team Name,Team Leader,Phone,Email,Game\n";

    registrations.forEach((r) => {
      csv += `"${r.teamName}","${r.teamLeaderName}","${r.contactPhone}","${r.contactEmail}","${r.game}"\n`;
    });

    res.header("Content-Type", "text/csv");
    res.attachment("registrations.csv");
    res.send(csv);
  } catch (err) {
    res.status(500).send("CSV generation failed");
  }
});

module.exports = router;
