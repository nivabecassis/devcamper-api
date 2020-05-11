const ApiError = require("../utils/ApiError");

const errorHandler = (err, req, res, next) => {
  console.log(err.stack.red);

  let error = { ...err };

  error.message = err.message || "Server error";
  if (error.name === "CastError") {
    error = new ApiError(`Resource not found with ID ${error.value}`, 404);
  }

  res
    .status(error.statusCode || 500)
    .json({ success: false, error: error.message });
};

module.exports = errorHandler;
