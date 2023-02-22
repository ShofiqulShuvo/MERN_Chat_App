const createError = require("http-errors");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");

const sendMessage = async (req, res, next) => {
  const { content, chatId } = req.body;

  if ((!content, !chatId)) {
    res.status(400);
    next(createError("Invalid data"));
  } else {
    const newMessage = {
      sender: req.user._id,
      content: content,
      chat: chatId,
    };

    try {
      let message = await Message.create(newMessage);

      message = await message.populate("sender", "name email picture");

      message = await message.populate("chat");

      message = await User.populate(message, {
        path: "chat.users",
        select: "name email picture",
      });

      await Chat.findByIdAndUpdate(chatId, {
        latestMessage: message,
      });

      res.status(200).json(message);
    } catch (error) {
      res.status(500);
      next(createError(error));
    }
  }
};

const getMessages = async (req, res, next) => {
  const chatId = req.params.chatId;

  if (!chatId) {
    res.status(400);
    next(createError("invalid request"));
  } else {
    try {
      const messages = await Message.find({ chat: chatId })
        .populate("sender", "name email picture")
        .populate("chat");

      if (messages) {
        res.status(200).json(messages);
      } else {
        res.status(400);
        next(createError("Not found messages"));
      }
    } catch (error) {
      res.status(500);
      next(createError(error));
    }
  }
};

module.exports = {
  sendMessage,
  getMessages,
};
