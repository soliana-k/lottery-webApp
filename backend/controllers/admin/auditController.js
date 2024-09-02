// import AuditLog from '../../models/admin/auditLog.js';

// // Log an audit entry
// // export const logAudit = async (eventType, details, category) => {
// //   try {
// //     const logEntry = new AuditLog({
// //       eventType,
// //       details,
// //       category,
// //     });

// //     await logEntry.save();
// //   } catch (error) {
// //     console.error('Failed to log audit entry:', error);
// //   }
// // };
// //import AuditLog from '../../models/admin/auditLog.js';
// import Admin from '../../models/admin/admin.model.js'; // Import your Admin model

// export const logAudit = async (eventType, details, category, adminEmail) => {
//   try {
//     // Fetch the admin details
//     const admin = await Admin.findOne({ email: adminEmail });
//     if (!admin) {
//       throw new Error(`Admin not found with email: ${adminEmail}`);
//     }

//     // Create the audit log entry
//     const logEntry = new AuditLog({
//       eventType,
//       category,
//       timestamp: new Date(),
//       details,
//       email: admin.email // Include the admin's email
//     });

//     await logEntry.save();
//   } catch (error) {
//     console.error('Failed to log audit entry:', error);
//   }
// };


// // Get all audit logs
// export const getAuditLogs = async (req, res) => {
//   try {
//     const logs = await AuditLog.find();
//     res.status(200).json(logs);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to fetch logs', error: error.message });
//   }
// };
import { Admin } from '../../models/admin/admin.model.js'; // Adjust path as needed
import AuditLog from '../../models/admin/auditLog.js';

 // Adjust path as needed

export const logAudit = async (action, category, details, email) => {
  try {
    if (!action || !category || !details || !email) {
      throw new Error('Missing required fields for audit log');
    }

    // Ensure `details` is properly formatted, especially for `category` field
    const auditLog = new AuditLog({
      action, // Action must be a non-empty string
      category,
      details, 
      email,
      timestamp: new Date(),
    });

    await auditLog.save();
    console.log('Audit entry logged:', auditLog);
  } catch (error) {
    console.warn('Failed to log audit entry:', error);
  }
};


export const getAuditLogs = async (req, res) => {
  try {
    const logs = await AuditLog.find();
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch logs', error: error.message });
  }
};
