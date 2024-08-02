import mongoose from 'mongoose';

const faqSchema = new mongoose.Schema({
    question: { type: String, required: true },
    email: { type: String, default: '' },
    timestamp: { type: Date, default: Date.now }
});

const FAQ = mongoose.model('FAQ', faqSchema);

export default FAQ;
