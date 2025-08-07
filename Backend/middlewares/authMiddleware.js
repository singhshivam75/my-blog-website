const Joi = require("joi");

const otpSignupSchema = Joi.object({
  email: Joi.string().email().required(),
  otp: Joi.string().length(6).pattern(/^[0-9]+$/).required().messages({
    "string.pattern.base": "OTP must be a 6-digit number.",
    "string.length": "OTP must be exactly 6 digits.",
  }),
  username: Joi.string().min(3).max(50).required(),
  password: Joi.string().min(6).max(20).required(),
}).unknown(false);

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
}).unknown(false);

const validateOtpSignup = (req, res, next) => {
  const { error } = otpSignupSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: "Validation error",
      detail: error.details[0].message,
    });
  }
  next();
};

const validateLogin = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: "Validation error",
      detail: error.details[0].message,
    });
  }
  next();
};

module.exports = { validateOtpSignup, validateLogin };
