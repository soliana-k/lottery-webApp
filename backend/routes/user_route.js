import express from "express";
import { login, logout, register , getUsers, getUserById, updateUser, changePassword} from "../controllers/user_controller.js";
import upload from '../middlewares/multer.js'; // Import your multer setup
import multer from 'multer';

const router = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

router.route("/login").post(login);

router.route("/logout").get(logout);
router.post('/register', upload.single('file'), register); // Use upload.single('file') middleware

router.get('/', getUsers);

router.get('/:id', getUserById);

router.put('/:id', upload.single('profilePhoto'), updateUser);
router.put('/change-password/:id', changePassword);
export default router;