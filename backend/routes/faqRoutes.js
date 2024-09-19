import express from 'express';
import {
  getFAQs,
  getFAQsBySearch,
  createFAQ,
  updateFAQ,
  deleteFAQ,
  submitQuestion,
  getSubmittedQuestions // Make sure this function exists
} from '../controllers/faqController.js';

const router = express.Router();

// Admin routes
router.get('/faq', getFAQs);
router.post('/admin/faq', createFAQ);
router.put('/admin/faq/:faqId/questions/:questionId', updateFAQ);
router.delete('/admin/faq/:faqId/questions/:questionId', deleteFAQ);

// Client routes
router.get('/faq/questions', getFAQsBySearch);
router.post('/faq/submit', submitQuestion);


router.get('/submitted-questions', getSubmittedQuestions);

export default router;
