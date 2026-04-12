// ==============================================================
// routes/authorRoutes.js — Router module for Author CRUD operations
// ==============================================================
// Just like bookRoutes.js, we use express.Router() to create a
// self-contained router. This router handles all author-related
// endpoints and is exported for mounting in the main server.js.
// ==============================================================

const express = require("express");

// Create a dedicated Router instance for author routes
const router = express.Router();

// -------------------------------------------------------
// In-memory dummy data (no database required for this step)
// -------------------------------------------------------
let authors = [
  { id: 1, name: "F. Scott Fitzgerald", bio: "American novelist known for 'The Great Gatsby'." },
  { id: 2, name: "George Orwell", bio: "English novelist and essayist, famous for '1984' and 'Animal Farm'." },
  { id: 3, name: "Harper Lee", bio: "American novelist best known for 'To Kill a Mockingbird'." },
  { id: 4, name: "J.R.R. Tolkien", bio: "English writer and philologist, author of 'The Hobbit' and 'The Lord of the Rings'." },
  { id: 5, name: "Aldous Huxley", bio: "English writer and philosopher, known for 'Brave New World'." },
];

// Helper to generate the next unique ID
let nextId = authors.length + 1;

// -------------------------------------------------------
// GET /  —  Retrieve all authors
// -------------------------------------------------------
router.get("/", (req, res) => {
  res.json({ success: true, count: authors.length, data: authors });
});

// -------------------------------------------------------
// GET /:id  —  Retrieve a single author by their ID
// -------------------------------------------------------
router.get("/:id", (req, res) => {
  const authorId = parseInt(req.params.id);
  const author = authors.find((a) => a.id === authorId);

  if (!author) {
    return res.status(404).json({ success: false, message: `Author with id ${authorId} not found` });
  }

  res.json({ success: true, data: author });
});

// -------------------------------------------------------
// POST /  —  Create a new author
// Expects JSON body: { name, bio }
// -------------------------------------------------------
router.post("/", (req, res) => {
  const { name, bio } = req.body;

  // Basic validation
  if (!name || !bio) {
    return res.status(400).json({
      success: false,
      message: "Please provide both name and bio",
    });
  }

  const newAuthor = { id: nextId++, name, bio };
  authors.push(newAuthor);

  res.status(201).json({ success: true, message: "Author created successfully", data: newAuthor });
});

// -------------------------------------------------------
// PUT /:id  —  Update an existing author
// Expects JSON body with fields to update: { name, bio }
// -------------------------------------------------------
router.put("/:id", (req, res) => {
  const authorId = parseInt(req.params.id);
  const authorIndex = authors.findIndex((a) => a.id === authorId);

  if (authorIndex === -1) {
    return res.status(404).json({ success: false, message: `Author with id ${authorId} not found` });
  }

  const { name, bio } = req.body;

  // Update only the fields that are provided
  if (name !== undefined) authors[authorIndex].name = name;
  if (bio !== undefined) authors[authorIndex].bio = bio;

  res.json({ success: true, message: "Author updated successfully", data: authors[authorIndex] });
});

// -------------------------------------------------------
// DELETE /:id  —  Delete an author by their ID
// -------------------------------------------------------
router.delete("/:id", (req, res) => {
  const authorId = parseInt(req.params.id);
  const authorIndex = authors.findIndex((a) => a.id === authorId);

  if (authorIndex === -1) {
    return res.status(404).json({ success: false, message: `Author with id ${authorId} not found` });
  }

  const deletedAuthor = authors.splice(authorIndex, 1)[0];

  res.json({ success: true, message: "Author deleted successfully", data: deletedAuthor });
});

// ==============================================================
// Export the router so it can be mounted in server.js
// using: app.use("/api/authors", authorRouter);
// ==============================================================
module.exports = router;
