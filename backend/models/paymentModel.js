import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({

  name: { type: String, required: true },


  email: { type: String, required: true },
  amount: { type: Number, required: true },
  transactionId: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

export const Payment = mongoose.model('Payment', paymentSchema);
