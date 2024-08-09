import mongoose from 'mongoose';

const numberSelectionSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  selectedAt: {
    type: Date,
    default: Date.now,
  },
});

export const NumberSelection = mongoose.model('NumberSelection', numberSelectionSchema);

export default NumberSelection;
