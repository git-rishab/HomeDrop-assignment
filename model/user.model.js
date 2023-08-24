const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    user:{
        type:String,
        required:true,
    },
    history: {
        type:Array,
        default:[]
    }
})

const UserModel = mongoose.model("user", userSchema);

module.exports = {
    UserModel
}