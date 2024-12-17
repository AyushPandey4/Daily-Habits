const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const { generateToken, authenticateToken } = require("../middleware/authUser");

// Hash a password
async function hashPassword(plainPassword) {
  const saltRounds = 10; // Higher rounds increase security but take longer
  const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
  // console.log('Hashed Password:', hashedPassword); // debug
  return hashedPassword;
}

// Verify a password
async function verifyPassword(plainPassword, hashedPassword) {
  const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
  // console.log("Password Match:", isMatch); // debug
  return isMatch;
}

// Registration Route
router.post("/registration", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if user already exists
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ error: "User already exists with this email" });
    }

    // Hash password and save user
    const hashedPassword = await hashPassword(password);
    const user = await new userModel({
      username,
      email,
      password: hashedPassword,
    }).save();

    // Generate JWT Token
    const token = generateToken({ id: user._id, email: user.email });

    // Set secure cookie
    res.cookie("authtoken", token);

    res
      .status(201)
      .json({ message: "Registration successful", authtoken: token });
  } catch (error) {
    console.error("Error during registration:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Compare passwords
    const isMatch = await verifyPassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Generate JWT Token
    const token = generateToken({ id: user._id, email: user.email });

    // Set secure cookie
    res.cookie("authtoken", token);

    res.status(200).json({ message: "Login successful", authtoken: token });
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// User Profile (/me) Route
router.get("/me", authenticateToken, async (req, res) => {
  try {
    // console.log(req.user); // debug

    const user = await userModel.findOne({ _id: req.user.id });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ username: user.username, email: user.email });
  } catch (error) {
    console.error("Error in /me route:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
