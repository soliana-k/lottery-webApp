//backend/routes/testimonials.js
import express from 'express';
import multer from 'multer';
import path from 'path';
import { createTestimonial, getAllTestimonials } from '../controllers/testimonialController.js';

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage });

// Route to submit a new testimonial
router.post('/submit', upload.single('photo'), createTestimonial);

// Route to get all testimonials
router.get('/', getAllTestimonials);

export default router;
