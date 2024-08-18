// routes/admin/testimonial_route.js
import express from 'express';
import { getAllTestimonialsForAdmin, approveTestimonial, deleteTestimonial } from '../../controllers/admin/testimonial_controller.js';

const router = express.Router();

router.get('/testimonials', getAllTestimonialsForAdmin);
router.put('/testimonials/:id/approve', approveTestimonial);
router.delete('/testimonials/:id', deleteTestimonial);

export default router;
