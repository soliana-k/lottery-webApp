import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  fontSize: { type: String, default: '16px' }, // Store font size as a string
  bgColor: { type: String, default: '#ffffff' }, // Store background color as a string
});

const Settings = mongoose.model('Settings', settingsSchema); 

export default Settings; 
