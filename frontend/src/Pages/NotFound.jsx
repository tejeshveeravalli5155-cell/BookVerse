import { useEffect } from "react";
import { Link } from "react-router-dom";

function NotFound() {

  useEffect(() => {
    document.title = "404 | Page Not Found";
  }, []);

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "100px"
      }}
    >
      <h1 style={{ fontSize: "80px", color: "red" }}>404</h1>

      <h2>Oops! Page Not Found</h2>

      <p>
        The page you are looking for doesn't exist.
      </p>

      <br />

      <Link to="/">
        <button>
          🏠 Return Home
        </button>
      </Link>

    </div>
  );
}

export default NotFound;