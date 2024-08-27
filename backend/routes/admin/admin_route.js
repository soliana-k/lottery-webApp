import express from "express";
import { adminLogin, AdminRegistration, getAdmins, getAdminById, updateAdmin, logoutAdmin } from '../../controllers/admin/admin_controller.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// Route to log in an admin
router.post("/login", adminLogin);
router.post('/register', AdminRegistration); // Use upload.single('file') middleware

// Logout route
router.get('/logout', logoutAdmin); // Place the logout route before the dynamic :id route

// Get all admins
router.get('/', getAdmins);

// Get a specific admin by ID
router.get('/:id', getAdminById);

// Update an admin
router.put('/:id', upload.single('profilePhoto'), updateAdmin);

export default router;
