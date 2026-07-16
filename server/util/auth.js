const { sign, verify } = require("jsonwebtoken");
const { compare } = require("bcryptjs");
const { NotAuthError } = require("./errors");
const crypto = require("crypto");
const dotenv = require("dotenv");
const RefreshToken = require("../models/refreshTokenModel");

dotenv.config({ path: "./config.env" });

const API_SECRET = process.env.API_SECRET;

function createJSONToken(userId) {
  return sign({ userId }, API_SECRET, { expiresIn: "1h" });
}

function validateJSONToken(token) {
  return verify(token, API_SECRET);
}

const createAndStoreRefreshToken = async (userID) => {
  const refreshToken = crypto.randomBytes(40).toString("hex");

  const refreshTokenDocument = new RefreshToken({
    userId: userID,
    token: refreshToken,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  await refreshTokenDocument.save();

  return refreshToken;
};

function isValidPassword(password, storedPassword) {
  if (typeof password !== "string" || typeof storedPassword !== "string") {
    return Promise.resolve(false);
  }
  return compare(password, storedPassword);
}

function checkAuthMiddleware(req, res, next) {
  if (req.method === "OPTIONS") {
    return next();
  }
  if (!req.headers.authorization) {
    console.log("NOT AUTH. AUTH HEADER MISSING.");
    return next(new NotAuthError("Not authenticated."));
  }
  const authFragments = req.headers.authorization.split(" ");

  if (authFragments.length !== 2) {
    console.log("NOT AUTH. AUTH HEADER INVALID.");
    return next(new NotAuthError("Not authenticated."));
  }
  const authToken = authFragments[1];
  try {
    const validatedToken = validateJSONToken(authToken);
    req.token = validatedToken;
  } catch (error) {
    console.log("NOT AUTH. TOKEN INVALID.");
    return next(new NotAuthError("Not authenticated."));
  }
  next();
}

exports.createJSONToken = createJSONToken;
exports.validateJSONToken = validateJSONToken;
exports.isValidPassword = isValidPassword;
exports.checkAuth = checkAuthMiddleware;
exports.createAndStoreRefreshToken = createAndStoreRefreshToken;
