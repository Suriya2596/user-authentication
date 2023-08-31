const User = require("../models/userModel");
const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userController = {};

userController.register = asyncHandler(async (req, res) => {
  try {
    const body = req.body;
    const file = req.file;
    body.file = file
    const user = await User.findOne({ email: body.email });
    if (!user) {
      const newUser = await User.create(body);
      if (newUser) {
        res.status(200).json({
          status: "success",
          data: newUser,
        });
      }
    } else {
      throw new Error("user is exist")
    }
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
});

userController.login = (req, res) => {
  const body = req.body;
  User.findOne({ email: body.email })
    .then((user) => {
      if (user) {
        bcrypt
          .compare(body.password, user.password)
          .then((match) => {
            if (match) {
              const tokenData = {
                _id: user._id,
                name: user.name,
              };
              const token = jwt.sign(tokenData, process.env.JWT, {
                expiresIn: "2d",
              });
              res.json({ token: `Bearer ${token}` })
            } else {
              res.json({
                errors: "Invalid email or password",
                message: "Invalidate email or password",
              });
            }
          })
          .catch((err) => {
            res.json(err);
          });
      } else {
        res.json({
          errors: "Invalid email or password",
          message: "Invalidate email or password",
        });
      }
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports = userController;
