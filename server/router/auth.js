const express = require("express");
const { add, get } = require("../data/user");
const router = express.Router();
const { googleCallbackHandler } = require("../controllers/authController");
const bcrypt = require("bcrypt");
const { isValidPassword } = require("../util/auth");
const crypto = require("crypto");
const User = require("../models/userModel");
const { createJSONToken } = require("../util/auth");
const RefreshToken = require("../models/refreshTokenModel");
const passport = require("passport");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/signup", async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;
    let errors = {};
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already in use" });
    }

    const createdUser = new User({
      userName: fullName,
      email,
      passwordHash: await bcrypt.hash(password, 10),
      role: "patient",
      authProviders: { local: true },
    });

    await createdUser.save();

    const authToken = createJSONToken(createdUser._id);
    const refreshToken = crypto.randomBytes(40).toString("hex");

    const _RefreshToken = new RefreshToken({
      userId: createdUser._id,
      token: refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    await _RefreshToken.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "User Created Successfully.",
      user: {
        id: createdUser._id,
        userName: createdUser.userName,
        email: createdUser.email,
        role: createdUser.role,
      },
      token: authToken,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "No such user exists." });
    }
    if (!password) {
      return res.status(400).json({ message: "Password is required." });
    }

    const pwIsValid = await isValidPassword(password, user.passwordHash);

    if (!pwIsValid) {
      return res.status(422).json({
        message: "Invalid Credentials.",
        errors: { credentials: "Invalid email or Password" },
      });
    }

    await RefreshToken.updateMany(
      { userId: user._id, revoked: false },
      {
        revoked: true,
      },
    );

    const refreshToken = crypto.randomBytes(40).toString("hex");

    const refreshTokenDocument = new RefreshToken({
      userId: user._id,
      token: refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    await refreshTokenDocument.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const token = createJSONToken(user._id);
    const returnUser = {
      userName: user.userName,
      email: user.email,
    };
    res.json({ token: token, user: returnUser });
  } catch (error) {
    next(error);
  }
});

router.post("/refresh", async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken)
    return res.status(401).json({
      message: "Not Authorized.",
    });

  const tokenDoc = await RefreshToken.findOne({
    token: refreshToken,
    revoked: false,
  });

  if (!tokenDoc) return res.status(403).json({ message: "Forbidden" });

  const user = await User.findById(tokenDoc.userId);
  if (!user) return res.status(401).json({ message: "User not found" });
  const newAccessToken = createJSONToken(user._id);

  res.json({ token: newAccessToken });
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  googleCallbackHandler,
);

router.get("/me", authMiddleware, async (req, res, next) => {
  res.json({
    user: {
      id: req.user._id,
      userName: req.user.userName,
      email: req.user.email,
      role: req.user.role,
    },
  });
});

module.exports = router;
