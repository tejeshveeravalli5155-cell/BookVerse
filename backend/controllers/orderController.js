import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

// ==========================
// PLACE ORDER
// ==========================
export const placeOrder = async (req, res) => {
  try {
    const { customerName, phone, address, payment } = req.body;

    // Get all cart items
    const cartItems = await Cart.find();

    if (cartItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    // Calculate total
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // Create order
    const order = await Order.create({
      customerName,
      phone,
      address,
      payment,
      items: cartItems.map((item) => ({
        title: item.title,
        author: item.author,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
      })),
      total,
    });

    // Clear cart after successful order
    await Cart.deleteMany();

    res.status(201).json({
      success: true,
      message: "Order Placed Successfully",
      data: order,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ==========================
// GET ALL ORDERS
// ==========================
export const getOrders = async (req, res) => {
  try {

    const orders = await Order.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ==========================
// GET ORDER BY ID
// ==========================
export const getOrderById = async (req, res) => {
  try {

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ==========================
// DELETE ORDER
// ==========================
export const deleteOrder = async (req, res) => {
  try {

    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order Deleted Successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};