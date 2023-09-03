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
  // const _id = req.params._id
  const body = req.body
  console.log(body)
  User.findOneAndUpdate({ _id: req._id }, body,{runValidators:true,new:true})
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
      console.log(err)
      res.json(err)
    })
}

userController.account = (req, res) => {
  res.json(req.user)
}



module.exports = userController;
