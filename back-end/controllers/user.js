const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../config/index");

/*
    @decs Register new user
    @routes POST /api/auth/register
    @access Public
*/
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({
        status: "Failed",
        message: "Please fill all fields",
      });
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      return res.status(400).json({
        status: "Failed",
        message: "Invalid email address",
      });
    }

    const userAvailable = await User.findOne({ email });
    if (!userAvailable) {
      return res.status(400).json({
        status: "Failed",
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (user) {
      res.status(200).json({
        status: "Success",
        data: { _id: user.id },
      });
    } else {
      res.status(400).json({
        status: "Failed",
        message: "User not created",
      });
    }
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        status: "Failed",
        message: "Email already exists",
      });
    }
    res.status(500).json({ status: "Failed", message: err.message });
  }
};

/*
  @desc Login the registered user
  @routes POST /api/auth/login
  @access Public
*/
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  console.log("Email:", email); // Add this line to debug
  console.log("Password:", password); // Add this line to debug

  try {
    const user = await User.findOne({ email }).select("+password"); // Select the password field
    if (!user) {
      return res.status(400).json({
        status: "Failed",
        message: "User not found",
      });
    }

    console.log("User found:", user); // Add this line to debug
    console.log("User password:", user.password); // Add this line to debug

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        status: "Failed",
        message: "Invalid credentials",
      });
    }

    console.log("Generating jwt token...");

    // Generate JWT
    const token = jwt.sign(
      {
        email: user.email,
        id: user._id,
      },
      JWT_SECRET, // Ensure JWT_SECRET is correctly passed here
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      status: "Success",
      token: token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "Failed", message: err.message });
  }
};

/*
  @desc Get user profile
  @routes GET /api/auth/profile
  @access Private
*/
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ status: "Failed", message: "User not found" });
    }
    res.status(200).json({ status: "Success", data: user });
  } catch (err) {
    res.status(500).json({ status: "Failed", message: err.message });
  }
};

module.exports = { registerUser, loginUser, getUserProfile };
