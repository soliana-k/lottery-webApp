import mongoose from 'mongoose';
import Draw from '../../models/admin/draw.js';
//import Draw from '../../models/admin/draw.js';
import AuditLog from '../../models/admin/auditLog.js';
import Admin from '../../models/admin/admin.model.js';
import { logAudit } from './auditController.js';

// Convert string to ObjectId
const toObjectId = (id) => mongoose.Types.ObjectId(id);

// Fetch historical draws
export const getHistoricalDraws = async (req, res) => {
  try {
    const historicalDraws = await Draw.find({ status: 'Completed' }).populate('winner');
    res.status(200).json(historicalDraws);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update status to completed when a draw finishes
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


export const createDraw = async (req, res) => {
  try {
    const { date, time, status } = req.body;
    console.log('Received data:', { date, time, status });

    const validStatuses = ['Upcoming', 'Completed', 'Cancelled'];
    if (!validStatuses.includes(status)) {
      console.error('Invalid status value:', status);
      return res.status(400).json({ error: 'Invalid status value' });
    }

    const draw = new Draw({ date, time, status });
    await draw.save();
   // await logAudit('CREATE', req.user.email, { date, time, status }, 'DrawManagement');
   await logAudit('CREATE', { date, time, status }, 'DrawManagement');
   

    res.status(201).json(draw);
  } catch (error) {
    console.error('Error creating draw:', error.message);
    res.status(400).json({ error: 'Failed to create draw', details: error.message });
  }
};


// export const createDraw = async (req, res) => {
//   try {
//     const { date, time, status } = req.body;

//     // Extract admin ID from request (assuming token or session is used)
//     const adminId = req.adminId;

//     // Ensure admin is authenticated
//     if (!adminId) {
//       return res.status(401).json({ error: 'Unauthorized' });
//     }

//     // Fetch admin details
//     const admin = await Admin.findById(adminId);
//     if (!admin) {
//       return res.status(404).json({ error: 'Admin not found' });
//     }

//     const validStatuses = ['Upcoming', 'Completed', 'Cancelled'];
//     if (!validStatuses.includes(status)) {
//       return res.status(400).json({ error: 'Invalid status value' });
//     }

//     // Create the draw
//     const draw = new Draw({ date, time, status, createdBy: admin.email });
//     await draw.save();

//     // Log the action
//     await AuditLog.create({
//       eventType: 'CREATE',
//       category: 'DrawManagement',
//       userId: admin._id,
//       email: admin.email,
//       details: { date, time, status },
//     });

//     res.status(201).json(draw);
//   } catch (error) {
//     res.status(400).json({ error: 'Failed to create draw', details: error.message });
//   }
// };


// Get all draws with populated winner details
export const getAllDraws = async (req, res) => {
  try {
    const draws = await Draw.find();
    res.status(200).json(draws);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a draw
export const updateDraw = async (req, res) => {
  console.log('Received update data:', req.body); // Log received data
  try {
    const drawId = toObjectId(req.params.draw);
    const draw = await Draw.findByIdAndUpdate(drawId, req.body, { new: true });
    if (!draw) return res.status(404).json({ error: 'Draw not found' });

    //await logAudit('UPDATE', req.user.email, { drawId: draw._id, updates: req.body }, 'DrawManagement');
    await logAudit('UPDATE', { drawId: draw._id, updates: req.body }, 'DrawManagement');
    res.status(200).json(draw);
  } catch (error) {
    console.error('Error in updateDraw:', error.message); // Log error details
    res.status(400).json({ error: error.message });
  }
};

// Delete a draw
export const deleteDraw = async (req, res) => {
  console.log('Request Params:', req.params); // Log the request params
  try {
    // Correct usage of ObjectId constructor
    const drawId = new mongoose.Types.ObjectId(req.params.draw);
    
    const draw = await Draw.findByIdAndDelete(drawId);
    if (!draw) return res.status(404).json({ error: 'Draw not found' });

    console.log('Draw deleted:', draw); // Log the deleted draw

    // Optionally, log the deletion action in your audit log
    await logAudit('DELETE', {
      drawId: draw._id,
      date: draw.date,
      time: draw.time,
      status: draw.status,
      // Add other relevant details here
    }, 'DrawManagement');

    res.status(200).json({ message: 'Draw deleted successfully' });
  } catch (error) {
    console.error('Error in deleteDraw:', error.message); // Log error details
    res.status(500).json({ error: error.message });
  }
};

