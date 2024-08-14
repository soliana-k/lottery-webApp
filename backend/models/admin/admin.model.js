import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
 
  profilePhoto: {
    type: String
  },
  fullName: {
    type: String,
    required: true
  },
}, { timestamps: true });

export const Admin = mongoose.model('Admin', adminSchema);
