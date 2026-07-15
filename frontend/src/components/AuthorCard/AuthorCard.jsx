import "./AuthorCard.css";

function AuthorCard({ name }) {
  return (
    <div className="author-card">
      <img
        src="https://via.placeholder.com/120"
        alt={name}
      />

      <h3>{name}</h3>
    </div>
  );
}

export default AuthorCard;