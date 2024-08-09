import { NumberSelection } from '../models/number.js';
import { User } from '../models/user.model.js';

export const getAvailableNumbers = async (req, res) => {
  try {
    const selectedNumbers = await NumberSelection.find();
    const selectedNumberSet = new Set(selectedNumbers.map(item => item.number));
    
   
    const allNumbers = Array.from({ length: 80 }, (_, i) => i + 1);
    const availableNumbers = allNumbers.filter(num => !selectedNumberSet.has(num));
    
    res.json(availableNumbers);
  } catch (error) {
    console.error('Error fetching available numbers:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const selectNumber = async (req, res) => {
  const { id } = req.params;

  console.log(`Received request to select number with ID: ${id}`);
  console.log('Request body:', req.body);

  try {
    const number = await NumberSelection.findById(id);

    if (!number) {
      console.log('Number not found');
      return res.status(404).json({ message: 'Number not found' });
    }

    if (number.isSelected) {
      console.log('Number already selected');
      return res.status(400).json({ message: 'Number already selected' });
    }

    number.isSelected = true;
    number.selectedBy = req.body.userId;
    await number.save();

    console.log('Number selected successfully');
    res.status(200).json({ message: 'Number selected successfully' });
  } catch (error) {
    console.error('Error selecting number:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
