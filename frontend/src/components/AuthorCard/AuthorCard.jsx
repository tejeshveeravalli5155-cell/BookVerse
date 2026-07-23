import "./AuthorCard.css";

function AuthorCard({ name, image }) {
  return (
    <div className="author-card">
      <img
        src={
          image && image.trim() !== ""
            ? image
            : "https://placehold.co/120x120?text=Author"
        }
        alt={name}
      />

      <h3>{name}</h3>
    </div>
  );
}

export default AuthorCard;