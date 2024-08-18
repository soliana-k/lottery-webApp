import mongoose from 'mongoose';

const faqSchema = new mongoose.Schema({
    question: { 
        type: String, 
        required: true },
    answer: {
        type: String,
        default: ''
    },
    email: {
         type: String,
          default: '' 
        },
    name : {
        type : String,
         default: ''
    },
    category : {
        type: String,
        default: 'General'
    },
    timestamp: {
         type: Date, 
         default: Date.now }
});

const FAQ = mongoose.model('FAQ', faqSchema);

export default FAQ;
