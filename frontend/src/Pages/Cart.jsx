import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import "./Cart.css";
import { toast } from "react-toastify";

function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCart();
  }, []);

  // Fetch Cart Items
  const fetchCart = async () => {
    try {
      const response = await API.get("/cart");
      setCart(response.data.data);
    } catch (error) {
      console.error(error);
    toast.error("Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  // Update Quantity
  const updateQuantity = async (item, quantity) => {
    try {
      await API.put(`/cart/${item._id}`, {
        quantity,
      });

      fetchCart();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update quantity");
    }
  };

  // Remove Item
  const handleRemove = async (id) => {
    const confirmDelete = window.confirm(
      "Remove this book from cart?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/cart/${id}`);
      fetchCart();
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove item");
    }
  };

  // Total Price
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (loading) {
    return (
      <div className="cart-page">
        <h2>Loading Cart...</h2>
      </div>
    );
  }

  return (
    <div className="cart-page">

      <h1> My Cart</h1>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <h2>Your cart is empty.</h2>
          <p>Add some books to start shopping.</p>
        </div>
      ) : (
        <>
          <div className="cart-container">

            {cart.map((item) => (
              <div
                className="cart-card"
                key={item._id}
              >

                <img
                  src={
                    item.image && item.image.trim() !== ""
                      ? item.image
                      : "https://placehold.co/180x250?text=No+Cover"
                  }
                  alt={item.title}
                  className="cart-image"
                />

                <div className="cart-details">

                  <h2>{item.title}</h2>

                  <p>
                    <strong>Author:</strong> {item.author}
                  </p>

                  <p>
                    <strong>Price:</strong> ₹{item.price}
                  </p>

                  <div className="quantity-box">

                    <button
                      onClick={() =>
                        updateQuantity(
                          item,
                          item.quantity - 1
                        )
                      }
                      disabled={item.quantity === 1}
                    >
                      ➖
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        updateQuantity(
                          item,
                          item.quantity + 1
                        )
                      }
                    >
                      ➕
                    </button>

                  </div>

                  <button
                    className="remove-btn"
                    onClick={() =>
                      handleRemove(item._id)
                    }
                  >
                    🗑 Remove
                  </button>

                </div>

              </div>
            ))}

          </div>

          <div className="cart-total">

            <h2>Total : ₹{total}</h2>

            <Link to="/checkout">
              <button className="checkout-btn">
                Proceed to Checkout 
              </button>
            </Link>

          </div>
        </>
      )}

    </div>
  );
}

export default Cart;