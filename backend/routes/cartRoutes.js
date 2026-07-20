import express from "express";

import {
  getCart,
  addToCart,
  updateCart,
  deleteCartItem,
  clearCart,
} from "../controllers/cartController.js";

const router = express.Router();

// Get all cart items
router.get("/", getCart);

// Add book to cart
router.post("/", addToCart);

// Update quantity
router.put("/:id", updateCart);

// Delete one cart item
router.delete("/:id", deleteCartItem);

// Clear entire cart
router.delete("/", clearCart);

export default router;