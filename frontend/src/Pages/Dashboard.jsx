import { useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {

  useEffect(() => {
    document.title = "BookVerse | Dashboard";
  }, []);

  return (
    <div className="dashboard">

      <h1>📊 Dashboard</h1>

      <div className="dashboard-menu">

        <NavLink
          to="overview"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Overview
        </NavLink>

        <NavLink
          to="profile"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Profile
        </NavLink>

        <NavLink
          to="settings"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Settings
        </NavLink>

      </div>

      <hr />

      <Outlet />

    </div>
  );
}

export default Dashboard;