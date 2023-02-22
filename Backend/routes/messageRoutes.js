const express = require("express");
const router = express.Router();

const { sendMessage, getMessages } = require("../controlers/messageControler");
const authUser = require("../middlewares/authUser");
const { multipleUpload } = require("../middlewares/imageUpload");

router.post("/", authUser, multipleUpload("images", 4), sendMessage);

router.get("/:chatId", authUser, getMessages);

module.exports = router;
