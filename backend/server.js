import path from "path";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";

import bookRoutes from "./routes/bookRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import authRoutes from "./routes/authRoute.js";

dotenv.config();

const app = express();

// ==========================
// Connect MongoDB
// ==========================
connectDB();

// ==========================
// Middleware
// ==========================
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// ==========================
// Serve Uploaded Images
// ==========================
app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "uploads"))
);

// ==========================
// Request Logger
// ==========================
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// ==========================
// Home Route
// ==========================
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "📚 Welcome to BookVerse Backend API",
  });
});

// ==========================
// Routes
// ==========================
app.use("/books", bookRoutes);

app.use("/cart", cartRoutes);

app.use("/orders", orderRoutes);

app.use("/auth", authRoutes);

// ==========================
// 404 Handler
// ==========================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ==========================
// Start Server
// ==========================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});