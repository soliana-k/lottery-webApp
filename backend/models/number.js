import mongoose from 'mongoose';

const NumberSelectionSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
    unique: true, 
  },
  selected: {
    type: Boolean,
    default: false,
  },
  paymentCompleted: {
    type: Boolean,
    default: false, 
  },
});

const NumberSelection = mongoose.model('NumberSelection', NumberSelectionSchema);

export default NumberSelection;
