const rateLimit = require("express-rate-limit");
const { ApiError } = require("../lib/class.lib.js");

const limiter = rateLimit({
  windowMs: 1000, // 1 second
  limit: 500, // Limit each IP to 100 requests per minute.
  standardHeaders: "draft-7",
  legacyHeaders: false,
  keyGenerator: (req, res) => {
    return req.clientIp; // IP address from requestIp.mw(), as opposed to req.ip
  },
  handler: (_, __, ___, options) => {
    throw new ApiError(
      options.statusCode || 500,
      `There are too many requests. You are only allowed ${
        options.limit
      } requests per ${options.windowMs / 60000} minutes`
    );
  },
});

module.exports = limiter;
