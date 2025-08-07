const express = require("express");
const {
  // signup,
  login,
  sendOtp,
  verifyOtpAndSignup
} = require("../controllers/authController");

const {
  validateOtpSignup,
  validateLogin
} = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/send-otp", sendOtp); 
router.post("/verify-otp", validateOtpSignup, verifyOtpAndSignup); 

// router.post("/signup", validateSignup, signup); 
router.post("/login", validateLogin, login);

module.exports = router;