const express = require("express");
const User = require("../models/user");

const router = express.Router();

// Register route
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(200).json("User registered successfully");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json("User not found");

    if (user.password !== password)
      return res.status(401).json("Invalid password");

    res.status(200).json("Login successful");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
