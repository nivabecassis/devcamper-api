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
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new ApiError("Not authorized to access this route", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    return next(new ApiError("Not authorized to access this route", 401));
  }
});

// Authorization based on user roles (user, publisher, admin)
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError(
          `User role '${req.user.role}' is not authorized to access this route.`,
          403
        )
      );
    }
    next();
  };
};
