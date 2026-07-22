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

// Connect Database
connectDB();

// Middleware
app.use(cors());              // Enable CORS
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Request Logging Middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Default Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "📚 Welcome to BookVerse Backend API",
  });
});

// Book Routes
app.use("/books", bookRoutes);
// Cart Routes
app.use("/cart", cartRoutes);
// Order Routes
app.use("/orders", orderRoutes);
// Authentication Routes
app.use("/auth", authRoutes);

// Invalid Route Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});