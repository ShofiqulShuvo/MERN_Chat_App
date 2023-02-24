// config dotenv for reading env file
require("dotenv").config();

const { createServer } = require("http");
const { Server } = require("socket.io");
const app = require("./app");

const PORT = process.env.PORT || 3500;

const httpServer = createServer(app);

const io = new Server(httpServer, {
  pingTimeout: 45000,
  cors: {
    origin: process.env.FRONTEND_APP_URL,
  },
});

io.on("connection", (socket) => {
  console.log("connected with socket io");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("joinChat", (room) => {
    socket.join(room);
  });

  socket.on("newMessage", (newMessage) => {
    const chat = newMessage.chat;

    if (!chat.users) {
      console.log("user not defined");
    } else {
      chat.users.forEach((user) => {
        if (user._id === newMessage.sender._id) return;

        socket.in(user._id).emit("messageRecive", newMessage);
      });
    }
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server is Running at http://localhost:${PORT}`);
});
