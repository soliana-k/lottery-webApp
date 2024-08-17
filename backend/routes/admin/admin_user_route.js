// routes/admin/admin_user_route.js
import express from 'express';
import { getUsers, getUserById, updateUser, deleteUser } from '../../controllers/admin/admin_user_controller.js';

const router = express.Router();

// Get all users
router.get('/', getUsers);

// Get a single user by ID
router.get('/:id', getUserById);



// Update a user
router.put('/:id', updateUser);

// Delete a user
router.delete('/:id', deleteUser);

export default router;
