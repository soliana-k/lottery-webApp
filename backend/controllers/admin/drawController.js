// import mongoose from 'mongoose';
// import Draw from '../../models/admin/draw.js';
// //import Draw from '../../models/admin/draw.js';
// import AuditLog from '../../models/admin/auditLog.js';
// import Admin from '../../models/admin/admin.model.js';
// import { logAudit } from './auditController.js';
// //import Admin from '../../models/admin/admin.model.js'; // Import your Admin model



// export const createDraw = async (req, res) => {
//   try {
//     const { date, time, status, adminEmail } = req.body; // Add adminEmail in the request body

//     // Fetch admin by email
//     const admin = await Admin.findOne({ email: adminEmail });
//     if (!admin) {
//       return res.status(404).json({ error: 'Admin not found' });
//     }

//     const validStatuses = ['Upcoming', 'Completed', 'Cancelled'];
//     if (!validStatuses.includes(status)) {
//       return res.status(400).json({ error: 'Invalid status value' });
//     }

//     const draw = new Draw({ date, time, status });
//     await draw.save();

//     // Log the action
//     await logAudit('CREATE', { date, time, status }, 'DrawManagement', admin.email);

//     res.status(201).json(draw);
//   } catch (error) {
//     res.status(400).json({ error: 'Failed to create draw', details: error.message });
//   }
// };


// // Convert string to ObjectId
// const toObjectId = (id) => mongoose.Types.ObjectId(id);

// // Fetch historical draws
// export const getHistoricalDraws = async (req, res) => {
//   try {
//     const historicalDraws = await Draw.find({ status: 'Completed' }).populate('winner');
//     res.status(200).json(historicalDraws);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Update status to completed when a draw finishes
// export const completeDraw = async (req, res) => {
//   try {
//     const drawId = toObjectId(req.params.draw);
//     const draw = await Draw.findById(drawId);
//     if (!draw) return res.status(404).json({ error: 'Draw not found' });

//     draw.status = 'Completed';
//     await draw.save();

//     res.status(200).json(draw);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };


// // export const createDraw = async (req, res) => {
// //   try {
// //     const { date, time, status } = req.body;
// //     console.log('Received data:', { date, time, status });

// //     const validStatuses = ['Upcoming', 'Completed', 'Cancelled'];
// //     if (!validStatuses.includes(status)) {
// //       console.error('Invalid status value:', status);
// //       return res.status(400).json({ error: 'Invalid status value' });
// //     }

// //     const draw = new Draw({ date, time, status });
// //     await draw.save();
// //    // await logAudit('CREATE', req.user.email, { date, time, status }, 'DrawManagement');
// //    //await logAudit('CREATE', { date, time, status }, 'DrawManagement');
   
// //    //await logAudit('CREATE', { date, time, status }, 'DrawManagement', req.admin.email);
// //    await logAudit('CREATE', { date, time, status }, 'DrawManagement', req.id);

   

// //     res.status(201).json(draw);
// //   } catch (error) {
// //     console.error('Error creating draw:', error.message);
// //     res.status(400).json({ error: 'Failed to create draw', details: error.message });
// //   }
// // };


// // export const createDraw = async (req, res) => {
// //   try {
// //     const { date, time, status } = req.body;

// //     // Extract admin ID from request (assuming token or session is used)
// //     const adminId = req.adminId;

// //     // Ensure admin is authenticated
// //     if (!adminId) {
// //       return res.status(401).json({ error: 'Unauthorized' });
// //     }

// //     // Fetch admin details
// //     const admin = await Admin.findById(adminId);
// //     if (!admin) {
// //       return res.status(404).json({ error: 'Admin not found' });
// //     }

// //     const validStatuses = ['Upcoming', 'Completed', 'Cancelled'];
// //     if (!validStatuses.includes(status)) {
// //       return res.status(400).json({ error: 'Invalid status value' });
// //     }

// //     // Create the draw
// //     const draw = new Draw({ date, time, status, createdBy: admin.email });
// //     await draw.save();

// //     // Log the action
// //     await AuditLog.create({
// //       eventType: 'CREATE',
// //       category: 'DrawManagement',
// //       userId: admin._id,
// //       email: admin.email,
// //       details: { date, time, status },
// //     });

// //     res.status(201).json(draw);
// //   } catch (error) {
// //     res.status(400).json({ error: 'Failed to create draw', details: error.message });
// //   }
// // };


