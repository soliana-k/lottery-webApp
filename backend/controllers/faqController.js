import FAQ from '../models/FAQ.js';
import SubmittedQuestion from '../models/SubmittedQuestion.js';
import { validationResult } from 'express-validator';
import winston from 'winston';

// Create a logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.Console(),
    ],
});

// Get all FAQs with optional search
export const getFAQs = async (req, res) => {
    const { searchTerm } = req.query;
    try {
        const query = searchTerm 
            ? { $or: [{ question: { $regex: searchTerm, $options: 'i' } }, { answer: { $regex: searchTerm, $options: 'i' } }] } 
            : {};
        const faqs = await FAQ.find(query);
        res.status(200).json(faqs);
    } catch (error) {
        logger.error('Error fetching FAQs:', error);
        res.status(500).json({ message: 'Error fetching FAQs', error });
    }
};

// Submit a new question
export const submitQuestion = async (req, res) => {
    const { name, email, question } = req.body;

    // Validate inputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
        const newQuestion = new SubmittedQuestion({ name, email, question });
        await newQuestion.save();
        res.status(201).json({ success: true, message: 'Question submitted successfully!' });
    } catch (error) {
        logger.error('Error submitting question:', error);
        res.status(500).json({ success: false, message: 'Error submitting question', error });
    }
};

// Add a new FAQ (admin functionality)
export const addFAQ = async (req, res) => {
    const { question, answer, category } = req.body;

    // Validate inputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
        const newFAQ = await FAQ.create({ question, answer, category });
        res.status(201).json(newFAQ);
    } catch (err) {
        logger.error('Error adding FAQ:', err);
        res.status(400).json({ message: 'Error adding FAQ.' });
    }
};

// Update an existing FAQ
export const updateFAQ = async (req, res) => {
    const { id } = req.params;
    const { question, answer, category } = req.body;

    // Validate inputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
        const updatedFAQ = await FAQ.findByIdAndUpdate(id, { question, answer, category }, { new: true });
        if (!updatedFAQ) {
            return res.status(404).json({ success: false, message: 'FAQ not found.' });
        }
        res.status(200).json({ success: true, updatedFAQ });
    } catch (error) {
        logger.error('Error updating FAQ:', error);
        res.status(500).json({ success: false, message: 'Error updating FAQ', error });
    }
};

// Delete an FAQ
export const deleteFAQ = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedFAQ = await FAQ.findByIdAndDelete(id);
        if (!deletedFAQ) {
            return res.status(404).json({ success: false, message: 'FAQ not found.' });
        }
        res.status(200).json({ success: true, message: 'FAQ deleted successfully!' });
    } catch (error) {
        logger.error('Error deleting FAQ:', error);
        res.status(500).json({ success: false, message: 'Error deleting FAQ', error });
    }
};

// Get all submitted questions
export const getSubmittedQuestions = async (req, res) => {
    try {
        const questions = await SubmittedQuestion.find();
        res.status(200).json(questions);
    } catch (err) {
        logger.error('Error fetching submitted questions:', err);
        res.status(500).json({ message: 'Error fetching submitted questions.' });
    }
};

// Approve a submitted question
export const approveQuestion = async (req, res) => {
    try {
        const submittedQuestion = await SubmittedQuestion.findByIdAndUpdate(req.params.id, { approved: true }, { new: true });
        if (!submittedQuestion) {
            return res.status(404).json({ message: 'Submitted question not found.' });
        }
        const newFAQ = new FAQ({ question: submittedQuestion.question, answer: '', category: 'General' });
        await newFAQ.save();
        res.status(200).json({ message: 'Question approved successfully and added to FAQs.' });
    } catch (err) {
        logger.error('Error approving question:', err);
        res.status(500).json({ message: 'Error approving question.' });
    }
};

// Reject a submitted question
export const rejectQuestion = async (req, res) => {
    try {
        const deletedQuestion = await SubmittedQuestion.findByIdAndDelete(req.params.id);
        if (!deletedQuestion) {
            return res.status(404).json({ message: 'Submitted question not found.' });
        }
        res.status(200).json({ message: 'Question rejected successfully.' });
    } catch (err) {
        logger.error('Error rejecting question:', err);
        res.status(500).json({ message: 'Error rejecting question.' });
    }
};
