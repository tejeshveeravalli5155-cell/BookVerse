import express from "express";
import logger from "./middleware/logger.js";
import bookRoutes from "./routes/bookRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

const PORT = 5000;

// Middleware
app.use(express.json());
app.use(logger);

// Home Route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to BookVerse Backend API",
  });
});

// Book Routes
app.use("/books", bookRoutes);

app.use(errorHandler);

// Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});