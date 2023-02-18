const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");
const fs = require("fs");

// get user by id
const getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ _id: id });
    res.send(user);
  } catch (error) {
    res.status(500).json({
      error: error.message,
      statck: error.statck,
    });
  }
};

// signup controler
const signupUser = async (req, res) => {
  const { name, email, password } = req.body;
  const image = req.file;

  try {
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("all data required");
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("email already used by a user");
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
      res.status(500);
      throw new Error("Failed to create account");
    } else {
      res.status(201).json({
        id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        token: generateToken(user._id),
        message: "sign up successfull",
      });
    }
  } catch (error) {
    if (image) {
      const imagePath = `${__dirname}/../uploads/profile_pictures/${image.filename}`;
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
          picture: user.picture,
          token: generateToken(user._id),
          message: "login Successfull",
        });
      } else {
        res.status(401);
        throw new Error("Invalid email or password");
      }
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    res.status(res.statusCode || 500).json({
      message: error.message,
    });
  }
};

module.exports = {
  signupUser,
  loginUser,
  getSingleUser,
};
