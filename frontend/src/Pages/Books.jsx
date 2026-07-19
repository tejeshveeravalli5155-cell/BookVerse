import { useState, useEffect } from "react";
import API from "../services/api";
import BookCard from "../components/BookCard/BookCard";
import BookTable from "../components/BookTable/BookTable";
import "./Books.css";

function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  // Fetch Books
  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError("");

      const url = search
        ? `/books/search?title=${search}`
        : "/books";

      const response = await API.get(url);

      setBooks(response.data.data);
    } catch (err) {
      console.error(err);
      setError("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "BookVerse | Books";
    fetchBooks();
  }, []);

  // Search when button is clicked
  const handleSearch = () => {
    fetchBooks();
  };

  // Refresh
  const handleRefresh = () => {
    setSearch("");
    fetchBooks();
  };

  if (loading) {
    return (
      <div className="books-page">
        <h2>Loading Books...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="books-page">
        <h2>{error}</h2>
        <button onClick={fetchBooks}>Retry</button>
      </div>
    );
  }
const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this book?"
  );

  if (!confirmDelete) return;

  try {
    await API.delete(`/books/${id}`);

    setBooks((prev) =>
      prev.filter((book) => book._id !== id)
    );

    alert("Book Deleted Successfully");
  } catch (error) {
    console.error(error);
    alert("Failed to delete book");
  }
};
  return (
    <div className="books-page">

      <h1>📚 Our Books</h1>

      {/* Dashboard Cards */}
      <div className="stats">

        <div className="stat-card">
          <h2>{books.length}</h2>
          <p>Total Books</p>
        </div>

        <div className="stat-card">
          <h2>
            ₹
            {books.reduce(
              (sum, book) => sum + Number(book.price),
              0
            )}
          </h2>
          <p>Total Price</p>
        </div>

      </div>

      {/* Search */}
      <div className="search-container">

        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button onClick={handleSearch}>
          Search
        </button>

        <button onClick={handleRefresh}>
          Refresh
        </button>

      </div>

      {/* Empty State */}
      {books.length === 0 ? (
        <h2>No Books Found</h2>
      ) : (
        <>
          <div className="book-container">

            {books.map((book) => (
              <BookCard
                key={book._id}
                id={book._id}
                title={book.title}
                author={book.author}
                price={book.price}
                image={book.image}
                onDelete={() => handleDelete(book._id)}
              />
                
              ))}

          </div>

          <BookTable books={books} />
        </>
      )}

    </div>
  );
}

export default Books;