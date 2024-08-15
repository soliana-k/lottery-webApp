import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String },
    testimonial: { type: String, required: true },
    approved: { type: Boolean, default: false } // Approval status
});
const Testimonial= mongoose.model('Testimonial', testimonialSchema);

export default Testimonial;