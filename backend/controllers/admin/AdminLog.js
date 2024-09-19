const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Import models and controllers
const ActivityLog = require('../../models/admin/ActivityLog');
const prizeController = require('../prizes_controller');

// Middleware
app.use(express.json());

// Retrieve activity logs (with admin details)
const getActivityLogs = async (req, res) => {
  try {
    const logs = await ActivityLog.find()
      .populate('adminId', 'name email')
      .sort({ timestamp: -1 });
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching activity logs' });
  }
};

// Log Admin Action
const logAdminAction = async (adminId, actionType, entity, entityId, oldData, newData) => {
  try {
    const log = new ActivityLog({
      adminId,
      actionType,
      entity,
      entityId,
      oldData,
      newData,
    });
    await log.save();
    console.log('Activity log saved:', log);
  } catch (error) {
    console.error('Error logging admin action:', error);
  }
};

// Route to get logs
app.get('activities', getActivityLogs);

// Prize routes
app.post('/prizes', prizeController.addPrize);
app.put('/prizes/:id', prizeController.updatePrize);

// Ensure to define your port and start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
