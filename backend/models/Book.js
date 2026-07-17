import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Book title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters"],
      maxlength: [100, "Title cannot exceed 100 characters"],
      unique: true,
    },

    author: {
      type: String,
      required: [true, "Author name is required"],
      trim: true,
      minlength: [3, "Author name must be at least 3 characters"],
      maxlength: [50, "Author name cannot exceed 50 characters"],
    },

    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [1, "Price must be greater than 0"],
      max: [10000, "Price cannot exceed 10000"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Book", bookSchema);