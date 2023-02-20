const Chat = require("../models/chatModel");
const User = require("../models/userModel");
const createError = require("http-errors");

// create Chat
const createChat = async (req, res, next) => {
  const { userID } = req.body;

  if (!userID) {
    res.status(400);
    next(createError("user not found"));
  } else {
    let isChat = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user._id } } },
        { users: { $elemMatch: { $eq: userID } } },
      ],
    })
      .populate("users", "name picture email")
      .populate("latestMessage");

    isChat = await User.populate(isChat, {
      path: "latestMessage.sender",
      select: "name picture email",
    });

    if (isChat.length > 0) {
      res.send(isChat[0]);
    } else {
      const chatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [req.user._id, userID],
      };

      try {
        const createChat = await Chat.create(chatData);

        const FullChat = await Chat.findOne({ _id: createChat._id }).populate(
          "users",
          "name picture email"
        );

        res.status(200).send(FullChat);
      } catch (error) {
        res.status(500);
        next(createError(error));
      }
    }
  }
};

// get Chat
const getChat = async (req, res, next) => {
  try {
    let chats = await Chat.find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 });

    chats = await User.populate(chats, {
      path: "latestMessage.sender",
      select: "name picture email",
    });

    res.status(200).send(chats);
  } catch (error) {
    res.status(500);
    next(createError(error));
  }
};

// create group chat
const createGroupChat = async (req, res, next) => {
  if (!req.body.users || !req.body.name) {
    res.status(400);
    next(createError("please fill all the field"));
  } else {
    let users = JSON.parse(req.body.users);

    if (users.length < 2) {
      res.status(400);
      next(createError("minimum 3 people required for create group chat"));
    } else {
      users.push(req.user);

      try {
        const groupChat = await Chat.create({
          chatName: req.body.name,
          users: users,
          isGroupChat: true,
          groupAdmin: req.user,
        });

        const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
          .populate("users", "picture name email")
          .populate("groupAdmin", "picture name email");

        res.status(200).json(fullGroupChat);
      } catch (error) {
        res.status(500);
        next(createError(error));
      }
    }
  }
};

// rename group chat
const renameGroupChat = async (req, res, next) => {
  try {
    const { chatId, chatName } = req.body;

    const updateOne = await Chat.findByIdAndUpdate(
      chatId,
      { chatName },
      { new: true }
    )
      .populate("users", "picture name email")
      .populate("groupAdmin", "picture name email");

    if (!updateOne) {
      res.status(404);
      next(createError("Chat Not Found"));
    } else {
      res.status(200).json(updateOne);
    }
  } catch (error) {
    res.status(500);
    next(createError(next));
  }
};

// add to group
const addToGroup = async (req, res, next) => {
  try {
    const { chatId, userId } = req.body;

    const add = await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: { users: userId },
      },
      { new: true }
    )
      .populate("users", "picture name email")
      .populate("groupAdmin", "picture name email");

    if (!add) {
      res.status(404);
      next(createError("Chat Not Found"));
    } else {
      res.status(200).json(add);
    }
  } catch (error) {
    res.status(500);
    next(createError(error));
  }
};

// remove from group
const removeFromGroup = async (req, res, next) => {
  try {
    const { chatId, userId } = req.body;

    const remove = await Chat.findByIdAndUpdate(
      chatId,
      {
        $pull: { users: userId },
      },
      { new: true }
    )
      .populate("users", "picture name email")
      .populate("groupAdmin", "picture name email");

    if (!remove) {
      res.status(404);
      next(createError("Chat Not Found"));
    } else {
      res.status(200).json(remove);
    }
  } catch (error) {
    res.status(500);
    next(createError(error));
  }
};

module.exports = {
  createChat,
  getChat,
  createGroupChat,
  renameGroupChat,
  addToGroup,
  removeFromGroup,
};
