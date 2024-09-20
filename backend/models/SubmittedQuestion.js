import mongoose from 'mongoose';

const submittedQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    approved: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

export default mongoose.model('SubmittedQuestion', submittedQuestionSchema);
