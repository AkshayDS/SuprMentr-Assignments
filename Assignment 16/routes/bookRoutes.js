// ============================================================
// routes/bookRoutes.js — Router module for Book CRUD operations
// ============================================================
// We create an isolated Router instance using express.Router().
// This lets us define all book-related routes in their own file,
// keeping the codebase modular and maintainable.
// The router is exported at the bottom so the main server.js
// can mount it under a specific path (e.g., /api/books).
// ============================================================

const express = require("express");

// Create a new Router instance — it acts like a mini Express app
// that can have its own routes and middleware.
const router = express.Router();

// -------------------------------------------------------
// In-memory dummy data (no database required for this step)
// -------------------------------------------------------
let books = [
  { id: 1, title: "The Great Gatsby", genre: "Classic Fiction", authorId: 1 },
  { id: 2, title: "1984", genre: "Dystopian", authorId: 2 },
  { id: 3, title: "To Kill a Mockingbird", genre: "Southern Gothic", authorId: 3 },
  { id: 4, title: "The Hobbit", genre: "Fantasy", authorId: 4 },
  { id: 5, title: "Brave New World", genre: "Science Fiction", authorId: 5 },
];

// Helper to generate the next unique ID
let nextId = books.length + 1;

// -------------------------------------------------------
// GET /  —  Retrieve all books
// -------------------------------------------------------
router.get("/", (req, res) => {
  res.json({ success: true, count: books.length, data: books });
});

// -------------------------------------------------------
// GET /:id  —  Retrieve a single book by its ID
// -------------------------------------------------------
router.get("/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find((b) => b.id === bookId);

  if (!book) {
    return res.status(404).json({ success: false, message: `Book with id ${bookId} not found` });
  }

  res.json({ success: true, data: book });
});

// -------------------------------------------------------
// POST /  —  Create a new book
// Expects JSON body: { title, genre, authorId }
// -------------------------------------------------------
router.post("/", (req, res) => {
  const { title, genre, authorId } = req.body;

  // Basic validation
  if (!title || !genre || authorId === undefined) {
    return res.status(400).json({
      success: false,
      message: "Please provide title, genre, and authorId",
    });
  }

  const newBook = { id: nextId++, title, genre, authorId };
  books.push(newBook);

  res.status(201).json({ success: true, message: "Book created successfully", data: newBook });
});

// -------------------------------------------------------
// PUT /:id  —  Update an existing book
// Expects JSON body with fields to update: { title, genre, authorId }
// -------------------------------------------------------
router.put("/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const bookIndex = books.findIndex((b) => b.id === bookId);

  if (bookIndex === -1) {
    return res.status(404).json({ success: false, message: `Book with id ${bookId} not found` });
  }

  const { title, genre, authorId } = req.body;

  // Update only the fields that are provided
  if (title !== undefined) books[bookIndex].title = title;
  if (genre !== undefined) books[bookIndex].genre = genre;
  if (authorId !== undefined) books[bookIndex].authorId = authorId;

  res.json({ success: true, message: "Book updated successfully", data: books[bookIndex] });
});

// -------------------------------------------------------
// DELETE /:id  —  Delete a book by its ID
// -------------------------------------------------------
router.delete("/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const bookIndex = books.findIndex((b) => b.id === bookId);

  if (bookIndex === -1) {
    return res.status(404).json({ success: false, message: `Book with id ${bookId} not found` });
  }

  const deletedBook = books.splice(bookIndex, 1)[0];

  res.json({ success: true, message: "Book deleted successfully", data: deletedBook });
});

// ============================================================
// Export the router so it can be mounted in server.js
// using: app.use("/api/books", bookRouter);
// ============================================================
module.exports = router;
