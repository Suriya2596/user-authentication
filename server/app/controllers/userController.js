const User = require("../models/userModel");
// const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userController = {};

userController.register = (req, res) => {
  const body = req.body;
  User.findOne({ email: body.email })
    .then((user) => {
      if (!user) {
        bcrypt
          .genSalt(10)
          .then((salt) => {
            bcrypt
              .hash(body.password, salt)
              .then((encrypt) => {
                body.password = encrypt;
                User.create(body)
                  .then((newUser) => {
                    const data = {
                      _id: newUser._id,
                      name: newUser.name,
                      email: newUser.email,
                    };
                    res.json(data);
                  })
                  .catch((err) => {
                    res.json(err);
                  });
              })
              .catch((err) => {
                res.json(err);
              });
          })
          .catch((err) => {
            res.json(err);
          });
      } else {
        res.status(400).json({
          message: "user is already exist"
        })
      }
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
        bcrypt
          .compare(body.password, user.password)
          .then((match) => {
            if (match) {
              const tokenData = {
                _id: user._id,
                email: user.email,
                role: user.role,
              };
              const token = jwt.sign(tokenData, process.env.JWT, {
                expiresIn: "2d",
              });
              res.json({ token: `Bearer ${token}` });
            } else {
              res.status(400).json({
                message: "Invalidate email or password"
              })
            }
          })
          .catch((err) => {
            res.json(err);
          });
      } else {
        res.status(400).json({
          message: "Invalidate email or password"
        })
      }
    })
    .catch((err) => {
      res.json(err);
    });
};

userController.profilePic = (req, res) => {
  const file = req.file
  const user = req.user
  console.log(req, 93)
  console.log(file, 94)
  User.findOneAndUpdate({ _id: user._id }, { "file": `/public/images/${file.filename}` }, { runValidators: true, new: true })
    .then((user) => {
      console.log(user)
      if (user && user._id) {
        res.json(user)
      } else {
        res.status(400).json({
          error: "Invalidate file or user",
          message: "Invalidate file or user"
        })
      }
    })
    .catch((err) => {
      res.json(err)
    })
}

userController.account = (req, res) => {
  res.json(req.user)
}

userController.resetPassword = (req, res) => {
  const password = req.body.password
  User.findOne({ _id: req.user._id })
    .then((user) => {
      if (user) {
        bcrypt.genSalt(2)
          .then((salt) => {
            if (salt) {
              bcrypt.hash(password, salt)
                .then((encryptPassword) => {
                  if (encryptPassword) {
                    user.password = encryptPassword
                    User.findOneAndUpdate({ _id: req.user._id }, user, { new: true })
                      .then((userData) => {
                        // console.log(encryptPassword,password, user.password,userData)
                        res.json(userData)
                      })
                      .catch((err) => {
                        res.json(err)
                      })
                  }
                })
                .catch((err) => {
                  res.json(err)
                })
            }
          })
          .catch((err) => {
            res.json(err)
          })
      } else {
        res.status(400).json({
          error: "Invalidate User",
          message: "Invalidate User"
        })
      }
    })
    .catch((err) => {
      res.json(err)
    })
}


module.exports = userController;
