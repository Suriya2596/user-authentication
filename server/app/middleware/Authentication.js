const jwt = require("jsonwebtoken")
const User = require("../models/userModel")


const authentication = (req, res, next) => {
    const token = req.header("Authorization").split(" ")[1]
    try {
        const tokenData = jwt.verify(token, process.env.JWT)
        if (tokenData) {
            User.findOne({ _id: tokenData._id })
                .then((user) => {
                    if (user) {
                        req.user = user
                        next()
                    } else {
                        res.status(400).json({
                            message: "User is Not found",
                        })
                    }
                })
        } else {
            res.status(400).json({
                message: "Invalidate Token"
            })
        }

    } catch (error) {
        res.status(400).json({
            message: "Invalidate Token",
            error: error
        })
    }
}

const authorization = (req, res, next) => {
    User.findOne({ _id: req._id })
        .then((user) => {
            if (user) {
                if (user.role === "admin") {
                    next()
                } else {
                    res.status(400).json({
                        message: "You are not allowed to access"
                    })
                }
            } else {
                res.status(400).json({
                    message: "User is not found"
                })
            }
        })
        .catch((err) => {
            res.json(err)
        })
}


module.exports = {
    authentication, authorization
}