import FAQ from '../models/faq.model.js';

// Handle FAQ question submission
export const submitQuestion = async (req, res) => {
    const { question, email } = req.body;

    // Basic validation
    if (!question) {
        return res.status(400).json({ success: false, message: 'Question is required' });
    }

    try {
        // Create a new FAQ document
        const newQuestion = new FAQ({ question, email });
        
        // Save the FAQ to the database
        await newQuestion.save();

        // Respond to the client
        res.status(200).json({ success: true, message: 'Your question has been submitted successfully!' });
    } catch (error) {
        console.error('Error saving question:', error);
        res.status(500).json({ success: false, message: 'An error occurred. Please try again.' });
    }
};
