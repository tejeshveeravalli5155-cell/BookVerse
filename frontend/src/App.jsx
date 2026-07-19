import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";

import Home from "./Pages/Home";
import About from "./Pages/About";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Books from "./Pages/Books";

import Dashboard from "./Pages/Dashboard";
import Overview from "./Pages/Dashboard/Overview";
import Profile from "./Pages/Dashboard/Profile";
import Settings from "./Pages/Dashboard/Settings";

import ProtectedRoute from "./components/ProtectedRoute";

import Details from "./Pages/Details";
import AddBook from "./Pages/AddBook";
import EditBook from "./Pages/EditBook";
import ReadBook from "./Pages/ReadBook";
import NotFound from "./Pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        {/* Home */}
        <Route index element={<Home />} />

        {/* Public Pages */}
        <Route path="about" element={<About />} />
        <Route path="books" element={<Books />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* Book Pages */}
        <Route path="add-book" element={<AddBook />} />
        <Route path="details/:id" element={<Details />} />
        <Route path="edit-book/:id" element={<EditBook />} />
        <Route path="read/:id" element={<ReadBook />} />

        {/* Protected Dashboard */}
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<Overview />} />
          <Route path="overview" element={<Overview />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>

      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;