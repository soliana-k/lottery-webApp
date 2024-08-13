import mongoose from 'mongoose';

const drawSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  time: { type: String, required: true },
  status: { type: String, enum: ['Upcoming', 'Completed', 'Cancelled'], required: true },
  
});

const Draw = mongoose.model('Draw', drawSchema);

export default Draw; 
