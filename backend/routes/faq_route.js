// routes/faq.js
import express from 'express';
import { submitQuestion, addFAQ, updateFAQ, deleteFAQ, getFAQs } from '../controllers/faq_controller.js';

const router = express.Router();

router.get('/faq', getFAQs);
router.post('/faq/submit', submitQuestion);
router.post('/admin/faq', addFAQ); 
router.put('/admin/faq/:id', updateFAQ); 
router.delete('/admin/faq/:id/questions/:questionId', deleteFAQ);
export default router;
