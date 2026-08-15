const crypto = require("crypto");
const { sign, verify } = require("jsonwebtoken");
const { compare, hash } = require("bcryptjs");
const dotenv = require("dotenv");

const User = require("../models/userModel");
const RefreshToken = require("../models/refreshTokenModel");

dotenv.config({ path: "./config.env" });

const API_SECRET = process.env.API_SECRET;

function createJSONToken(userId) {
  return sign({ userId }, API_SECRET, { expiresIn: "1h" });
}

function validateJSONToken(token) {
  return verify(token, API_SECRET);
}

async function createAndStoreRefreshToken(userId) {
  const refreshToken = crypto.randomBytes(40).toString("hex");

  const refreshTokenDocument = new RefreshToken({
    userId,
    token: refreshToken,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  await refreshTokenDocument.save();

  return refreshToken;
}

function isValidPassword(password, storedPassword) {
  if (typeof password !== "string" || typeof storedPassword !== "string") {
    return Promise.resolve(false);
  }
  return compare(password, storedPassword);
}

function getUserSummary(user) {
  return {
    id: user._id,
    userName: user.userName,
    email: user.email,
    role: user.role,
  };
}

async function signupUser({ fullName, email, password }) {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const error = new Error("Email already in use");
    error.status = 409;
    throw error;
  }

  const createdUser = new User({
    userName: fullName,
    email,
    passwordHash: await hash(password, 10),
    role: "patient",
    authProviders: { local: true },
  });

  await createdUser.save();

  const token = createJSONToken(createdUser._id);
  const refreshToken = await createAndStoreRefreshToken(createdUser._id);

  return {
    token,
    refreshToken,
    user: getUserSummary(createdUser),
  };
}

async function loginUser({ email, password }) {
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("No such user exists.");
    error.status = 404;
    throw error;
  }

  if (!password) {
    const error = new Error("Password is required.");
    error.status = 400;
    throw error;
  }

  const pwIsValid = await isValidPassword(password, user.passwordHash);
  if (!pwIsValid) {
    const error = new Error("Invalid Credentials.");
    error.status = 422;
    error.errors = { credentials: "Invalid email or Password" };
    throw error;
  }

  user.lastLogin = new Date();
  await user.save();

  await RefreshToken.updateMany(
    { userId: user._id, revoked: false },
    { revoked: true },
  );

  const refreshToken = await createAndStoreRefreshToken(user._id);
  const token = createJSONToken(user._id);

  return {
    token,
    refreshToken,
    user: {
      userName: user.userName,
      email: user.email,
      role: user.role,
    },
  };
}

async function refreshUserSession(oldRefreshToken) {
  if (!oldRefreshToken) {
    return { status: 401, message: "Not Authorized." };
  }

  const tokenDoc = await RefreshToken.findOne({
    token: oldRefreshToken,
    revoked: false,
  });

  if (!tokenDoc) {
    return { status: 403, message: "Forbidden" };
  }

  if (tokenDoc.expiresAt < new Date()) {
    return { status: 403, message: "Refresh token expired" };
  }

  const user = await User.findById(tokenDoc.userId);
  if (!user) {
    return { status: 401, message: "User not found" };
  }

  tokenDoc.revoked = true;
  await tokenDoc.save();

  const newRefreshToken = await createAndStoreRefreshToken(user._id);
  const newAccessToken = createJSONToken(user._id);

  return {
    token: newAccessToken,
    refreshToken: newRefreshToken,
  };
}

module.exports = {
  createJSONToken,
  validateJSONToken,
  isValidPassword,
  createAndStoreRefreshToken,
  signupUser,
  loginUser,
  refreshUserSession,
  getUserSummary,
};
