const jwt = require("jsonwebtoken");
const User = require("../models/User");
const asyncHandler = require("./async");
const ApiError = require("../utils/ApiError");

exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.hearders.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new ApiError("Not authorized to access this route", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);

    req.user = await User.findById(token);

    next();
  } catch (err) {
    return next(new ApiError("Not authorized to access this route", 401));
  }
});
