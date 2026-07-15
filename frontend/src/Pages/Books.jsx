import { useState, useEffect } from "react";
import BookCard from "../components/BookCard/BookCard";
import BookTable from "../components/BookTable/BookTable";
import "./Books.css";

function Books() {

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState(
  sessionStorage.getItem("search") || ""
);
  const [sort, setSort] = useState(
  sessionStorage.getItem("sort") || ""
);
  const [lastUpdated, setLastUpdated] = useState("");

  // Favorites
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  // Recently Viewed
  const [recentBooks, setRecentBooks] = useState([]);

  useEffect(() => {
    document.title = "BookVerse | Books";
    sessionStorage.setItem("lastPage", "/books");
    fetchBooks();
  }, []);

  // Fetch Books
  function fetchBooks() {

    setLoading(true);
    setError("");

    fetch("https://openlibrary.org/search.json?q=programming&limit=20")
      .then((response) => {

        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }

        return response.json();

      })
      .then((data) => {

        const apiBooks = data.docs || [];

        const localBooks =
          JSON.parse(localStorage.getItem("myBooks")) || [];

        setBooks([...localBooks, ...apiBooks]);

        setLastUpdated(new Date().toLocaleTimeString());

        setLoading(false);

      })
      .catch((error) => {

        console.error(error);

        setError(error.message);

        setLoading(false);

      });

  }

  function refreshBooks() {
    fetchBooks();
  }

  // Save Favorites
  useEffect(() => {

    localStorage.setItem(
      "favorites",
      JSON.stringify(favorites)
    );

  }, [favorites]);

  // Recently Viewed
  useEffect(() => {

    const loadRecentBooks = () => {

      const recent =
        JSON.parse(localStorage.getItem("recentBooks")) || [];

      setRecentBooks(recent);

    };

    loadRecentBooks();

    window.addEventListener("focus", loadRecentBooks);

    return () => {
      window.removeEventListener("focus", loadRecentBooks);
    };

  }, []);
    // Search
  let filteredBooks = books.filter((book) => {
    const title = (book.title || "").toLowerCase();

    const author = book.author_name
      ? book.author_name.join(", ").toLowerCase()
      : (book.author || "").toLowerCase();

    return (
      title.includes(search.toLowerCase()) ||
      author.includes(search.toLowerCase())
    );
  });

  // Sort
  if (sort === "az") {
    filteredBooks.sort((a, b) =>
      (a.title || "").localeCompare(b.title || "")
    );
  }

  if (sort === "za") {
    filteredBooks.sort((a, b) =>
      (b.title || "").localeCompare(a.title || "")
    );
  }

  if (sort === "new") {
    filteredBooks.sort(
      (a, b) =>
        (b.first_publish_year || 0) -
        (a.first_publish_year || 0)
    );
  }

  if (sort === "old") {
    filteredBooks.sort(
      (a, b) =>
        (a.first_publish_year || 0) -
        (b.first_publish_year || 0)
    );
  }

  // Favorite
  function toggleFavorite(key) {

    if (favorites.includes(key)) {

      setFavorites(
        favorites.filter((item) => item !== key)
      );

    } else {

      setFavorites([...favorites, key]);

    }

  }

  // Delete
  function deleteBook(key) {

    if (window.confirm("Delete this book?")) {

      setBooks((prevBooks) =>
        prevBooks.filter((book) => book.key !== key)
      );

      const localBooks =
        JSON.parse(localStorage.getItem("myBooks")) || [];

      const updatedLocalBooks = localBooks.filter(
        (book) => book.key !== key
      );

      localStorage.setItem(
        "myBooks",
        JSON.stringify(updatedLocalBooks)
      );

    }

  }

  // Clear Recently Viewed
  function clearRecentBooks() {

    localStorage.removeItem("recentBooks");

    setRecentBooks([]);

  }

  if (loading) {

    return (
      <h1 className="recent-title">
        Loading Books...
      </h1>
    );

  }

  if (error) {

    return (
      <h1 className="empty">
        {error}
      </h1>
    );

  }
    return (
    <div className="books-page">

      <h1>Our Books</h1>

      {/* Search */}
      <input
        type="text"
        className="search-box"
        placeholder="Search by Title or Author..."
        value={search}
        onChange={(e) => {

        setSearch(e.target.value);

        sessionStorage.setItem(
          "search",
          e.target.value
        );

      }}
      />

      {/* Refresh */}
      <button
        className="refresh-btn"
        onClick={refreshBooks}
        disabled={loading}
      >
        {loading ? "Loading..." : "🔄 Refresh Books"}
      </button>

      <p className="last-update">
        Last Updated: {lastUpdated}
      </p>

      {/* Sort */}
      <div className="sort-container">
        <select
          value={sort}
          onChange={(e) => {

        setSort(e.target.value);

        sessionStorage.setItem(
          "sort",
          e.target.value
        );

        }}
        >
          <option value="">Sort By</option>
          <option value="az">Title A-Z</option>
          <option value="za">Title Z-A</option>
          <option value="new">Newest</option>
          <option value="old">Oldest</option>
        </select>
      </div>

      {/* Recently Viewed */}
      {recentBooks.length > 0 && (
        <>
          <h2 className="recent-title">
            🕒 Recently Viewed
          </h2>

          <button
            className="clear-btn"
            onClick={clearRecentBooks}
          >
            🗑 Clear Recently Viewed
          </button>

          <div className="book-container">
            {recentBooks.map((book) => (
              <div
                key={book.id}
                className="book-card"
              >
                <img
                  src={book.image}
                  alt={book.title}
                />

                <div className="book-content">
                  <h3>{book.title}</h3>
                  <p>{book.author}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Statistics */}
      <div className="stats">

        <div className="stat-card">
          <h2>{books.length}</h2>
          <p>Total Books</p>
        </div>

        <div className="stat-card">
          <h2>{favorites.length}</h2>
          <p>Favorite Books</p>
        </div>

        <div className="stat-card">
          <h2>
            {books.filter((book) => book.first_publish_year).length}
          </h2>
          <p>Published Books</p>
        </div>

      </div>

      {/* Books */}
      {filteredBooks.length === 0 ? (
        <h2 className="empty">
          No Books Found 📚
        </h2>
      ) : (
        <>
          <div className="book-container">

            {filteredBooks.map((book,index) => (

              <BookCard
                  key={book.key}
                  id={index}
                  title={book.title}
                  author={
                    book.author_name
                      ? book.author_name.join(", ")
                      : book.author || "Unknown Author"
                  }
                  price={book.first_publish_year || "N/A"}
                  image={
                    book.cover
                      ? book.cover
                      : book.cover_i
                      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
                      : "https://via.placeholder.com/180x250?text=No+Cover"
                  }
                  favorite={favorites.includes(book.key)}
                  onFavorite={() => toggleFavorite(book.key)}
                  onDelete={() => deleteBook(book.key)}
                  isLocal={!book.author_name}
                />

            ))}

          </div>

          <BookTable books={filteredBooks} />
        </>
      )}

    </div>
  );
}

export default Books;