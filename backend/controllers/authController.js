import bcrypt from "bcrypt";
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

    // Image Path
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
        mobile: user.mobile,
        email: user.email,
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

    // Generic Error Message
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

    res.status(200).json({
      success: true,
      message: "Login Successful",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
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