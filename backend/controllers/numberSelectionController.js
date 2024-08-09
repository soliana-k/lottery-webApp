import Number from '../models/number.js'; // Ensure this path is correct

export const selectNumber = async (req, res) => {
  const { id } = req.params; // Get the number ID from the URL parameters
  try {
    const number = await Number.findById(id);
    if (!number) {
      return res.status(404).json({ message: 'Number not found' });
    }
    number.taken = true; // Mark the number as taken
    await number.save(); // Save the updated number
    res.status(200).json(number); // Send back the updated number
  } catch (error) {
    console.error('Error selecting number:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
