import { useEffect, useState } from "react";
import API from "../services/api";
import "./Orders.css";
import { toast } from "react-toastify";

function Orders() {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {

      const response = await API.get("/orders");

      setOrders(response.data.data);

    } catch (error) {

      console.error(error);

      alert("Failed to load orders.");

    } finally {

      setLoading(false);

    }
  };

  const deleteOrder = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this order?"
    );

    if (!confirmDelete) return;

    try {

      await API.delete(`/orders/${id}`);

      fetchOrders();

    } catch (error) {

      console.error(error);

      alert("Failed to delete order.");

    }
  };

  if (loading) {
    return <h2>Loading Orders...</h2>;
  }

  return (
    <div className="orders-page">

      <h1>📦 My Orders</h1>

      {orders.length === 0 ? (
        <h2>No Orders Found</h2>
      ) : (

        orders.map((order) => (

          <div
            key={order._id}
            className="order-card"
          >

            <h2>{order.customerName}</h2>

            <p>
              <strong>Phone:</strong> {order.phone}
            </p>

            <p>
              <strong>Address:</strong> {order.address}
            </p>

            <p>
              <strong>Payment:</strong> {order.payment}
            </p>

            <p>
              <strong>Status:</strong> {order.status}
            </p>

            <p>
              <strong>Total:</strong> ₹{order.total}
            </p>

            <h3>Books</h3>

            {order.items.map((book, index) => (

              <div
                className="ordered-book"
                key={index}
              >

                <img
                  src={
                    book.image ||
                    "https://placehold.co/100x140?text=Book"
                  }
                  alt={book.title}
                />

                <div>

                  <h4>{book.title}</h4>

                  <p>{book.author}</p>

                  <p>₹{book.price}</p>

                  <p>Qty : {book.quantity}</p>

                </div>

              </div>

            ))}

            <button
              className="delete-order-btn"
              onClick={() =>
                deleteOrder(order._id)
              }
            >
              🗑 Delete Order
            </button>

          </div>

        ))

      )}

    </div>
  );
}

export default Orders;