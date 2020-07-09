const asyncHandler = require("../middleware/async");
const ApiError = require("../utils/ApiError");
const User = require("../models/User");

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
exports.registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  const token = user.getSignedJwtToken();

  res.status(200).json({ success: true, token });
});

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
exports.loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ApiError("Missing credentials", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ApiError("Invalid credentials", 401));
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return next(new ApiError("Invalid credentials", 401));
  }

  const token = user.getSignedJwtToken();

  res.status(200).json({ success: true, token });
});
