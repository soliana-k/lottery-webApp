const express = require('express');
const router = express.Router();
const testimonialController = require('../controllers/testimonialController');

// GET all testimonials for admin review
router.get('/admin/testimonials', testimonialController.getAllTestimonials);

// PUT endpoint to approve a testimonial
router.put('/admin/testimonials/:id/approve', testimonialController.approveTestimonial);

// DELETE endpoint to delete a testimonial
router.delete('/admin/testimonials/:id', testimonialController.deleteTestimonial);

module.exports = router;
