const User = require("../models/userModel");
// const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userController = {};

userController.register = (req, res) => {
  const body = req.body;
  const user = new User(body);
  bcrypt.genSalt(2)
    .then((salt) => {
      bcrypt.hash(user.password, salt)
      .then((encryptPWS) => {
        user.password = encryptPWS;
        user.save()
          .then((userData) => {
            res.json(userData);
          })
          .catch((err) => {
            res.json(err);
          });
      });
    })
    .catch((err) => {
      res.json(err);
    });
};

userController.login = (req, res) => {
  const body = req.body;
  User.findOne({ email: body.email })
    .then((user) => {
      if (user) {
        console.log(user);
        bcrypt
          .compare(body.password, user.password)
          .then((match) => {
            if (match) {
              console.log(match);
              const tokenData = {
                _id: user._id,
                name: user.name,
              };
              const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
                expiresIn: "2d",
              });
              res.json({ token: `Bearer ${token}` });
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
