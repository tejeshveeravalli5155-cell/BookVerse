import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  // Logged-in User
  const user =
    JSON.parse(localStorage.getItem("user")) ||
    JSON.parse(sessionStorage.getItem("user"));

    

  const [darkMode, setDarkMode] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("theme")) || false;
    } catch {
      return false;
    }
  });


const isAdmin = user?.role === "admin";

// Navigation Items
const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Books", path: "/books" },
  { name: "Cart", path: "/cart" },
  { name: "Dashboard", path: "/dashboard" },

  ...(isAdmin
    ? [{ name: "Add Book", path: "/add-book" }]
    : []),
];

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(darkMode));

    if (darkMode) {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
  }, [darkMode]);

  function toggleTheme() {
    setDarkMode(!darkMode);
  }

  function logout() {
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");

    toast.success("Logged out Successfully");

    navigate("/login");

    window.location.reload();
  }

  return (
    <nav className="navbar">

      <h2>📚 BookVerse</h2>

      <ul>

        {navItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive ? "active-link" : ""
              }
            >
              {item.name}
            </NavLink>
          </li>
        ))}

        {!user && (
          <>
            <li>
              <NavLink to="/login">
                Login
              </NavLink>
            </li>

            <li>
              <NavLink to="/register">
                Register
              </NavLink>
            </li>
          </>
        )}

      </ul>

      <div className="nav-buttons">

        {user && (
          <div className="user-info">

            <img
              src={`http://localhost:5000${user.image}`}
              alt={user.name}
              className="user-avatar"
            />

            <div>

              <p>{user.name}</p>

              <small>{user.email}</small>

            </div>

          </div>
        )}

        <button onClick={toggleTheme}>
          {darkMode ? "☀ Light" : "🌙 Dark"}
        </button>

        {user && (
          <button onClick={logout}>
            Logout
          </button>
        )}

      </div>

    </nav>
  );
}

export default Navbar;