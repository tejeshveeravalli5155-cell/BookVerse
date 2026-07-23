import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// ==========================
// REGISTER USER
// ==========================
export const registerUser = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    if (!name || !email || !mobile || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check Duplicate Email
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    // Check Duplicate Mobile
    const existingMobile = await User.findOne({
      mobile,
    });

    if (existingMobile) {
      return res.status(400).json({
        success: false,
        message: "Mobile number already registered",
      });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Image
    const image = req.file
      ? `/uploads/${req.file.filename}`
      : "/uploads/default.png";

    // Create User
    const user = await User.create({
      name,
      email,
      mobile,
      password: hashedPassword,
      image,
    });

    res.status(201).json({
      success: true,
      message: "Registration Successful",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        image: user.image,
      },
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ==========================
// LOGIN USER
// ==========================
export const loginUser = async (req, res) => {
  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required",
      });
    }

    // Find User
    const user = await User.findOne({ email });
    

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Compare Password
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Update Last Login
    user.lastLogin = new Date();
    await user.save();

    // ==========================
    // Generate JWT Token
    // ==========================
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn:
          process.env.JWT_EXPIRES_IN || "7d",
      }
    );

    res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        image: user.image,
        role: user.role,
      },
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
// ==========================
// GET PROFILE
// ==========================
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};