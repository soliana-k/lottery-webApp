// controllers/faqController.js
import Faq from '../models/Faq.js';

// Fetch all FAQs
export const getFAQs = async (req, res) => {
  try {
    const faqs = await Faq.find();
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch FAQs by search term
export const getFAQsBySearch = async (req, res) => {
  const { searchTerm } = req.query;
  try {
    const faqs = await Faq.find({
      $or: [
        { 'questions.question': { $regex: searchTerm, $options: 'i' } },
        { 'questions.answer': { $regex: searchTerm, $options: 'i' } }
      ]
    });
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createFAQ = async (req, res) => {
  const { question, answer, category } = req.body;

  try {
    // Find an existing FAQ entry by category
    const faq = await FAQ.findOne({ category });

    if (!faq) {
      // If no FAQ entry exists for the given category, create a new one
      const newFAQ = new FAQ({
        category,
        questions: [{ question, answer }]
      });
      await newFAQ.save();
    } else {
      // If FAQ entry exists, push the new question to the existing questions array
      faq.questions.push({ question, answer });
      await faq.save();
    }

    res.status(201).json({ success: true, message: 'FAQ created successfully.' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Update an FAQ
export const updateFAQ = async (req, res) => {
  const { faqId, questionId } = req.params;
  const { question, answer } = req.body;
  try {
    const faq = await Faq.findOne({ _id: faqId });
    const questionIndex = faq.questions.findIndex(q => q._id.toString() === questionId);

    if (questionIndex === -1) {
      return res.status(404).json({ message: 'Question not found' });
    }

    faq.questions[questionIndex] = { question, answer };
    await faq.save();
    res.json(faq);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an FAQ
export const deleteFAQ = async (req, res) => {
  const { faqId, questionId } = req.params;
  try {
    const faq = await Faq.findOne({ _id: faqId });
    faq.questions = faq.questions.filter(q => q._id.toString() !== questionId);
    await faq.save();
    res.json(faq);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Submit a new question (Client)
export const submitQuestion = async (req, res) => {
  const { name, email, question } = req.body;
  try {
    const newQuestion = {
      question,
      answer: 'Your question is submitted and will be reviewed.'
    };
    const faq = await Faq.findOne({ category: 'General' });
    if (!faq) {
      return res.status(404).json({ message: 'Category not found' });
    }
    faq.questions.push(newQuestion);
    await faq.save();
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// Fetch submitted questions
export const getSubmittedQuestions = async (req, res) => {
  try {
    
    const questions = await SubmittedQuestion.find(); 
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
