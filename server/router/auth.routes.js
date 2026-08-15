const express = require("express");
const router = express.Router();
const passport = require("passport");
const authMiddleware = require("../middleware/authMiddleware");
const { authLimiter, refreshLimiter } = require("../middleware/rateLimiters");
const {
  signup,
  login,
  refresh,
  me,
  googleCallbackHandler,
} = require("../controllers/authController");

router.post("/signup", authLimiter, signup);
router.post("/login", authLimiter, login);
router.post("/refresh", refreshLimiter, refresh);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  googleCallbackHandler,
);

router.get("/me", authMiddleware, me);

module.exports = router;
