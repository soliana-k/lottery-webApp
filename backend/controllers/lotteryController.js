import NumberSelection from '../models/number.js'; 
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js'; 

export const massAddNumbers = async (req, res) => {
  const { numbers} = req.body; 

  if (!numbers || !Array.isArray(numbers)) {
    return res.status(400).json({ message: 'Invalid input' });
  }

  try {
    const addedNumbers = [];
    const currentNumbers = await NumberSelection.find({ number: { $in: numbers } });

    
    const newNumbers = numbers.filter(number => !currentNumbers.some(existingNumber => existingNumber.number === number));

    for (let number of newNumbers) {
      const newNumber = new NumberSelection({ number });
      await newNumber.save();
      addedNumbers.push(newNumber);
    }
    
    if (addedNumbers.length === 0) {
      return res.status(200).json({ message: 'No new numbers were added' });
    }
    res.status(201).json(addedNumbers);
  } catch (error) {
    console.error('Error mass adding numbers:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const addNumber = async (req, res) => {
  const { number } = req.body;

  
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
    
   
    res.status(200).json({ message: 'Number deleted successfully' });
  } catch (error) {
    console.error('Error deleting number:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const startLottery = async (req, res) => {
  const { number, email } = req.body;

  if (!number || !email) {
    return res.status(400).json({ message: 'Number and email are required' });
  }

  try {
    
    const updatedNumber = await NumberSelection.findOneAndUpdate(
      { number },
      { selected: true, selectedBy: email }, 
      { new: true } 
    );

    if (!updatedNumber) {
      return res.status(404).json({ message: 'Number not found' });
    }

    res.status(200).json({ message: 'Lottery started successfully', number: updatedNumber });
  } catch (error) {
    console.error('Error starting lottery:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


export const selectNumber = async (req, res) => {
  const { id } = req.params; 
  const token = req.cookies.token; 

  if (!token) {
    return res.status(401).json({
      message: 'User not authenticated',
      success: false,
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded) {
      return res.status(401).json({
        message: 'Invalid token',
        success: false,
      });
    }

    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({
        message: 'User not found',
        success: false,
      });
    }

   
    const number = await NumberSelection.findOneAndUpdate(
      { number: id }, 
      { selected: true, selectedBy: user.email }, 
      { new: true } 
    );

    if (!number) {
      return res.status(404).json({ message: 'Number not found' });
    }

    res.status(200).json({
      message: 'Number selected successfully',
      number,
    });
  } catch (error) {
    console.error('Error selecting number:', error);
    res.status(500).json({ message: 'Server error' });
  }
};




