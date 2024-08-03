import express from 'express';
import { submitQuestion,addFAQ, updateFAQ, deleteFAQ,getFAQs } from '../controllers/faq_controller.js';


const router = express.Router();

router.post('/submit', submitQuestion);
router.get('/questions', getFAQs);
router.post('/admin', addFAQ); 
router.put('/admin/:id', updateFAQ); 
router.delete('/admin/:id', deleteFAQ);

export default router;
