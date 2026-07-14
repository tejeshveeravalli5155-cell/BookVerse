import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Details() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBook() {
      setLoading(true);

      try {
        // Fetch API books
        const response = await fetch(
          "https://openlibrary.org/search.json?q=programming&limit=20"
        );

        const data = await response.json();

        // Load Local Storage books
        const localBooks =
          JSON.parse(localStorage.getItem("myBooks")) || [];

        // Combine both lists
        const allBooks = [...localBooks, ...data.docs];

        const selectedBook = allBooks[Number(id)];

        setBook(selectedBook);
      } catch (error) {
        console.error(error);
      }

      setLoading(false);
    }

    loadBook();
  }, [id]);

  if (loading) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "40px" }}>
        Loading...
      </h2>
    );
  }

  if (!book) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "40px" }}>
        Book Not Found 📚
      </h2>
    );
  }

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: "30px",
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 5px 15px rgba(0,0,0,.2)",
      }}
    >
      <h1 style={{ marginBottom: "20px" }}>
        📖 Book Details
      </h1>

      <img
        src={
          book.cover
            ? book.cover
            : book.cover_i
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
            : "https://via.placeholder.com/250x350?text=No+Cover"
        }
        alt={book.title}
        style={{
          width: "250px",
          display: "block",
          marginBottom: "20px",
          borderRadius: "10px",
        }}
      />

      <h2>{book.title}</h2>

      <p>
        <strong>Author:</strong>{" "}
        {book.author_name
          ? book.author_name.join(", ")
          : book.author || "Unknown Author"}
      </p>

      <p>
        <strong>Published:</strong>{" "}
        {book.first_publish_year || "N/A"}
      </p>

      <p>
        <strong>Language:</strong>{" "}
        {book.language
          ? book.language.join(", ")
          : "N/A"}
      </p>

      <p>
        <strong>Publisher:</strong>{" "}
        {book.publisher
          ? Array.isArray(book.publisher)
            ? book.publisher[0]
            : book.publisher
          : "N/A"}
      </p>

      <button
        onClick={() => navigate(-1)}
        style={{
          marginTop: "25px",
          padding: "10px 20px",
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        ⬅ Back
      </button>
    </div>
  );
}

export default Details;