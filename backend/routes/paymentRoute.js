import express from 'express';
import { initializeTransaction, verifyPayment } from '../controllers/paymentController.js';

const router = express.Router();

router.post('/initialize', initializeTransaction);
router.post('/verify', verifyPayment);

export default router;
