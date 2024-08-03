import { Contact } from '../models/contact.models.js'; 

export const submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        message: 'Please fill out all fields.',
        success: false
      });
    }

    const newContact = new Contact({
      name,
      email,
      message
    });

    await newContact.save();

    return res.status(201).json({
      message: 'Your message has been sent successfully!',
      success: true
    });
  } catch (error) {
    console.error('Contact form submission error:', error);
    return res.status(500).json({
      message: 'An error occurred while sending your message. Please try again later.',
      success: false
    });
  }
};
