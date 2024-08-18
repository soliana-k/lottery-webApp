import express from 'express';
import { getAuditLogs } from '../../controllers/admin/auditController.js';

const router = express.Router();

// Route to get audit logs
router.get('/audit-logs', getAuditLogs);

export default router;
