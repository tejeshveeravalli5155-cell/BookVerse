import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import sampleBooks from "../data/sampleBooks";
import "./ReadBook.css";
import { toast } from "react-toastify";

function ReadBook() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    fetchBook();
  }, [id]);

  const fetchBook = async () => {
    try {
      const response = await API.get(`/books/${id}`);
      setBook(response.data.data);
    } catch (error) {
      console.error(error);
      toast.error("Book not found");
      navigate("/books");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!book) {
    return <h2>Book not found.</h2>;
  }

  // Debug
  console.log("Book Title:", book.title);
  console.log("Pages:", sampleBooks[book.title.trim().toLowerCase()]);

  const pages =
    sampleBooks[book.title.trim().toLowerCase()] || [
      "No sample available for this book.",
    ];

  return (
    <div className="reader">
      <h1>{book.title}</h1>

      <h3>by {book.author}</h3>

      <hr />

      <div className="page">
        <pre>{pages[currentPage]}</pre>
      </div>

      <div className="reader-buttons">
        <button
          disabled={currentPage === 0}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          ⬅ Previous
        </button>

        <span>
          Page {currentPage + 1} / {pages.length}
        </span>

        <button
          disabled={currentPage === pages.length - 1}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next ➡
        </button>
      </div>

      <button
        className="back-btn"
        onClick={() => navigate("/books")}
      >
        ⬅ Back to Books
      </button>
    </div>
  );
}

export default ReadBook;