import express from "express";

import {
  getBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
} from "../controllers/bookController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

// ==========================
// Public Routes
// ==========================


// Get All Books
router.get("/", getBooks);

// Get Book By ID
router.get("/:id", getBookById);

// ==========================
// Admin Protected Routes
// ==========================

// Add Book
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  addBook
);

// Update Book
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  updateBook
);

// Delete Book
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteBook
);

export default router;