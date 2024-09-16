const { ApiError } = require('../lib/class.lib.js')

function errorHandler(err, req, res, next) {

  let error = err;

  if (!(error instanceof ApiError)) {
    const statusCode = error?.statusCode ? 400 : 500;
    const message = error.message || "Something went wrong";
    error = new ApiError(statusCode, message, error?.errors || [], err.stack);
  }

  const response = {
    ...error,
    message: error.message,
    ...(process.env.NODE_ENV === "development" ? { stack: error.stack } : {}), // Error stack traces should be visible in development for debugging
  };

  res.status(error.statusCode).json(response);
}

module.exports = errorHandler
