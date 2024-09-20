import mongoose from 'mongoose';

const faqSchema = new mongoose.Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true },
    category: {
        type: String,
        enum: ['General', 'Payment', 'Prizes', 'Technical'], // Added enum for predefined categories
        default: 'General', // Default category
    },
    approved: { // New field to track if the FAQ is approved
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

const FAQ = mongoose.model('FAQ', faqSchema);

export default FAQ;
