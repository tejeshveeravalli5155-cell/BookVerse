import { useEffect, useState } from "react";
import API from "../../services/api";
import "./Overview.css";

function Overview() {
  const [stats, setStats] = useState({
    books: 0,
    cart: 0,
    orders: 0,
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [booksRes, cartRes, ordersRes] = await Promise.all([
        API.get("/books"),
        API.get("/cart"),
        API.get("/orders"),
      ]);

      setStats({
        books: booksRes.data.data.length,
        cart: cartRes.data.data.length,
        orders: ordersRes.data.data.length,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="overview">

      <h1>📊 Dashboard</h1>

      <div className="dashboard-cards">

        <div className="dashboard-card books">
          <h2>📚</h2>
          <h3>{stats.books}</h3>
          <p>Total Books</p>
        </div>

        <div className="dashboard-card cart">
          <h2>🛒</h2>
          <h3>{stats.cart}</h3>
          <p>Cart Items</p>
        </div>

        <div className="dashboard-card orders">
          <h2>📦</h2>
          <h3>{stats.orders}</h3>
          <p>Total Orders</p>
        </div>

      </div>

    </div>
  );
}

export default Overview;