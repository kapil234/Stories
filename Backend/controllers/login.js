const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email) {
      throw new Error("Please provide email");
    }

    if (!password) {
      throw new Error("Please provide password");
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    const checkPassword = await bcrypt.compare(
      password,
      user.password
    );

    if (!checkPassword) {
      throw new Error("Invalid password");
    }

    const tokenData = {
      _id: user._id,
      email: user.email,
    };

    const token = jwt.sign(
      tokenData,
      process.env.TOKEN_SECRET_KEY,
      { expiresIn: "8h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    res.status(200).json({
      message: "Login successfully",
      success: true,
      error: false,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (err) {
    res.status(400).json({
      message: err.message || "Something went wrong",
      success: false,
      error: true,
    });
  }
}

module.exports = login;