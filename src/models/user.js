import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    username:String,
    email:String,
    password:String,
    blogs:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'blog'
    }
})

module.exports = mongoose.models.User || mongoose.model("User", UserSchema)