const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

async function auth(req, res, next) {
  try {

    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        message: "Please login first",
        success: false,
        error: true,
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.TOKEN_SECRET_KEY
    );

    const user = await User.findById(decoded._id);

    if (!user) {
      return res.status(401).json({
        message: "User not found",
        success: false,
        error: true,
      });
    }

    req.user = user;
    req.userId = user._id;

    next();

  } catch (err) {

    return res.status(401).json({
      message: "Invalid or expired token",
      success: false,
      error: true,
    });
  }
}

module.exports = auth;