import express from 'express';
import { submitQuestion } from '../controllers/faq_controller.js';

const router = express.Router();

// Route to handle question submission
router.post('/submit', submitQuestion);

export default router;
