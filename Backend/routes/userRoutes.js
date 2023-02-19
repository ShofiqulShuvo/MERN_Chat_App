const express = require("express");
const {
  loginUser,
  signupUser,
  getUsers,
} = require("../controlers/userControlers");

const authUser = require("../middlewares/authUser");
const profilePicUpload = require("../middlewares/profilePicUpload");

const router = express.Router();

// search user
router.get("/", authUser, getUsers);

// login
router.post("/login", loginUser);

// signup
router.post("/signup", profilePicUpload, signupUser);

module.exports = router;
