import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./Checkout.css";
import { toast } from "react-toastify";

function Checkout() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    address: "",
    payment: "Cash on Delivery",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const placeOrder = async () => {

    if (
      !form.customerName ||
      !form.phone ||
      !form.address
    ) {
      toast.warning("Please fill all fields");
      return;
    }

    try {

      setLoading(true);

      await API.post("/orders", form);

    toast.success(" Order Placed Successfully!");

      navigate("/orders");

    } catch (error) {

      console.error(error);

    toast.error("Failed to place order");

    } finally {

      setLoading(false);

    }

  };

  return (
    <div className="checkout-page">

      <h1>💳 Checkout</h1>

      <div className="checkout-form">

        <input
          type="text"
          name="customerName"
          placeholder="Full Name"
          value={form.customerName}
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
        />

        <textarea
          name="address"
          placeholder="Delivery Address"
          value={form.address}
          onChange={handleChange}
        />

        <select
          name="payment"
          value={form.payment}
          onChange={handleChange}
        >
          <option>Cash on Delivery</option>
          <option>UPI</option>
          <option>Credit Card</option>
          <option>Debit Card</option>
        </select>

        <button
          onClick={placeOrder}
          disabled={loading}
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>

      </div>

    </div>
  );
}

export default Checkout;