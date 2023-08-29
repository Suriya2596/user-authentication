const express =  require("express")
const mongoose = require("mongoose")
const app = express()
const cors = require("cors")
const Port = 3450
const routes = require("./config/routes")

const configureData = ()=>{
    mongoose.connect("mongodb://127.0.0.1:27017/user-authentication")
        .then(()=>{
            console.log("connect to database")
        })
        .catch(()=>{
            console.log("Not connected to database")
        })
}
configureData()

app.use(cors())
app.use(express.json())


app.use(routes)

app.listen(Port,()=>{
    console.log("port is running on",Port)
})