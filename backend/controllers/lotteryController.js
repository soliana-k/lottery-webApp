import NumberSelection from '../models/number.js'; 
import { logAudit } from './admin/auditController.js';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js'; // Adjust the path as necessary
//import NumberSelection from '../models/number.js';// Ensure path and export are correct


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
    await logAudit('CREATE', { numbers: addedNumbers.map(num => num._id), count: addedNumbers.length }, 'Number Management');
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
    await logAudit('CREATE', { numberId: newNumber._id, number }, 'Number Management');
    
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
    await logAudit('DELETE', { numberId: deletedNumber._id, number }, 'Number Management');
   
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


// export const handleNumberAndPayment = async (req, res) => {
//   try {
//     const { selectedNumber, paymentCompleted } = req.body;

//     // Validate input
//     if (selectedNumber === undefined || selectedNumber === null) {
//       return res.status(400).json({ message: 'Invalid number' });
//     }

//     if (paymentCompleted === undefined || paymentCompleted === null) {
//       return res.status(400).json({ message: 'Payment status not provided' });
//     }

//     // Update or create number selection
//     const result = await NumberSelection.findOneAndUpdate(
//       { number: selectedNumber },
//       { selected: true, paymentCompleted: paymentCompleted },
//       { upsert: true, new: true }
//     );

//     if (!result) {
//       return res.status(400).json({ message: 'Error updating number selection' });
//     }

//     // Check if there are selected numbers with completed payments
//     const selectedNumbers = await NumberSelection.find({ selected: true, paymentCompleted: true });

//     if (selectedNumbers.length === 0) {
//       return res.status(400).json({ message: 'No numbers selected or payment not completed' });
//     }

//     // Determine the lottery result
//     const lotteryResult = selectedNumbers[Math.floor(Math.random() * selectedNumbers.length)];

//     // Reset the selection and payment status for all numbers
//     await NumberSelection.updateMany({ selected: true, paymentCompleted: true }, { selected: false, paymentCompleted: false });

//     res.status(200).json({ message: 'Lottery started', result: lotteryResult });
//   } catch (error) {
//     console.error('Error handling number and payment:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };
export const handleNumberAndPayment = async (req, res) => {
  try {
    const { selectedNumber, paymentCompleted } = req.body;
    const userEmail = req.user.email; // Assuming `req.user.email` contains the logged-in user's email

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
      { selected: true, paymentCompleted: paymentCompleted, selectedBy: userEmail },
      { upsert: true, new: true }
    );

    if (!result) {
      return res.status(400).json({ message: 'Error updating number selection' });
    }

    res.status(200).json({ message: 'Lottery started', result });
  } catch (error) {
    console.error('Error handling number and payment:', error);
    res.status(500).json({ message: 'Server error' });
  }
};




// export const selectNumber = async (req, res) => {
//   const { id } = req.params;
//   try {
 
//     const number = await NumberSelection.findOneAndUpdate(
//       { number: id },
//       { selected: true },
//       { upsert: true, new: true }
//     );
//     res.status(200).json(number);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to select number' });
//   }
// };
// export const selectNumber = async (req, res) => {
//   const { id } = req.params;
//   const userEmail = req.user.email; // Assuming `req.user.email` contains the logged-in user's email

//   try {
//     const number = await NumberSelection.findOneAndUpdate(
//       { number: id },
//       { selected: true, selectedBy: userEmail },
//       { upsert: true, new: true }
//     );
//     res.status(200).json(number);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to select number' });
//   }
// };


export const selectNumber = async (req, res) => {
    const { id } = req.params;
    const token = req.cookies.token; // Extract token from cookies

    if (!token) {
        return res.status(401).json({
            message: 'User not authenticated',
            success: false
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        if (!decoded) {
            return res.status(401).json({
                message: 'Invalid token',
                success: false
            });
        }

        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({
                message: 'User not found',
                success: false
            });
        }

        // Proceed with selecting the number
        const number = await NumberSelection.findOneAndUpdate(
            { number: id },
            { selected: true, selectedBy: user.email }, // Save the email of the user who selected the number
            { new: true }
        );

        if (!number) {
            return res.status(404).json({ message: 'Number not found' });
        }

        res.status(200).json(number);
    } catch (error) {
        console.error('Error selecting number:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


