import express from "express";
import upload from "../middleware/upload.js";
import {
  registerUser,
  loginUser,
} from "../controllers/authController.js";

const router = express.Router();

// Register User
router.post(
  "/register",
  upload.single("image"),
  registerUser
);

// Login User
router.post(
  "/login",
  loginUser
);

export default router;