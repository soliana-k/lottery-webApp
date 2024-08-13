import express from "express";
import { adminLogin } from '../../controllers/admin/admin_controller.js';


const router = express.Router();

// Route to log in an admin
router.post("/login", adminLogin);

export default router;
