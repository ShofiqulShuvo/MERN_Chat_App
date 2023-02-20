const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const createError = require("http-errors");

const authUser = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decoded.id).select("-password");

      if (user) {
        req.user = user;
        next();
      } else {
        res.status(401);
        throw new Error("token not valid");
      }
    } catch (error) {
      res.status(res.statusCode || 500);
      next(createError(error));
    }
  } else {
    res.status(401);
    next(createError("no token found"));
  }
};

module.exports = authUser;
