const express = require("express");
const cors = require("cors");

// internel imports
const chatRoutes = require("./routes/chatRoutes");
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddlewares");

// db connection
require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("uploads"));

app.get("/", (req, res) => {
  res.send("hi");
});

// routes
app.use("/chats", chatRoutes);

app.use("/user", userRoutes);

// error handler
app.use(notFound);

app.use(errorHandler);

module.exports = app;
