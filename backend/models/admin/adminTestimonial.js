import mongoose from 'mongoose';

const adminTestimonialSchema = new mongoose.Schema({
    name: { type: String, required: true },
    testimonial: { type: String, required: true },
    photo: { type: String }, // Path to the photo (optional)
    email: { type: String }, // Assuming you collect email as well
    approved: { type: Boolean, default: false } // Indicates if the testimonial is approved
}, { timestamps: true });

const AdminTestimonial = mongoose.model('AdminTestimonial', adminTestimonialSchema);

export default AdminTestimonial;
