import NumberSelection from '../models/number.js';

export const getSelectedNumbers = async (req, res) => {
  try {
    const selectedNumbers = await NumberSelection.find({ selected: true }); // Fetch numbers where 'selected' is true
    res.status(200).json(selectedNumbers);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch selected numbers' });
  }
};

export const selectNumber = async (req, res) => {
  const { id } = req.params;
  try {
 
    const number = await NumberSelection.findOneAndUpdate(
      { number: id },
      { selected: true },
      { upsert: true, new: true }
    );
    res.status(200).json(number);
  } catch (error) {
    res.status(500).json({ message: 'Failed to select number' });
  }
};
