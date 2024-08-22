import express from 'express';
import Settings from '../models/settingsModel.js'; // Import your settings model

const router = express.Router();

// GET /api/v1/settings
router.get('/', async (req, res) => {
  try {
    const settings = await Settings.findOne(); // Find the settings document
    if (!settings) {
      return res.status(404).json({ error: 'Settings not found' });
    }
    res.json(settings); 
  } catch (error) {
    res.status(500).json({ error: 'Error fetching settings' });
  }
});

// POST /api/v1/settings (for updating)
router.post('/', async (req, res) => {
  const { fontSize, bgColor } = req.body;

  try {
    const updatedSettings = await Settings.findOneAndUpdate(
      {}, // Update the existing document (there should only be one)
      { fontSize, bgColor }, 
      { new: true, upsert: true } // Return updated document, create if it doesn't exist
    );

    res.json({ message: 'Settings updated successfully', updatedSettings });
  } catch (error) {
    res.status(500).json({ error: 'Error updating settings' });
  }
});

export default router; 
