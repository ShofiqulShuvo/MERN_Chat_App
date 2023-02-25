const express = require("express");
const {
  loginUser,
  signupUser,
  getUsers,
  loginUserToken,
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

// login with token
router.post("/authToken", authUser, loginUserToken);

module.exports = router;
