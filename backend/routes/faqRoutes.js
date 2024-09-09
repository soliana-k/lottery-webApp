import express from 'express';
import {
  getFAQs,
  getFAQsBySearch,
  createFAQ,
  updateFAQ,
  deleteFAQ,
  submitQuestion
} from '../controllers/faqController.js';

const router = express.Router();

// Admin routes
router.get('/faq', getFAQs); // Fetch all FAQs
router.post('/admin/faq', createFAQ); // Create a new FAQ
router.put('/admin/faq/:faqId/questions/:questionId', updateFAQ); // Update an FAQ
router.delete('/admin/faq/:faqId/questions/:questionId', deleteFAQ); // Delete an FAQ

// Client routes
router.get('/faq/questions', getFAQsBySearch); // Fetch FAQs with search
router.post('/faq/submit', submitQuestion); // Submit a new question

export default router;
