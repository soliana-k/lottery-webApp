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
  details: {
    type: mongoose.Schema.Types.Mixed, // You can use Mixed to store any type of data
    required: true, // Set to true if you always want to include details
  },
});

const AuditLog = mongoose.model('AuditLog', auditLogSchema);

export default AuditLog;
