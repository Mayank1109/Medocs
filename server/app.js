const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require("./config/passport");
const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(passport.initialize());

const home = require("./router/projects");
const dashboard = require("./router/dashBoard");
const authRoutes = require("./router/auth");

app.use("/", home);
app.use("/dashboard", dashboard);
app.use("/auth", authRoutes);
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
  .then(() => {
    console.log("MongoDB Connected....");
  })
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("HELLO Project Medocs!!");
});

module.exports = app;
