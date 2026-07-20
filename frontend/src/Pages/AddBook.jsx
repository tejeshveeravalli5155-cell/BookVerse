import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./AddBook.css";
import { toast } from "react-toastify";

function AddBook() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title || !author || !price) {
      toast.warning("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      await API.post("/books", {
        title,
        author,
        price: Number(price),
        image,
      });

      toast.success("Book Added Successfully");

      navigate("/books");

    } catch (error) {
      console.error(error);
      toast.error("Failed to add book");

    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="add-book-container">
      <h1>Add New Book</h1>

      <form
        className="add-book-form"
        onSubmit={handleSubmit}
      >

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
          type="url"
          placeholder="Book Image URL (Optional)"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Book"}
        </button>

      </form>
    </div>
  );
}

export default AddBook;