// // Get all draws with populated winner details
// export const getAllDraws = async (req, res) => {
//   try {
//     const draws = await Draw.find();
//     res.status(200).json(draws);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Update a draw
// export const updateDraw = async (req, res) => {
//   console.log('Received update data:', req.body); // Log received data
//   try {
//     // Correct usage of ObjectId constructor
//     const drawId = new mongoose.Types.ObjectId(req.params.draw);

//     const draw = await Draw.findByIdAndUpdate(drawId, req.body, { new: true });
//     if (!draw) return res.status(404).json({ error: 'Draw not found' });

//     // Log the update action with the relevant details
//     await logAudit('UPDATE', {
//       drawId: draw._id,
//       updates: req.body,
//     }, 'DrawManagement');

//     res.status(200).json(draw);
//   } catch (error) {
//     console.error('Error in updateDraw:', error.message); // Log error details
//     res.status(400).json({ error: error.message });
//   }
// };


// // Delete a draw
//const toObjectId = (id) => mongoose.Types.ObjectId(id);

import mongoose from 'mongoose';
import Draw from '../../models/admin/draw.js';
import { logAudit } from './auditController.js';
import Admin from '../../models/admin/admin.model.js';
export const getAllDraws = async (req, res) => {
  try {
    const draws = await Draw.find();
    res.status(200).json(draws);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getHistoricalDraws = async (req, res) => {
  try {
    const historicalDraws = await Draw.find({ status: 'Completed' }).populate('winner');
    res.status(200).json(historicalDraws);
  } catch (error) {
    res.status(500).json({ error: error.message });
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

// Create a draw
// export const createDraw = async (req, res) => {
//   try {
//     const { date, time, status } = req.body;
//     const adminId = req.adminId;

//     if (!adminId) {
//       return res.status(401).json({ error: 'Unauthorized' });
//     }

//     const admin = await Admin.findById(adminId);
//     if (!admin) {
//       return res.status(404).json({ error: 'Admin not found' });
//     }

//     const validStatuses = ['Upcoming', 'Completed', 'Cancelled'];
//     if (!validStatuses.includes(status)) {
//       return res.status(400).json({ error: 'Invalid status value' });
//     }

//     const draw = new Draw({ date, time, status });
//     await draw.save();

//     await logAudit('CREATE', { date, time, status }, 'DrawManagement', admin.email);

//     res.status(201).json(draw);
//   } catch (error) {
//     res.status(400).json({ error: 'Failed to create draw', details: error.message });
//   }
// };
//import Draw from '../../models/admin/draw.js'; // Adjust path as needed
//import { logAudit } from './auditController.js'; // Adjust path as needed


//import Draw from '../models/Draw.js';
//import { logAudit } from './auditController.js'; // Import the logAudit function

export const createDraw = async (req, res) => {
  try {
    const { date, time, status, email } = req.body; // Make sure to extract email here

    console.log('Create Draw Data:', { date, time, status, email }); // Debugging

    if (!date || !time || !status || !email) {
      return res.status(400).json({ message: 'All fields are required', success: false });
    }

    const newDraw = new Draw({
      date,
      time,
      status,
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
    await logAudit(action, 'DrawManagement',details, email );

    return res.status(201).json({ message: 'Draw created successfully', success: true, draw: newDraw });
  } catch (error) {
    console.error('Error creating draw:', error);
    return res.status(500).json({ message: 'Internal server error', success: false });
  }
};

// Update a draw
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
      oldValues: oldDraw,
      newValues: updatedDraw,
    }, admin.email);

    // Return the updated draw
    res.status(200).json(updatedDraw);
  } catch (error) {
    console.error('Error updating draw:', error);
    res.status(500).json({ error: error.message });
  }
};

// import mongoose from 'mongoose';
// import Draw from '../models/Draw'; // Adjust the path as necessary
// import logAudit from '../utils/logAudit'; // Adjust the path as necessary

export const deleteDraw = async (req, res) => {
  console.log('Request Params:', req.params); // Log the request params

  try {
    // Ensure drawId is correctly converted to an ObjectId
    const drawId = req.params.draw;
    
    // Attempt to find and delete the draw
    const draw = await Draw.findByIdAndDelete(drawId);
    if (!draw) {
      return res.status(404).json({ error: 'Draw not found' });
    }

    console.log('Draw deleted:', draw); // Log the deleted draw

    // Optionally, log the deletion action in your audit log
    await logAudit('DELETE', 'DrawManagement', {
      drawId: draw._id,
      date: draw.date,
      time: draw.time,
      status: draw.status,
    }, req.adminEmail); // Ensure you pass the admin's email if needed

    res.status(200).json({ message: 'Draw deleted successfully' });
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

