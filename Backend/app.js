const express = require("express");
const cors = require("cors");

// internel imports
const chatsRouter = require("./routers/chatsRouters");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hi");
});

app.use("/chats", chatsRouter);

module.exports = app;
