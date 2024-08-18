import NumberSelection from '../models/number.js'; 
//import { logAudit } from './admin/auditController.js';// Ensure path and export are correct


export const massAddNumbers = async (req, res) => {
  const { numbers } = req.body;

  if (!numbers || !Array.isArray(numbers)) {
    return res.status(400).json({ message: 'Invalid input' });
  }

  try {
    const addedNumbers = [];
    for (let number of numbers) {
      const existingNumber = await NumberSelection.findOne({ number });
      if (!existingNumber) {
        const newNumber = new NumberSelection({ number });
        await newNumber.save();
        addedNumbers.push(newNumber);
      }
    }
   // await logAudit('CREATE', adminEmail, { numberId: newNumber._id, ...req.body }, 'Number Management');
    res.status(201).json(addedNumbers);
  } catch (error) {
    console.error('Error mass adding numbers:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const addNumber = async (req, res) => {
  const { number } = req.body;

  // Validate input
  if (!number || number < 1 || number > 81) {
    return res.status(400).json({ message: 'Invalid number' });
  }

  try {
    const existingNumber = await NumberSelection.findOne({ number });
    if (existingNumber) {
      return res.status(400).json({ message: 'Number already exists' });
    }

    const newNumber = new NumberSelection({
      number,
      selected: false,
      paymentCompleted: false,
    });

    await newNumber.save();
  //  await logAudit('CREATE', adminEmail, { numberId: newNumber._id, ...req.body }, 'Number Management');
    res.status(201).json(newNumber);
  } catch (error) {
    console.error('Error adding number:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAvailableNumbers = async (req, res) => {
  try {
    const numbers = await NumberSelection.find();
    res.status(200).json(numbers);
  } catch (error) {
    console.error('Error fetching numbers:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



export const deleteNumber = async (req, res) => {
  const { number } = req.params;

  try {
    const deletedNumber = await NumberSelection.findOneAndDelete({ number });
    if (!deletedNumber) {
      return res.status(404).json({ message: 'Number not found' });
    }
    await logAudit('DELETE', adminEmail, { numberId }, 'Number Management');
    res.status(200).json({ message: 'Number deleted successfully' });
  } catch (error) {
    console.error('Error deleting number:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// export const addNumber = async (req, res) => {
//   const { number } = req.body;

//   try {
//     // Check if the number already exists
//     const existingNumber = await NumberSelection.findOne({ number });
//     if (existingNumber) {
//       return res.status(400).json({ message: 'Number already exists' });
//     }

//     // Create a new number entry
//     const newNumber = new NumberSelection({ number });
//     await newNumber.save();

//     res.status(200).json(newNumber);
//   } catch (error) {
//     console.error('Error adding number:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };


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

