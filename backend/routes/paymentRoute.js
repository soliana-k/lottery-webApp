// routes/paymentRoutes.js
import express from "express";
<<<<<<< HEAD
import { getPayments } from "../controllers/paymentController.js";

const router = express.Router();

router.get('/payments', getPayments); // This registers the route '/payments'
=======
import { getPayments, savePayment } from "../controllers/paymentController.js";

const router = express.Router();

// Route to get all payments
router.get('/payments', getPayments);

// Route to save a payment (callback handler)
router.post('/payments/callback', savePayment);
>>>>>>> c3a745e726612fb60e92967f7f67c8c465d808f9

export default router;
