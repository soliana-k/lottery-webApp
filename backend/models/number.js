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
  selectedBy: {
    type: String,
    default: null, // This will store the email of the user who selected the number
  },
});

const NumberSelection = mongoose.model('NumberSelection', NumberSelectionSchema);

export default NumberSelection;
