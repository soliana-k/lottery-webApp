import AuditLog from '../../models/admin/auditLog.js';
import Admin from '../../models/admin/admin.model.js'; // Import Admin model

// Log an audit entry


export const logAudit = async (eventType, adminEmail, details, category) => {
  try {
    const admin = await Admin.findOne({ email: adminEmail });
    if (!admin) {
      throw new Error('Admin not found');
    }

    const logEntry = new AuditLog({
      eventType,
      userId: admin._id,
      email: admin.email,
      details,
      category,
    });

    await logEntry.save();
  } catch (error) {
    console.error('Failed to log audit entry:', error);
  }
};


// Get all audit logs with populated admin details
export const getAuditLogs = async (req, res) => {
  try {
    const logs = await AuditLog.find().populate('userId', 'email'); // Populate with email from Admin
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch logs', error: error.message });
  }
};
