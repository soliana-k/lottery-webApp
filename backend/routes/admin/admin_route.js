// admin_route.js
import express from "express";
import { adminLogin , AdminRegistration, getAdmins, getAdminById, updateAdmin} from '../../controllers/admin/admin_controller.js';

const router = express.Router();

// Route to log in an admin
router.post("/login", adminLogin);
router.post('/register', AdminRegistration); // Use upload.single('file') middleware

// router.get("/logout", adminLogout);

// Get all admins
router.get('/', getAdmins);

// Get a specific admin by ID
router.get('/:id', getAdminById);

// Update an admin
router.put('/:id', updateAdmin);


export default router;
