const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,   
        required: true,
        trim: true,
    },
    lastName: {
        type: String,   
        required: true,
        trim: true,
    },
    email: {
        type: String,   
        required: true,
        trim: true,
    },
    password: {
        type: String,   
        required: true,
        trim: true,
    },
    accountType: {
        type: String,
        enum: ["Doctor", "Patient"],
        required: true,
    },
    token: {
        type: String,
    },
    additionalDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProfileModel",
        required: true,
    },
    image:{
        type:String,
        required:true,
    },
});

module.exports = mongoose.model("UserModel", userSchema);