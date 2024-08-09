import express from "express";
import { login, logout, register } from "../controllers/user_controller.js";
import upload from '../middlewares/multer.js'; // Import your multer setup
const router = express.Router();


router.route("/login").post(login);
router.route("/logout").get(logout);
router.post('/register', upload.single('file'), register); // Use upload.single('file') middleware
 

export default router;