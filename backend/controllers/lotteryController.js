import NumberSelection from '../models/number.js'; // Ensure path and export are correct
// Get available numbers and their selection status
export const getAvailableNumbers = async (req, res) => {
  try {
    const numbers = await NumberSelection.find();
    res.status(200).json(numbers);
  } catch (error) {
    console.error('Error fetching available numbers:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


export const handleNumberAndPayment = async (req, res) => {
  try {
    const { selectedNumber, paymentCompleted } = req.body;

    // Validate input
    if (selectedNumber === undefined || selectedNumber === null) {
      return res.status(400).json({ message: 'Invalid number' });
    }

    if (paymentCompleted === undefined || paymentCompleted === null) {
      return res.status(400).json({ message: 'Payment status not provided' });
    }

    // Update or create number selection
    const result = await NumberSelection.findOneAndUpdate(
      { number: selectedNumber },
      { selected: true, paymentCompleted: paymentCompleted },
      { upsert: true, new: true }
    );

    if (!result) {
      return res.status(400).json({ message: 'Error updating number selection' });
    }

    // Check if there are selected numbers with completed payments
    const selectedNumbers = await NumberSelection.find({ selected: true, paymentCompleted: true });

    if (selectedNumbers.length === 0) {
      return res.status(400).json({ message: 'No numbers selected or payment not completed' });
    }

    // Determine the lottery result
    const lotteryResult = selectedNumbers[Math.floor(Math.random() * selectedNumbers.length)];

    // Reset the selection and payment status for all numbers
    await NumberSelection.updateMany({ selected: true, paymentCompleted: true }, { selected: false, paymentCompleted: false });

    res.status(200).json({ message: 'Lottery started', result: lotteryResult });
  } catch (error) {
    console.error('Error handling number and payment:', error);
    res.status(500).json({ message: 'Server error' });
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

