const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");
const fs = require("fs");
const createError = require("http-errors");

// signup controler
const signupUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  const image = req.file;

  try {
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("all data required");
    } else {
      const userExists = await User.findOne({ email });

      if (userExists) {
        res.status(406);
        throw new Error("email already used by a user");
      } else {
        const hashPass = await bcrypt.hash(password, 10);

        let newUser;

        if (image) {
          newUser = new User({
            name,
            email: email.toLowerCase(),
            password: hashPass,
            picture: image.link,
          });
        } else {
          newUser = new User({
            name,
            email: email.toLowerCase(),
            password: hashPass,
          });
        }

        const user = await newUser.save();

        if (!user) {
          res.status(401);
          throw new Error("Failed to create account");
        } else {
          res.status(201).json({
            data: {
              _id: user._id,
              name: user.name,
              email: user.email,
              picture: user.picture,
            },
            token: generateToken(user._id),
            message: "sign up successfull",
          });
        }
      }
    }
  } catch (error) {
    if (image) {
      const imagePath = `${__dirname}/../public/uploads/images/${image.filename}`;
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.log(err.message);
        }
      });
    }

    res.status(res.statusCode || 500);
    next(createError(error));
  }
};

// login controler
const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      const isValidPassword = await bcrypt.compare(password, user.password);

      if (isValidPassword) {
        res.status(200).json({
          data: {
            _id: user._id,
            name: user.name,
            email: user.email,
            picture: user.picture,
          },
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
    res.status(res.statusCode || 500);
    next(createError(error));
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
