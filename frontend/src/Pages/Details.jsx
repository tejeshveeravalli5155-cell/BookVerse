import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import "./Details.css";
import { toast } from "react-toastify";

function Details() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBook();
  }, [id]);

  const fetchBook = async () => {
    try {
      console.log("Book ID:", id);

      const response = await API.get(`/books/${id}`);

      console.log(response.data);

      setBook(response.data.data);
    } catch (err) {
      console.error(err);
      setError("Book not found.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="details-container">
        <h2 className="loading">Loading...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="details-container">
        <h2 className="error">{error}</h2>

        <button
          className="back-btn"
          onClick={() => navigate("/books")}
        >
          ⬅ Back to Books
        </button>
      </div>
    );
  }

  return (
  <div className="details-container">

    <img
      src={
        book.image ||
        "https://via.placeholder.com/250x350?text=No+Cover"
      }
      alt={book.title}
      className="details-image"
    />

    <h1 className="details-title">{book.title}</h1>

    <p className="details-text">
      <strong>Author:</strong> {book.author}
    </p>

    <p className="details-text">
      <strong>Price:</strong> ₹{book.price}
    </p>

    <p className="details-text">
      <strong>Book ID:</strong> {book._id}
    </p>

    <button
      className="back-btn"
      onClick={() => navigate("/books")}
    >
      ⬅ Back to Books
    </button>

  </div>
);
}

export default Details;