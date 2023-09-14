// models/Image.js
const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    User: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        unique:true
    },
    imageUrl: {
        type: String,
    },
},{timestamps:true});
const Image = mongoose.model('Image', imageSchema);
module.exports = Image
