const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");
const fs = require("fs");

// signup controler
const signupUser = async (req, res) => {
  const { name, email, password } = req.body;
  const image = req.file;

  try {
    if (!name || !email || !password) {
      res.status(400).json({
        message: "all data required",
      });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).json({
        message: "email already used by a user",
      });
    }

    const hashPass = await bcrypt.hash(password, 10);

    let newUser;

    if (image) {
      newUser = new User({
        name,
        email,
        password: hashPass,
        picture: image.filename,
      });
    } else {
      newUser = new User({
        name,
        email,
        password: hashPass,
      });
    }

    const user = await newUser.save();

    if (!user) {
      res.status(500).json({
        message: "Failed to create account",
      });
    } else {
      res.status(201).json({
        id: user._id,
        name: user.name,
        email: user.email,
        picture: `http://localhost:3500/uploads/images/${user.picture}`,
        token: generateToken(user._id),
        message: "sign up successfull",
      });
    }
  } catch (error) {
    if (image) {
      const imagePath = `${__dirname}/../uploads/images/${image.filename}`;
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.log(err.message);
        }
      });
    }

    res.status(res.statusCode || 500).json({
      message: error.message,
    });
  }
};

// login controler
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      const isValidPassword = await bcrypt.compare(password, user.password);

      if (isValidPassword) {
        res.status(200).json({
          id: user._id,
          name: user.name,
          email: user.email,
          picture: `http://localhost:3500/uploads/images/${user.picture}`,
          token: generateToken(user._id),
          message: "login Successfull",
        });
      } else {
        res.status(401).json({
          message: "Invalid email or password",
        });
      }
    } else {
      res.status(401).json({
        message: "Invalid email or password",
      });
    }
  } catch (error) {
    res.status(res.statusCode || 500).json({
      message: error.message,
    });
  }
};

const getUsers = async (req, res) => {
  const searchKeyword = req.query.search;

  const user = await User.find({
    $or: [
      { name: { $regex: searchKeyword, $options: "i" } },
      { email: { $regex: searchKeyword, $options: "i" } },
    ],
  }).find({ _id: { $ne: req.user._id } });
  res.send(user);
};

module.exports = {
  signupUser,
  loginUser,
  getUsers,
};
