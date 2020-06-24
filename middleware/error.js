const ApiError = require("../utils/ApiError");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message || "Server error";
  error.statusCode = err.statusCode || 500;

  // Mongoose Cast error
  if (error.name === "CastError") {
    error = new ApiError(`Resource not found with ID ${error.value}`, 404);
  }

  // Mongoose duplicate key error
  if (error.code === 11000) {
    error = new ApiError("Duplicate field value entered", 400);
  }

  // Mongoose validation error
  if (error.name === "ValidationError") {
    error = new ApiError(
      Object.values(error.errors).map(e => e.message),
      400
    );
  }

  console.log(`Error: ${error.message}`);
  res.status(error.statusCode).json({ success: false, error: error.message });
};

module.exports = errorHandler;
