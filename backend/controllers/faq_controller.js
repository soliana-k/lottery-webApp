import FAQ from '../models/faq.model.js';


export const submitQuestion = async (req, res) => {
    const { question, email, name } = req.body;


    if (!question) {
        return res.status(400).json({ success: false, message: 'Question is required' });
    }

    try {
        const newQuestion = new FAQ({ question, email, name });
        await newQuestion.save();
        res.status(200).json({ success: true, message: 'Your question has been submitted successfully!' });
    } catch (error) {
        console.error('Error saving question:', error);
        res.status(500).json({ success: false, message: 'An error occurred. Please try again.' });
    }
};
export const getFAQs = async (req, res) => {
    const { searchTerm } = req.query;

    try {
        const query = searchTerm ? {
            $or: [
                { question: new RegExp(searchTerm, 'i') },
                { answer: new RegExp(searchTerm, 'i') }
            ]
        } : {};

        const faqs = await FAQ.find(query).sort({ timestamp: -1 });
        res.status(200).json(faqs);
    } catch (error) {
        console.error('Error fetching FAQs:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
    export const addFAQ = async (req, res) => {
        const { question, answer, category } = req.body;
    
        if (!question || !answer || !category) {
            return res.status(400).json({ success: false, message: 'Question, answer, and category are required' });
        }
    
        try {
            const newFAQ = new FAQ({ question, answer, category });
            await newFAQ.save();
            res.status(201).json({ success: true, message: 'FAQ added successfully!' });
        } catch (error) {
            console.error('Error adding FAQ:', error);
            res.status(500).json({ success: false, message: 'An error occurred. Please try again.' });
        }
    };
    export const updateFAQ = async (req, res) => {
        const { id } = req.params;
        const { question, answer, category } = req.body;
    
        if (!question || !answer || !category) {
            return res.status(400).json({ success: false, message: 'Question, answer, and category are required' });
        }
    
        try {
            const updatedFAQ = await FAQ.findByIdAndUpdate(id, { question, answer, category }, { new: true });
            if (!updatedFAQ) {
                return res.status(404).json({ success: false, message: 'FAQ not found' });
            }
            res.status(200).json({ success: true, message: 'FAQ updated successfully!', data: updatedFAQ });
        } catch (error) {
            console.error('Error updating FAQ:', error);
            res.status(500).json({ success: false, message: 'An error occurred. Please try again.' });
        }
    };
    export const deleteFAQ = async (req, res) => {
        const { id } = req.params;
    
        try {
            const deletedFAQ = await FAQ.findByIdAndDelete(id);
            if (!deletedFAQ) {
                return res.status(404).json({ success: false, message: 'FAQ not found' });
            }
            res.status(200).json({ success: true, message: 'FAQ deleted successfully!' });
        } catch (error) {
            console.error('Error deleting FAQ:', error);
            res.status(500).json({ success: false, message: 'An error occurred. Please try again.' });
        }
    };
