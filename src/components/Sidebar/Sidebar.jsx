import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">

      <NavLink to="/">🏠 Home</NavLink>

      <NavLink to="/books">📚 Books</NavLink>

      <NavLink to="/dashboard">📊 Dashboard</NavLink>

      <NavLink to="/about">ℹ About</NavLink>

    </div>
  );
}

export default Sidebar;