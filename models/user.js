const mongoose = require("mongoose")

let user = new  mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    status:{
        type:Number,
        default:0
    },
    providerId:{
        type:String
    }
},{timestamps:true})

module.exports = mongoose.model("user",user)