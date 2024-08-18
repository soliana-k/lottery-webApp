import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema({
  eventType: { type: String, required: true }, // e.g., 'CREATE', 'UPDATE', 'DELETE'
  category: { type: String, required: true },  // e.g., 'NumberManagement', 'DrawManagement'
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  timestamp: { type: Date, default: Date.now },
  details: { type: mongoose.Schema.Types.Mixed, required: true }, // Flexible field to store details about the action
});

const AuditLog = mongoose.model('AuditLog', auditLogSchema);

export default AuditLog;
