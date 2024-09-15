const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Import models
const ActivityLog = require('./models/ActivityLog');
const Admin = require('./models/Admin'); // Assuming you have an Admin model
const Product = require('./models/Product'); // Assuming you have a Product model

// Middleware
app.use(express.json());

// Define activity log schema and model
const activityLogSchema = new mongoose.Schema({
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true },
  actionType: { type: String, required: true },
  entity: { type: String, required: true },
  entityId: { type: mongoose.Schema.Types.ObjectId },
  oldData: { type: Object, default: null },
  newData: { type: Object, default: null },
  timestamp: { type: Date, default: Date.now }
});

const ActivityLog = mongoose.model('ActivityLog', activityLogSchema);

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
app.get('/admin/logs', getActivityLogs);

// Example: Admin creating a new product
const createProduct = async (req, res) => {
  const { name, price, description } = req.body;
  const adminId = req.user.id; // Assume the admin's ID is stored in the request user object

  try {
    const product = await Product.create({ name, price, description });
    await logAdminAction(adminId, 'create', 'Product', product._id, null, product);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error creating product' });
  }
};

// Ensure to define your port and start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
