import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Navbar.css";

function Navbar() {

  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(() => {
  try {
    return JSON.parse(localStorage.getItem("theme")) || false;
  } catch {
    return false;
  }
});

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Books", path: "/books" },
  { name: "Add Book", path: "/add-book" },
  { name: "Dashboard", path: "/dashboard" },
  { name: "Login", path: "/login" },
  { name: "Register", path: "/register" },
];
  useEffect(() => {

    localStorage.setItem(
      "theme",
      JSON.stringify(darkMode)
    );

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

    sessionStorage.clear();

    alert("Logged out Successfully!");

    navigate("/login");

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

      </ul>

      <div className="nav-buttons">

        <button onClick={toggleTheme}>
          {darkMode ? "☀ Light" : "🌙 Dark"}
        </button>

        <button onClick={logout}>
          Logout
        </button>

      </div>

    </nav>

  );

}

export default Navbar;