const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

dotenv.config({ path: "./config.env" });

const home = require("./router/projects");
const dashboard = require("./router/dashBoard");
const authRoutes = require("./router/auth");
app.use("/uploads", express.static("uploads"));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

app.use("/", home);
app.use("/dashboard", dashboard);
app.use("/auth", authRoutes);
app.use((error, req, res, next) => {
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
