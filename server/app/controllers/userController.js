const User = require("../models/userModel");
const asyncHandler = require("express-async-handler")
const userController = {};

userController.create = asyncHandler(async (req, res) => {
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

module.exports = userController;
