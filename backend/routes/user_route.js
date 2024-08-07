import express from "express";
import { login, logout, register } from "../controllers/user_controller.js";
import { singleUpload } from "../middlewares/multer.js"

const router = express.Router();

router.route("/register").post(singleUpload, register);
router.route("/login").post(login);
router.route("/logout").get(logout);
 

export default router;