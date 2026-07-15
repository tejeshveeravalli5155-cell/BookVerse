import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddBook.css";

function AddBook() {

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [image, setImage] = useState("");

  function handleSubmit(e) {

    e.preventDefault();

    if (
      title.trim() === "" ||
      author.trim() === "" ||
      year.trim() === ""
    ) {
      alert("Please fill all fields.");
      return;
    }

    const newBook = {
      key: Date.now().toString(),
      title,
      author,
      first_publish_year: year,
      cover: image
        ? image
        : "https://via.placeholder.com/180x250?text=No+Cover",
    };

    const oldBooks =
      JSON.parse(localStorage.getItem("myBooks")) || [];

    oldBooks.unshift(newBook);

    localStorage.setItem(
      "myBooks",
      JSON.stringify(oldBooks)
    );

    alert("Book Added Successfully!");

    navigate("/books");

  }
    return (
    <div className="add-book-container">

      <h1>Add New Book</h1>

      <form onSubmit={handleSubmit} className="add-book-form">

        <input
          type="text"
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Author Name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        <input
          type="number"
          placeholder="Published Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />

        <input
          type="text"
          placeholder="Book Image URL (Optional)"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <button type="submit">
          Add Book
        </button>

      </form>

    </div>
  );
}

export default AddBook;