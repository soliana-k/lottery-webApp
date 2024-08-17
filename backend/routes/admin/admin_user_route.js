// routes/admin/admin_user_route.js
import express from 'express';
import { getUsers } from '../../controllers/admin/admin_user_controller.js'; // Import the controller

const router = express.Router();

// Route to get all users
router.get('/users', getUsers);

export default router;
