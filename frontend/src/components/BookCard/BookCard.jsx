import "./BookCard.css";
import Button from "../Button/Button";
import { Link } from "react-router-dom";

function BookCard({
  id,
  title,
  author,
  price,
  image,
  onDelete,
}) {
  console.log(image);
  return (
    <div className="book-card">

     <img
  src={
    image && image.trim() !== ""
      ? image
      : "https://placehold.co/180x250?text=No+Cover"
  }
  alt={title}
  className="book-image"
/>

      <div className="book-content">
        <h3>{title}</h3>

        <p>
          <strong>Author:</strong> {author}
        </p>

        <h4>₹{price}</h4>
      </div>

      <div className="button-group">

        <Button text="Buy Now" />

        <Link to={`/details/${id}`}>
          <button className="view-btn">
            View Details
          </button>
        </Link>

        <Link to={`/edit-book/${id}`}>
          <button className="edit-btn">
            ✏ Edit
          </button>
        </Link>

        <button
          className="delete-btn"
          onClick={onDelete}
        >
          🗑 Delete
        </button>
        
<Link to={`/read/${id}`}>
    <button className="read-btn">
        📖 Read Book
    </button>
</Link>

      </div>

    </div>
  );
}

export default BookCard;