import express from 'express';
import { submitQuestion,getFAQs } from '../controllers/faq_controller.js';

const router = express.Router();

router.post('/submit', submitQuestion);
router.get('/questions', getFAQs);

export default router;
