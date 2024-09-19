

import mongoose from 'mongoose';
import Draw from '../../models/admin/draw.js';
import { logAudit } from './auditController.js';
import Admin from '../../models/admin/admin.model.js';
import DrawResults from '../../models/DrawResult.js';


export const createDrawResult = async (req, res) => {
  try {
    const { drawId } = req.params;
    const draw = await Draw.findById(drawId);

    if (!draw) {
      return res.status(404).json({ message: 'Draw not found' });
    }

    
    if (draw.status === 'Cancelled') {
      return res.status(400).json({ message: 'Draw is cancelled and cannot be completed' });
    }

    if (draw.status === 'Upcoming') {
      return res.status(400).json({ message: 'Draw is still upcoming. Please wait for it to complete.' });
    }

   
    if (draw.status === 'Completed') {
      return res.status(400).json({ message: 'Draw is already completed' });
    }

   
    draw.status = 'Completed';
    await draw.save();

   
    const selectedNumbers = draw.selectedNumbers;
    if (!selectedNumbers || selectedNumbers.length === 0) {
      return res.status(400).json({ message: 'No selected numbers available' });
    }

    
    const randomIndex = Math.floor(Math.random() * selectedNumbers.length);
    const winningNumber = selectedNumbers[randomIndex];

    // Create the draw result
    const drawResult = new DrawResults({
      drawId: draw._id,
      selectedNumbers,
      winner: winningNumber.selectedBy,
      drawDate: draw.date,
      status: 'Completed',
    });

    await drawResult.save();

    return res.status(201).json({ message: 'Draw result created', success: true, drawResult });
  } catch (error) {
    console.error('Error creating draw result:', error);
    return res.status(500).json({ message: 'Internal server error', success: false });
  }
};



export const getAllDraws = async (req, res) => {
  try {
    const draws = await Draw.find();
    res.status(200).json(draws);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//import DrawResults from '../models/drawResults'; // Make sure you import the DrawResults model

export const getHistoricalDraws = async (req, res) => {
  try {
    // Step 1: Find all completed draws
    const completedDraws = await Draw.find({ status: 'Completed' });

    // Step 2: Retrieve corresponding draw results for those completed draws
    const historicalDraws = await Promise.all(
      completedDraws.map(async (draw) => {
        const result = await DrawResults.findOne({ drawId: draw._id });
        return {
          ...draw.toObject(),
          winner: result ? result.winner : null, // Include winner from draw results if exists
        };
      })
    );

    res.status(200).json(historicalDraws);
  } catch (error) {
    res.status(500).json({
      message: "Server error fetching historical draws",
      error: error.message,
    });
  }
};



export const completeDraw = async (req, res) => {
  try {
    const drawId = toObjectId(req.params.draw);
    const draw = await Draw.findById(drawId);
    if (!draw) return res.status(404).json({ error: 'Draw not found' });

    draw.status = 'Completed';
    await draw.save();

    res.status(200).json(draw);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

import Prize from '../../models/prizes.js';

export const createDraw = async (req, res) => {
  try {
    const { date, time, status, email, prize } = req.body; // Handle single prize ID

    console.log('Create Draw Data:', { date, time, status, email, prize }); // Debugging

    if (!date || !time || !status || !email) {
      return res.status(400).json({ message: 'All fields are required', success: false });
    }

    // Validate the prize
    if (prize) {
      const validPrize = await Prize.findById(prize);
      if (!validPrize) {
        return res.status(400).json({ message: 'Selected prize is not valid', success: false });
      }
    }

    const newDraw = new Draw({
      date,
      time,
      status,
      prize, // Add single prize to the draw
    });

    await newDraw.save();

    // Log the audit entry
    const action = 'CREATE'; 
    const details = {
      drawId: newDraw._id,
      date,
      time,
      status,
    };
    await logAudit(action, 'DrawManagement', details, email);

    return res.status(201).json({ message: 'Draw created successfully', success: true, draw: newDraw });
  } catch (error) {
    console.error('Error creating draw:', error);
    return res.status(500).json({ message: 'Internal server error', success: false });
  }
};


export const updateDraw = async (req, res) => {
  try {
    const { draw: drawId } = req.params;
    const updateData = req.body;

    // Validate that drawId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(drawId)) {
      return res.status(400).json({ error: 'Invalid draw ID' });
    }

    // Find the draw before updating
    const oldDraw = await Draw.findById(drawId);
    if (!oldDraw) {
      return res.status(404).json({ error: 'Draw not found' });
    }

    // Update the draw
    const updatedDraw = await Draw.findByIdAndUpdate(drawId, updateData, { new: true });

    // Fetch the admin email for logging
    const adminId = req.adminId;
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    // Log the audit entry with details of what changed
    await logAudit('UPDATE', 'DrawManagement', {
      drawId: updatedDraw._id,
      oldValues: oldDraw, // Log the old values
      newValues: updatedDraw, // Log the new values
    }, admin.email);

    // Return the updated draw
    res.status(200).json({ message: 'Draw updated successfully', success: true, draw: updatedDraw });
  } catch (error) {
    console.error('Error updating draw:', error);
    res.status(500).json({ error: error.message });
  }
};


export const deleteDraw = async (req, res) => {
  console.log('Request Params:', req.params); // Log the request params

  try {
    const drawId = req.params.draw;

    // Ensure drawId is correctly converted to an ObjectId
    if (!mongoose.Types.ObjectId.isValid(drawId)) {
      return res.status(400).json({ error: 'Invalid draw ID' });
    }

    // Attempt to find and delete the draw
    const draw = await Draw.findByIdAndDelete(drawId);
    if (!draw) {
      return res.status(404).json({ error: 'Draw not found' });
    }

    console.log('Draw deleted:', draw); // Log the deleted draw

    // Optionally, log the deletion action in your audit log
    const adminEmail = req.adminEmail; // Ensure you pass the admin's email if needed
    await logAudit('DELETE', 'DrawManagement', {
      drawId: draw._id,
      date: draw.date,
      time: draw.time,
      status: draw.status,
    }, adminEmail);

    res.status(200).json({ message: 'Draw deleted successfully', success: true });
  } catch (error) {
    console.error('Error in deleteDraw:', error.message); // Log error details
    res.status(500).json({ error: error.message });
  }
};


// Delete a draw
 // Adjust the path as needed

// export const deleteDraw = async (req, res) => {
//   try {
//     const { draw: drawId } = req.params;

//     // Validate that drawId is a valid ObjectId
//     if (!mongoose.Types.ObjectId.isValid(drawId)) {
//       return res.status(400).json({ error: 'Invalid draw ID' });
//     }

//     // Find the draw before deleting
//     const draw = await Draw.findById(drawId);
//     if (!draw) {
//       return res.status(404).json({ error: 'Draw not found' });
//     }

//     // Delete the draw
//     await Draw.findByIdAndDelete(drawId);

//     // Fetch the admin email for logging
//     const adminId = req.adminId;
//     const admin = await Admin.findById(adminId);

//     if (!admin) {
//       return res.status(404).json({ error: 'Admin not found' });
//     }

//     // Log the audit entry with details of what was deleted
//     await logAudit('DELETE', 'DrawManagement', {
//       drawId: draw._id,
//       date: draw.date,
//       time: draw.time,
//       status: draw.status,
//     }, admin.email);

//     // Return success message
//     res.status(200).json({ message: 'Draw deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting draw:', error);
//     res.status(500).json({ error: error.message });
//   }
// };

