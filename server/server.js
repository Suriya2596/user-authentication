const express =  require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const routes = require("./config/routes")
const configureDB = require("./config/database")
require('dotenv').config()
const { errorHandler } = require("./app/middleware/errorHandler")

const app = express()
const Port = 3450

configureDB()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(routes)

// app.use(notFound)
app.use(errorHandler)

app.listen(Port,()=>{
    console.log("port is running on",Port)
})