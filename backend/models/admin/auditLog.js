import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema({
  action: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const AuditLog = mongoose.model('AuditLog', auditLogSchema);

export default AuditLog;
