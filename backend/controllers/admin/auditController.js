import AuditLog from '../../models/admin/auditLog.js';

// Log an audit entry
export const logAudit = async (eventType, details, category) => {
  try {
    const logEntry = new AuditLog({
      eventType,
      details,
      category,
    });

    await logEntry.save();
  } catch (error) {
    console.error('Failed to log audit entry:', error);
  }
};

// Get all audit logs
export const getAuditLogs = async (req, res) => {
  try {
    const logs = await AuditLog.find();
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch logs', error: error.message });
  }
};
