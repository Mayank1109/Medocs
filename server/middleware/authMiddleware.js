const User = require("../models/userModel");
const { validateJSONToken } = require("../services/authService");

async function authMiddleware(req, res, next) {
  try {
    const token =
      req.headers.authorization?.split(" ")[1] || req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const decoded = validateJSONToken(token);
    const userId = decoded.userId || decoded.email;
    const user = await User.findById(userId).select("-passwordHash");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = authMiddleware;
