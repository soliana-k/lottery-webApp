import express from 'express';
import { 
    getFAQs, 
    addFAQ, 
    updateFAQ, 
    deleteFAQ, 
    approveQuestion, 
    getSubmittedQuestions, 
    rejectQuestion, 
    submitQuestion 
} from '../controllers/faqController.js';

const router = express.Router();

// Get all FAQs with optional search
router.get('/faq/questions', getFAQs);

// Submit a new question
router.post('/faq/submit', submitQuestion);

// Add a new FAQ (admin functionality)
router.post('/faq/questions', addFAQ);

// Update an existing FAQ
router.put('/faq/questions/:id', updateFAQ);

// Delete an FAQ
router.delete('/faq/questions/:id', deleteFAQ);

// Submitted Question Routes
router.get('/faq/submitted', getSubmittedQuestions);
router.put('/faq/questions/:id/approve', approveQuestion);
router.delete('/faq/questions/:id', rejectQuestion);

export default router;
