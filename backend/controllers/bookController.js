import books from "../data/books.js";

// GET All Books
export const getBooks = (req, res) => {
  res.json(books);
};

// GET Book By ID
export const getBookById = (req, res) => {
  const id = Number(req.params.id);

  const book = books.find((b) => b.id === id);

  if (!book) {
    return res.status(404).json({
      message: "Book not found",
    });
  }

  res.json(book);
};

// POST Book
export const addBook = (req, res) => {
  const { title, author, price } = req.body;

  if (!title || !author || !price) {
    return res.status(400).json({
      success: false,
      message: "Title, Author and Price are required",
    });
  }

  if (typeof price !== "number") {
    return res.status(400).json({
      success: false,
      message: "Price must be a number",
    });
  }

  const newBook = {
    id: books.length + 1,
    title,
    author,
    price,
  };

  books.push(newBook);

  res.status(201).json({
    success: true,
    message: "Book Added Successfully",
    data: newBook,
  });
};

// PUT Book
export const updateBook = (req, res) => {
  const id = Number(req.params.id);

  const book = books.find((b) => b.id === id);

  if (!book) {
    return res.status(404).json({
      message: "Book not found",
    });
  }

  const { title, author, price } = req.body;

  if (title) book.title = title;
  if (author) book.author = author;
  if (price) book.price = price;

  res.json({
    message: "Book Updated Successfully",
    book,
  });
};

// DELETE Book
export const deleteBook = (req, res) => {
  const id = Number(req.params.id);

  const index = books.findIndex((b) => b.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Book not found",
    });
  }

  const deletedBook = books.splice(index, 1);

  res.json({
    message: "Book Deleted Successfully",
    book: deletedBook,
  });
};

// Search Books
export const searchBooks = (req, res) => {
  const { title } = req.query;

  const result = books.filter((book) =>
    book.title.toLowerCase().includes(title.toLowerCase())
  );

  res.json(result);
};
