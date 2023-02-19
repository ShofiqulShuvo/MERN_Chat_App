const express = require("express");
const cors = require("cors");

// internel imports
const { notFound, errorHandler } = require("./middlewares/errorMiddlewares");
const chatRoutes = require("./routes/chatRoutes");
const userRoutes = require("./routes/userRoutes");

// db connection
require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("hi");
});

// routes
app.use("/user", userRoutes);

app.use("/chats", chatRoutes);

// error handler
app.use(notFound);

app.use(errorHandler);

module.exports = app;
