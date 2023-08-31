const express =  require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const routes = require("./config/routes")
const configureDB = require("./config/database")
// const { notFound, errorHandler } = require("./app/middleware/errorHandler")

const app = express()
const Port = 3450

configureDB()

app.use(cors())
app.use(express.json())
// app.use(notFound)
// app.use(errorHandler)
app.use(routes)

app.listen(Port,()=>{
    console.log("port is running on",Port)
})