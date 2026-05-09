async function Logout(req, res) {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    return res.json({
      message: "Logged out successfully",
      success: true,
      error: false,
    });

  } catch (err) {
    return res.json({
      message: err.message || err,
      success: false,
      error: true,
    });
  }
}


module.exports = Logout;