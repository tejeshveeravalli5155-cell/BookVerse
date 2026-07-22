import { useState, useEffect } from "react";
import API from "../services/api";
import BookCard from "../components/BookCard/BookCard";
import BookTable from "../components/BookTable/BookTable";
import "./Books.css";
import { toast } from "react-toastify";

function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(8);
  const [sort, setSort] = useState("createdAt");
  const [order, setOrder] = useState("desc");
  const [totalPages, setTotalPages] = useState(1);

  const fetchBooks = async () => {
  try {
    setLoading(true);
    setError("");

    const response = await API.get("/books", {
      params: {
        search,
        page,
        limit,
        sort,
        order,
      },
    });

    setBooks(response.data.data);
    setTotalPages(response.data.totalPages);

  } catch (err) {

    console.error(err);
    setError("Unable to connect to the server.");

  } finally {

    setLoading(false);

  }
};

useEffect(() => {
  const timer = setTimeout(() => {
    fetchBooks();
  },1000);

  return () => clearTimeout(timer);
}, [search, page, sort, order]);

  // Search when button is clicked
  const handleSearch = () => {
    fetchBooks();
  };

  // Refresh
  const handleRefresh = () => {
  setSearch("");
  setPage(1);
  setSort("createdAt");
  setOrder("desc");
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

    toast.success("Book Deleted Successfully");
  } catch (error) {
    console.error(error);
    toast.error("Failed to delete book");
  }
};
const handleAddToCart = async (book) => {
  try {

    await API.post("/cart", {
      bookId: book._id,
    });

    toast.success(` ${book.title} added to cart`);

  } catch (error) {

    console.error(error);

    toast.error("Failed to add book to cart");

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

        <select
    value={sort}
    onChange={(e) => setSort(e.target.value)}
>

    <option value="createdAt">Newest</option>

    <option value="title">Title</option>

    <option value="price">Price</option>

</select>

<select
    value={order}
    onChange={(e) => setOrder(e.target.value)}
>

    <option value="asc">
        Ascending
    </option>

    <option value="desc">
        Descending
    </option>

</select>

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
                onAddToCart={() => handleAddToCart(book)}
              />
                
              ))}

          </div>
          <div className="pagination">

            <button
            disabled={page===1}
            onClick={()=>setPage(page-1)}
            >
            Previous
            </button>

            <span>
            Page {page} of {totalPages}
            </span>

            <button
            disabled={page===totalPages}
            onClick={()=>setPage(page+1)}
            >
            Next
            </button>

          </div>

          <BookTable books={books} />
        </>
      )}

    </div>
  );
}

export default Books;