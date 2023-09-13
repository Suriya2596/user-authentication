const mongoose = require('mongoose')
const mongodbURL = "mongodb+srv://suriyajagan25:suriyajagan25@cluster0.4zpxad6.mongodb.net/?retryWrites=true&w=majority"

// "mongodb://127.0.0.1:27017/user-authentication"
const configureDB = ()=>{
    mongoose.connect("mongodb://127.0.0.1:27017/user-authentication")
    .then(()=>{
        console.log("connect to database")
    })
    .catch(()=>{
        console.log("Not connected to database")
    })
}

module.exports = configureDB