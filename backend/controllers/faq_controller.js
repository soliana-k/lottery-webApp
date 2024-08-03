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

