import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import bookRoutes from "./routes/bookRoutes.js";

dotenv.config();

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());              // Enable CORS
app.use(express.json());

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