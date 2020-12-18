const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function (req, res, next) {
  try {
    const token = req.header("x-auth-token");

    // Check if not token
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token, authorization denied",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.jwtSecret);

    req.shop = decoded.shop;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Please log out and login again",
    });
  }
};
