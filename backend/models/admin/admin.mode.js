import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  profilePhoto: {
    type: String
  }
}, { timestamps: true });

export const Admin = mongoose.model('Admin', adminSchema);
