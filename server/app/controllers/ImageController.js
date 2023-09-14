const Image = require("../models/ImageModel");
const imageController = {};

imageController.create = async (req, res) => {
    try {
        const { originalname, buffer } = req.file;
        const newImage = new Image({
            User:req.user._id,
            imageUrl: `data:image/${originalname.split('.').pop()};base64,${buffer.toString('base64')}`,
        });
        await newImage.save();
        res.status(201).json({ message: 'Image uploaded successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

imageController.update = async (req, res) => {
    try {
        const { originalname, buffer } = req.file;
        const newImage = new Image({
            User:req.user._id,
            imageUrl: `data:image/${originalname.split('.').pop()};base64,${buffer.toString('base64')}`,
        });
        await Image.findOne({User:req.user._id},newImage,{new:true})
        res.status(201).json({ message: 'Image uploaded' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

imageController.show = async (req, res) => {
    try {
        const image = await Image.findOne({User:req.user._id});
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