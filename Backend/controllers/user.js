const User = require("../models/userModel");

async function user(req, res) {

  try {

    if (!req.user) {

      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const userData = await User.findById(
     req.user._id
    ).populate("bookmarks");

    if (!userData) {

      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user: userData,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = user;