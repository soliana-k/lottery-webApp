// routes/paymentRoutes.js
import express from "express";
import { getPayments } from "../controllers/paymentController.js";

const router = express.Router();

router.get('/payments', getPayments); // This registers the route '/payments'

export default router;
