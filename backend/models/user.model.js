import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    profilePhoto: {
        type: String // This will store the filename of the uploaded profile photo
    },
},{timestamps:true});

export const User = mongoose.model('User', userSchema);

export default User;