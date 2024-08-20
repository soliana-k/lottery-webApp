// routes/paymentRoutes.js

import express from 'express';
import { initiatePayment } from '../controllers/paymentController.js';

const router = express.Router();

router.post('/initiate-payment', initiatePayment);

export default router;
