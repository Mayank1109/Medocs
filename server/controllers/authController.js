const {
  createJSONToken,
  createAndStoreRefreshToken,
  signupUser,
  loginUser,
  refreshUserSession,
  getUserSummary,
} = require("../services/authService");

const signup = async (req, res, next) => {
  try {
    const result = await signupUser(req.body);

    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      path: "/auth/refresh",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "User Created Successfully.",
      user: result.user,
      token: result.token,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await loginUser(req.body);

    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      path: "/auth/refresh",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ token: result.token, user: result.user });
  } catch (error) {
    next(error);
  }
};

const refresh = async (req, res, next) => {
  try {
    const result = await refreshUserSession(req.cookies.refreshToken);

    if (result.status) {
      return res.status(result.status).json({ message: result.message });
    }

    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      path: "/auth/refresh",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ token: result.token });
  } catch (error) {
    next(error);
  }
};

const me = async (req, res) => {
  res.json({
    user: getUserSummary(req.user),
  });
};

const googleCallbackHandler = async (req, res) => {
  try {
    const user = req.user;

    const token = createJSONToken(user._id);
    const refreshToken = await createAndStoreRefreshToken(user._id);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      path: "/auth/refresh",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.redirect(`${process.env.CLIENT_URL}/oauth-success?token=${token}`);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Google login failed" });
  }
};

module.exports = { signup, login, refresh, me, googleCallbackHandler };
