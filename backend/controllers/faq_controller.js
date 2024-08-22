import FAQ from '../models/faq.model.js'; // Adjust path as needed

// Fetch FAQs with optional search term (user-facing)
export const getFAQs = async (req, res) => {
    try {
        const searchTerm = req.query.searchTerm || '';
        const faqs = await FAQ.find({
            $or: [
                { 'question': { $regex: searchTerm, $options: 'i' } },
                { category: { $regex: searchTerm, $options: 'i' } }
            ]
        });
        res.json(faqs);
    } catch (error) {
        console.error('Error fetching FAQs:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Submit a new question (user-facing)
export const submitQuestion = async (req, res) => {
    try {
        const { name, email, question } = req.body;
        // Save the question to a different collection or send an email notification
        console.log('Submitted question:', { name, email, question });
        res.json({ success: true });
    } catch (error) {
        console.error('Error submitting question:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Add a new FAQ (admin)
export const addFAQ = async (req, res) => {
    try {
        const { question, answer, category } = req.body;
        const newFAQ = new FAQ({ question, answer, category });
        await newFAQ.save();
        res.json(newFAQ);
    } catch (error) {
        console.error('Error creating FAQ:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update an existing FAQ (admin)
export const updateFAQ = async (req, res) => {
    try {
        const { id } = req.params;
        const { question, answer, category } = req.body;
        const updatedFAQ = await FAQ.findByIdAndUpdate(id, { question, answer, category }, { new: true });
        if (!updatedFAQ) {
            return res.status(404).json({ error: 'FAQ not found' });
        }
        res.json(updatedFAQ);
    } catch (error) {
        console.error('Error updating FAQ:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Delete an existing FAQ (admin)
export const deleteFAQ = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedFAQ = await FAQ.findByIdAndDelete(id);
        if (!deletedFAQ) {
            return res.status(404).json({ error: 'FAQ not found' });
        }
        res.json({ success: true });
    } catch (error) {
        console.error('Error deleting FAQ:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
