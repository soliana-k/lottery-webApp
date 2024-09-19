// paymentController.js
import { Payment } from "../models/paymentModel.js";

// Get all payments
export const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Save a payment (callback handler)
export const savePayment = async (req, res) => {
  try {
    const { email, amount, tx_ref } = req.body; // This depends on the structure of the Chapa response

    // Check if payment data is available
    if (!email || !amount || !tx_ref) {
      return res.status(400).json({ message: 'Missing payment data' });
    }

    // Save the payment to the database
    const payment = new Payment({
      email,
      amount,
      transactionId: tx_ref,
      date: new Date(),
    });

    await payment.save();
    res.status(201).json({ message: 'Payment saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
