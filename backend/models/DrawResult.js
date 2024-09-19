import mongoose from 'mongoose';

const drawResultsSchema = new mongoose.Schema({
  drawId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Draw',
    required: true,
  },
  prize: { type: mongoose.Schema.Types.ObjectId, ref: 'Prize' }, 
  selectedNumbers: [
    {
      number: { type: Number, required: true },
      selectedBy: { type: String, required: true } 
    }
  ],
  winner: {
   type:String,
    required: true, 
  },
  drawDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['Completed', 'Pending'],
    default: 'Pending',
  },
}, { timestamps: true });

const DrawResults = mongoose.model('DrawResults', drawResultsSchema);

export default DrawResults;
