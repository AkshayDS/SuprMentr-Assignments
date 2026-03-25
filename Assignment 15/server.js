// ============================================================
// Assignment 15: Hello Server
// A Node.js + Express server with multiple route handlers
// ============================================================

// 1. Import the Express framework.
//    Express is a minimal web framework for Node.js that makes it
//    easy to create a server and define routes (URL paths).
const express = require("express");

// 2. Create an Express application instance.
//    This 'app' object is what we use to configure routes and middleware.
const app = express();

// 3. Define the port number the server will listen on.
//    We use an environment variable if available, otherwise default to 3000.
const PORT = process.env.PORT || 3000;

// ============================================================
// HOW EXPRESS ROUTING WORKS:
// ----------------------------------------------------------
// When a request comes in, Express checks the HTTP method (GET,
// POST, etc.) and the URL path (e.g., "/about") against each
// route definition IN ORDER from top to bottom.
//
// The FIRST route that matches both the method and the path
// will handle the request. Its callback function receives two
// objects:
//   - req (request)  → contains info about the incoming request
//   - res (response) → used to send data back to the client
//
// If no defined route matches, the catch-all middleware at the
// bottom handles it and returns a 404 response.
// ============================================================

// ----------------------------------------------------------
// ROUTE 1: Root Route → GET /
// ----------------------------------------------------------
// Purpose: Serves as the home/landing page of the server.
// Response Type: HTML
// When a user visits http://localhost:3000/, Express matches
// the path "/" and sends back an HTML string.
app.get("/", (req, res) => {
  res.send("<h1>Welcome to the Main Page!</h1>");
});

// ----------------------------------------------------------
// ROUTE 2: About Route → GET /about
// ----------------------------------------------------------
// Purpose: Provides a plain-text description of the server.
// Response Type: Plain Text
// When the path "/about" is matched, we explicitly set the
// Content-Type header to "text/plain" so the browser knows
// to render it as plain text, not HTML.
app.get("/about", (req, res) => {
  res.type("text/plain");
  res.send(
    "This is a simple Express.js server built for Assignment 15. " +
      "It demonstrates how to create different routes that return " +
      "HTML, plain text, and JSON responses."
  );
});

// ----------------------------------------------------------
// ROUTE 3: JSON API Route → GET /api/info
// ----------------------------------------------------------
// Purpose: Returns structured JSON data, mimicking a real API.
// Response Type: JSON
// res.json() automatically:
//   1. Converts the JavaScript object to a JSON string.
//   2. Sets the Content-Type header to "application/json".
// This is how backends typically send data to frontend apps.
app.get("/api/info", (req, res) => {
  res.json({
    status: "success",
    message: "Data fetched successfully",
    version: "1.0.0",
  });
});

// ----------------------------------------------------------
// ROUTE 4: 404 Catch-All Middleware → ALL *
// ----------------------------------------------------------
// Purpose: Handles any request that didn't match the routes above.
// This MUST be placed AFTER all other route definitions because
// Express evaluates routes top-to-bottom. If this were placed
// first, every request would get a 404 response.
//
// app.use() without a path matches ALL HTTP methods and ALL
// paths that haven't been handled yet. We set the HTTP status
// to 404 (Not Found) and send a user-friendly error message.
app.use((req, res) => {
  res.status(404).send("<h1>404 - Oops! Page not found</h1>");
});

// ============================================================
// START THE SERVER
// ============================================================
// app.listen() binds the server to the specified port and starts
// listening for incoming requests. The callback runs once the
// server is ready.
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
