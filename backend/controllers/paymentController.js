// paymentController.js
import { Payment } from "../models/paymentModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Get all payments
export const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
