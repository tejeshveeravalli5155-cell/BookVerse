import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Details() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://openlibrary.org/search.json?q=programming&limit=20")
      .then((res) => res.json())
      .then((data) => {
        const selectedBook = data.docs[id];
        setBook(selectedBook);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  if (!book) {
    return <h2 style={{ textAlign: "center" }}>Book Not Found</h2>;
  }

  return (
    <div
      style={{
        padding: "30px",
        maxWidth: "900px",
        margin: "auto",
      }}
    >
      <h1>Book Details</h1>

      <img
        src={
          book.cover_i
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
            : "https://via.placeholder.com/250x350?text=No+Cover"
        }
        alt={book.title}
        style={{
          width: "250px",
          display: "block",
          marginBottom: "20px",
        }}
      />

      <h2>{book.title}</h2>

      <p>
        <strong>Author:</strong>{" "}
        {book.author_name
          ? book.author_name.join(", ")
          : "Unknown"}
      </p>

      <p>
        <strong>First Published:</strong>{" "}
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
          ? book.publisher[0]
          : "N/A"}
      </p>

      <button
        onClick={() => navigate(-1)}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          cursor: "pointer",
        }}
      >
        ⬅ Back
      </button>
    </div>
  );
}

export default Details;