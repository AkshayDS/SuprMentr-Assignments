const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const taskRoutes = require("./routes/taskRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ────────────────────────────────
app.use(express.json()); // Parse incoming JSON request bodies

// ── Routes ────────────────────────────────────
app.use("/api/tasks", taskRoutes);

// ── Root route (health check) ─────────────────
app.get("/", (req, res) => {
  res.json({ message: "Task Manager API is running 🚀" });
});

// ── 404 handler for unknown routes ───────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// ── MongoDB Connection + Server Start ─────────
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  });
