import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
<<<<<<< HEAD
  name: { type: String, required: true },
=======
 
>>>>>>> c3a745e726612fb60e92967f7f67c8c465d808f9
  email: { type: String, required: true },
  amount: { type: Number, required: true },
  transactionId: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

export const Payment = mongoose.model('Payment', paymentSchema);
