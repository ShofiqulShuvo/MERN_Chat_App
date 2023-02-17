const express = require("express");
const router = express.Router();

const chats = require("../data/data");

router.get("/", (req, res) => {
  res.status(200).json(chats);
});

router.get("/:id", (req, res) => {
  const chat = chats.find((chat) => chat._id === req.params.id);
  res.status(200).json(chat);
});

module.exports = router;
