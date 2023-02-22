const express = require("express");
const router = express.Router();

const { sendMessage, getMessages } = require("../controlers/messageControler");
const authUser = require("../middlewares/authUser");

router.post("/", authUser, sendMessage);

router.get("/:chatId", authUser, getMessages);

module.exports = router;
