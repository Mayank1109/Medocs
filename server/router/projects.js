const express = require("express");
const router = express.Router();
// const mongoose = require("mongoose");

router.get("/", async (req, res) => {
  try {
    console.log("heyyy");
    //   res.json(docs);
    res.status(200).send("Heyy girl!!!");
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
