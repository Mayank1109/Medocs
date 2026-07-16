const { createJSONToken, createAndStoreRefreshToken } = require("../util/auth");

const googleCallbackHandler = async (req, res) => {
  try {
    const user = req.user;

    const token = createJSONToken(user._id);

    const refreshToken = await createAndStoreRefreshToken(user._id);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none", // if frontend + backend on different domains
      path: "/auth/refresh",
    });

    res.redirect(`${process.env.CLIENT_URL}/oauth-success?token=${token}`);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Google login failed" });
  }
};

module.exports = { googleCallbackHandler };
