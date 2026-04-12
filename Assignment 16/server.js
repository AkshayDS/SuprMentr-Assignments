// ============================================================
// server.js — Main entry point for the Bookstore REST API
// ============================================================
// This file creates the Express application, registers global
// middleware, and MOUNTS the modular routers from the /routes
// directory using app.use(). Each router is an express.Router()
// instance that was created and exported in its own file.
// ============================================================

const express = require("express");

// Import the modular route files
// Each file exports an express.Router() instance
const bookRoutes = require("./routes/bookRoutes");
const authorRoutes = require("./routes/authorRoutes");

// Create the main Express application
const app = express();
const PORT = 3000;

// -------------------------------------------------------
// Global Middleware
// -------------------------------------------------------

// express.json() parses incoming requests with JSON payloads.
// Without this middleware, req.body would be undefined for
// POST and PUT requests that send JSON data.
app.use(express.json());

// Simple request logger — logs every incoming request
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// -------------------------------------------------------
// Mount Routers
// -------------------------------------------------------
// app.use() attaches each Router to a specific base path.
// All routes defined inside bookRoutes.js will be prefixed
// with "/api/books", and all routes inside authorRoutes.js
// will be prefixed with "/api/authors".
//
// For example, router.get("/:id") in bookRoutes.js becomes
// accessible at GET /api/books/:id in the full application.
// -------------------------------------------------------
app.use("/api/books", bookRoutes);
app.use("/api/authors", authorRoutes);

// -------------------------------------------------------
// Root route — Welcome message
// -------------------------------------------------------
app.get("/", (req, res) => {
  res.json({
    message: "📚 Welcome to the Bookstore API!",
    endpoints: {
      books: "/api/books",
      authors: "/api/authors",
    },
  });
});

// -------------------------------------------------------
// 404 Catch-all — Handle undefined routes
// -------------------------------------------------------
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// -------------------------------------------------------
// Start the server
// -------------------------------------------------------
app.listen(PORT, () => {
  console.log(`🚀 Bookstore API server running at http://localhost:${PORT}`);
});
