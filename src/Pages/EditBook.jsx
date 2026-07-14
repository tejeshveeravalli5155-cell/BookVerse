import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./AddBook.css";

function EditBook() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {

    const books =
      JSON.parse(localStorage.getItem("myBooks")) || [];

    const book = books.find(
      (item) => item.key === id
    );

    if (book) {
      setTitle(book.title);
      setAuthor(book.author);
      setYear(book.first_publish_year);
      setImage(book.cover);
    }

  }, [id]);

  function handleUpdate(e) {

    e.preventDefault();

    let books =
      JSON.parse(localStorage.getItem("myBooks")) || [];

    books = books.map((book) => {

      if (book.key === id) {

        return {
          ...book,
          title,
          author,
          first_publish_year: year,
          cover: image,
        };

      }

      return book;

    });

    localStorage.setItem(
      "myBooks",
      JSON.stringify(books)
    );

    alert("Book Updated Successfully!");

    navigate("/books");

  }
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
          onChange={(e) =>
            setTitle(e.target.value)
          }
          required
        />

        <input
          type="text"
          placeholder="Author Name"
          value={author}
          onChange={(e) =>
            setAuthor(e.target.value)
          }
          required
        />

        <input
          type="number"
          placeholder="Published Year"
          value={year}
          onChange={(e) =>
            setYear(e.target.value)
          }
          required
        />

        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) =>
            setImage(e.target.value)
          }
        />

        <button type="submit">
          Update Book
        </button>

      </form>

    </div>
  );
}

export default EditBook;