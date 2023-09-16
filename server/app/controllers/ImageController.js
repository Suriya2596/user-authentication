const Image = require("../models/ImageModel");
const imageController = {};

imageController.create = (req, res) => {
    const { originalname, buffer } = req.file;
    const newImage = new Image({
        User: req.user._id,
        imageUrl: `data:image/${originalname.split('.').pop()};base64,${buffer.toString('base64')}`,
    })
    Image.create(newImage)
        .then((image) => {
            res.json(image)
        })
        .catch((err) => {
            res.json(err);
        });
}

imageController.update = async (req, res) => {
    try {
        const { originalname, buffer } = req.file;
        const newImage = new Image({
            User: req.user._id,
            imageUrl: `data:image/${originalname.split('.').pop()};base64,${buffer.toString('base64')}`,
        });
        const result = await Image.findOne({ User: req.user._id }, newImage, { new: true })
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

imageController.show = async (req, res) => {
    try {
        const image = await Image.findOne({ User: req.user._id });
        if (!image) {
            return res.status(404).json({ message: 'Image not found' });
        }
        // Return the image URL
        res.json({ imageUrl: image.imageUrl });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}


module.exports = imageController