import express from "express";

import {
  getBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
} from "../controllers/bookController.js";

const router = express.Router();

// GET All Books
// Supports:
// ?search=
// ?page=
// ?limit=
// ?sort=
// ?order=
router.get("/", getBooks);

// GET Book By ID
router.get("/:id", getBookById);

// ADD Book
router.post("/", addBook);

// UPDATE Book
router.put("/:id", updateBook);

// DELETE Book
router.delete("/:id", deleteBook);

export default router;