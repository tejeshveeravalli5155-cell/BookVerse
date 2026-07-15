import express from "express";

import {
  getBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
  searchBooks,
} from "../controllers/bookController.js";

const router = express.Router();

// Search (MUST COME BEFORE :id)
router.get("/search", searchBooks);

// Get All
router.get("/", getBooks);

// Get By ID
router.get("/:id", getBookById);

// Add
router.post("/", addBook);

// Update
router.put("/:id", updateBook);

// Delete
router.delete("/:id", deleteBook);

export default router;