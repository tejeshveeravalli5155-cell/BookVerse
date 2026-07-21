import mongoose from "mongoose";
import Book from "../models/Book.js";

// ==========================
// GET ALL BOOKS
// Search + Pagination + Sorting
// ==========================
export const getBooks = async (req, res) => {
  
  try {
    const {
      search = "",
      page = 1,
      limit = 8,
      sort = "createdAt",
      order = "desc",
    } = req.query;

    const query = {
      title: {
        $regex: search,
        $options: "i",
      },
    };

    const total = await Book.countDocuments(query);

    const sortOption = {
      [sort]: order === "asc" ? 1 : -1,
    };

    const books = await Book.find(query)
      .sort(sortOption)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      count: books.length,
      total,
      currentPage: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
      data: books,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};

// ==========================
// GET BOOK BY ID
// ==========================
export const getBookById = async (req, res) => {
  try {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Book ID",
      });
    }

    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      data: book,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};

// ==========================
// ADD BOOK
// ==========================
export const addBook = async (req, res) => {
  try {

    const { title, author, price, image } = req.body;

    const book = await Book.create({
      title,
      author,
      price,
      image,
    });

    res.status(201).json({
      success: true,
      message: "Book Added Successfully",
      data: book,
    });

  } catch (err) {

    res.status(400).json({
      success: false,
      message: err.message,
    });

  }
};

// ==========================
// UPDATE BOOK
// ==========================
export const updateBook = async (req, res) => {
  try {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Book ID",
      });
    }

    const book = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book Updated Successfully",
      data: book,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};

// ==========================
// DELETE BOOK
// ==========================
export const deleteBook = async (req, res) => {
  try {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Book ID",
      });
    }

    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book Deleted Successfully",
      data: book,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};