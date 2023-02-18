const express = require("express");
const {
  loginUser,
  signupUser,
  getSingleUser,
} = require("../controlers/userControlers");
const profilePicUpload = require("../middlewares/profilePicUpload");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("hi");
});

router.get("/:id", getSingleUser);

router.post("/login", loginUser);

router.post("/signup", profilePicUpload, signupUser);

module.exports = router;
