// models/Faq.js
import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true }
});

const faqSchema = new mongoose.Schema({
  category: { type: String, required: true },
  questions: [questionSchema]
});

const Faq = mongoose.model('Faq', faqSchema);

export default Faq;
