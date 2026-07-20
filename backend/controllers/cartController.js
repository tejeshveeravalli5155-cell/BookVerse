import Cart from "../models/Cart.js";
import Book from "../models/Book.js";

// ==========================
// GET ALL CART ITEMS
// ==========================
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.find();

    res.status(200).json({
      success: true,
      count: cart.length,
      data: cart,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ==========================
// ADD TO CART
// ==========================
export const addToCart = async (req, res) => {
  try {

    const { bookId } = req.body;

    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    const existingItem = await Cart.findOne({
      book: bookId,
    });

    if (existingItem) {

      existingItem.quantity += 1;

      await existingItem.save();

      return res.status(200).json({
        success: true,
        message: "Quantity Updated",
        data: existingItem,
      });
    }

    const cartItem = await Cart.create({
      book: book._id,
      title: book.title,
      author: book.author,
      price: book.price,
      image: book.image,
      quantity: 1,
    });

    res.status(201).json({
      success: true,
      message: "Book Added To Cart",
      data: cartItem,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ==========================
// UPDATE QUANTITY
// ==========================
export const updateCart = async (req, res) => {
  try {

    const { quantity } = req.body;

    const item = await Cart.findByIdAndUpdate(
      req.params.id,
      { quantity },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Cart Item Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Cart Updated",
      data: item,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ==========================
// DELETE CART ITEM
// ==========================
export const deleteCartItem = async (req, res) => {
  try {

    const item = await Cart.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Item Removed From Cart",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ==========================
// CLEAR CART
// ==========================
export const clearCart = async (req, res) => {
  try {

    await Cart.deleteMany();

    res.status(200).json({
      success: true,
      message: "Cart Cleared",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};