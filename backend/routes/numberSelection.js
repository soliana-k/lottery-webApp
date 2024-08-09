// routes/numberSelection.js
import express from 'express';
import NumberSelection from '../models/number.js';

const router = express.Router();

// Route to select a number
router.post('/selectNumber/:number', async (req, res) => {
  try {
    const { number } = req.params;
    const result = await NumberSelection.findOneAndUpdate(
      { number: Number(number) },
      { selected: true },
      { new: true } // Return the updated document
    );

    if (result) {
      res.status(200).json({ message: 'Number selected successfully' });
    } else {
      res.status(404).json({ message: 'Number not found' });
    }
  } catch (error) {
    console.error('Error selecting number:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
