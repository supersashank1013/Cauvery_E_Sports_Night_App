const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

connectDB();

const allowedOrigins = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(",").map((origin) => origin.trim())
  : true;

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "x-admin-password"],
  })
);
app.use(express.json());

app.use("/api/register", require("./routes/register"));
app.use("/api/admin", require("./routes/admin"));

app.get("/", (req, res) => {
  res.send("Cauvery E-Sports Backend is running");
});

app.get("/api/health", (req, res) => {
  res.status(200).json({ success: true, message: "Backend is healthy" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
