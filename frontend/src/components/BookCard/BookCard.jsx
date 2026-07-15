import "./BookCard.css";
import Button from "../Button/Button";
import { Link } from "react-router-dom";

function BookCard({
  id,
  title,
  author,
  price,
  image,
  favorite,
  onFavorite,
  onDelete,
  isLocal,
}) {

  function saveRecentlyViewed() {

    let recent =
      JSON.parse(localStorage.getItem("recentBooks")) || [];

    recent = recent.filter((book) => book.id !== id);

    recent.unshift({
      id,
      title,
      author,
      image,
    });

    recent = recent.slice(0, 5);

    localStorage.setItem(
      "recentBooks",
      JSON.stringify(recent)
    );
  }

  return (
    <div className="book-card">

      <img
        src={image}
        alt={title}
      />

      <div className="book-content">

        <h3>{title}</h3>

        <p>
          <strong>Author:</strong> {author}
        </p>

        <h4>{price}</h4>

      </div>

      <div className="button-group">

        <Button text="Buy Now" />

        <Link
          to={`/details/${id}`}
          onClick={saveRecentlyViewed}
        >
          <button className="view-btn">
            View Details
          </button>
        </Link>

        {isLocal && (
          <Link to={`/edit-book/${id}`}>
            <button className="edit-btn">
              ✏ Edit
             </button>
          </Link>
        )}

        <button
          className="favorite-btn"
          onClick={onFavorite}
        >
          {favorite ? "❤️" : "🤍"}
        </button>

        <button
          className="delete-btn"
          onClick={onDelete}
        >
          Delete
        </button>

      </div>

    </div>
  );
}

export default BookCard;