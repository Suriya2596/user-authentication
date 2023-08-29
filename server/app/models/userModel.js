const mongoose = require("mongoose")

const {Schema} = mongoose

const isEmail = require("validator/lib/isEmail")
const isNumeric = require("validator/lib/isNumeric")

const userSchema = new Schema({
    name:{
        type:String,
        // required:[true,"Name is required"]
    },
    email:{
        type:String,
        // required:[true,"Email is required"],
        unique:[true,"Already extis"],
        validate:{
            validator:function(value){
                return isEmail(value)
            },
            message:function(){
                return "Email address is invaildate"
            }
        }
    },
    mobile:{
        type:String,
        // required:[true,"Mobile number is required"],
        unique:[true,"Already extis"],
        validate:{
            validator:function(value){
                return isNumeric(value)
            },
            message:function(){
                return "Mobile number is invaildate"
            }
        },
        maxlength:10,
        minlength:10,
    },
    password:{
        type:String,
        // required:[true,"Password is required"],
        maxlength:128,
        minlength:8,
    },
    file:{
        type:Object,
        default:{}
    },
    role:{
        type:String,
        default:"user"
    }
},{timestamps:true})

const User = mongoose.model("User",userSchema)


module.exports = User