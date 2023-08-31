const mongoose = require('mongoose')

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