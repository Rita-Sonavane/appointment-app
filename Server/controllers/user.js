const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const User = require("../models/userModel.js");

dotenv.config();
const SECRET = process.env.SECRET;

const signin = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || user.password !== password) {
    return res.status(401).send("Invalid credentials");
  }
  const token = jwt.sign({ userId: user._id }, SECRET);
  res.json({ token, user });
};

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = new User({ name, email, password });
    await user.save();
    const token = jwt.sign({ userId: user._id }, SECRET);
    res.json({ token });
  } catch (err) {
    res.status(400).send("Error signing up");
  }
};

module.exports = { signin, signup };
