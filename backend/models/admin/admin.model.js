import mongoose from "mongoose";
const adminSchema = new mongoose.Schema({
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
    startDate: {
        type: Date,
        default: Date.now
    },
    password:{
        type:String,
        required:true
    },
    profilePhoto: {
        type: String // This will store the filename of the uploaded profile photo
    },
},{timestamps:true});

export const Admin = mongoose.model('Admin', adminSchema);

export default Admin;