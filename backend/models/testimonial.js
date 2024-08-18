import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    testimonial: {
        type: String,
        required: true,
    },
    photo: {
        type: String, // URL or path to the photo
        default: null,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

export default Testimonial;
