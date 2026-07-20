import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import "./AddBook.css";
import { toast } from "react-toastify";

function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  // Load Book
  useEffect(() => {
    fetchBook();
  }, [id]);

  const fetchBook = async () => {
    try {
      const response = await API.get(`/books/${id}`);

      const book = response.data.data;

      setTitle(book.title);
      setAuthor(book.author);
      setPrice(book.price);
      setImage(book.image || "");

    } catch (error) {
      console.error(error);
      toast.error("Book not found");
      navigate("/books");
    }
  };

  // Update Book
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await API.put(`/books/${id}`, {
        title,
        author,
        price: Number(price),
        image,
      });

      toast.success(" Book Updated Successfully");

      navigate("/books");

    } catch (error) {
      console.error(error);
      toast.error("Failed to update book");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-book-container">

      <form
        className="add-book-form"
        onSubmit={handleUpdate}
      >

        <h2>Edit Book</h2>

        <input
          type="text"
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Author Name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />


        <button
          type="submit"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Book"}
        </button>

      </form>

    </div>
  );
}

export default EditBook;