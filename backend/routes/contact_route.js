import express from 'express';
import { submitContactForm } from '../controllers/contact_controller.js'; 

const router = express.Router();


router.post('/', submitContactForm);

export default router;
