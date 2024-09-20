// routes/paymentRoutes.js
import express from "express";

import { getPayments, savePayment } from "../controllers/paymentController.js";

const router = express.Router();
// Route to get all payments
router.get('/payments', getPayments);

// Route to save a payment (callback handler)
router.post('/payments/callback', savePayment);

export default router;
