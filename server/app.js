const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require("./config/passport");
const mongoSanitize = require("express-mongo-sanitize");

const app = express();
app.set("trust proxy", 1);
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());
app.use(cookieParser());
app.use(passport.initialize());

const home = require("./router/projects.routes");
const dashboard = require("./router/dashBoard");
const aiRoutes = require("./router/ai.routes");
const authRoutes = require("./router/auth.routes");
const profileRoutes = require("./router/profile.routes");
const notificationRoutes = require("./router/notifications.routes");

app.use("/", home);
app.use("/dashboard", dashboard);
app.use("/dashboard", aiRoutes);
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);
app.use("/notifications", notificationRoutes);

app.use((error, req, res, next) => {
  if (error.code === "LIMIT_FILE_SIZE") {
    return res
      .status(413)
      .json({ message: "File exceeds the upload size limit." });
  }

  const status = error.status || 500;
  const message = error.message || "Something went wrong.";
  res.status(status).json({ message: message });
});

mongoose.Promise = global.Promise;
const db = process.env.MONGODB_URL;

mongoose
  .connect(db)
  .then(() => {})
  .catch((err) => console.error(err));

app.get("/", (req, res) => {
  res.send("HELLO Project Medocs!!");
});

module.exports = app;
