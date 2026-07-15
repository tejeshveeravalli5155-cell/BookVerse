import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Breadcrumbs from "../Breadcrumbs";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

function Layout() {
  return (
    <>
      <Navbar />
      <Breadcrumbs />

      <main style={{ minHeight: "80vh" }}>
        <Outlet />
      </main>
      <ThemeToggle/>

      <Footer />
    </>
  );
}

export default Layout;