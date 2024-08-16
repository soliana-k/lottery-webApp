// admin_route.js
import express from "express";
import { adminLogin , AdminRegistration} from '../../controllers/admin/admin_controller.js';

const router = express.Router();

// Route to log in an admin
router.post("/login", adminLogin);
router.post('/register', AdminRegistration); // Use upload.single('file') middleware

// router.get("/logout", adminLogout);

export default router;
