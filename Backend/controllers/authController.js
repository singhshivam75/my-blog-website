const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateToken = (user) => {
  const secret = process.env.JWT_SECRET || "default_secret";
  return jwt.sign(
    { userId: user._id, email: user.email },
    secret,
    { expiresIn: "1h" }
  );
};

const signup = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        status: "error",
        message: "Email is already in use",
        data: null
      });
    }

    // const existingUsername = await User.findOne({ username });
    // if (existingUsername) {
    //   return res.status(409).json({ message: "Username is already taken" });
    // }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      username,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Signup successful",
      status: "success",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Signup failed",
      error: err.message || "Internal server error",
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "Invalid email or password"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        status: "error",
        message: "Invalid email or password"
      });
    }

    const token = generateToken(user);

    res.status(200).json({
      message: "Login successful",
      status: "success",
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({
      status: "success",
      message: "Login failed",
      error: err.message || "Internal server error",
    });
  }
};

module.exports = { signup, login };


// message
// status
// data