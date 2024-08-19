import Testimonial from '../models/Testimonial.js';
import path from 'path';

// Create a new testimonial
export const createTestimonial = async (req, res) => {
    try {
        const { name, testimonial } = req.body;
        let photo = req.file ? req.file.path : null;
        
        const newTestimonial = new Testimonial({ name, testimonial, photo });
        await newTestimonial.save();
        res.status(201).json({ success: true, message: 'Testimonial submitted successfully!' });
    } catch (error) {
        console.error('Error creating testimonial:', error);
        res.status(500).json({ success: false, message: 'Failed to submit testimonial.' });
    }
};

// Get all testimonials
export const getAllTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find();
        res.json(testimonials);
    } catch (error) {
        console.error('Error fetching testimonials:', error);
        res.status(500).json({ message: 'Failed to fetch testimonials.' });
    }
};
