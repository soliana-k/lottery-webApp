import mongoose from 'mongoose';

const drawSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  time: { type: String, required: true },
  status: { type: String, required: true, enum: ['Upcoming', 'Completed', 'Cancelled'] },
  createdBy: { type: String, required: true }, // Admin email
}, { timestamps: true });

export default mongoose.model('Draw', drawSchema);
