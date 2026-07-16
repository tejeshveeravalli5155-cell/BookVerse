import Book from "../models/Book.js";

// GET All Books
export const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET Book By ID
export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST Book
export const addBook = async (req, res) => {
  try {
    const { title, author, price } = req.body;

    const book = await Book.create({
      title,
      author,
      price,
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

// PUT Book
export const updateBook = async (req, res) => {
  try {
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
        message: "Book not found",
      });
    }

    res.json({
      success: true,
      message: "Book Updated Successfully",
      data: book,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// DELETE Book
export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    res.json({
      success: true,
      message: "Book Deleted Successfully",
      data: book,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// SEARCH
export const searchBooks = async (req, res) => {
  try {
    const books = await Book.find({
      title: {
        $regex: req.query.title,
        $options: "i",
      },
    });

    res.json(books);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};