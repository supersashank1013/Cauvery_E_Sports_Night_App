const express = require("express");

const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const app = express();

connectDB();

// Middleware
app.use(cors());
app.use(express.json());


// Routes
const registerRoutes = require("./routes/register");
app.use("/api/register", registerRoutes);
app.use("/api/admin", require("./routes/admin"));

// Test route
app.get("/", (req, res) => {
  res.send("Cauvery E-Sports Backend is running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
