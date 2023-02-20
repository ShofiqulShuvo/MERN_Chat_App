const express = require("express");
const {
  loginUser,
  signupUser,
  getUsers,
} = require("../controlers/userControlers");

const authUser = require("../middlewares/authUser");
const { singleUpload } = require("../middlewares/imageUpload");

const router = express.Router();

// search user
router.get("/", authUser, getUsers);

// login
router.post("/login", loginUser);

// signup
router.post("/signup", singleUpload("image"), signupUser);

module.exports = router;
