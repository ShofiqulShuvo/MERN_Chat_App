const express = require("express");
const router = express.Router();

const authUser = require("../middlewares/authUser");
const {
  createChat,
  getChat,
  createGroupChat,
  renameGroupChat,
  addToGroup,
  removeFromGroup,
} = require("../controlers/chatControlers");

// craete chat
router.post("/", authUser, createChat);

// get chat
router.get("/", authUser, getChat);

// create group chat
router.post("/group", authUser, createGroupChat);

// rename group chat
router.put("/group/rename", authUser, renameGroupChat);

// add to group
router.put("/group/add", authUser, addToGroup);

// remove from group
router.put("/group/remove", authUser, removeFromGroup);

module.exports = router;
