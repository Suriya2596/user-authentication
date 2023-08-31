const express = require("express");
const routes = express.Router();

const multer = require("multer");
const path = require("path");

const userController = require("../app/controllers/userController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

routes.post("/api/user/register", upload.single("file"), userController.register);
routes.post("/api/user/login", userController.login);

module.exports = routes;
