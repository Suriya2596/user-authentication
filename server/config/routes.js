const express = require("express");
const routes = express.Router();

// Configure multer to handle file uploads
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const userController = require("../app/controllers/userController");
const { authentication } = require("../app/middleware/Authentication");

// const imageController = require("../app/controllers/ImageController");
const Image = require("../app/models/ImageModel");


routes.post("/api/user/register", userController.register);
routes.post("/api/user/login", userController.login);
routes.get("/api/user", authentication, userController.account);
routes.put("/api/user/update", authentication, userController.update);
routes.post("/api/user/resetPassword", authentication, userController.resetPassword);



// POST route for image upload
routes.post('/api/profilePic', authentication, upload.single('image'), async (req, res) => {
  try {
    const { originalname, buffer } = req.file;
    // console.log(req.file)
    const newImage = new Image({
      User: req.user._id,
      imageUrl: `data:image/${originalname.split('.').pop()};base64,${buffer.toString('base64')}`,
    });

    const result = await newImage.save();
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET route to retrieve an image by its ID
routes.get('/api/profilePic', authentication, async (req, res) => {
  try {
    const image = await Image.findOne({ User: req.user._id });
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }
    // Return the image URL
    res.json(image);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

routes.put('/api/profilePic', authentication, upload.single('image'), (req, res) => {
  const { originalname, buffer } = req.file;
  const newImage = {
    imageUrl: `data:image/${originalname.split('.').pop()};base64,${buffer.toString('base64')}`,
  }
  Image.findOneAndUpdate({ User: req.user._id }, newImage, { runValidators: true, new: true })
    .then((image) => {
      res.json(image)
    })
    .catch((err) => {
      res.json(err)
    })
});

routes.delete('/api/profilePic', authentication, (req, res) => {
  Image.findOneAndDelete({ User: req.user._id })
    .then((image) => {
      res.json(image)
    })
    .catch((err) => {
      res.json(err)
    })
});

module.exports = routes;
