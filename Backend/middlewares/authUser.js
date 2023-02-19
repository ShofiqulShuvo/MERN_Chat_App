const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

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
        res.json({
          message: "token not valid",
        });
      }
    } catch (error) {
      res.status(401).json({
        message: error.message,
      });
    }
  } else {
    res.status(401).json({
      message: "token not found",
    });
  }
};

module.exports = authUser;
