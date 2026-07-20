import express from "express";

import {
  placeOrder,
  getOrders,
  getOrderById,
  deleteOrder,
} from "../controllers/orderController.js";

const router = express.Router();

// Place Order
router.post("/", placeOrder);

// Get All Orders
router.get("/", getOrders);

// Get Order By ID
router.get("/:id", getOrderById);

// Delete Order
router.delete("/:id", deleteOrder);

export default router;